import { TransactionService } from "../../../src/app/services/TransactionService";
import { TransactionRepository } from "../../../src/domain/repositories/TransactionRepository";
import { Transaction, DataTransaction } from "../../../src/domain/models/Transaction";

describe("TransactionService", () => {
  let repositoryMock: jest.Mocked<TransactionRepository>;
  let service: TransactionService;

  beforeEach(() => {
    repositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn()
    };

    service = new TransactionService(repositoryMock);
  });

  it("deve retornar uma transação quando o ID existir", async () => {
    const fakeTransaction: Transaction = {
      id: "1",
      date: "2024-08-02T15:00:00Z",
      description: "Consulta Médica",
      amount: 100,
      type: "income",
      category: "Saúde",
    };

    repositoryMock.findById.mockResolvedValue(fakeTransaction);

    const correspondingTransaction = await service.getById("1");

    expect(correspondingTransaction).toMatchObject(fakeTransaction);

  });

  it("deve retornar uma mensagem de erro quando a transação não for encontrada", async () => {
    repositoryMock.findById.mockResolvedValue(null);

    await expect(service.getById("99"))
      .rejects
      .toThrow("A transação financeira com o id informado não foi encontrada.");

    expect(repositoryMock.findById).toHaveBeenCalledWith("99");
  });

  it("deve criar uma transação chamando o repositório corretamente", async () => {
    const transactionData: DataTransaction = {
      date: "2024-08-02T15:00:00Z",
      description: "Show do BTS",
      amount: 1000,
      type: "expense",
      category: "Lazer"
    };

    const createdTransaction: Transaction = {
      id: "1",
      ...transactionData
    };

    repositoryMock.create.mockResolvedValue(createdTransaction);

    const result = await service.create(transactionData);

    expect(repositoryMock.create).toHaveBeenCalledWith(transactionData);
    expect(result).toMatchObject(createdTransaction);
  });

});