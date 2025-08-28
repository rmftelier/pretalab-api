import { PurchaseRepository } from "../../../domain/repositories/PurchaseRepository";
import { IPurchase, purchaseModel } from "../../../infra/database/models/purchaseModel";
import { CreatePurchaseDTO, Purchase } from "../../../domain/models/Purchase";

export class MongoPurchaseRepository implements PurchaseRepository {

  private toEntity(doc: IPurchase): Purchase {
    return {
      id: doc._id.toString(),
      date: doc.date.toISOString(),
      total: doc.total,
      cart: doc.cart.map(item => ({
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
    const purchase = await purchaseModel.findOne({ _id: id });

    return purchase ? this.toEntity(purchase) : null;
  }

  public async create(data: CreatePurchaseDTO): Promise<Purchase> {

    const createPurchase = await purchaseModel.create(data);

    return this.toEntity(createPurchase);
  };

};
