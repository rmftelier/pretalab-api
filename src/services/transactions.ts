import { Transaction, transactions } from "../data";

export const transactionById = (id: string): Transaction | null => {
  return transactions.find((transaction) => transaction.id === id) || null;
}

export const createTransaction = (data: Transaction) => {

  const newTransaction: Transaction = {
    id: data.id,
    date: data.date,
    description: data.description,
    amount: data.amount,
    type: data.type,
    category: data.category
  };

  transactions.push(newTransaction);

  return newTransaction;
}
