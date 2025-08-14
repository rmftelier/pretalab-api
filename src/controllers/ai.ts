import { Request, Response } from "express";
import { ai, chatAi } from "../services/prompt";

export const aiResponse = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  const response = await ai(prompt);
  res.json({ response });
}

export const chatResponse = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  const response = await chatAi(prompt);
  res.json({ response });
}