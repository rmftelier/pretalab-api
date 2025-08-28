import { GoogleGenAI } from "@google/genai";

export const getAi = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

export const generateText = async (prompt: string) =>
  getAi.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  });

