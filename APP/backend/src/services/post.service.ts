import { db } from "../config/db";

export class PostService {
    static async getFeed(userId: string, limit: number = 25, offset: number = 0) {
        const query = `
            SELECT 
                p.id, p.media_url, p.caption, p.location_name, p.likes_count, 
                p.comments_count, p.shares_count, p.saves_count, p.created_at,
                u.id as user_id, u.username, u.avatar_url, u.full_name, u.badge
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.user_id IN (
                SELECT followed_id FROM follows WHERE follower_id = $1
            ) OR p.user_id = $1
            ORDER BY p.created_at DESC
            LIMIT $2 OFFSET $3
        `;
        
        const result = await db.query(query, [userId, limit, offset]);
        return result.rows;
    }

    static async getPostById(postId: string) {
        const query = `
            SELECT 
                p.id, p.media_url, p.caption, p.location_name, p.likes_count, 
                p.comments_count, p.shares_count, p.saves_count, p.created_at,
                u.id as user_id, u.username, u.avatar_url, u.full_name
            FROM posts p
            JOIN users u ON p.user_id = u.id
            WHERE p.id = $1
        `;
        const result = await db.query(query, [postId]);
        if (result.rows.length === 0) throw new Error("Post not found");
        return result.rows[0];
    }

    static async createPost(userId: string, mediaUrl: string, caption: string, locationName: string) {
        const query = `
            INSERT INTO posts (user_id, media_url, caption, location_name)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const result = await db.query(query, [userId, mediaUrl, caption, locationName]);
        return result.rows[0];
    }

    static async getComments(postId: string) {
        const query = `
            SELECT c.id, c.text_content, c.likes_count, c.created_at,
                   u.id as user_id, u.username, u.avatar_url, u.full_name
            FROM comments c
            JOIN users u ON c.user_id = u.id
            WHERE c.post_id = $1 AND c.deleted_at IS NULL AND c.parent_comment_id IS NULL
            ORDER BY c.created_at ASC
        `;
        const result = await db.query(query, [postId]);
        return result.rows;
    }

    static async createComment(postId: string, userId: string, textContent: string) {
        const client = await db.connect();
        try {
            await client.query("BEGIN");

            const commentResult = await client.query(`
                INSERT INTO comments (post_id, user_id, text_content)
                VALUES ($1, $2, $3)
                RETURNING id, text_content, likes_count, created_at
            `, [postId, userId, textContent]);

            await client.query(`
                UPDATE posts SET comments_count = comments_count + 1 WHERE id = $1
            `, [postId]);

            await client.query("COMMIT");

            // Fetch user info for the response
            const userResult = await db.query(
                "SELECT id as user_id, username, avatar_url, full_name FROM users WHERE id = $1",
                [userId]
            );

            return {
                ...commentResult.rows[0],
                ...userResult.rows[0],
            };
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }
}
