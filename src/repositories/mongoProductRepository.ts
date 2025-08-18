import { Product } from "../models/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import { productModel } from "../infra/database/models/productModel";

export class MongoProductRepository implements ProductRepository {
  private toEntity(doc: any): Product {
    return {
      name: doc.name,
      price: doc.price,
      id: doc._id.toString()
    }
  };

  async findAll(): Promise<Product[]> {
    const docs = await productModel.find();
    return docs.map((doc: any) => this.toEntity(doc));
  };



}
