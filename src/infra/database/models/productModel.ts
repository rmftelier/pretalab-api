import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  price: number;
}


const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

export const productModel = mongoose.model<IProduct>('Product', productSchema);