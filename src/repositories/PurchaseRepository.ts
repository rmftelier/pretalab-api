import { Purchase } from "../models/Purchase";

export interface PurchaseRepository {
  findAll(): Promise<Purchase[]>;
  findById(id: string): Promise<Purchase | null>;
}
