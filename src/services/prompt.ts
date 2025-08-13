import { geminiInternal } from "../adapters/gemini";
import { generateText } from "./gemini";

export const ai = async (prompt: string) => {
  const data = await generateText(prompt);
  const response = geminiInternal(data);
  return response;
}