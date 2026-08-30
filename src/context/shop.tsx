import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { products, type Product } from "@/lib/products";

export type CartItem = { product: Product; qty: number };

export type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing" | "Cancelled";
  total: number;
  items: { name: string; qty: number; price: number }[];
  address: string;
};

type ShopValue = {
  cart: CartItem[];
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  orders: Order[];
  placeOrder: (address: string) => Order;
};

const ShopContext = createContext<ShopValue | null>(null);

const seedOrders: Order[] = [
  {
    id: "UMZ12345",
    date: "May 20, 2026",
    status: "Delivered",
    total: 6800,
    items: [
      { name: products[0]!.name, qty: 1, price: products[0]!.price },
      { name: products[1]!.name, qty: 2, price: products[1]!.price },
    ],
    address: "House 24, Gulberg III, Lahore, Pakistan",
  },
  {
    id: "UMZ12344",
    date: "May 15, 2026",
    status: "Shipped",
    total: 4500,
    items: [{ name: products[3]!.name, qty: 2, price: products[3]!.price }],
    address: "House 24, Gulberg III, Lahore, Pakistan",
  },
  {
    id: "UMZ12343",
    date: "May 10, 2026",
    status: "Processing",
    total: 4250,
    items: [{ name: products[2]!.name, qty: 1, price: products[2]!.price }],
    address: "House 24, Gulberg III, Lahore, Pakistan",
  },
  {
    id: "UMZ12342",
    date: "May 05, 2026",
    status: "Cancelled",
    total: 2150,
    items: [{ name: products[5]!.name, qty: 1, price: products[5]!.price }],
    address: "House 24, Gulberg III, Lahore, Pakistan",
  },
];

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>(seedOrders);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((i) => i.product.id === product.id);
      if (found)
        return prev.map((i) => (i.product.id === product.id ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.product.price * i.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const placeOrder = useCallback(
    (address: string) => {
      const order: Order = {
        id: `UMZ${Math.floor(10000 + Math.random() * 89999)}`,
        date: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "Processing",
        total: subtotal + (subtotal > 3000 || subtotal === 0 ? 0 : 250),
        items: cart.map((i) => ({ name: i.product.name, qty: i.qty, price: i.product.price })),
        address,
      };
      setOrders((prev) => [order, ...prev]);
      setCart([]);
      return order;
    },
    [cart, subtotal],
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      cartCount,
      subtotal,
      wishlist,
      toggleWishlist,
      orders,
      placeOrder,
    }),
    [
      cart,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      cartCount,
      subtotal,
      wishlist,
      toggleWishlist,
      orders,
      placeOrder,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
