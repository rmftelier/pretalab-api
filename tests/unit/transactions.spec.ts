import { transactions } from '../../src/data';
import { transactionById } from '../../src/services/transactions';

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


