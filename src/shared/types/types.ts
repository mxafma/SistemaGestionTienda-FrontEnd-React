export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
}

//  Tipo para los items del carrito
export interface CartItem extends Product {
  quantity: number;
  subtotal: number;
}