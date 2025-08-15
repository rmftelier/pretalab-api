import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export const generateText = async (prompt: string) =>
  ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

//passar como um chat
export const chat = async (prompt: any[]) =>
  ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: {
        type: "object",
        properties: {
          response: { type: "string" },
        },
      },
      systemInstruction: "Você é uma profissional de tecnologia, que atende crianças e precisa explicar as perguntas de forma didática. Toda pergunta que não for sobre tecnologia, você deve dizer que não pode responder."
    }
  });

