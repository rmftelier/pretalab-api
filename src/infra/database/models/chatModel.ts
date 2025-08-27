import mongoose, { Schema } from "mongoose";

export interface IPartSchema {
  role: string;
  text: string;
}

export interface IChatSchema extends Document {
  context: IPartSchema[],
  createdAt: Date;
}

const partSchema = new Schema<IPartSchema>({
  role: { type: String, required: true },
  text: { type: String, required: true }
});

const chatSchema = new Schema<IChatSchema>({
  context: { type: [partSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export const chatModel = mongoose.model<IChatSchema>("Chat", chatSchema);
