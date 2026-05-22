import { Router, Request, Response } from "express";
import { db } from "../config/db";

const router = Router();

const profileSelect = `
    SELECT
        u.id,
        u.username,
        u.email,
        u.phone,
        u.full_name AS "fullName",
        u.avatar_url AS "avatarUrl",
        u.bio,
        u.onboarding_completed AS "onboardingCompleted",
        COALESCE(array_remove(array_agg(DISTINCT ui.interest), NULL), '{}') AS interests,
        (SELECT COUNT(*)::int FROM posts p WHERE p.user_id = u.id) AS posts_count,
        (SELECT COUNT(*)::int FROM follows f WHERE f.followed_id = u.id) AS followers_count,
        (SELECT COUNT(*)::int FROM follows f WHERE f.follower_id = u.id) AS following_count
    FROM users u
    LEFT JOIN user_interests ui ON ui.user_id = u.id
    WHERE u.id = $1
    GROUP BY u.id
`;

const relationSelect = `
    SELECT
        u.id,
        u.username,
        u.avatar_url,
        u.bio,
        EXISTS(
            SELECT 1
            FROM follows mf
            WHERE mf.follower_id = $2 AND mf.followed_id = u.id
        ) AS mutual_follow,
        (SELECT COUNT(*)::int FROM follows f1 WHERE f1.followed_id = u.id) AS followers_count,
        (SELECT COUNT(*)::int FROM follows f2 WHERE f2.follower_id = u.id) AS following_count
`;

// GET /api/users/:id/stats
router.get("/:id/stats", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, message: "User ID is required" });
            return;
        }

        // Count posts
        const postsRes = await db.query("SELECT COUNT(*)::int as count FROM posts WHERE user_id = $1", [id]);
        
        // Count followers
        const followersRes = await db.query("SELECT COUNT(*)::int as count FROM follows WHERE followed_id = $1", [id]);
        
        // Count following
        const followingRes = await db.query("SELECT COUNT(*)::int as count FROM follows WHERE follower_id = $1", [id]);

        res.json({
            success: true,
            data: {
                posts: postsRes.rows[0].count,
                followers: followersRes.rows[0].count,
                following: followingRes.rows[0].count
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/users/:id
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { fullName, bio, location, username, onboardingCompleted, interests } = req.body;

        if (!id) {
            res.status(400).json({ success: false, message: "User ID is required" });
            return;
        }

        // Dynamically build the SET clauses
        const setClauses: string[] = [];
        const queryParams: any[] = [];
        let index = 1;

        if (fullName !== undefined) {
            setClauses.push(`full_name = $${index}`);
            queryParams.push(fullName);
            index++;
        }
        if (bio !== undefined) {
            setClauses.push(`bio = $${index}`);
            queryParams.push(bio);
            index++;
        }
        if (username !== undefined) {
            if (username && !/^[a-zA-Z0-9_.]+$/.test(username)) {
                res.status(400).json({ success: false, message: "Username can only contain letters, numbers, underscores, and dots" });
                return;
            }
            const usernameExists = await db.query(
                "SELECT id FROM users WHERE LOWER(username) = LOWER($1) AND id <> $2",
                [username, id]
            );
            if (usernameExists.rows.length > 0) {
                res.status(409).json({ success: false, message: "Username already taken" });
                return;
            }
            setClauses.push(`username = $${index}`);
            queryParams.push(username);
            index++;
        }
        if (onboardingCompleted !== undefined) {
            setClauses.push(`onboarding_completed = $${index}`);
            queryParams.push(onboardingCompleted);
            index++;
        }
        if (location !== undefined) {
            if (location && location.startsWith("POINT")) {
                setClauses.push(`location = ST_GeomFromText($${index}, 4326)`);
                queryParams.push(location);
                index++;
            }
        }

        if (setClauses.length === 0 && interests === undefined) {
            res.status(400).json({ success: false, message: "No update fields provided" });
            return;
        }

        let updatedUser = null;

        if (setClauses.length > 0) {
            queryParams.push(id);
            const updateQuery = `
                UPDATE users 
                SET ${setClauses.join(", ")}, updated_at = CURRENT_TIMESTAMP
                WHERE id = $${index}
                RETURNING id, username, email, phone, full_name as "fullName", avatar_url as "avatarUrl", bio, onboarding_completed as "onboardingCompleted"
            `;
            const result = await db.query(updateQuery, queryParams);
            if (result.rows.length === 0) {
                res.status(404).json({ success: false, message: "User not found" });
                return;
            }
            updatedUser = result.rows[0];
        }

        if (interests !== undefined) {
            await db.query("DELETE FROM user_interests WHERE user_id = $1", [id]);
            if (Array.isArray(interests) && interests.length > 0) {
                for (const interest of interests) {
                    await db.query("INSERT INTO user_interests (user_id, interest) VALUES ($1, $2) ON CONFLICT DO NOTHING", [id, interest]);
                }
            }
        }

        if (!updatedUser) {
            const userRes = await db.query(`SELECT id, username, email, phone, full_name as "fullName", avatar_url as "avatarUrl", bio, onboarding_completed as "onboardingCompleted" FROM users WHERE id = $1`, [id]);
            if (userRes.rows.length === 0) {
                res.status(404).json({ success: false, message: "User not found" });
                return;
            }
            updatedUser = userRes.rows[0];
        }

        const interestsRes = await db.query("SELECT interest FROM user_interests WHERE user_id = $1", [id]);
        updatedUser.interests = interestsRes.rows.map((row: any) => row.interest);
        updatedUser.location = typeof location === "string" && !location.startsWith("POINT") ? location : updatedUser.location;

        res.json({
            success: true,
            data: updatedUser
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/users/:id/followers
router.get("/:id/followers", async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("[API LOG] GET /api/users/:id/followers hit");
        const { id } = req.params;
        const viewerId = req.query.viewerId as string;

        const result = await db.query(`
            ${relationSelect},
                   FALSE AS is_following
            FROM follows f
            JOIN users u ON f.follower_id = u.id
            WHERE f.followed_id = $1
            ORDER BY f.created_at DESC
        `, [id, viewerId || id]);

        res.json({ success: true, data: result.rows });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/users/:id/following
router.get("/:id/following", async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("[API LOG] GET /api/users/:id/following hit");
        const { id } = req.params;
        const viewerId = req.query.viewerId as string;

        const result = await db.query(`
            ${relationSelect},
                   TRUE AS is_following
            FROM follows f
            JOIN users u ON f.followed_id = u.id
            WHERE f.follower_id = $1
            ORDER BY f.created_at DESC
        `, [id, viewerId || id]);

        res.json({ success: true, data: result.rows });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/users/:id/posts
router.get("/:id/posts", async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("[API LOG] GET /api/users/:id/posts hit");
        const { id } = req.params;

        const result = await db.query(`
            SELECT p.id, p.media_url, p.caption, p.location_name AS location,
                   p.likes_count, p.comments_count, p.created_at,
                   u.id as user_id, u.username, u.avatar_url, u.full_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.user_id = $1
            ORDER BY p.created_at DESC
        `, [id]);

        res.json({ success: true, data: result.rows });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const result = await db.query(profileSelect, [id]);

        if (result.rows.length === 0) {
            res.status(404).json({ success: false, message: "User not found" });
            return;
        }

        res.json({ success: true, data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
