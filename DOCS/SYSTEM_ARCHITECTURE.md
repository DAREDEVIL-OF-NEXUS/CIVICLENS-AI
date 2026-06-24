# CivicLens AI: System Architecture & Multi-Agent Flow

## 1. High-Level System Architecture
```mermaid
graph TD
    %% Clients
    Cit[Citizen Web App]
    Off[Department/Officer Dashboard]
    CM[CM Command Center]

    %% Gateway & Auth
    AG[FastAPI API Gateway]
    
    Cit --> AG
    Off --> AG
    CM --> AG

    %% Core Services
    subgraph Core Backend [FastAPI Microservices]
        CS[Complaint Service]
        NS[Notification & OTP Service]
        DS[Dashboard & Hotspot Service]
        Loc[Location Intelligence]
        SLA[Escalation & SLA Service]
        Fraud[Fraud Detection Service]
    end
    
    AG --> CS
    AG --> DS
    AG --> Fraud
    AG --> SLA

    %% AI Pipeline / Agent Workflow
    subgraph AI Pipeline [3-Tier AI Engine]
        LLM[Tier 1: LLM Extractor]
        ML[Tier 2: ML Classifier]
        RB[Tier 3: Rule-based Regex]
        DA[Vector Duplicate Service]
    end

    CS --> LLM
    LLM -.If Fails.-> ML
    ML -.If Fails.-> RB
    CS --> DA

    %% Databases
    subgraph Data Layer
        PG[(PostgreSQL - Supabase)]
    end

    CS --> PG
    DA --> PG
    DS --> PG
```

## 2. Complaint Processing & Anti-Corruption Lifecycle
```mermaid
flowchart TD
    A[Citizen Submits Complaint + Photo] --> B[Location Intelligence Extracts Ward/Zone]
    B --> E[3-Tier AI Engine Extracts Dept & Urgency]
    E --> F[Duplicate Service Vector Search]
    
    F -->|Duplicate Found| G[Cluster with Existing, Increase Priority]
    F -->|New Issue| H[Store in PostgreSQL]
    
    H --> I[SLA Service Starts Timer]
    I --> J[Officer Works on Issue]
    J --> K[Officer Marks 'Resolved']
    
    K --> L[Notification Service Sends OTP to Citizen]
    L --> M{Citizen Verifies?}
    
    M -->|Yes - Solved| N[Close Complaint Permanently]
    M -->|No - Fake Closure| O[Flag Officer Fraud Risk + Escalate]
    M -->|Timeout 48hrs| N
```

## 3. Jurisdiction & Routing Intelligence
Complaints are not just routed by category, but further subdivided by geographic location:
- **Electricity**: Subdivided into BSES or NDPL/TPDDL depending on the extracted zone.
- **Municipal**: Subdivided into NDMC, SDMC, EDMC based on coordinates.
