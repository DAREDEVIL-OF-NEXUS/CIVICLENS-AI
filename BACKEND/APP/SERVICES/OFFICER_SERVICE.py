"""
OFFICER MANAGEMENT SERVICE
Tracks officer workload, performance scores, and resolution rates.
"""
from sqlalchemy.orm import Session
from APP.MODELS.USER import User
from APP.MODELS.COMPLAINT import Complaint

def get_officer_workload(db: Session, officer_username: str) -> dict:
    """
    Returns active workload and resolution metrics for an officer.
    """
    active_complaints = db.query(Complaint).filter(
        Complaint.assigned_to == officer_username,
        Complaint.status != "RESOLVED"
    ).count()
    
    resolved_complaints = db.query(Complaint).filter(
        Complaint.assigned_to == officer_username,
        Complaint.status == "RESOLVED"
    ).count()
    
    return {
        "officer": officer_username,
        "active_workload": active_complaints,
        "resolved_total": resolved_complaints,
        "performance_score": min(100, (resolved_complaints / max(1, active_complaints + resolved_complaints)) * 100)
    }

def assign_complaint_to_officer(db: Session, complaint_id: int, officer_username: str):
    complaint = db.query(Complaint).filter(Complaint.id == complaint_id).first()
    if complaint:
        complaint.assigned_to = officer_username
        db.commit()
    return complaint
