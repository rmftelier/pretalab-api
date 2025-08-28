import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPurchaseItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

export interface IPurchase extends Document {
  _id: Types.ObjectId;
  date: Date;
  total: number;
  cart: IPurchaseItem[];
}

const purchaseItemSchema = new Schema<IPurchaseItem>({
  productId: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: { type: String },
  price: { type: Number }
});

const purchaseSchema = new Schema<IPurchase>({
  date: { type: Date, default: Date.now },
  total: { type: Number, required: true },
  cart: [purchaseItemSchema]
});

export const purchaseModel = mongoose.model<IPurchase>('Purchase', purchaseSchema);