import { geminiInternal } from "../../infra/adapters/gemini";
import { generateText } from "./gemini";
import { chat } from "./gemini";

const chatContext: any[] = [];

export const ai = async (prompt: string) => {

  const data = await generateText(prompt);
  const response = geminiInternal(data);

  return response;
};


const chatItem = (role: string, text: string) => {
  const data = {
    role,
    parts: [
      {
        text
      }
    ]
  };
  chatContext.push(data);
}

export const chatAiInteration = async (prompt: string) => {
  chatItem("user", prompt);
  const data = await chat(chatContext);
  const { response } = geminiInternal(data);
  chatItem("model", response);

  return {
    response,
    context: chatContext
  };
};