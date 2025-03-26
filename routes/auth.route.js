import express from "express"
import { checkAuth, forgotPassword, getAllUsers, login, register, resentVerificationCode, resetPassword, verifyEmail } from "../controllers/auth.controller.js"
import {protect,authorize} from "../middlewares/authMiddleware.js"
import uploadMiddleware from "../utils/upload.js"

const router = express.Router()

router.post("/register", uploadMiddleware, register)
router.post("/verify-account",verifyEmail)
router.post("/resend-verification-code",resentVerificationCode)
router.post("/login", login)
router.post("/check-auth", protect, checkAuth)
router.get("/all-user", protect, authorize("admin"), getAllUsers)

router.post("/forgot-password",forgotPassword)
router.post("/reset-password/:token", resetPassword)

export default router