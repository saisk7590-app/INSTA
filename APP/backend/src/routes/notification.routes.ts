import { Router, Request, Response } from "express";
import { db } from "../config/db";

const router = Router();

// Helper function to format timestamp to relative string (e.g. "8m", "19m", "1d", "4d")
function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.max(1, Math.floor(diffMs / 60000));
    
    if (diffMins < 60) {
        return `${diffMins}m`;
    }
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) {
        return `${diffHours}h`;
    }
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d`;
}

// GET /api/notifications
router.get("/", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            res.status(400).json({ success: false, message: "userId query parameter is required" });
            return;
        }

        const query = `
            SELECT 
                n.id,
                n.type,
                n.title,
                n.description,
                n.is_read as "isRead",
                n.created_at as "createdAt",
                au.avatar_url as "actorAvatar"
            FROM notifications n
            JOIN users au ON n.actor_id = au.id
            WHERE n.user_id = $1
            ORDER BY n.created_at DESC
        `;

        const result = await db.query(query, [userId]);

        const notifications = result.rows.map(row => ({
            id: row.id,
            type: row.type,
            title: row.title,
            description: row.description,
            unread: !row.isRead,
            avatar: row.actorAvatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
            time: row.createdAt ? formatRelativeTime(new Date(row.createdAt)) : 'now'
        }));

        res.json({
            success: true,
            data: notifications
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
