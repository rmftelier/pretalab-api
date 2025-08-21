import { ProductRepository } from "../../domain/repositories/ProductRepository";
import { Product } from "../../domain/models/Product";

export class ProductService {
  constructor(private repository: ProductRepository) { }

  public async getAll(): Promise<Product[]> {
    
    const products = await this.repository.findAll();

    return products;
  }  
};
