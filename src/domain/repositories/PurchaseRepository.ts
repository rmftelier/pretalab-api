import { Purchase, CreatePurchaseDTO } from "../models/Purchase";

export interface PurchaseRepository {
  create(data: CreatePurchaseDTO): Promise<Purchase>;
  findAll(): Promise<Purchase[]>;
  findById(id: string): Promise<Purchase | null>;
}
