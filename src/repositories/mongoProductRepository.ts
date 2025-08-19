import { ProductRepository } from "../repositories/ProductRepository";
import { IProduct, productModel } from "../infra/database/models/productModel";
import { Product } from "../models/Product";

export class MongoProductRepository implements ProductRepository {

  private toEntity(doc: IProduct): Product {
    return {
      id: doc._id.toString(),
      name: doc.name,
      price: doc.price
    }
  };

  public async findAll(): Promise<Product[]> {
    const products: IProduct[] = await productModel.find();

    return products.map(this.toEntity);
  };

};
