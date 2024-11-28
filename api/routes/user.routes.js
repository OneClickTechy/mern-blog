import express from "express"
import { deleteUser, profile, updateProfile } from "../controllers/user.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
const router = express.Router();

router
    .route("/profile")
        .get(protectRoutes ,profile)
        .put(protectRoutes ,updateProfile)
        .delete(protectRoutes, deleteUser);

export default router