import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";
import messageRoutes from "./routes/message.routes";
import notificationRoutes from "./routes/notification.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[API LOG] ${req.method} ${req.originalUrl} hit`);
    next();
});

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Insta backend running successfully 🚀",
    });
});

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "API Healthy"
    });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);

export default app;