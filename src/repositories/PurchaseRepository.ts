import { Purchase, PurchaseItem } from "../models/Purchase";

export interface PurchaseRepository {
  create(purchaseData: { total: number; items: PurchaseItem[]}): Promise<Purchase>;
  findAll(): Promise<Purchase[]>;
  findById(id: string): Promise<Purchase | null>;
}
