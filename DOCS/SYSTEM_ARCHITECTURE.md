# CivicLens AI: System Architecture & Multi-Agent Flow

## 1. High-Level System Architecture
```mermaid
graph TD
    %% Clients
    Cit[Citizen Web App]
    Off[Official Dashboard]
    CM[CM Command Center]

    %% Gateway & Auth
    AG[API Gateway & Load Balancer]
    Auth[Auth & Role Service]
    
    Cit --> AG
    Off --> AG
    CM --> AG
    AG --> Auth

    %% Core Services
    subgraph Core Backend [FastAPI Microservices]
        CS[Complaint Service]
        NS[Notification & OTP Service]
        DS[Dashboard & Heatmap Service]
    end
    
    Auth --> CS
    Auth --> DS

    %% AI Pipeline / Agent Workflow
    subgraph AI Pipeline [AI Agent Swarm]
        VA[Vision Agent - Photo Verification]
        TA[Triage Agent - Routing & Urgency]
        SA[Summary Agent - Briefs]
        DA[Duplicate/Embedding Agent]
    end

    CS --> VA
    VA --> TA
    TA --> SA
    CS --> DA

    %% Fallback System
    subgraph Fallback Engine
        ML[Trained ML Classifier]
        RB[Rule-Based Regex Engine]
    end
    
    TA -.If LLM Fails.-> ML
    ML -.If ML Fails.-> RB

    %% Databases
    subgraph Data Layer
        PG[(PostgreSQL + PostGIS)]
        VD[(Vector DB / pgvector)]
        RD[(Redis Cache)]
        S3[S3 / Cloud Storage]
    end

    CS --> PG
    CS --> S3
    DA --> VD
    DS --> RD
    PG -.Sync.-> RD
```

## 2. Complaint Processing & Anti-Corruption Lifecycle
```mermaid
flowchart TD
    A[Citizen Submits Complaint + Photo] --> B{Photo Valid?}
    B -- Vision AI Checks -->|Fake/Irrelevant| C[Reject / Flag User]
    B -->|Valid| D[Store in DB & S3]
    
    D --> E[Triage Agent: Extracts Dept, Urgency, Region]
    E --> F[Duplicate Agent: Vector Search]
    
    F -->|Duplicate Found| G[Cluster with Existing]
    F -->|New Issue| H[Add to Dept Priority Queue]
    
    H --> I[Official Works on Issue]
    I --> J[Official Marks 'Resolved']
    
    J --> K[Notification Service Sends OTP/Link to Citizen]
    K --> L{Citizen Verifies?}
    
    L -->|Yes - Solved| M[Close Complaint Permanently]
    L -->|No - Fake Closure| N[Reopen + Flag Official + Escalate to CM]
    L -->|Timeout 48hrs| M
```
