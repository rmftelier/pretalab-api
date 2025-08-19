import { PurchaseRepository } from "./PurchaseRepository";
import { IPurchase, purchaseModel } from "../infra/database/models/purchaseModel";
import { Purchase } from "../models/Purchase";

export class MongoPurchaseRepository implements PurchaseRepository {

  private toEntity(doc: IPurchase): Purchase {
    return {
      id: doc._id.toString(),
      date: doc.date,
      total: doc.total,
      items: doc.items.map(item => ({
        productId: item.productId.toString(),
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    };
  };

  public async findAll(): Promise<Purchase[]> {
    const purchases: IPurchase[] = await purchaseModel.find();

    return purchases.map(this.toEntity);
  };

  public async findById(id: string): Promise<Purchase | null> {
    const purchase = await purchaseModel.findById(id);

    if (!purchase) return null;

    return this.toEntity(purchase);
  }

};
