import { create } from 'zustand';

type Product = { id: number; title: string; price: number; thumbnail: string; quantity?: number };

type Store = {
  user: null | { firstName: string };
  token: string | null;
  cart: Product[];
  login: (token: string, user: any) => void;
  logout: () => void;
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, amount: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
};

const useStore = create<Store>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  cart: JSON.parse(localStorage.getItem('cart') || '[]'),
  login: (token, user) => {
    localStorage.setItem('token', token);
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
  addToCart: (product) => set((state) => {
    const item = state.cart.find((p) => p.id === product.id);
    let updatedCart;
    if (item) {
      updatedCart = state.cart.map((p) =>
        p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
      );
    } else {
      updatedCart = [...state.cart, { ...product, quantity: 1 }];
    }
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),
  updateQuantity: (id, amount) => set((state) => {
    const updatedCart = state.cart.map((p) =>
      p.id === id ? { ...p, quantity: amount } : p
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),
  removeFromCart: (id) => set((state) => {
    const updatedCart = state.cart.filter((p) => p.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return { cart: updatedCart };
  }),
  clearCart: () => {
    localStorage.removeItem('cart');
    return { cart: [] };
  },
}));

export default useStore;
