import { handleFestRegistration } from "../controllers/handleFestRegistraion.controller.js";
import express from "express";
const router = express.Router();

router.post("/register", handleFestRegistration);

export default router;
