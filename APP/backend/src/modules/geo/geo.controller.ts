// geo.controller.ts — Phase 2A.1 Geo Database Foundation
import { Request, Response } from "express";
import { GeoService } from "./geo.service";
import { UpdateLocationPayload } from "./geo.types";

/**
 * POST /api/geo/update-location
 * Body: { userId, latitude, longitude }
 */
export const updateLocation = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("[GEO] POST /api/geo/update-location hit");

        const { userId, latitude, longitude } = req.body as UpdateLocationPayload;

        if (!userId) {
            res.status(400).json({ success: false, message: "userId is required" });
            return;
        }

        const lat = Number(latitude);
        const lng = Number(longitude);

        if (isNaN(lat) || isNaN(lng)) {
            res.status(400).json({ success: false, message: "latitude and longitude must be valid numbers" });
            return;
        }

        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
            res.status(400).json({ success: false, message: "latitude must be -90..90 and longitude -180..180" });
            return;
        }

        const geoData = await GeoService.updateUserLocation({ userId, latitude: lat, longitude: lng });

        res.json({
            success: true,
            message: "Location updated successfully",
            data: geoData,
        });
    } catch (error: any) {
        const status = error.message === "User not found" ? 404 : 500;
        res.status(status).json({ success: false, message: error.message });
    }
};

/**
 * GET /api/geo/me?userId=...
 * Returns stored location for the authenticated user.
 */
export const getMyLocation = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("[GEO] GET /api/geo/me hit");

        const userId = req.query.userId as string;

        if (!userId) {
            res.status(400).json({ success: false, message: "userId query param is required" });
            return;
        }

        const geoData = await GeoService.getUserLocation(userId);

        res.json({
            success: true,
            data: geoData,
        });
    } catch (error: any) {
        const status = error.message === "User not found" ? 404 : 500;
        res.status(status).json({ success: false, message: error.message });
    }
};
