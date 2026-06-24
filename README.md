<div align="center">
  <img src="https://github.com/DAREDEVIL-OF-NEXUS/CIVICLENS-AI/assets/placeholder-logo.png" alt="CivicLens AI Logo" width="120" />
  <h1>🏙️ CivicLens AI</h1>
  <h3>Next-Gen Grievance Intelligence Platform for Digital Governance</h3>

  <p>
    Powered by a <strong>3-Tier AI Fallback Pipeline</strong>, <strong>Vector Deduplication</strong>, and <strong>Real-Time Geographic Jurisdiction Routing</strong>.
  </p>

  <p>
    <a href="#core-features">Features</a> •
    <a href="#system-architecture">Architecture</a> •
    <a href="#how-ai-jurisdiction-routing-works">AI Routing</a> •
    <a href="#installation--deployment">Deploy</a>
  </p>
</div>

---

## ✨ Core Features & Platinum Highlights

### 🚁 Live CM Visit Mode (Geolocation Proximity)
Chief Ministers and top officials have access to a "Command Center" dashboard with a **Visit Mode** button. Clicking this accesses the device GPS and uses the **Haversine formula** to pull all unresolved civic issues strictly within a **2.0 km radius** of where they are physically standing.

### 🛡️ Anti-Corruption / OTP Verification Loop
Officers can no longer falsely mark complaints as "Resolved" to pad their metrics. Our Swiggy-style complaint tracker forces a physical **Citizen Verification OTP**. If a citizen clicks **"Fake Closure"**, the issue is instantly reopened, priority jumps by +50.0, and the officer is flagged for vigilance.

### 🗺️ AI Geographic Jurisdiction Routing
We don't just route by category; we route by precise municipal boundaries.
*   **Electricity Issue in North Delhi?** Automatically routed to **TPDDL**.
*   **Electricity Issue in South Delhi?** Automatically routed to **BSES**.
*   **Sanitation Issue?** Intelligently split between **NDMC, SDMC, EDMC** based on bounding boxes.

### 🔍 Vector Duplicate Detection (pgvector)
When a massive pothole opens up, 50 citizens might complain. Instead of assigning 50 officers, CivicLens uses `text-embedding-3-small` to mathematically cluster them into **1 Parent Ticket**, saving thousands of man-hours.

---

## 🏗️ System Architecture

CivicLens AI uses a robust microservice architecture built on **FastAPI (Python)** and **React 19 (Vite)**.

```mermaid
graph TD
    %% Clients
    Cit[Citizen PWA]
    Off[Officer Dashboard]
    CM[CM Command Center]

    %% Gateway & Core
    API[FastAPI Backend Gateway]
    
    Cit -->|Submit & OTP| API
    Off -->|Resolve Issues| API
    CM -->|Live Heatmaps| API

    %% AI Pipeline Workflow
    subgraph 3-Tier AI Pipeline
        LLM[Tier 1: Gemini/Groq LLM]
        ML[Tier 2: Scikit-Learn ML]
        RB[Tier 3: Rule-based Regex]
    end

    API --> LLM
    LLM -.Fallback.-> ML
    ML -.Fallback.-> RB

    %% Microservices
    subgraph Core Intelligence
        DA[Vector Embedding Duplicate Search]
        Loc[Location/Geocoding Routing]
        SLA[SLA Escalation Engine]
    end

    API --> DA
    API --> Loc
    API --> SLA

    %% Database Layer
    PG[(PostgreSQL + pgvector via Supabase)]
    DA --> PG
    API --> PG
```

---

## ⚡ How AI Jurisdiction Routing Works (Example)

CivicLens uses a combination of LLM Extraction + Reverse Geocoding to find exactly *who* is responsible for an issue, eliminating inter-departmental bouncing.

**Citizen Input:** *"Sparks flying from the transformer near Netaji Subhash Place metro."*

1.  **Step 1: LLM Extractor (Gemini 1.5):** 
    *   *Category:* Electricity 
    *   *Urgency:* Critical (Fire Hazard)
2.  **Step 2: Location Intelligence (Google Maps/Ola Maps):**
    *   *Geocodes:* Netaji Subhash Place ➔ Coordinates `(28.696, 77.153)`
    *   *Region Extracted:* **North Delhi**
3.  **Step 3: Routing Engine:**
    *   Rule: `If Category == Electricity AND Region == North Delhi`
    *   Result: ➔ Route to **TPDDL Control Room** (Not BSES).

---

## 🚀 Installation & Deployment

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### 1. Local Development
```powershell
# Start Backend
cd BACKEND
.\.venv\Scripts\python.exe -m uvicorn APP.MAIN:app --host 127.0.0.1 --port 8000

# Start Frontend
cd FRONTEND
npm install
npm run dev
```

### 2. Environment Variables (.env)
You must set up the following in your `.env` to power the AI:
```ini
DATABASE_URL="postgresql://postgres:pass@db.supabase.co:5432/postgres"
GROQ_API_KEY="..."
GEMINI_API_KEY="..."
OPENAI_API_KEY="..."
GOOGLE_MAPS_API_KEY="..."
```

---

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite, Framer Motion, Recharts, Lucide Icons
- **Backend**: FastAPI, SQLAlchemy, Uvicorn, Python 3
- **Database**: PostgreSQL (via Supabase)
- **AI/LLM**: Gemini 1.5 Flash, Groq (Llama 3), OpenAI Embeddings, Scikit-Learn
- **Mapping**: React-Leaflet, Haversine Geospatial Logic