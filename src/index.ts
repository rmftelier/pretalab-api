// index.ts
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { MongoTransactionRepository } from "./repositories/mongoTransactionRepository";
import { TransactionService } from "./services/transactions";
import { TransactionController } from "./controllers/transactions";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const repository = new MongoTransactionRepository();
const service = new TransactionService(repository);
const controller = new TransactionController(service);

app.get("/", (_req, res) => res.json({ message: "Transactions API" }));
app.get("/transactions", (_req, res) => controller.getAllTransactions(_req, res));
app.get("/transactions/:id", (req, res) => controller.getTransactionById(req, res));
app.post("/transactions", (req, res) => controller.postTransaction(req, res));

export default app;
