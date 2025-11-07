import { useCartContext } from '../../entities/cart/CartContext';
import type { Product } from '../types/types';

// 🎣 Hook personalizado para manejar el carrito
export const useCart = () => {
  const { state, dispatch } = useCartContext();

  // ➕ Agregar producto al carrito
  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product, quantity }
    });
  };

  // ➖ Eliminar producto del carrito
  const removeFromCart = (productId: number) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId }
    });
  };

  // 🔄 Actualizar cantidad de un producto
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity }
    });
  };

  // 🗑️ Limpiar todo el carrito
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // ➕ Incrementar cantidad en 1
  const incrementQuantity = (productId: number) => {
    const item = state.items.find(item => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  // ➖ Decrementar cantidad en 1
  const decrementQuantity = (productId: number) => {
    const item = state.items.find(item => item.id === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      removeFromCart(productId);
    }
  };

  // 📊 Obtener cantidad de un producto específico
  const getProductQuantity = (productId: number): number => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // 🔍 Verificar si un producto está en el carrito
  const isProductInCart = (productId: number): boolean => {
    return state.items.some(item => item.id === productId);
  };

  // 💰 Formatear precio en pesos chilenos
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP' 
    }).format(price);
  };

  // 📦 Retornar todo lo necesario
  return {
    // Estado
    items: state.items,
    totalItems: state.totalItems,
    totalPrice: state.totalPrice,
    
    // Acciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    
    // Helpers
    getProductQuantity,
    isProductInCart,
    formatPrice,
    
    // Estado completo (por si se necesita)
    cartState: state,
  };
};
