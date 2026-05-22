import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { db } from "./config/db";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    try {
        const usersCount = (await db.query("SELECT COUNT(*) FROM users")).rows[0].count;
        const postsCount = (await db.query("SELECT COUNT(*) FROM posts")).rows[0].count;
        const followsCount = (await db.query("SELECT COUNT(*) FROM follows")).rows[0].count;
        const messagesCount = (await db.query("SELECT COUNT(*) FROM messages")).rows[0].count;
        const notificationsCount = (await db.query("SELECT COUNT(*) FROM notifications")).rows[0].count;

        console.log("PostgreSQL connected successfully\n");
        console.log("Users:", Number(usersCount));
        console.log("Posts:", Number(postsCount));
        console.log("Follows:", Number(followsCount));
        console.log("Messages:", Number(messagesCount));
        console.log("Notifications:", Number(notificationsCount));
    } catch (err) {
        console.error("Error fetching startup counts:", err);
    }
});