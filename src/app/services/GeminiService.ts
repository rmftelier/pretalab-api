
import { geminiInternal } from "../../infra/adapters/gemini";
import { generateText, chat } from "../../infra/ai/gemini";

export class GeminiService {

  private chatContext: any[] = [];

  private chatItem = (role: string, text: string) => {
    const data = {
      role,
      parts: [
        {
          text
        }
      ]
    };
    this.chatContext.push(data);
  }

  public async ai(prompt: string) {
    const data = await generateText(prompt);
    const response = geminiInternal(data);

    return response;
  }

  public async chatAiInteration(prompt: string) {
    this.chatItem("user", prompt);
    const data = await chat(this.chatContext);
    const { response } = geminiInternal(data);
    this.chatItem("model", response);

    return {
      response,
      context: this.chatContext
    };
  };

}




