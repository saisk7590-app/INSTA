import { db } from "../../config/db";
import { NearbyFeedQuery } from "./feed.types";

export class FeedService {
    static async getNearbyFeed(query: NearbyFeedQuery) {
        const { latitude, longitude, radiusKm, limit, offset } = query;

        const sql = `
            WITH nearby_posts AS (
                SELECT
                    p.id,
                    p.media_url,
                    p.caption,
                    COALESCE(p.place_name, p.location_name) AS location_name,
                    p.latitude,
                    p.longitude,
                    p.geo_visibility_radius,
                    p.likes_count,
                    p.comments_count,
                    p.shares_count,
                    p.saves_count,
                    p.created_at,
                    u.id AS user_id,
                    u.username,
                    u.avatar_url,
                    u.full_name,
                    u.badge,
                    (
                        6371 * acos(
                            LEAST(
                                1,
                                GREATEST(
                                    -1,
                                    cos(radians($1)) *
                                    cos(radians(p.latitude)) *
                                    cos(radians(p.longitude) - radians($2)) +
                                    sin(radians($1)) *
                                    sin(radians(p.latitude))
                                )
                            )
                        )
                    ) AS distance_km
                FROM posts p
                JOIN users u ON p.user_id = u.id
                WHERE
                    p.deleted_at IS NULL
                    AND p.is_archived = FALSE
                    AND p.latitude IS NOT NULL
                    AND p.longitude IS NOT NULL
                    AND p.latitude BETWEEN -90 AND 90
                    AND p.longitude BETWEEN -180 AND 180
            )
            SELECT *
            FROM nearby_posts
            WHERE
                distance_km <= $3
                AND COALESCE(geo_visibility_radius, 5000) >= distance_km * 1000
            ORDER BY
                distance_km ASC,
                created_at DESC,
                (likes_count + comments_count * 2 + shares_count * 3 + saves_count) DESC
            LIMIT $4 OFFSET $5;
        `;

        const result = await db.query(sql, [latitude, longitude, radiusKm, limit, offset]);
        return result.rows;
    }
}
