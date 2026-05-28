import { Request, Response } from "express";
import { FeedService } from "./feed.service";

const DEFAULT_RADIUS_KM = 5;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 30;

function parseNumber(value: unknown) {
    if (value === undefined || value === null || value === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export const getNearbyFeed = async (req: Request, res: Response): Promise<void> => {
    try {
        const latitude = parseNumber(req.query.latitude);
        const longitude = parseNumber(req.query.longitude);
        const radius = parseNumber(req.query.radius);
        const limitParam = parseNumber(req.query.limit);
        const offsetParam = parseNumber(req.query.offset);

        if (latitude === null || longitude === null) {
            res.status(400).json({ success: false, message: "latitude and longitude are required" });
            return;
        }

        if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
            res.status(400).json({ success: false, message: "latitude must be -90..90 and longitude -180..180" });
            return;
        }

        const radiusKm = radius && radius > 0 ? radius : DEFAULT_RADIUS_KM;
        const limit = Math.min(Math.max(limitParam || DEFAULT_LIMIT, 1), MAX_LIMIT);
        const offset = Math.max(offsetParam || 0, 0);

        const feed = await FeedService.getNearbyFeed({
            latitude,
            longitude,
            radiusKm,
            limit,
            offset,
        });

        res.json({
            success: true,
            data: feed,
            meta: {
                latitude,
                longitude,
                radiusKm,
                limit,
                offset,
                hasMore: feed.length === limit,
            },
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
