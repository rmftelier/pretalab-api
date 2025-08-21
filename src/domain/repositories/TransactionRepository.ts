import { Transaction, DataTransaction } from "../models/Transaction";

export interface TransactionRepository {
  findAll(): Promise<Transaction[]>;
  findById(id: string): Promise<Transaction | null>;
  create(data: DataTransaction): Promise<Transaction>;
}
