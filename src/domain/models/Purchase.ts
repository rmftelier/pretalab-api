export interface Item {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

export interface Purchase {
  id: string;
  date: string;
  total: number;
  cart: Item[];
};

export interface PurchaseInputDTO {
  cart: Item[];
};

export interface CreatePurchaseDTO {
  date: string;
  total: number;
  cart: Item[];
}