import { Purchase } from "../models/Purchase";
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

};
