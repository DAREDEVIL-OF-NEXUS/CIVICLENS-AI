from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session

from APP.CORE.DATABASE import get_db
from APP.MODELS.COMPLAINT import Complaint
from APP.SCHEMAS.COMPLAINT_SCHEMA import ComplaintCreate, ComplaintResponse
from APP.SERVICES.DUPLICATE_SERVICE import find_duplicate_complaint
from APP.SERVICES.LOCATION_INTELLIGENCE_SERVICE import build_location_intelligence
from APP.SERVICES.NOTIFICATION_SERVICE import (
    send_status_notification,
    send_submission_notification,
)
from APP.SERVICES.LLM_PIPELINE_SERVICE import analyze_complaint_pipeline
from APP.SERVICES.PRIORITY_SERVICE import compute_priority_score

router = APIRouter()


class ComplaintStatusUpdate(BaseModel):
    status: str
    notify_email: Optional[str] = None


@router.post("/", response_model=ComplaintResponse)
def create_complaint(payload: ComplaintCreate, db: Session = Depends(get_db)):
    analysis_input = (
        f"Title: {payload.title}\n"
        f"Description: {payload.description}\n"
        f"Location: {payload.location or 'Not provided'}"
    )

    analysis = analyze_complaint_pipeline(analysis_input)
    location_intelligence = build_location_intelligence(payload.location)

    duplicate_result = find_duplicate_complaint(
        db,
        text=analysis_input,
        lat=payload.lat,
        lng=payload.lng,
    )

    priority_score = compute_priority_score(
        urgency=analysis["urgency"],
        category=analysis["category"],
        similarity_score=duplicate_result["similarity_score"],
    )

    new_complaint = Complaint(
        title=payload.title,
        description=payload.description,
        location=payload.location,
        formatted_address=location_intelligence["formatted_address"],
        normalized_location=location_intelligence["normalized_location"],
        locality=location_intelligence["locality"],
        sub_locality=location_intelligence["sub_locality"],
        district=location_intelligence["district"],
        region=location_intelligence["region"],
        ward=location_intelligence["ward"],
        zone=location_intelligence["zone"],
        lat=payload.lat,
        lng=payload.lng,
        submitted_by=payload.submitted_by,
        contact=payload.contact,
        category=analysis["category"],
        urgency=analysis["urgency"],
        priority_score=priority_score,
        department=analysis["department"],
        ai_summary=analysis["ai_summary"],
        model_confidence=analysis.get("confidence", 0.75),
        duplicate_of=duplicate_result["duplicate_of"],
        duplicate_cluster_id=f"cluster-{duplicate_result['duplicate_of']}" if duplicate_result["duplicate_of"] else None,
        similarity_score=duplicate_result["similarity_score"],
        status="NEW",
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    if new_complaint.duplicate_of is None:
        new_complaint.duplicate_cluster_id = f"cluster-{new_complaint.id}"
        db.commit()
        db.refresh(new_complaint)

    if payload.contact and "@" in payload.contact:
        try:
          send_submission_notification(
              payload.contact,
              {
                  "id": new_complaint.id,
                  "title": new_complaint.title,
                  "location": new_complaint.location,
                  "category": new_complaint.category,
                  "urgency": new_complaint.urgency,
                  "department": new_complaint.department,
              },
          )
        except Exception as exc:
          print("Submission notification failed:", exc)

    return new_complaint


@router.get("/", response_model=List[ComplaintResponse])
def get_all_complaints(
    db: Session = Depends(get_db),
    submitted_by: Optional[str] = Query(default=None),
):
    query = db.query(Complaint)

    if submitted_by:
        query = query.filter(Complaint.submitted_by == submitted_by.strip())

    return query.order_by(Complaint.created_at.desc()).all()


@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_complaint_by_id(complaint_id: int, db: Session = Depends(get_db)):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()

    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    return complaint


@router.patch("/{complaint_id}/status", response_model=ComplaintResponse)
def update_complaint_status(
    complaint_id: int,
    payload: ComplaintStatusUpdate,
    db: Session = Depends(get_db),
):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()

    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")

    new_status = payload.status.strip().upper()
    allowed_statuses = {"NEW", "IN_PROGRESS", "RESOLVED"}

    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid status. Allowed values: NEW, IN_PROGRESS, RESOLVED",
        )

    complaint.status = new_status

    if new_status == "RESOLVED":
        complaint.resolved_at = datetime.utcnow()

    db.commit()
    db.refresh(complaint)

    if payload.notify_email:
        try:
            send_status_notification(
                payload.notify_email,
                {
                    "id": complaint.id,
                    "title": complaint.title,
                    "status": complaint.status,
                    "priority_score": complaint.priority_score,
                },
            )
        except Exception as exc:
            print("Status notification failed:", exc)

    return complaint