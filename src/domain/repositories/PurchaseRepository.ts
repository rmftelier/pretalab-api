import { Purchase, PurchaseItem } from "../models/Purchase";

export interface PurchaseRepository {
  create(purchaseData: { total: number; items: { productId: number; quantity: number }[] }): Promise<Purchase>;
  findAll(): Promise<Purchase[]>;
  findById(id: string): Promise<Purchase | null>;
}
