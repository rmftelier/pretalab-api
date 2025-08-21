import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { Product, products } from "../../../domain/models/Product";

export class InMemoryProductRepository implements ProductRepository {

  private registeredProducts: Product[] = products;

  public async findAll(): Promise<Product[]> {
    return this.registeredProducts;
  };

};
