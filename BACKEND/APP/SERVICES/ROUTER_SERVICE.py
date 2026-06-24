"""
ROUTER SERVICE

This service maps a complaint to the most likely department.
It uses the predicted category first, and falls back to simple
text-based checks where needed. It also contains the logic to
refine a broad department (like 'electricity_board') into a
specific jurisdictional authority (like 'TPDDL' or 'BSES') based
on geographic location.
"""
from typing import Dict

def predict_department(category: str, text: str) -> str:
    """
    Predict the responsible department for a complaint.
    (Fallback if AI fails to assign one).
    """
    category = (category or "").upper()
    text = (text or "").lower()

    category_to_department = {
        "WATER": "water_department",
        "ELECTRICITY": "electricity_board",
        "SANITATION": "municipal_corporation",
        "SAFETY": "police_department",
        "INFRASTRUCTURE": "road_authority",
        "OTHER": "general_administration"
    }

    if category in category_to_department:
        return category_to_department[category]

    if "water" in text or "leak" in text or "sewer" in text:
        return "water_department"
    if "light" in text or "power" in text or "electricity" in text:
        return "electricity_board"
    if "road" in text or "pothole" in text:
        return "road_authority"
    if "garbage" in text or "trash" in text or "clean" in text:
        return "municipal_corporation"

    return "general_administration"

def refine_department_jurisdiction(base_department: str, location_intel: Dict) -> str:
    """
    Refines a broad department into a specific jurisdictional authority based on location.
    e.g. electricity_board in North Delhi -> TPDDL
    """
    base = (base_department or "").lower()
    
    # We will use region, district, or fallback to searching the raw address
    address_str = (location_intel.get("formatted_address") or "").upper()
    region_str = (location_intel.get("region") or "").upper()
    
    # Helpers to determine area
    is_north = "NORTH" in region_str or "NORTH" in address_str or "ROHINI" in address_str or "PITAMPURA" in address_str or "BAWANA" in address_str or "CIVIL LINES" in address_str
    is_south = "SOUTH" in region_str or "SOUTH" in address_str or "SAKET" in address_str or "HAUZ KHAS" in address_str or "VASANT" in address_str
    is_east = "EAST" in region_str or "EAST" in address_str or "SHAHDARA" in address_str or "MAYUR VIHAR" in address_str or "LAXMI NAGAR" in address_str
    is_west = "WEST" in region_str or "WEST" in address_str or "DWARKA" in address_str or "JANAKPURI" in address_str or "PUNJABI BAGH" in address_str
    is_central = "CENTRAL" in region_str or "CENTRAL" in address_str or "NEW DELHI" in address_str or "CONNAUGHT PLACE" in address_str
    
    # 1. Electricity Jurisdiction
    if base in ["electricity_board", "electrical_maintenance", "power"]:
        if is_north:
            return "TPDDL" # Tata Power Delhi Distribution Limited (North/North-West)
        elif is_south or is_west:
            return "BRPL" # BSES Rajdhani Power Limited (South/West)
        elif is_east or is_central:
            return "BYPL" # BSES Yamuna Power Limited (East/Central)
        elif "LUTYENS" in address_str or "NEW DELHI" in address_str:
            return "NDMC_POWER" # New Delhi Municipal Council
        elif "CANTT" in address_str:
            return "MES_POWER" # Military Engineer Services
        else:
            return "BSES" # Default fallback
            
    # 2. Municipal Corporation Jurisdiction (MCD)
    if base in ["municipal_corporation", "sanitation", "sanitation_team", "garbage"]:
        if is_south:
            return "SDMC" # South Delhi Municipal Corporation
        elif is_east:
            return "EDMC" # East Delhi Municipal Corporation
        elif is_north:
            return "NORTH_DMC" # North Delhi Municipal Corporation
        elif is_central or "NEW DELHI" in address_str:
            return "NDMC" # New Delhi Municipal Council
        else:
            return "MCD_UNIFIED"
            
    # 3. Public Works Department (PWD) / Roads
    if base in ["road_authority", "infrastructure_maintenance", "pwd"]:
        if is_north: return "PWD_NORTH"
        if is_south: return "PWD_SOUTH"
        if is_east: return "PWD_EAST"
        if is_west: return "PWD_WEST"
        if is_central: return "PWD_CENTRAL"
        return "PWD_DELHI"
        
    # 4. Delhi Jal Board (DJB) / Water & Sewage
    if base in ["water_department", "sewage_department", "water_services", "djb"]:
        if is_north: return "DJB_NORTH"
        if is_south: return "DJB_SOUTH"
        if is_east: return "DJB_EAST"
        if is_west: return "DJB_WEST"
        if is_central: return "DJB_CENTRAL"
        return "DJB_HQ"
        
    # 5. Traffic / Police
    if base in ["traffic_police", "police_department", "campus_safety"]:
        return "DELHI_TRAFFIC_POLICE"

    return base_department.upper()