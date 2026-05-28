// geo.service.ts — Phase 2A.1 Geo Database Foundation
import { db } from "../../config/db";
import { UpdateLocationPayload, UserGeoLocation } from "./geo.types";

export class GeoService {

    static async updateUserLocation(payload: UpdateLocationPayload): Promise<UserGeoLocation> {
        const { userId, latitude, longitude } = payload;

        const result = await db.query(
            `UPDATE users
             SET
                 current_latitude      = $1,
                 current_longitude     = $2,
                 last_location_updated = CURRENT_TIMESTAMP,
                 location_granted      = TRUE,
                 updated_at            = CURRENT_TIMESTAMP
             WHERE id = $3
             RETURNING
                 id AS "userId",
                 current_latitude      AS "currentLatitude",
                 current_longitude     AS "currentLongitude",
                 last_location_updated AS "lastLocationUpdated"`,
            [latitude, longitude, userId]
        );

        if (result.rows.length === 0) {
            throw new Error("User not found");
        }

        return result.rows[0] as UserGeoLocation;
    }

    /**
     * Returns the stored lat/lng + last updated timestamp for a user.
     */
    static async getUserLocation(userId: string): Promise<UserGeoLocation> {
        const result = await db.query(
            `SELECT
                 id                    AS "userId",
                 current_latitude      AS "currentLatitude",
                 current_longitude     AS "currentLongitude",
                 last_location_updated AS "lastLocationUpdated"
             FROM users
             WHERE id = $1
             LIMIT 1`,
            [userId]
        );

        if (result.rows.length === 0) {
            throw new Error("User not found");
        }

        return result.rows[0] as UserGeoLocation;
    }
}
