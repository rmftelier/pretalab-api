import { geminiInternal } from "../adapters/gemini";
import { generateText } from "./gemini";
import { chat } from "./gemini";

const context: any[] = [];

export const ai = async (prompt: string) => {

  const data = await generateText(prompt);
  const response = geminiInternal(data);

  return response;
};

export const chatAi = async (prompt: string) => {

  const input = {
    role: "user",
    parts: [
      {
        text: prompt
      }
    ]
  }

  context.push(input);

  const data = await chat(context);
  console.log(data);
  const { response } = geminiInternal(data); //desestruturação

  const output = {
    role: "model",
    parts: [
      {
        text: response
      }
    ]
  }

  context.push(output);

  return { response, context };
};