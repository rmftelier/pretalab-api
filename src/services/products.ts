import { ProductRepository } from "../repositories/ProductRepository";

export class ProductService {
  constructor(private repository: ProductRepository) { }

  getAll() {
    return this.repository.findAll();
  }

}
