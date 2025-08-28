import { ChatMessage } from "../models/Chat";

export interface ChatRepository {
  createMessage(context: ChatMessage[]): Promise<void>;
}
