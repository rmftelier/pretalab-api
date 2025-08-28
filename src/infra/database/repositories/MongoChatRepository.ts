
import { ChatRepository } from "../../../domain/repositories/ChatRepository";
import { ChatMessage } from "../../../domain/models/Chat";
import { chatModel } from "../models/chatModel";

export class MongoChatRepository implements ChatRepository {

  public async createMessage(context: ChatMessage[]): Promise<void> {
    await chatModel.create({ context });
  }
}
