# CivicLens AI Implementation TODO

## Phase 1: Database Scale & Vision Verification
- [ ] Migrate `vector_embedding` column in `COMPLAINT.py` to use `pgvector` extension for native vector search.
- [ ] Update `DUPLICATE_SERVICE.py` to use `<=>` operator instead of Python cosine similarity.
- [ ] Implement `VISION_SERVICE.py` using GPT-4o-mini vision to validate `photo_url` matches text description.

## Phase 2: Jurisdiction Routing & Department Filtering
- [ ] Implement logic to split MCD into NDMC, SDMC, EDMC based on geographic bounds.
- [ ] Implement logic to split electricity board into BSES and NDPL/TPDDL based on location.
- [ ] Add global filtering in dashboards allowing CM to isolate specific departments (e.g., Water only).

## Phase 3: The Anti-Corruption Loop (Citizen Verification)
- [ ] Create `/verify-closure/{id}` backend route.
- [ ] Build Citizen UI screen to accept OTP and toggle `is_fixed`.
- [ ] Link `contested_closure=True` to Officer Fraud metrics.

## Phase 4: Splitting the Dashboards (Role-Based)
- [ ] Split `ADMIN_DASHBOARD.jsx` into `CM_DASHBOARD.jsx` and `DEPT_DASHBOARD.jsx`.
- [ ] Dept Dashboard: Kanban-style task board filtered by department queue.
- [ ] CM Dashboard: High-level analytics, critical alerts, and live maps.

## Phase 5: CM "Visit Mode" (Geolocation)
- [ ] Implement `navigator.geolocation` on CM Dashboard.
- [ ] Add backend route `GET /api/complaints/nearby?lat=X&lng=Y&radius=2`.
- [ ] UI to show pending complaints in a 2km radius around the CM in real-time.

## Phase 6: Platinum UI/UX Overhaul
- [ ] Implement Global Design Language (Palantir/Tesla vibe: #0B1220, Electric Blue, Glassmorphism).
- [ ] Build Animated Hero Landing Page.
- [ ] Add Smart Location Search (Google Places Autocomplete) to Submission.
- [ ] Implement Framer Motion for page transitions and card glows.
