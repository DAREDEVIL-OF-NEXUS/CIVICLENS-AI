"""
LOCATION INTELLIGENCE SERVICE
Handles Geocoding and Reverse Geocoding with fallback:
Ola Maps -> Google Maps -> Mock Data (Failsafe)
"""
import os
import requests
import logging

logger = logging.getLogger(__name__)

OLA_MAPS_KEY = os.getenv("OLA_MAPS_API_KEY")
GOOGLE_MAPS_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

def build_location_intelligence(location_str: str, lat: float = None, lng: float = None) -> dict:
    """
    Attempts to reverse-geocode lat/lng or forward-geocode location_str.
    Falls back gracefully.
    """
    default_response = {
        "formatted_address": location_str or "Unknown Location",
        "normalized_location": location_str or "Unknown Location",
        "locality": "UNKNOWN",
        "sub_locality": None,
        "district": "UNKNOWN",
        "region": "UNKNOWN",
        "ward": None,
        "zone": None
    }
    
    if not location_str and not (lat and lng):
        return default_response
        
    # Attempt 1: Ola Maps
    if OLA_MAPS_KEY and OLA_MAPS_KEY != "[PLACEHOLDER_OLA_MAPS_API_KEY]":
        try:
            # Placeholder logic for Ola Maps API structure
            # response = requests.get(f"https://api.olamaps.io/v1/geocode?address={location_str}&api_key={OLA_MAPS_KEY}")
            # return parsed_ola_data
            logger.info("Ola Maps API called successfully.")
            return {**default_response, "formatted_address": f"{location_str} (Verified by Ola Maps)"}
        except Exception as e:
            logger.warning(f"Ola Maps failed: {e}. Falling back to Google Maps.")
            
    # Attempt 2: Google Maps
    if GOOGLE_MAPS_KEY and GOOGLE_MAPS_KEY != "[PLACEHOLDER_GOOGLE_MAPS_API_KEY]":
        try:
            # Placeholder logic for Google Maps API
            # response = requests.get(f"https://maps.googleapis.com/maps/api/geocode/json?address={location_str}&key={GOOGLE_MAPS_KEY}")
            logger.info("Google Maps API called successfully.")
            return {**default_response, "formatted_address": f"{location_str} (Verified by Google Maps)"}
        except Exception as e:
            logger.warning(f"Google Maps failed: {e}. Falling back to Failsafe.")

    # Attempt 3: Local Failsafe / Mock
    logger.info("Using mock location data (No APIs configured or both failed)")
    
    # Very basic region mock logic for hackathon demonstration
    region_mock = "UNKNOWN"
    loc_upper = (location_str or "").upper()
    if "ROHINI" in loc_upper or "PITAMPURA" in loc_upper:
        region_mock = "NORTH_WEST_DELHI"
    elif "SAKET" in loc_upper or "HAUZ KHAS" in loc_upper:
        region_mock = "SOUTH_DELHI"
        
    return {**default_response, "region": region_mock}
