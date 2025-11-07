import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartState, CartAction } from '../../shared/types/types';

// 🛒 Estado inicial del carrito
const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// 🔧 Reducer para manejar las acciones del carrito
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === product.id);
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        // Si ya existe, actualizar cantidad
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { 
                ...item, 
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * item.price
              }
            : item
        );
      } else {
        // Si no existe, agregar nuevo item
        const newItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
          quantity,
          subtotal: product.price * quantity,
        };
        updatedItems = [...state.items, newItem];
      }
      
      return calculateTotals({ ...state, items: updatedItems });
    }

    case 'REMOVE_FROM_CART': {
      const { productId } = action.payload;
      const updatedItems = state.items.filter(item => item.id !== productId);
      return calculateTotals({ ...state, items: updatedItems });
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Si la cantidad es 0 o negativa, eliminar el item
        const updatedItems = state.items.filter(item => item.id !== productId);
        return calculateTotals({ ...state, items: updatedItems });
      }
      
      const updatedItems = state.items.map(item =>
        item.id === productId
          ? { ...item, quantity, subtotal: item.price * quantity }
          : item
      );
      
      return calculateTotals({ ...state, items: updatedItems });
    }

    case 'CLEAR_CART': {
      return initialCartState;
    }

    default:
      return state;
  }
};

// 🧮 Función helper para calcular totales
const calculateTotals = (state: CartState): CartState => {
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = state.items.reduce((total, item) => total + item.subtotal, 0);
  
  return {
    ...state,
    totalItems,
    totalPrice,
  };
};

// 📦 Context Type
interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

// 🎯 Crear el Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 🛡️ Provider del Context
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// 🎣 Hook básico para usar el Context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};