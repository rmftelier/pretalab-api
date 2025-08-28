import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITransaction extends Document {
  _id: Types.ObjectId;
  date: Date;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
}

const transactionSchema = new Schema<ITransaction>({
  date: { type: Date, default: Date.now, required: true },
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: { type: String, required: true }
});

export const transactionModel = mongoose.model('Transaction', transactionSchema);