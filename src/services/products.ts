import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";

export class ProductService {
  constructor(private repository: ProductRepository) { }

  public getAll(): Promise<Product[]> {
    return this.repository.findAll();
  }

};
