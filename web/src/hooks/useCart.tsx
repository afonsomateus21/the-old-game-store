import { createContext, useContext, useState, type ReactNode } from "react"

interface CartContentProps {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
};

const CartContext = createContext<CartContentProps | undefined>(undefined);

export const CartProvider = ({ children }: CartProviderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      { children }
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside a CartProvider");
  }

  return context;
}