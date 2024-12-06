import express from "express";
import { createComment, editComment, getComments, likeComment } from "../controllers/comment.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
const router = express.Router();

router.post("/create", protectRoutes, createComment);
router.get("/:postId", getComments);
router.put("/likeComment/:commentId", protectRoutes, likeComment);
router.put("/editComment/:commentId", protectRoutes, editComment);

export default router;