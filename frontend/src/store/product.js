import { create } from "zustand";

const API_URL = import.meta.env.API_URL || "http://localhost:3000/api";

import { categories } from "../../../shared/constants/categories";

export const useProductStore = create((set) => ({
  products: [],
  product: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.desc ||
      !newProduct.price ||
      !newProduct.image
    )
      return { success: false, message: "Please fill in all fields." };

    const allowedValues = categories.map((cat) => cat.value);

    if (!allowedValues.includes(newProduct.category)) {
      return { success: false, message: "Invalid category selected." };
    }

    if (!newProduct.userId) {
      return { success: false, message: "Please login." };
    }

    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    set({ products: data.data });
  },
  fetchProductById: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set({ product: data.data });
    return { success: true };
  },
  fetchProductsByUserId: async (userId) => {
    const res = await fetch(`${API_URL}/products/user/${userId}`, {
      method: "GET",
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };
    set({ products: data.data });
  },
  deleteProduct: async (id) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    return { success: true, message: data.message };
  },
  updateProduct: async (id, updatedProduct) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    return { success: true, message: data.message };
  },
}));
