import { Request, Response } from "express";
import { transactionById } from "../services/transactions";

export const getTransactionById = (req: Request, res: Response) => {
  const { id } = req.params;

  const transaction = transactionById(id);

  if (!transaction) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  return res.status(200).json({ transaction });
}