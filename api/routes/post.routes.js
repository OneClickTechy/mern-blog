import express from "express";
import { createPost, deletePost, getPosts, getPostsPublic, updatePost } from "../controllers/post.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
import onlyAdminRoutes from "../middlewares/onlyAdminRoutes.js";
const router = express.Router();

router.post("/create", protectRoutes, onlyAdminRoutes, createPost);
router.get("/admin/getposts",protectRoutes, onlyAdminRoutes, getPosts);
router.get("/getposts", getPostsPublic);
router.delete("/deletePost/:postId", protectRoutes, onlyAdminRoutes, deletePost);
router.patch("/updatePost/:postId", protectRoutes, onlyAdminRoutes, updatePost);

export default router;
