import "dotenv/config";
import express from "express";
import cors from "cors";
import { productRoutes, transactionRoutes, purchaseRoutes, geminiRoutes } from "./app/routes/index";

const app = express();

app.use(express.json());
app.use(cors());

app.use(productRoutes);
app.use(transactionRoutes);
app.use(purchaseRoutes);
app.use(geminiRoutes);

export default app;
