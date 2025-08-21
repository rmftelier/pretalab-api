export interface PurchaseItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

export interface Purchase {
  id: string;
  date: string;
  total: number;
  items: PurchaseItem[];
};

export interface DataPurchase {
  items: PurchaseItem[];
};

export interface CreatePurchase {
  date: string;
  total: number;
  items: PurchaseItem[];
}