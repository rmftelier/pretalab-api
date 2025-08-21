import { PurchaseRepository } from "../../../domain/repositories/PurchaseRepository";
import { IPurchase, purchaseModel } from "../../../infra/database/models/purchaseModel";
import { Purchase } from "../../../domain/models/Purchase";
import { products } from "../../../domain/models/Product";

export class MongoPurchaseRepository implements PurchaseRepository {

  private toEntity(doc: IPurchase): Purchase {
    return {
      id: doc._id.toString(),
      date: doc.date.toISOString(),
      total: doc.total,
      items: doc.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        name: item.name,
        price: item.price
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

  public async create(purchaseData: { total: number; items: { productId: number; quantity: number }[] }): Promise<Purchase> {

    const itemsWithDetails = purchaseData.items.map(item => {
      const product = products.find(p => p.id === item.productId)!;
      return {
        ...item,
        name: product.name,
        price: product.price,
      };
    });

    const purchase = await purchaseModel.create({ ...purchaseData, items: itemsWithDetails });

    return this.toEntity(purchase);
  };

};
