import { Transaction, DataTransaction} from "../../../domain/models/Transaction";
import { TransactionRepository } from "../../../domain/repositories/TransactionRepository";
import { ITransaction, transactionModel } from "../../../infra/database/models/transactionModel";

export class MongoTransactionRepository implements TransactionRepository {
  private toEntity(doc: ITransaction): Transaction {
    return {
      id: doc._id.toString(),
      date: doc.date.toISOString(),
      description: doc.description,
      amount: doc.amount,
      type: doc.type,
      category: doc.category,
    }
  };

  public async findAll(): Promise<Transaction[]> {

    const transactions: ITransaction[] = await transactionModel.find();

    return transactions.map(this.toEntity);
  };

  public async findById(id: string): Promise<Transaction | null> {
    const transaction = await transactionModel.findOne({ _id: id });

    return transaction ? this.toEntity(transaction) : null;
  };

  public async create(data: DataTransaction): Promise<Transaction> {
    const transaction = await transactionModel.create(data);

    return this.toEntity(transaction);
  };

}
