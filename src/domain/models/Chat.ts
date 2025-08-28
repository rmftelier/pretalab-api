export interface ChatMessage {
  role: "user" | "model";
  text: string;
}

export interface ChatContext {
  context: ChatMessage[];
}
