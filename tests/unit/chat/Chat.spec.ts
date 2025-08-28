import { ChatService } from "../../../src/app/services/ChatService";
import { ChatRepository } from "../../../src/domain/repositories/ChatRepository";
import { TransactionService } from "../../../src/app/services/TransactionService";
import { getAi } from "../../../src/infra/ai/gemini";
import { geminiInternal } from "../../../src/infra/adapters/gemini";

jest.mock("../../../src/infra/ai/gemini");
jest.mock("../../../src/infra/adapters/gemini");

describe("ChatService", () => {
  let repositoryMock: jest.Mocked<ChatRepository>;
  let transactionServiceMock: jest.Mocked<TransactionService>;
  let chatService: ChatService;

  beforeEach(() => {
    repositoryMock = { createMessage: jest.fn() } as unknown as jest.Mocked<ChatRepository>;
    transactionServiceMock = { getAll: jest.fn() } as unknown as jest.Mocked<TransactionService>;

    chatService = new ChatService(repositoryMock, transactionServiceMock);
  });

  it("deve retornar a resposta do assistente financeiro", async () => {

    transactionServiceMock.getAll.mockResolvedValue([
      {
        id: "1",
        date: "2024-07-15T10:00:00.000Z",
        description: "Salário de Agosto",
        amount: 5000,
        type: "income",
        category: "Salário"

      }
    ]);

    (geminiInternal as jest.Mock).mockReturnValue({ response: "Aqui está a análise das suas transações" });

    const prompt = "Me mostre o resumo financeiro do mês";
    const result = await chatService.financialAssistant(prompt);

    expect(result).toMatchObject({
      context: [
        {
          role: "user",
          text: prompt
        },
        {
          role: "model",
          text: "Aqui está a análise das suas transações"
        }
      ]
    })

    expect(result.response).toBe("Aqui está a análise das suas transações");
    expect(repositoryMock.createMessage).toHaveBeenCalledWith(result.context);
  });
});
