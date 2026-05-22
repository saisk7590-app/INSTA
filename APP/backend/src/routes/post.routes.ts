import { Router } from "express";
import { getFeed, getPost, createPost, getPostComments, createPostComment } from "../controllers/post.controller";

const router = Router();

router.get("/feed", getFeed);
router.get("/:id", getPost);
router.post("/", createPost);
router.get("/:id/comments", getPostComments);
router.post("/:id/comments", createPostComment);

export default router;
