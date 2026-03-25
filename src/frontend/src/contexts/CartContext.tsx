import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
  id: string;
  name: string;
  nameTamil: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerPincode: string;
  paymentMethod: "cod" | "gpay";
  status: "pending" | "confirmed" | "preparing" | "delivered";
  createdAt: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  subtotal: number;
  cgst: number;
  sgst: number;
  itemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (v: boolean) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  lastOrder: Order | null;
  setLastOrder: (o: Order | null) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("grandleaf_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem("grandleaf_orders");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    localStorage.setItem("grandleaf_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("grandleaf_orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  };

  const clearCart = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const cgst = Math.round(subtotal * 0.025);
  const sgst = Math.round(subtotal * 0.025);
  const total = subtotal + cgst + sgst;
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
        subtotal,
        cgst,
        sgst,
        itemCount,
        isCartOpen,
        setIsCartOpen,
        orders,
        addOrder,
        lastOrder,
        setLastOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
