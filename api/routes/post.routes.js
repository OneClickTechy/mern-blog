import express from 'express'
import { createPost } from '../controllers/post.controller.js'
import protectRoutes from '../middlewares/protectRoutes.js'
import onlyAdminRoutes from '../middlewares/onlyAdminRoutes.js'
const router = express.Router()

router.post("/create", protectRoutes, onlyAdminRoutes, createPost)

export default router