import express from "express";
import { transactions } from "./data";
import { getTransactionById } from "./controllers/transactions";
import cors from 'cors';
import { aiResponse, chatResponse } from "./controllers/ai";


const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API" });
});

app.get("/transactions", (_req, res) => {
  res.json({ transactions });
});

app.get("/transactions/:id", (req, res) => {
  getTransactionById(req, res);
});

app.post("/ai", async (req, res) => {
  aiResponse(req, res);
});

app.post("/chat", async (req, res) => {
  chatResponse(req, res);
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
