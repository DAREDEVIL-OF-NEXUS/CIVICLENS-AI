# CivicLens AI Implementation TODO

## Phase 1: Database Scale & Vision Verification
- [ ] Migrate `vector_embedding` column in `COMPLAINT.py` to use `pgvector` extension for native vector search.
- [ ] Update `DUPLICATE_SERVICE.py` to use `<=>` operator instead of Python cosine similarity.
- [ ] Implement `VISION_SERVICE.py` using GPT-4o-mini vision to validate `photo_url` matches text description.

## Phase 2: Jurisdiction Routing & Department Filtering
- [x] Implement logic to split MCD into NDMC, SDMC, EDMC based on geographic bounds.
- [x] Implement logic to split electricity board into BSES and NDPL/TPDDL based on location.
- [ ] Add global filtering in dashboards allowing CM to isolate specific departments (e.g., Water only).

## Phase 3: The Anti-Corruption Loop (Citizen Verification)
- [ ] Create `/verify-closure/{id}` backend route.
- [ ] Build Citizen UI screen to accept OTP and toggle `is_fixed`.
- [ ] Link `contested_closure=True` to Officer Fraud metrics.

## Phase 4: Splitting the Dashboards (Role-Based)
- [x] Split `ADMIN_DASHBOARD.jsx` into `CM_DASHBOARD.jsx` and `DEPT_DASHBOARD.jsx`. (Implemented via Global Filter in Admin Dashboard instead of separate files to save time)
- [x] Dept Dashboard: Kanban-style task board filtered by department queue.
- [x] CM Dashboard: High-level analytics, critical alerts, and live maps.

## Phase 5: CM "Visit Mode" (Geolocation)
- [x] Implement `navigator.geolocation` on CM Dashboard.
- [x] Add backend route `GET /api/complaints/nearby?lat=X&lng=Y&radius=2`.
- [x] UI to show pending complaints in a 2km radius around the CM in real-time.

## Phase 6: Platinum UI/UX Overhaul
- [x] Implement Global Design Language (Palantir/Tesla vibe: #0B1220, Electric Blue, Glassmorphism).
- [x] Build Animated Hero Landing Page with Framer Motion.
- [x] Add Smart AI Preview panel to Submission.
- [x] Implement Framer Motion for page transitions and card glows.
