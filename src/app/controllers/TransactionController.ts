import { Request, Response } from "express";
import { TransactionService } from "../services/TransactionService";

export class TransactionController {
  constructor(private service: TransactionService) { }

  public async getAllTransactions(req: Request, res: Response) {
    try {
      const transactions = await this.service.getAll();
      return res.status(200).json(transactions);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }

  };

  public async getTransactionById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const transaction = await this.service.getById(id);
      return res.status(200).json({ transaction });

    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }

  };

  public async postTransaction(req: Request, res: Response) {
    const { date, description, amount, type, category } = req.body;

    try {
      const newTransaction = await this.service.create({ date, description, amount, type, category });
      return res.status(201).json({
        message: "A Transação Financeira foi criada",
        transaction: newTransaction,
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }
}