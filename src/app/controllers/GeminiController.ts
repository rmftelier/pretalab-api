import { Request, Response } from "express";
import { ai, chatAiInteration } from "../services/prompt";

export const aiResponse = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  const response = await ai(prompt);
  res.json({ response });
}

export const chatResponse = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  const response = await chatAiInteration(prompt);
  res.json({ response });
}