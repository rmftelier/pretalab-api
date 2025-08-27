import { Router } from "express";
import { GeminiController } from "../controllers/GeminiController";
import { GeminiService } from "../services/GeminiService";

const router = Router();

const service = new GeminiService();
const controller = new GeminiController(service);

router.post("/ai", async (req, res) => {
  controller.aiResponse(req, res);
});

router.post("/chat", async (req, res) => {
  controller.chatResponse(req, res);
});

export { router as geminiRoutes }
