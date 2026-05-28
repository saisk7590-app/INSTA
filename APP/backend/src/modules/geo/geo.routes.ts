// geo.routes.ts — Phase 2A.1 Geo Database Foundation
import { Router } from "express";
import { updateLocation, getMyLocation } from "./geo.controller";

const router = Router();

// POST /api/geo/update-location
router.post("/update-location", updateLocation);

// GET /api/geo/me?userId=...
router.get("/me", getMyLocation);

export default router;
