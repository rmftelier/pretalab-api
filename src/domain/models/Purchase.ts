export interface Item {
  productId: string;
  quantity: number;
  name: string;
  price: number;
}

export interface PurchaseItemInputDTO {
  productId: string;
  quantity: number;
}

export interface PurchaseInputDTO {
  cart: PurchaseItemInputDTO[];
};

export interface CreatePurchaseDTO {
  date: string;
  total: number;
  cart: Item[];
}

export interface PurchaseResponseDTO {
  id: string; 
  date: string; 
  total: number; 
  items: Item[];
}