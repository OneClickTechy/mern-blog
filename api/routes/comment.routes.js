import express from "express";
import { createComment, getComments, likeComment } from "../controllers/comment.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
const router = express.Router();

router.post("/create", protectRoutes, createComment);
router.get("/:postId", getComments);
router.put("/likeComment/:commentId", protectRoutes, likeComment);

export default router;