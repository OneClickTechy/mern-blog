import express from "express";
import { createComment, deleteComment, editComment, getAllComments, getComments, likeComment } from "../controllers/comment.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
import onlyAdminRoutes from "../middlewares/onlyAdminRoutes.js";
const router = express.Router();

router.post("/create", protectRoutes, createComment);
router.get("/", protectRoutes, onlyAdminRoutes,getAllComments);
router.get("/:postId", getComments);
router.put("/likeComment/:commentId", protectRoutes, likeComment);
router.put("/editComment/:commentId", protectRoutes, editComment);
router.delete("/deleteComment/:commentId", protectRoutes, deleteComment);
export default router;