import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { CART_STORAGE_KEY, PRICE_MULTIPLIER } from '@constants/student';
import type { Product } from '@models/product';

export type CartItem = Pick<Product, 'id' | 'title' | 'image'> & {
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: number) => void;
  changeQty: (id: number, quantity: number) => void;
  totalAmount: () => number;
  addItem: (product: Product) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;
  removeItem: (id: number) => void;
  totalQuantity: () => number;
  totalPrice: () => number;
};

const MAX_QUANTITY = 99;
export const toVnd = (price: number) => Math.round(price * PRICE_MULTIPLIER);

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) => set((state) => {
        const existing = state.items.find((item) => item.id === product.id);
        if (existing) {
          return { items: state.items.map((item) => item.id === product.id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) } : item) };
        }
        return { items: [...state.items, { id: product.id, title: product.title, image: product.image, price: product.price, quantity: 1 }] };
      }),
      remove: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      changeQty: (id, quantity) => set((state) => ({ items: state.items.map((item) => item.id === id ? { ...item, quantity: Math.min(MAX_QUANTITY, Math.max(0, quantity)) } : item).filter((item) => item.quantity > 0) })),
      totalQuantity: () => get().items.reduce((total, item) => total + item.quantity, 0),
      totalAmount: () => get().items.reduce((total, item) => total + toVnd(item.price) * item.quantity, 0),
      addItem: (product) => get().add(product),
      increment: (id) => get().changeQty(id, (get().items.find((item) => item.id === id)?.quantity ?? 0) + 1),
      decrement: (id) => get().changeQty(id, (get().items.find((item) => item.id === id)?.quantity ?? 0) - 1),
      removeItem: (id) => get().remove(id),
      totalPrice: () => get().totalAmount(),
    }),
    { name: CART_STORAGE_KEY, storage: createJSONStorage(() => AsyncStorage) },
  ),
);
