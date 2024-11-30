import express from "express";
import { createPost, getPosts } from "../controllers/post.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
import onlyAdminRoutes from "../middlewares/onlyAdminRoutes.js";
const router = express.Router();

router.post("/create", protectRoutes, onlyAdminRoutes, createPost);
router.get("/getposts-as-admin",protectRoutes, onlyAdminRoutes, getPosts);

export default router;
