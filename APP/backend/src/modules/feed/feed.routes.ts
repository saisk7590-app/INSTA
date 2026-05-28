import { Router } from "express";
import { getNearbyFeed } from "./feed.controller";

const router = Router();

router.get("/nearby", getNearbyFeed);

export default router;
