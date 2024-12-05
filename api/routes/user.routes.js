import express from "express"
import { deleteUser, getUserById, getUsersProfile, profile, updateProfile } from "../controllers/user.controller.js";
import protectRoutes from "../middlewares/protectRoutes.js";
import onlyAdminRoutes from "../middlewares/onlyAdminRoutes.js";
const router = express.Router();

router
    .route("/profile")
        .get(protectRoutes ,profile)
        .put(protectRoutes ,updateProfile)
router
    .route("/profile/:id")
        .get(getUserById)
        .delete(protectRoutes, deleteUser)
router
    .route("/getUsers")
        .get( protectRoutes, onlyAdminRoutes, getUsersProfile)


export default router