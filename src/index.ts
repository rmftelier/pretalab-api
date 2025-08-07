import express from "express";
import { transactions } from "./data";
import { postTransaction, getTransactionById } from "./controllers/transactions";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Transactions API" });
});

app.get("/transactions", (_req, res) => {
  res.json({ transactions });
});

app.get("/transactions/:id", (req, res) => {
  getTransactionById(req, res);
});

app.post("/transactions", (req, res) => {
  postTransaction(req, res);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
