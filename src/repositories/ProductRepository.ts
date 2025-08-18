import { Product } from "../models/Product";

export interface ProductRepository {
  findAll(): Promise<Product[]>;

}
