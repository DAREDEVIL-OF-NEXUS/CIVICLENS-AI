"""
API INTEGRATION LAYER
Adapters to sync data with MCD311, TPDDL, and DJB legacy systems.
"""
import logging

logger = logging.getLogger(__name__)

def dispatch_to_external_api(complaint_id: int, department: str, payload: dict):
    """
    Routes complaint to appropriate legacy government API.
    """
    adapters = {
        "MCD": "https://api.mcd311.gov.in/v1/grievance",
        "DJB": "https://api.delhijalboard.nic.in/v1/sync",
        "TPDDL": "https://api.tatapower-ddl.com/v1/outage"
    }
    
    url = adapters.get(department)
    if not url:
        logger.info(f"No external API adapter for {department}. Keeping internal.")
        return False
        
    logger.info(f"Dispatching complaint {complaint_id} to {url}")
    # Placeholder: requests.post(url, json=payload)
    return True
