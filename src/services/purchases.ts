import { Purchase } from "../models/Purchase";
import { PurchaseRepository } from "../repositories/PurchaseRepository";

export class PurchaseService {
  constructor(private repository: PurchaseRepository) { }

  public getAll(): Promise<Purchase[]> {
    return this.repository.findAll();
  }

  public getById(id: string): Promise<Purchase | null> {
    return this.repository.findById(id);
  }

};
