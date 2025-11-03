import express from "express"
import { logout, login, signUp, verifyEmail } from "../controllers/auth.controller.js"

const router = express.Router();

router.post('/signup', signUp)
router.get('/login', login)
router.get('/logout', logout)
router.post('/verify-email', verifyEmail)

export default router;

