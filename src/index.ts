// index.ts
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { MongoTransactionRepository } from "./repositories/mongoTransactionRepository";
import { TransactionService } from "./services/transactions";
import { TransactionController } from "./controllers/transactions";
import { ProductController } from "./controllers/product";
import { ProductService } from "./services/products";
import { MongoProductRepository } from "./repositories/mongoProductRepository";
import { MongoPurchaseRepository } from "./repositories/mongoPurchaseRepository";
import { PurchaseController } from "./controllers/purchase";
import { PurchaseService } from "./services/purchases";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

const repository = new MongoTransactionRepository();
const service = new TransactionService(repository);
const controller = new TransactionController(service);

const productRepository = new MongoProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

const purchaseRepository = new MongoPurchaseRepository();
const purchaseService = new PurchaseService(purchaseRepository);
const purchaseController = new PurchaseController(purchaseService);


app.get("/", (_req, res) => res.json({ message: "Transactions API" }));
app.get("/transactions", (_req, res) => controller.getAllTransactions(_req, res));
app.get("/transactions/:id", (req, res) => controller.getTransactionById(req, res));
app.post("/transactions", (req, res) => controller.postTransaction(req, res));

app.get("/products", (_req, res) => productController.getAllProducts(_req, res));

app.get("/purchases", (_req, res) => purchaseController.getAllPurchases(_req, res));
app.get("/purchases/:id", (req, res) => purchaseController.getPurchaseById(req, res));

app.post("/checkout", (req, res) => purchaseController.createPurchase(req, res));

export default app;
