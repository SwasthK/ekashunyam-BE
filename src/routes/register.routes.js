import express from "express";
import { handleRegistration } from "../controllers/register.controllers.js";
const router = express.Router();

router.post("/", handleRegistration);

export default router;
