import { Request, Response } from "express";
import { createTransaction, transactionById } from "../services/transactions";

export const getTransactionById = (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = transactionById(id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  return res.status(200).json({ transaction });
};

export const postTransaction = (req: Request, res: Response) => {
  const { id, date, description, amount, type, category } = req.body;

  const newTransaction = createTransaction({ id, date, description, amount, type, category });

  return res.status(201).json({
    message: "Transaction created",
    transaction: newTransaction
  });
}