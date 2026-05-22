import { db } from "../config/db";
import bcrypt from "bcryptjs";

const mapUserRow = (row: any) => ({
    id: row.id,
    username: row.username,
    email: row.email,
    phone: row.phone,
    fullName: row.full_name,
    avatarUrl: row.avatar_url,
    bio: row.bio,
    onboardingCompleted: row.onboarding_completed,
    location: row.location_name || row.location || null,
});

export class AuthService {
    static async login(email: string, password?: string) {
        const result = await db.query(
            `SELECT id, username, email, phone, password_hash, full_name, avatar_url, bio,
                    onboarding_completed, ST_AsText(location) AS location
             FROM users
             WHERE LOWER(email) = LOWER($1)
             LIMIT 1`,
            [email.trim()]
        );
        
        if (result.rows.length === 0) {
            throw new Error("User not found (invalid email)");
        }
        
        const user = result.rows[0];
        
        if (password && !bcrypt.compareSync(password, user.password_hash)) {
            throw new Error("Incorrect password");
        }
        
        delete user.password_hash;
        
        return {
            message: "Login successful",
            user: mapUserRow(user),
            token: "session_user_" + user.id
        };
    }

    static async getDemoUsers() {
        const result = await db.query(
            "SELECT email, username FROM users ORDER BY username"
        );
        const passwords: Record<string, string> = {
            "sai_kiran": "Sai@123",
            "alex_smith": "Alex@123",
            "maya_creative": "Maya@123",
            "ryan_style": "Ryan@123",
            "sara_guru": "Sara@123"
        };
        return result.rows.map(user => ({
            ...user,
            password: passwords[user.username] || "Password@123"
        }));
    }

    static async signup(data: { email: string; phone: string; username: string; password: string; fullName: string; interests: string[] }) {
        const email = data.email.trim().toLowerCase();
        const phone = data.phone.trim();

        const emailCheck = await db.query("SELECT id FROM users WHERE LOWER(email) = LOWER($1)", [email]);
        if (emailCheck.rows.length > 0) throw new Error("Email already registered");

        if (phone) {
            const phoneCheck = await db.query("SELECT id FROM users WHERE phone = $1", [phone]);
            if (phoneCheck.rows.length > 0) throw new Error("Phone number already registered");
        }

        if (data.username) {
            const usernameCheck = await db.query("SELECT id FROM users WHERE LOWER(username) = LOWER($1)", [data.username]);
            if (usernameCheck.rows.length > 0) throw new Error("Username already taken");
        }

        if (data.password.trim().length < 8) {
            throw new Error("Password must be at least 8 characters long");
        }

        const passwordHash = bcrypt.hashSync(data.password, 10);
        const baseUsername = (data.username || email.split("@")[0]).replace(/[^a-zA-Z0-9_.]/g, "_").toLowerCase();
        let username = baseUsername || `user_${Date.now()}`;
        let suffix = 1;

        while (true) {
            const usernameCheck = await db.query("SELECT id FROM users WHERE LOWER(username) = LOWER($1)", [username]);
            if (usernameCheck.rows.length === 0) {
                break;
            }
            username = `${baseUsername}_${suffix++}`;
        }

        const result = await db.query(`
            INSERT INTO users (username, email, phone, password_hash, full_name, onboarding_completed)
            VALUES ($1, $2, $3, $4, $5, FALSE)
            RETURNING id, username, email, phone, full_name, avatar_url, bio, onboarding_completed
        `, [username, email, phone || null, passwordHash, data.fullName.trim()]);

        const user = result.rows[0];

        // Insert interests if provided
        if (data.interests && data.interests.length > 0) {
            for (const interest of data.interests) {
                await db.query("INSERT INTO user_interests (user_id, interest) VALUES ($1, $2) ON CONFLICT DO NOTHING", [user.id, interest]);
            }
        }

        return {
            user: mapUserRow(user),
            token: "session_user_" + user.id
        };
    }

    static async getMe(userId: string) {
        const result = await db.query(
            `SELECT id, username, email, phone, full_name, avatar_url, bio, onboarding_completed,
                    ST_AsText(location) AS location
             FROM users
             WHERE id = $1
             LIMIT 1`,
            [userId]
        );
        
        if (result.rows.length === 0) {
            throw new Error("User not found");
        }
        return mapUserRow(result.rows[0]);
    }
}
