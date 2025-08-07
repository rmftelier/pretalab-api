import { Transaction, transactions } from "../data";

export const transactionById = (id: string): Transaction | null => {
  return transactions.find((transaction) => transaction.id === id) || null;
}