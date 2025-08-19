import { Purchase, PurchaseItem } from "../models/Purchase";
import { PurchaseRepository } from "../repositories/PurchaseRepository";

export class PurchaseService {
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

  public async checkout(items: PurchaseItem[]): Promise<Purchase> {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (total > 20000) {
      throw new Error("O valor total da compra excede o limite de R$20.000.");
    }

    const savedPurchase = await this.repository.create({ total, items });

    return savedPurchase;

  }

};
