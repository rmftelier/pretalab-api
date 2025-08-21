import { MongoTransactionRepository } from "../../infra/database/repositories/MongoTransactionRepository";
import { TransactionService } from "../services/TransactionService";
import { TransactionController } from "../controllers/TransactionController";
import { Router } from "express";

const router = Router();

const repository = new MongoTransactionRepository();
const service = new TransactionService(repository);
const controller = new TransactionController(service);

router.get("/", (_req, res) => res.json({ message: "Transactions API" }));
router.get("/transactions", (_req, res) => controller.getAllTransactions(_req, res));
router.get("/transactions/:id", (req, res) => controller.getTransactionById(req, res));
router.post("/transactions", (req, res) => controller.postTransaction(req, res));

export { router as transactionRoutes }
