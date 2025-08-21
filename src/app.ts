import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { productRoutes, transactionRoutes, purchaseRoutes } from "./app/routes/index";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(productRoutes);
app.use(transactionRoutes);
app.use(purchaseRoutes);

export default app;
