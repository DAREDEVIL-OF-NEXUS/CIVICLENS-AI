"""
FRAUD DETECTION AGENT
Detects false closures, suspicious officer behavior, and repeated unresolved complaints.
"""
from sqlalchemy.orm import Session
from APP.MODELS.COMPLAINT import Complaint

def detect_suspicious_closures(db: Session, officer_username: str) -> dict:
    """
    Flags if an officer has an abnormally high closure rate with zero citizen OTP verifications.
    """
    recent_closures = db.query(Complaint).filter(
        Complaint.assigned_to == officer_username,
        Complaint.status == "RESOLVED"
    ).all()
    
    total = len(recent_closures)
    if total < 5:
        return {"fraud_risk": "LOW", "reason": "Not enough data"}
        
    unverified = sum(1 for c in recent_closures if not c.otp_verified_closure)
    contested = sum(1 for c in recent_closures if c.contested_closure)
    
    unverified_ratio = unverified / total
    
    if contested >= 3 or unverified_ratio > 0.90:
        return {"fraud_risk": "HIGH", "reason": "Suspiciously high unverified/contested closures."}
        
    return {"fraud_risk": "LOW", "reason": "Behavior normal."}
