import { geminiInternal } from "../../infra/adapters/gemini";
import { getAi } from "../../infra/ai/gemini";
import { TransactionService } from "./TransactionService";
import { MongoTransactionRepository } from "../../infra/database/repositories/MongoTransactionRepository";
import { ChatRepository } from "../../domain/repositories/ChatRepository";
import { ChatMessage } from "../../domain/models/Chat";

export class ChatService {

  constructor(private repository: ChatRepository) { }

  private transactionRepository = new MongoTransactionRepository();
  private transactionService = new TransactionService(this.transactionRepository);

  private chatContext: ChatMessage[] = [];

  private addMessage(role: "user" | "model", text: string) {
    this.chatContext.push({ role, text });
  }

  public async financialAssistant(prompt: string) {

    this.addMessage("user", prompt);

    const transactions = await this.transactionService.getAll();

    const systemInstruction = `Você é um assistente financeiro e vai analisar os dados informados, conforme a solicitaçao do usuário. Os dados informados estão dentro de 
    um array e possuem, valor, categoria, data, descrição e tipo (entrada ou saída). Os dados informados são:`;

    const model = await getAi.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: {
          type: "object",
          properties: {
            response: { type: "string" }
          },

        },
        systemInstruction: `${systemInstruction} ${JSON.stringify(transactions)}`
      }
    });

    const { response } = geminiInternal(model);

    this.addMessage("model", response);

    await this.repository.createMessage(this.chatContext);

    return {
      response,
      context: this.chatContext
    };
  }

}





