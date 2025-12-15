import express from "express";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/Admin-panel", login);

export default router;
