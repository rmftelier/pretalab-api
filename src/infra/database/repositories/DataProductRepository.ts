import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { Product } from "../../../domain/models/Product";

export class DataProductRepository implements ProductRepository {

  public async findAll(): Promise<Product[]> {

    const response = await fetch(`https://pretalab-api-439254010866.us-central1.run.app/products`);

    const json = await response.json();

    const products: Product[] = json.data;

    return products;
  };
};
