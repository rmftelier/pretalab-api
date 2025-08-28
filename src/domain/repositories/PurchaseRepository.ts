import { CreatePurchaseDTO, PurchaseResponseDTO } from "../models/Purchase";

export interface PurchaseRepository {
  create(data: CreatePurchaseDTO): Promise<PurchaseResponseDTO>;
  findAll(): Promise<PurchaseResponseDTO[]>;
  findById(id: string): Promise<PurchaseResponseDTO | null>;
}
