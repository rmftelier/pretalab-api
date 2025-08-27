import { GoogleGenAI } from "@google/genai";

const getAi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

export const generateText = async (prompt: string) =>
  getAi.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

export const chat = async (prompt: any[]) =>
  getAi.models.generateContent({
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
    },
  });