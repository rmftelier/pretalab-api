import { Transaction } from "../core/entities/Transaction";
import { TransactionRepository } from "../repositories/TransactionRepository";
import { transactionModel } from "../infra/database/models/transactionModel"

export class MongoTransactionRepository implements TransactionRepository {
  private toEntity(doc: any): Transaction {
    return {
      date: doc.date,
      description: doc.description,
      amount: doc.amount,
      type: doc.type,
      category: doc.category,
      id: doc._id.toString()
    }
  };

  async findAll(): Promise<Transaction[]> {
    const docs = await transactionModel.find();
    return docs.map((doc: any) => this.toEntity(doc));
  };

  async findById(id: string): Promise<Transaction | null> {
    const doc = await transactionModel.findOne({ _id: id });

    return doc ? this.toEntity(doc) : null;
  };

  async create(transaction: Transaction): Promise<Transaction> {
    const doc = await transactionModel.create(transaction);

    return this.toEntity(doc);
  };

}
