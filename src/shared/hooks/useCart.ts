import { useCartContext } from '../../entities/cart/CartContext';

//  Formatear precio en pesos chilenos
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('es-CL', { 
    style: 'currency', 
    currency: 'CLP' 
  }).format(price);
};

//  Hook personalizado simplificado para manejar el carrito
export const useCart = () => {
  const context = useCartContext();

  // Retornar todo del contexto + helpers adicionales
  return {
    ...context,
    formatPrice,
  };
};
