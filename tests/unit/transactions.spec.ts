import { Transaction, transactions } from '../../src/data';
import { createTransaction, transactionById } from '../../src/services/transactions';

describe('Transactions by Id', () => {
  it('should return a transaction when ID exists', () => {
    const transaction = transactionById("1");
    expect(transaction).toEqual(transactions[0]);
  });

  it("should return null when transaction is not found", () => {
    const transaction = transactionById("99");
    expect(transaction).toBeNull();
  });
});

describe('Create Transaction', () => {

  it('should create a transaction', () => {

    const transaction: Transaction = {
      id: "11",
      date: "2024-08-02T15:00:00Z",
      description: "Consulta Médica",
      amount: 100,
      type: "income",
      category: "Saúde"
    }

    const newTransaction = createTransaction(transaction);

    expect(newTransaction).toMatchObject({
      date: "2024-08-02T15:00:00Z",
      description: "Consulta Médica",
      amount: 100,
      type: "income",
      category: "Saúde",
      id: expect.any(String)
    });
  });

});



