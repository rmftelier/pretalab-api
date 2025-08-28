import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { ChatService } from "../services/ChatService";
import { MongoChatRepository} from "../../infra/database/repositories/MongoChatRepository"

const router = Router();

const repository = new MongoChatRepository();
const service = new ChatService(repository);
const controller = new ChatController(service);

router.post("/chat", async (req, res) => {
  controller.chatResponse(req, res);
});

export { router as chatRoutes }
