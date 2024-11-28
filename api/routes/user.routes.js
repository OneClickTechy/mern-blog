import express from "express"
import { profile, updateProfile } from "../controllers/user.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
const router = express.Router();

router
.route("/profile").get(protectRoutes ,profile)
.put(protectRoutes ,updateProfile)

export default router