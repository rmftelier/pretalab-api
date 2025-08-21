import { Purchase, PurchaseItem } from "../../domain/models/Purchase";
import { InMemoryProductRepository } from "../../infra/database/repositories/InMemoryProductRepository";
import { PurchaseRepository } from "../../domain/repositories/PurchaseRepository";

export class PurchaseService {
  private productRepository = new InMemoryProductRepository();

  constructor(private repository: PurchaseRepository) { }

  public async getAll(): Promise<Purchase[]> {
    return await this.repository.findAll();
  };

  public async getById(id: string): Promise<Purchase | null> {
    const purchase = await this.repository.findById(id);

    if (!purchase) {
      throw new Error('Purchase not found');
    }

    return purchase;
  };

  public async checkout(productIds: { id: number; quantity: number }[]): Promise<Purchase> {

    const products = await this.productRepository.findAll();

    const items: PurchaseItem[] = productIds.map(({ id, quantity }) => {
      const product = products.find((p) => p.id === id);

      if (!product) {
        throw new Error(`Produto com o id ${id} não foi encontrado`);
      };

      return {
        productId: product.id,
        quantity,
        name: product.name,
        price: product.price
      };
    });

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (total > 20000) {
      throw new Error("O valor total da compra excede o limite de R$20.000.");
    }

    const savedPurchase = await this.repository.create({ total, items });

    return savedPurchase;

  }

};
