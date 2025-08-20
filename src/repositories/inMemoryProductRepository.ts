import { ProductRepository } from "../repositories/ProductRepository";
import { Product, products } from "../models/Product";

export class InMemoryProductRepository implements ProductRepository {

  private registeredProducts: Product[] = products;

  public async findAll(): Promise<Product[]> {
    return this.registeredProducts;
  };

};
