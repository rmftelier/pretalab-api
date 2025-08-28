import { PurchaseInputDTO, Purchase } from "../../domain/models/Purchase";
import { PurchaseRepository } from "../../domain/repositories/PurchaseRepository";

export class PurchaseService {

  constructor(private repository: PurchaseRepository) { }

  public async getAll(): Promise<Purchase[]> {
    const purchases = await this.repository.findAll();

    if (!purchases) {
      throw new Error("Compras não encontradas.");
    }

    return await this.repository.findAll();
  };

  public async getById(id: string): Promise<Purchase | null> {
    const purchase = await this.repository.findById(id);

    if (!purchase) {
      throw new Error('Compra com o id informado não foi encontrada.');
    }

    return purchase;
  };

  public async checkout(data: PurchaseInputDTO): Promise<Purchase> {

    if (!data.cart || data.cart.length === 0) {
      throw new Error("A compra deve ter pelo menos 1 item.");
    }

    const total = data.cart.reduce(
      (soma, item) => soma + item.price * item.quantity, 0
    );

    if (total > 20000) {
      throw new Error("O valor total da compra excede o limite de R$20.000.");
    }

    const purchaseToSave = {
      date: new Date().toISOString(),
      total,
      ...data
    }
    
    const createPurchase = await this.repository.create(purchaseToSave);

    return createPurchase;
  }

};
