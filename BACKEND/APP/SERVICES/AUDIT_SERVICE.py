"""
AUDIT LOG SERVICE
Immutable ledger of all actions taken on a complaint.
"""
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

def log_action(complaint_id: int, action: str, performed_by: str, details: str = ""):
    """
    Logs every action. In production, this writes to an immutable Audit table or Logstash.
    """
    timestamp = datetime.utcnow().isoformat()
    log_entry = f"[{timestamp}] COMPLAINT {complaint_id} | {action} by {performed_by} | {details}"
    logger.info(log_entry)
    # Placeholder for DB insert
    return True
