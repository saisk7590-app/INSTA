import { Router } from "express";
import { login, signup, getMe, getUserById, getDemoUsers, logout } from "../controllers/auth.controller";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/signup", signup);
router.get("/me", getMe);
router.get("/demo-users", getDemoUsers);
router.get("/users/:id", getUserById);

export default router;
