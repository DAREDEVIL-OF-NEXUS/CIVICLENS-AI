"""
ESCALATION SERVICE
Monitors SLAs and escalates complaints that violate timelines.
"""
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from APP.MODELS.COMPLAINT import Complaint

SLA_HOURS = {
    "HIGH": 24,
    "MEDIUM": 72,
    "LOW": 168 # 1 week
}

def check_and_escalate_complaints(db: Session):
    """
    Scans active complaints and marks them as ESCALATED if SLA is breached.
    """
    active = db.query(Complaint).filter(Complaint.status.in_(["NEW", "IN_PROGRESS"])).all()
    escalated_count = 0
    
    now = datetime.utcnow()
    for c in active:
        sla = SLA_HOURS.get(c.urgency, 72)
        if (now - c.created_at) > timedelta(hours=sla):
            c.status = "ESCALATED"
            escalated_count += 1
            
    if escalated_count > 0:
        db.commit()
        
    return {"escalated_count": escalated_count}
