import { Request, Response } from "express";
import { ChatService } from "../services/ChatService";

export class ChatController {
  constructor(private service: ChatService) { }

  public async chatResponse(req: Request, res: Response) {
    const { message } = req.body;

    try {
      const response = await this.service.financialAssistant(message);
      return res.status(200).json({ reply: response });

    } catch (error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}
