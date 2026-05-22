import { Router, Request, Response } from "express";
import { db } from "../config/db";

const router = Router();

// Helper function to format timestamp to relative string (e.g. "2m", "1h", "3d")
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

// Helper to format Date to AM/PM string (e.g. "8:12 PM")
function formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
}

// GET /api/messages/chats
router.get("/chats", async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            res.status(400).json({ success: false, message: "userId query parameter is required" });
            return;
        }

        const query = `
            SELECT 
                c.id as "id",
                c.last_message_preview as "lastMessage",
                c.last_message_at as "lastMessageAt",
                ou.full_name as "name",
                ou.avatar_url as "avatar",
                ou.id as "otherUserId"
            FROM conversation_participants cp
            JOIN conversations c ON cp.conversation_id = c.id
            JOIN conversation_participants ocp ON c.id = ocp.conversation_id AND ocp.user_id != cp.user_id
            JOIN users ou ON ocp.user_id = ou.id
            WHERE cp.user_id = $1
            ORDER BY c.last_message_at DESC
        `;

        const result = await db.query(query, [userId]);
        
        const chats = result.rows.map(row => ({
            id: row.id,
            name: row.name,
            avatar: row.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300',
            lastMessage: row.lastMessage || '',
            time: row.lastMessageAt ? formatRelativeTime(new Date(row.lastMessageAt)) : 'now',
            online: Math.random() > 0.5, // Mock online status
            unreadCount: Math.floor(Math.random() * 3), // Mock unread count
            distance: `${(Math.random() * 2).toFixed(1)} km`, // Mock distance
            otherUserId: row.otherUserId
        }));

        res.json({
            success: true,
            data: chats
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/messages/conversations/:conversationId
router.get("/conversations/:conversationId", async (req: Request, res: Response): Promise<void> => {
    try {
        const { conversationId } = req.params;
        const userId = req.query.userId as string;

        if (!conversationId || !userId) {
            res.status(400).json({ success: false, message: "conversationId and userId are required" });
            return;
        }

        const query = `
            SELECT 
                m.id,
                m.message_type as "type",
                m.text_content as "text",
                m.media_url as "media",
                m.sender_id as "senderId",
                m.created_at as "createdAt"
            FROM messages m
            WHERE m.conversation_id = $1
            ORDER BY m.created_at ASC
        `;

        const result = await db.query(query, [conversationId]);

        const messages = result.rows.map(row => ({
            id: row.id,
            type: row.type || 'text',
            text: row.text,
            media: row.media,
            mine: row.senderId === userId,
            timestamp: row.createdAt ? formatTime(new Date(row.createdAt)) : ''
        }));

        res.json({
            success: true,
            data: messages
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/messages/conversations/:conversationId
router.post("/conversations/:conversationId", async (req: Request, res: Response): Promise<void> => {
    try {
        const { conversationId } = req.params;
        const { userId, text } = req.body;

        if (!conversationId || !userId || !text) {
            res.status(400).json({ success: false, message: "conversationId, userId, and text are required" });
            return;
        }

        // Insert new message
        const insertRes = await db.query(`
            INSERT INTO messages (conversation_id, sender_id, text_content)
            VALUES ($1, $2, $3)
            RETURNING id, message_type as type, text_content as text, media_url as media, sender_id as "senderId", created_at as "createdAt"
        `, [conversationId, userId, text]);

        const newMessage = insertRes.rows[0];

        // Update conversation's last message info
        await db.query(`
            UPDATE conversations
            SET last_message_preview = $1, last_message_at = NOW(), updated_at = NOW()
            WHERE id = $2
        `, [text, conversationId]);

        res.status(201).json({
            success: true,
            data: {
                id: newMessage.id,
                type: newMessage.type,
                text: newMessage.text,
                media: newMessage.media,
                mine: true,
                timestamp: formatTime(new Date(newMessage.createdAt))
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
