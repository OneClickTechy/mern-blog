import express from "express"
import { profile } from "../controllers/user.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
const router = express.Router();

router.get("/profile", protectRoutes ,profile)
export default router