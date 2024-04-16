import express from "express";
import { handleVerifyToken } from "../controllers/handleVerifyToken.controllers.js";
const router = express.Router();
router.get("/", handleVerifyToken);

export default router;
