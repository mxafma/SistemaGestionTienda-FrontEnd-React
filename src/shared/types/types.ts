// Unified product model used across the app
export interface ProductType {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  active?: boolean;
}

// Backwards compatibility: many files import `Product` already.
// Keep `Product` as an alias to the new `ProductType` so migration is incremental.
export type Product = ProductType;

// Tipo para los items del carrito
export interface CartItem extends ProductType {
  quantity: number;
  subtotal: number;
}