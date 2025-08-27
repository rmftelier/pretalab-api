import { Request, Response } from "express";
import { GeminiService } from "../services/GeminiService";

export class GeminiController {
  constructor(private service: GeminiService) { }

  public async aiResponse(req: Request, res: Response) {
    const { prompt } = req.body;

    try {
      const response = await this.service.ai(prompt);
      return res.status(200).json({ response });

    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }

  public async chatResponse(req: Request, res: Response) {
    const { prompt } = req.body;

    try {
      const response = await this.service.chatAiInteration(prompt);
      return res.status(200).json({ response });

    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}
