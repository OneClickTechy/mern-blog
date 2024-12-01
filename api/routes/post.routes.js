import express from "express";
import { createPost, deletePost, getPosts, updatePost } from "../controllers/post.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
import onlyAdminRoutes from "../middlewares/onlyAdminRoutes.js";
const router = express.Router();

router.post("/create", protectRoutes, onlyAdminRoutes, createPost);
router.get("/getposts-as-admin",protectRoutes, onlyAdminRoutes, getPosts);
router.get("/getposts", getPosts);
router.delete("/deletePost/:postId", protectRoutes, onlyAdminRoutes, deletePost);
router.put("/updatePost/:postId", protectRoutes, onlyAdminRoutes, updatePost);

export default router;
