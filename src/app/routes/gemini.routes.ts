import { Router } from "express";
import { aiResponse, chatResponse } from "../controllers/GeminiController";

const router = Router();


router.post("/ai", async (req, res) => {
  aiResponse(req, res);
});

router.post("/chat", async (req, res) => {
  chatResponse(req, res);
});

export { router as geminiRoutes }
