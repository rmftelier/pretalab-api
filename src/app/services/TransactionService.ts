import { Transaction, DataTransaction } from "../../domain/models/Transaction";
import { TransactionRepository } from "../../domain/repositories/TransactionRepository";


export class TransactionService {
  constructor(private repository: TransactionRepository) { }

  public async getAll(): Promise<Transaction[]> {
    const transactions = await this.repository.findAll();

    if (!transactions) {
      throw new Error("Transações financeiras não encontradas.");
    }

    return await this.repository.findAll();
  }

  public async getById(id: string): Promise<Transaction | null> {

    const transaction = await this.repository.findById(id);

    if (!transaction) {
      throw new Error("A transação financeira com o id informado não foi encontrado.");
    }

    return this.repository.findById(id);
  }

  public async create(data: DataTransaction) {
    return this.repository.create(data);
  }
}
