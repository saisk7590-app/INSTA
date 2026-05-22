import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email) {
            res.status(400).json({ success: false, message: "Email is required" });
            return;
        }

        const data = await AuthService.login(email, password);
        res.json({ success: true, data });
    } catch (error: any) {
        res.status(401).json({ success: false, message: error.message });
    }
};

export const getDemoUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await AuthService.getDemoUsers();
        res.json({ success: true, data: users });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.json({ success: true, message: "Logged out successfully" });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("[API LOG] POST /api/auth/signup hit");
        const { email, phone, password, fullName, username, interests } = req.body;

        if (!email || !password || !fullName) {
            res.status(400).json({ success: false, message: "email, password, and fullName are required" });
            return;
        }

        const data = await AuthService.signup({
            email,
            phone: phone || "",
            username: username || "",
            password,
            fullName,
            interests: interests || [],
        });

        res.status(201).json({ success: true, data });
    } catch (error: any) {
        const status = error.message.includes("already") ? 409 : 500;
        res.status(status).json({ success: false, message: error.message });
    }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.query.userId as string;
        if (!userId) {
            res.status(401).json({ success: false, message: "userId query param required" });
            return;
        }

        const user = await AuthService.getMe(userId);
        res.json({ success: true, data: user });
    } catch (error: any) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = String(req.params.id);
        if (!id) {
            res.status(400).json({ success: false, message: "User ID is required" });
            return;
        }

        const user = await AuthService.getMe(id);
        res.json({ success: true, data: user });
    } catch (error: any) {
        res.status(404).json({ success: false, message: error.message });
    }
};
