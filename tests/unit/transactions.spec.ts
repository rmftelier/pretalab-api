import { TransactionService } from "../../src/services/transactions";
import { TransactionRepository } from "../../src/repositories/TransactionRepository";
import { Transaction } from "../../src/models/Transaction";

describe("TransactionService", () => {
  let repositoryMock: jest.Mocked<TransactionRepository>;
  let service: TransactionService;

  beforeEach(() => {
    //Cria um mock com todos os métodos do repositório
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

    //Simula que o repositório retorna essa transação quando buscar pelo ID
    repositoryMock.findById.mockResolvedValue(fakeTransaction);

    //Executa o método
    const correspondingTransaction = await service.getById("1");

    expect(correspondingTransaction).toEqual(fakeTransaction);

  });

  it("deve retornar null quando a transação não for encontrada", async () => {
    repositoryMock.findById.mockResolvedValue(null);

    const result = await service.getById("99");

    expect(repositoryMock.findById).toHaveBeenCalledWith("99");
    expect(result).toBeNull();
  });

  it("deve criar uma transação chamando o repositório corretamente", async () => {
    const fakeTransaction: Transaction = {
      date: "2024-08-02T15:00:00Z",
      description: "Show do BTS",
      amount: 1000,
      type: "expense",
      category: "Lazer"
    };

    repositoryMock.create.mockResolvedValue(fakeTransaction);

    const result = await service.create(fakeTransaction);

    expect(repositoryMock.create).toHaveBeenCalledWith(fakeTransaction);
    expect(result).toEqual(fakeTransaction);
  });

})