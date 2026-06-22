"""
PUBLIC TRANSPARENCY QUEUE
Provides safe, anonymized metrics for citizens to view neighborhood health.
"""
from sqlalchemy.orm import Session
from APP.MODELS.COMPLAINT import Complaint

def get_public_region_stats(db: Session, region: str) -> dict:
    """
    Returns public stats without exposing PII (contact details, user names).
    """
    open_count = db.query(Complaint).filter(Complaint.region == region, Complaint.status == "NEW").count()
    progress_count = db.query(Complaint).filter(Complaint.region == region, Complaint.status == "IN_PROGRESS").count()
    resolved_count = db.query(Complaint).filter(Complaint.region == region, Complaint.status == "RESOLVED").count()
    
    return {
        "region": region,
        "open_complaints": open_count,
        "in_progress": progress_count,
        "resolved": resolved_count
    }
