"""
VECTOR EMBEDDING SERVICE
Handles generating embeddings for complaints to power duplicate detection via cosine similarity.
Falls back safely if sentence-transformers is not installed.
"""
import logging
import json
import math
from typing import List, Optional

logger = logging.getLogger(__name__)

# Try to load local embedding model
try:
    from sentence_transformers import SentenceTransformer
    # all-MiniLM-L6-v2 is extremely fast and lightweight (~80MB)
    MODEL = SentenceTransformer('all-MiniLM-L6-v2')
    HAS_EMBEDDINGS = True
    logger.info("SentenceTransformer loaded successfully.")
except ImportError:
    MODEL = None
    HAS_EMBEDDINGS = False
    logger.warning("sentence-transformers not installed. Vector embeddings will run in mock fallback mode.")

def generate_embedding(text: str) -> List[float]:
    """
    Generate a 384-dimensional vector embedding for the given text.
    """
    if not text:
        return []
    
    if HAS_EMBEDDINGS and MODEL:
        try:
            vector = MODEL.encode(text)
            return vector.tolist()
        except Exception as e:
            logger.error(f"Failed to generate embedding: {e}")
            return []
    
    # Mock fallback if no model installed
    return [0.0] * 384

def cosine_similarity(vec1: List[float], vec2: List[float]) -> float:
    """
    Compute cosine similarity between two vectors.
    """
    if not vec1 or not vec2 or len(vec1) != len(vec2):
        return 0.0
    
    dot_product = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))
    
    if norm1 == 0 or norm2 == 0:
        return 0.0
        
    return dot_product / (norm1 * norm2)
