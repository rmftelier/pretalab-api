import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { transactionsRoutes } from "./routes/routes";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(transactionsRoutes);

export default app;
