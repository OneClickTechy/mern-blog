import express from "express";
import { googleAuth, signin, signout, signup } from "../controllers/auth.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google",googleAuth);
router.post("/signout", protectRoutes,signout);


export default router;