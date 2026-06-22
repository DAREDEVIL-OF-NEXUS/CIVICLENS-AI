"""
DUPLICATE DETECTION SERVICE
Detects duplicate complaints using Vector Embeddings.
"""
from typing import Dict, Any
from sqlalchemy.orm import Session
from APP.MODELS.COMPLAINT import Complaint
from APP.SERVICES.VECTOR_SERVICE import generate_embedding, cosine_similarity

# Similarity threshold (0.0 to 1.0)
SIMILARITY_THRESHOLD = 0.85

def find_possible_duplicate(text: str) -> Dict[str, Any]:
    return {"duplicate_of": None, "similarity_score": 0.0}

def find_duplicate_complaint(db: Session, text: str, lat: float, lng: float, radius_km: float = 1.0) -> Dict[str, Any]:
    """
    Finds the most similar existing complaint within a geographic radius.
    """
    if not text:
        return {"duplicate_of": None, "similarity_score": 0.0}

    # 1. Generate embedding for new complaint
    new_vector = generate_embedding(text)
    if not new_vector or new_vector == [0.0] * 384:
        return {"duplicate_of": None, "similarity_score": 0.0}

    # 2. Get recent unresolved complaints (MVP: fetch all active, in Prod: use PostGIS ST_DWithin + pgvector)
    # For MVP SQLite fallback, we fetch recent and do math in Python.
    recent_complaints = db.query(Complaint).filter(Complaint.status != "RESOLVED").order_by(Complaint.created_at.desc()).limit(100).all()

    best_match_id = None
    best_score = 0.0
    
    for c in recent_complaints:
        if not c.vector_embedding:
            continue
            
        # Geographic filter (Approximate distance)
        # 1 degree lat/lng is roughly 111km. 1km is ~0.009 degrees.
        if c.lat and c.lng and lat and lng:
            dist_sq = (c.lat - lat)**2 + (c.lng - lng)**2
            if dist_sq > (0.009 * radius_km)**2:
                continue

        # Cosine Similarity
        score = cosine_similarity(new_vector, c.vector_embedding)
        if score > best_score:
            best_score = score
            best_match_id = c.id
            
    if best_score >= SIMILARITY_THRESHOLD:
        return {"duplicate_of": best_match_id, "similarity_score": round(best_score, 2)}
        
    return {"duplicate_of": None, "similarity_score": 0.0}