import { Purchase, CreatePurchase } from "../models/Purchase";

export interface PurchaseRepository {
  create(data: CreatePurchase): Promise<Purchase>;
  findAll(): Promise<Purchase[]>;
  findById(id: string): Promise<Purchase | null>;
}
