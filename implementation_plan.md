# Implementation Plan - Phase 2A.1: Geo Database Foundation

Prepare database, backend routing structure, and frontend hooks for location-aware systems without introducing nearby feed views or UI complexity.

## User Review Required

> [!IMPORTANT]
> **Database Modifications & PostGIS Alignment**:
> The `users` and `posts` tables already have PostGIS geography point fields (`location`). We will add the raw `latitude`/`longitude` fields as requested for quick standard lookup/indexing, and keep them synchronized with the PostGIS `location` point when updating via the geo service. This ensures compatibility with both standard coordinates and future PostGIS calculations.

## Proposed Changes

---

### Database Components

#### [NEW] [migrate-geo.ts](file:///e:/Sai%20Kiran/insta/APP/backend/src/seed/migrate-geo.ts)
* Create a database migration script to run ALTER TABLE commands:
  * For `users`: Add `current_latitude` (DOUBLE PRECISION), `current_longitude` (DOUBLE PRECISION), `last_location_updated` (TIMESTAMP WITH TIME ZONE).
  * For `posts`: Add `latitude` (DOUBLE PRECISION), `longitude` (DOUBLE PRECISION), `place_name` (VARCHAR(255)), `geo_visibility_radius` (INTEGER DEFAULT 5000).
  * Add indexes: `idx_users_current_lat_lng` on `users(current_latitude, current_longitude)` and `idx_posts_lat_lng` on `posts(latitude, longitude)`.

#### [MODIFY] [schema.sql](file:///e:/Sai%20Kiran/insta/database/schema.sql) & [schema.sql](file:///e:/Sai%20Kiran/insta/APP/database/schema.sql)
* Update schema sql files to document the new fields.

---

### Backend Components (`APP/backend`)

#### [NEW] [geo.types.ts](file:///e:/Sai%20Kiran/insta/APP/backend/src/modules/geo/geo.types.ts)
* Define TypeScript types/interfaces for geo payloads:
  * `UpdateLocationPayload`: `{ userId: string; latitude: number; longitude: number; }`

#### [NEW] [geo.service.ts](file:///e:/Sai%20Kiran/insta/APP/backend/src/modules/geo/geo.service.ts)
* Implement `updateUserLocation(userId, lat, lng)`: updates `current_latitude`, `current_longitude`, `last_location_updated = CURRENT_TIMESTAMP`, and synchronizes PostGIS `location` point:
  `UPDATE users SET current_latitude = $1, current_longitude = $2, last_location_updated = CURRENT_TIMESTAMP, location = ST_SetSRID(ST_MakePoint($2, $1), 4326)::geography WHERE id = $3`
* Implement `getUserLocation(userId)`: retrieves latitude, longitude, and last updated time.

#### [NEW] [geo.controller.ts](file:///e:/Sai%20Kiran/insta/APP/backend/src/modules/geo/geo.controller.ts)
* Implement `updateLocation`: validates request parameters (email/userId, latitude, longitude) and calls geo service.
* Implement `getMe`: returns location data for the active user.

#### [NEW] [geo.routes.ts](file:///e:/Sai%20Kiran/insta/APP/backend/src/modules/geo/geo.routes.ts)
* Set up Express routes:
  * `POST /update-location`
  * `GET /me`

#### [MODIFY] [app.ts](file:///e:/Sai%20Kiran/insta/APP/backend/src/app.ts)
* Register the new modular router under `/api/geo`:
  ```typescript
  import geoRoutes from "./modules/geo/geo.routes";
  app.use("/api/geo", geoRoutes);
  ```

---

### Frontend Components (`APP/frontend`)

#### [NEW] [geoService.ts](file:///e:/Sai%20Kiran/insta/APP/frontend/src/services/geoService.ts)
* Define frontend functions to interface with `/api/geo/update-location` and `/api/geo/me`.

#### [NEW] [useLocationTracker.ts](file:///e:/Sai%20Kiran/insta/APP/frontend/src/hooks/useLocationTracker.ts)
* Implement a React hook that checks if permissions are granted.
* If granted, triggers `Location.getCurrentPositionAsync` to retrieve user coordinates and uploads them to `/api/geo/update-location` via `geoService`.
* Handles location errors or permission denials gracefully so the app functions normally.

#### [MODIFY] [App.tsx](file:///e:/Sai%20Kiran/insta/APP/frontend/App.tsx)
* Register the location tracker hook in the root component (active when authenticated) so location updates automatically trigger.

---

## Verification Plan

### Automated Tests
- Run database migration:
  ```bash
  npx ts-node src/seed/migrate-geo.ts
  ```
- Verify API updates:
  ```powershell
  Invoke-RestMethod -Method POST -Uri "http://localhost:5000/api/geo/update-location" -Body '{"userId":"[USER_ID]","latitude":17.4126,"longitude":78.4354}' -ContentType "application/json"
  Invoke-RestMethod -Method GET -Uri "http://localhost:5000/api/geo/me?userId=[USER_ID]"
  ```

### Manual Verification
- Launch Expo app and grant/deny location permission.
- Verify location state is captured without crashing the app.
- Check database row updates in PostgreSQL.
