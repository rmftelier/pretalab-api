import { Purchase } from "../models/Purchase";

export interface PurchaseRepository {
  create(data: Omit<Purchase, "id">): Promise<Purchase>;
  findAll(): Promise<Purchase[]>;
  findById(id: string): Promise<Purchase | null>;
}
