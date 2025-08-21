import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { Product } from "../../domain/models/Product";

export class ProductService {
  constructor(private repository: ProductRepository) { }

  public getAll(): Promise<Product[]> {
    return this.repository.findAll();
  }  
};
