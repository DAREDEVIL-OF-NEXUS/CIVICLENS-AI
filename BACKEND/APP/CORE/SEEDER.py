import logging
import random
from sqlalchemy.orm import Session
from APP.MODELS.COMPLAINT import Complaint

logger = logging.getLogger(__name__)

MOCK_COMPLAINTS = [
    {"title": "Massive pothole causing accidents", "category": "INFRASTRUCTURE", "urgency": "HIGH", "lat": 28.696, "lng": 77.153, "loc": "Netaji Subhash Place", "region": "NORTH_DELHI"},
    {"title": "Transformer sparking dangerously", "category": "ELECTRICITY", "urgency": "CRITICAL", "lat": 28.630, "lng": 77.216, "loc": "Connaught Place", "region": "NDMC"},
    {"title": "Water logging in market", "category": "WATER_SUPPLY", "urgency": "MEDIUM", "lat": 28.524, "lng": 77.206, "loc": "Saket", "region": "SOUTH_DELHI"},
    {"title": "Garbage dump overflowing", "category": "SANITATION", "urgency": "MEDIUM", "lat": 28.704, "lng": 77.102, "loc": "Rohini", "region": "NORTH_WEST_DELHI"},
    {"title": "Street lights not working for a week", "category": "ELECTRICITY", "urgency": "LOW", "lat": 28.582, "lng": 77.050, "loc": "Dwarka", "region": "SOUTH_WEST_DELHI"},
    {"title": "Sewer line blocked and smelling", "category": "SANITATION", "urgency": "HIGH", "lat": 28.567, "lng": 77.243, "loc": "Lajpat Nagar", "region": "SOUTH_DELHI"},
    {"title": "Open manhole on main road", "category": "INFRASTRUCTURE", "urgency": "CRITICAL", "lat": 28.651, "lng": 77.190, "loc": "Karol Bagh", "region": "CENTRAL_DELHI"},
    {"title": "Drinking water supply contaminated", "category": "WATER_SUPPLY", "urgency": "CRITICAL", "lat": 28.608, "lng": 77.297, "loc": "Mayur Vihar", "region": "EAST_DELHI"},
    {"title": "Illegal tree cutting in park", "category": "ENVIRONMENT", "urgency": "HIGH", "lat": 28.529, "lng": 77.156, "loc": "Vasant Kunj", "region": "SOUTH_DELHI"},
    {"title": "Traffic signal broken", "category": "INFRASTRUCTURE", "urgency": "MEDIUM", "lat": 28.650, "lng": 77.230, "loc": "Chandni Chowk", "region": "CENTRAL_DELHI"},
    {"title": "Power cut since morning", "category": "ELECTRICITY", "urgency": "HIGH", "lat": 28.696, "lng": 77.155, "loc": "Netaji Subhash Place", "region": "NORTH_DELHI"},
    {"title": "Stray dog menace", "category": "ANIMAL_CONTROL", "urgency": "MEDIUM", "lat": 28.524, "lng": 77.210, "loc": "Saket", "region": "SOUTH_DELHI"},
    {"title": "Park bench broken", "category": "INFRASTRUCTURE", "urgency": "LOW", "lat": 28.630, "lng": 77.215, "loc": "Connaught Place", "region": "NDMC"},
    {"title": "Water pipe burst", "category": "WATER_SUPPLY", "urgency": "CRITICAL", "lat": 28.704, "lng": 77.105, "loc": "Rohini", "region": "NORTH_WEST_DELHI"},
    {"title": "Garbage burning causing smoke", "category": "ENVIRONMENT", "urgency": "HIGH", "lat": 28.582, "lng": 77.052, "loc": "Dwarka", "region": "SOUTH_WEST_DELHI"},
    {"title": "Potholes on service lane", "category": "INFRASTRUCTURE", "urgency": "MEDIUM", "lat": 28.567, "lng": 77.240, "loc": "Lajpat Nagar", "region": "SOUTH_DELHI"},
    {"title": "High voltage fluctuation", "category": "ELECTRICITY", "urgency": "HIGH", "lat": 28.651, "lng": 77.195, "loc": "Karol Bagh", "region": "CENTRAL_DELHI"},
    {"title": "No water for 2 days", "category": "WATER_SUPPLY", "urgency": "CRITICAL", "lat": 28.608, "lng": 77.290, "loc": "Mayur Vihar", "region": "EAST_DELHI"},
    {"title": "Dead animal on road", "category": "SANITATION", "urgency": "HIGH", "lat": 28.529, "lng": 77.150, "loc": "Vasant Kunj", "region": "SOUTH_DELHI"},
    {"title": "Encroachment on footpath", "category": "INFRASTRUCTURE", "urgency": "LOW", "lat": 28.650, "lng": 77.235, "loc": "Chandni Chowk", "region": "CENTRAL_DELHI"},
]

def seed_database(db: Session):
    try:
        if db.query(Complaint).count() == 0:
            logger.info("Database is empty. Seeding with 20 realistic complaints for hotspots...")
            for i, c in enumerate(MOCK_COMPLAINTS):
                db_complaint = Complaint(
                    id=f"CMP-SEED-{i+1000}",
                    title=c["title"],
                    description=f"Automated seed complaint for {c['loc']}",
                    category=c["category"],
                    urgency=c["urgency"],
                    status="NEW" if i % 3 != 0 else "IN_PROGRESS",
                    lat=c["lat"],
                    lng=c["lng"],
                    location_name=c["loc"],
                    region=c["region"],
                    locality=c["loc"],
                    department="TPDDL" if c["category"] == "ELECTRICITY" and "NORTH" in c["region"] else ("BSES" if c["category"] == "ELECTRICITY" else "MCD"),
                    submitted_by="Admin_Seeder",
                    priority_score=random.uniform(30.0, 95.0),
                    ai_summary="AI generated summary for this seed."
                )
                db.add(db_complaint)
            db.commit()
            logger.info("Successfully seeded 20 complaints.")
        else:
            logger.info("Database already contains complaints. Skipping seed.")
    except Exception as e:
        logger.error(f"Error seeding database: {e}")
