import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect()
    .then(() => {
        // Connected silently, verified on server startup
    })
    .catch((err) => {
        console.error("❌ DB Connection Error:", err);
    });