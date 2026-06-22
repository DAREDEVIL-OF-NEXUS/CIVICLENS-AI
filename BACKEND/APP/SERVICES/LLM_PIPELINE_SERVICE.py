"""
LLM PIPELINE SERVICE
Handles hierarchical routing & urgency analysis: LLM -> ML Model -> Rule-Based
"""
import os
import json
import logging
import google.generativeai as genai
from typing import Dict, Any

from APP.CORE.CONFIG import settings
from APP.SERVICES.CLASSIFIER_SERVICE import predict_category
from APP.SERVICES.ROUTING_SERVICE import route_department
from APP.SERVICES.URGENCY_SERVICE import predict_urgency as rule_based_urgency

logger = logging.getLogger(__name__)

# Configure Gemini if API Key is available
GEMINI_KEY = os.getenv("GEMINI_API_KEY")
if GEMINI_KEY and GEMINI_KEY != "placeholder_key":
    genai.configure(api_key=GEMINI_KEY)

GROQ_KEY = os.getenv("GROQ_API_KEY")
OPENAI_KEY = os.getenv("OPENAI_API_KEY")

# Lazy load OpenAI client if needed
def get_openai_client(base_url=None, api_key=None):
    try:
        from openai import OpenAI
        return OpenAI(base_url=base_url, api_key=api_key)
    except ImportError:
        return None

def analyze_complaint_pipeline(text: str) -> Dict[str, Any]:
    """
    Executes the 3-Tier AI Pipeline for complaint parsing.
    1. LLM (Gemini) JSON Extraction
    2. ML Model Fallback (Scikit-Learn)
    3. Rule-Based Regex Fallback
    """
    
    # TIER 1: LLM Extraction (The primary smart router)
    if GEMINI_KEY and GEMINI_KEY != "placeholder_key":
        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            prompt = f"""
            Analyze the following citizen complaint and return ONLY a valid JSON object. Do not wrap in markdown.
            Extract the following:
            - "category": (e.g., WATER_SUPPLY, ELECTRICITY, ROADS, SANITATION, PUBLIC_SAFETY, OTHER)
            - "urgency": (HIGH, MEDIUM, LOW)
            - "department": (The specific government department responsible, e.g., DJB, BSES, PWD, MCD)
            - "region": (Extract the region if mentioned, e.g., SOUTH_DELHI, NORTH_WEST_DELHI, UNKNOWN)
            - "summary": (A 1-sentence concise summary of the issue)
            
            Complaint text: "{text}"
            """
            response = model.generate_content(prompt)
            # Clean possible markdown formatting
            raw_json = response.text.replace('```json', '').replace('```', '').strip()
            llm_result = json.loads(raw_json)
            
            category = llm_result.get("category", "OTHER").upper()
            urgency = llm_result.get("urgency", "LOW").upper()
            department = llm_result.get("department", route_department(category)).upper()
            region = llm_result.get("region", "UNKNOWN").upper()
            summary = llm_result.get("summary", text[:100])
            
            return {
                "category": category,
                "urgency": urgency,
                "department": department,
                "region_extracted": region,
                "ai_summary": summary,
                "confidence": 0.95,
                "engine": "LLM_GEMINI"
            }
        except Exception as e:
            logger.warning(f"Gemini API Failed: {e}. Falling back to Groq.")

    # TIER 1.5: Groq Extraction (Fast Llama 3 Fallback)
    if GROQ_KEY and GROQ_KEY != "placeholder_key":
        try:
            client = get_openai_client(base_url="https://api.groq.com/openai/v1", api_key=GROQ_KEY)
            if client:
                response = client.chat.completions.create(
                    model="llama3-8b-8192",
                    messages=[{"role": "user", "content": prompt}]
                )
                raw_json = response.choices[0].message.content.replace('```json', '').replace('```', '').strip()
                llm_result = json.loads(raw_json)
                
                category = llm_result.get("category", "OTHER").upper()
                return {
                    "category": category,
                    "urgency": llm_result.get("urgency", "LOW").upper(),
                    "department": llm_result.get("department", route_department(category)).upper(),
                    "region_extracted": llm_result.get("region", "UNKNOWN").upper(),
                    "ai_summary": llm_result.get("summary", text[:100]),
                    "confidence": 0.90,
                    "engine": "LLM_GROQ"
                }
        except Exception as e:
            logger.warning(f"Groq API Failed: {e}. Falling back to OpenAI.")

    # TIER 1.7: OpenAI Extraction (GPT-4o-mini Fallback)
    if OPENAI_KEY and OPENAI_KEY != "placeholder_key":
        try:
            client = get_openai_client(api_key=OPENAI_KEY)
            if client:
                response = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}]
                )
                raw_json = response.choices[0].message.content.replace('```json', '').replace('```', '').strip()
                llm_result = json.loads(raw_json)
                
                category = llm_result.get("category", "OTHER").upper()
                return {
                    "category": category,
                    "urgency": llm_result.get("urgency", "LOW").upper(),
                    "department": llm_result.get("department", route_department(category)).upper(),
                    "region_extracted": llm_result.get("region", "UNKNOWN").upper(),
                    "ai_summary": llm_result.get("summary", text[:100]),
                    "confidence": 0.95,
                    "engine": "LLM_OPENAI"
                }
        except Exception as e:
            logger.warning(f"OpenAI API Failed: {e}. Falling back to ML Model.")

    # TIER 2 & 3: ML Model Fallback + Rule-Based Urgency
    try:
        category = predict_category(text) # Uses ML if loaded, else its own rule fallback
        urgency = rule_based_urgency(text)
        department = route_department(category)
        
        return {
            "category": category,
            "urgency": urgency,
            "department": department,
            "ai_summary": f"Issue regarding {category.lower()} reported.",
            "confidence": 0.70,
            "engine": "ML_RULES"
        }
    except Exception as e:
        logger.error(f"Fallback engine failed: {e}")
        return {
            "category": "OTHER",
            "urgency": "LOW",
            "department": "GENERAL_ADMIN",
            "ai_summary": text[:100],
            "confidence": 0.10,
            "engine": "FAILSAFE"
        }
