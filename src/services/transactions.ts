import { Transaction } from "../models/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";

export class TransactionService {
  constructor(private repository: TransactionRepository) { }

  getAll() {
    return this.repository.findAll();
  }

  getById(id: string) {
    return this.repository.findById(id);
  }

  create(transaction: Transaction) {
    return this.repository.create(transaction);
  }
}
