import express from "express";
import { createComment } from "../controllers/comment.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
const router = express.Router();

router.post("/create", protectRoutes, createComment);

export default router;