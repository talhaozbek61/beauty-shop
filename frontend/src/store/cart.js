import { create } from "zustand";

const API_URL = "http://localhost:3000/api";

export const useCartStore = create((set) => ({
  cart: [],
  totalPrice: 0,

  fetchCart: async (userId) => {
    const res = await fetch(`${API_URL}/cart/${userId}`);
    const data = await res.json();
    if (!data.success) return;

    const total = data.data.reduce((acc, item) => acc + item.totalPrice, 0);

    set({ cart: data.data, totalPrice: total });
  },
  addToCart: async (userId, productId) => {
    const res = await fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, productId }),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set({ cart: data.data.items });

    return {
      success: true,
      message: data.message,
    };
  },
  removeFromCart: async ({ userId, productId }) => {
    if (!userId || !productId) {
      return { success: false, message: "User ID or Product ID is missing" };
    }

    const res = await fetch(`${API_URL}/cart/item/${userId}/${productId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    set({ cart: data.data });

    return {
      success: true,
      message: data.message,
    };
  },
  clearCart: async (userId) => {
    const res = await fetch(`${API_URL}/cart/clear/${userId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set({ cart: [], totalPrice: 0 });
    return {
      success: true,
      message: data.message,
    };
  },
}));
