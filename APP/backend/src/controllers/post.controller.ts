import { Request, Response } from "express";
import { PostService } from "../services/post.service";

export const getFeed = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.query.userId as string; // Mock authentication
        const limit = parseInt(req.query.limit as string) || 25;
        const offset = parseInt(req.query.offset as string) || 0;

        if (!userId) {
            res.status(401).json({ success: false, message: "Mock userId query param required for feed" });
            return;
        }

        const feed = await PostService.getFeed(userId, limit, offset);
        res.json({ success: true, data: feed });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await PostService.getPostById(String(req.params.id));
        res.json({ success: true, data: post });
    } catch (error: any) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            userId,
            mediaUrl,
            caption,
            locationName,
            latitude,
            longitude,
            placeName,
            geoVisibilityRadius,
        } = req.body; // Mock auth
        if (!userId || !mediaUrl) {
            res.status(400).json({ success: false, message: "userId and mediaUrl are required" });
            return;
        }

        const newPost = await PostService.createPost({
            userId,
            mediaUrl,
            caption,
            locationName,
            latitude,
            longitude,
            placeName,
            geoVisibilityRadius,
        });
        res.status(201).json({ success: true, data: newPost });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPostComments = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("[API LOG] GET /api/posts/:id/comments hit");
        const comments = await PostService.getComments(String(req.params.id));
        res.json({ success: true, data: comments });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createPostComment = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("[API LOG] POST /api/posts/:id/comments hit");
        const { userId, textContent } = req.body;
        if (!userId || !textContent) {
            res.status(400).json({ success: false, message: "userId and textContent are required" });
            return;
        }

        const comment = await PostService.createComment(String(req.params.id), userId, textContent);
        res.status(201).json({ success: true, data: comment });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
