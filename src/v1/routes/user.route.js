import express from "express";
import { checkOtp, regisUser } from "../controllers/user.controller.js";
const router = express.Router();
router.post("/register", regisUser);
router.post("/otp", checkOtp);
export default router;
