import { Router } from "express";
import { ChatController } from "../controllers/ChatController";
import { ChatService } from "../services/ChatService";
import { MongoChatRepository } from "../../infra/database/repositories/MongoChatRepository"
import { MongoTransactionRepository } from "../../infra/database/repositories/MongoTransactionRepository";
import { TransactionService } from "../services/TransactionService";

const router = Router();

const transactionRepository = new MongoTransactionRepository();
const transactionService = new TransactionService(transactionRepository);

const repository = new MongoChatRepository();
const service = new ChatService(repository, transactionService);
const controller = new ChatController(service);

router.post("/chat", async (req, res) => {
  controller.chatResponse(req, res);
});

export { router as chatRoutes }
