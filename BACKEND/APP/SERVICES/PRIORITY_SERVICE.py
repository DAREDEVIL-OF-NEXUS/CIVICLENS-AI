def compute_priority_score(urgency: str, category: str, similarity_score: float) -> int:
    """
    Computes a simple priority score (0-100) based on urgency, category and duplication.
    """
    score = 50

    urgency = urgency.upper()
    if urgency == "CRITICAL":
        score += 40
    elif urgency == "HIGH":
        score += 25
    elif urgency == "MEDIUM":
        score += 10
    
    if similarity_score > 0.8:
        score += 10 # More duplicates might mean it's affecting many people

    return min(100, score)
