import { Request, Response } from "express";
import { TransactionService } from "../services/transactions";

export class TransactionController {
  constructor(private service: TransactionService) { }

  async getAllTransactions(req: Request, res: Response) {
    const transactions = await this.service.getAll();

    if (!transactions) {
      return res.status(404).json({ message: "Transactions not found" });
    }

    return res.status(200).json(transactions);
  };

  async getTransactionById(req: Request, res: Response) {
    const { id } = req.params;
    const transaction = await this.service.getById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    return res.status(200).json({ transaction });
  };

  async postTransaction(req: Request, res: Response) {
    const { date, description, amount, type, category } = req.body;

    try {
      const newTransaction = await this.service.create({ date, description, amount, type, category });
      return res.status(201).json({
        message: "Transaction created",
        transaction: newTransaction,
      });
    } catch (error) {
      return res.status(400).json({ message: "Error creating transaction", error });
    }
  }
}