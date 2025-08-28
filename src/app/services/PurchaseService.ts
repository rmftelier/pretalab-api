import { PurchaseInputDTO, Purchase, PurchaseResponseDTO, Item, CreatePurchaseDTO } from "../../domain/models/Purchase";
import { PurchaseRepository } from "../../domain/repositories/PurchaseRepository";
import { ProductService } from "./ProductService";

export class PurchaseService {

  constructor(
    private repository: PurchaseRepository,
    private productService: ProductService
  ) { }

  public async getAll(): Promise<PurchaseResponseDTO[]> {
    const purchases = await this.repository.findAll();

    if (!purchases) {
      throw new Error("Compras não encontradas.");
    }

    return purchases;
  };

  public async getById(id: string): Promise<PurchaseResponseDTO | null> {
    const purchase = await this.repository.findById(id);

    if (!purchase) {
      throw new Error('Compra com o id informado não foi encontrada.');
    }

    return purchase;
  };

  public async checkout(data: PurchaseInputDTO): Promise<PurchaseResponseDTO> {

    if (!data.cart || data.cart.length === 0) {
      throw new Error("A compra deve ter pelo menos 1 item.");
    }

    const products = await this.productService.getAll();

    const cart: Item[] = data.cart.map(item => {
      const product = products.find(p => p.id === item.productId);
      if (!product) {
        throw new Error(`Produto ${item.productId} não foi encontrado.`);
      }

      return {
        productId: item.productId,
        quantity: item.quantity,
        name: product.name,
        price: product.price
      };
    });

    const total = cart.reduce(
      (soma, item) => soma + item.price * item.quantity, 0
    );

    if (total > 20000) {
      throw new Error("O valor total da compra excede o limite de R$20.000.");
    }

    const purchaseToSave: CreatePurchaseDTO = {
      date: new Date().toISOString(),
      total,
      cart
    }

    const createdPurchase = await this.repository.create(purchaseToSave);

    return createdPurchase;
  }

};
