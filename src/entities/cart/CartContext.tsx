import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../../shared/types/types';

//  Tipo para los items del carrito
interface CartItem extends Product {
  quantity: number;
  subtotal: number;
}

//  Context Type
interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  incrementQuantity: (productId: number) => void;
  decrementQuantity: (productId: number) => void;
  getProductQuantity: (productId: number) => number;
  isProductInCart: (productId: number) => boolean;
}

// Crear el Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider del Context
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Estado principal del carrito
  const [items, setItems] = useState<CartItem[]>(() => {
    // Cargar desde localStorage al iniciar
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  //  Calcular totales con useMemo
  const totalItems = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.subtotal, 0);
  }, [items]);

  //  Agregar producto al carrito
  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    if (!product || quantity <= 0) {
      console.error('Invalid product or quantity');
      return;
    }

    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Si ya existe, actualizar cantidad
        return prevItems.map((item, index) =>
          index === existingItemIndex
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * item.price,
              }
            : item
        );
      }
      
      // Si no existe, agregar nuevo item
      const newItem: CartItem = {
        ...product,
        quantity,
        subtotal: product.price * quantity,
      };
      return [...prevItems, newItem];
    });
  }, []);

  //  Eliminar producto del carrito
  const removeFromCart = useCallback((productId: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  //  Actualizar cantidad de un producto
  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity, subtotal: item.price * quantity }
          : item
      )
    );
  }, [removeFromCart]);

  //  Limpiar todo el carrito
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  //  Incrementar cantidad en 1
  const incrementQuantity = useCallback((productId: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: (item.quantity + 1) * item.price,
            }
          : item
      )
    );
  }, []);

  //  Decrementar cantidad en 1
  const decrementQuantity = useCallback((productId: number) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === productId);
      
      if (!item) return prevItems;
      
      if (item.quantity === 1) {
        // Si es 1, eliminar del carrito
        return prevItems.filter((item) => item.id !== productId);
      }
      
      // Decrementar cantidad
      return prevItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: item.quantity - 1,
              subtotal: (item.quantity - 1) * item.price,
            }
          : item
      );
    });
  }, []);

  //  Obtener cantidad de un producto específico
  const getProductQuantity = useCallback(
    (productId: number): number => {
      const item = items.find((item) => item.id === productId);
      return item ? item.quantity : 0;
    },
    [items]
  );

  //  Verificar si un producto está en el carrito
  const isProductInCart = useCallback(
    (productId: number): boolean => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  // Memoizar el valor del contexto
  const value = useMemo(
    () => ({
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      incrementQuantity,
      decrementQuantity,
      getProductQuantity,
      isProductInCart,
    }),
    [
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      incrementQuantity,
      decrementQuantity,
      getProductQuantity,
      isProductInCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//  Hook básico para usar el Context
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
};