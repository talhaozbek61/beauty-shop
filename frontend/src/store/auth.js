import { create } from "zustand";

const API_URL = "http://localhost:3000/api/auth";

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,
  message: null,

  setUser: (user) => set({ user }),
  signup: async (name, email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();

      if (!data.success) {
        set({ isLoading: false, isAuthenticated: false });
        return { success: false, message: data.message };
      }

      set({ isLoading: false, isAuthenticated: true, user: data.user });

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      set({ isLoading: false, error: error.message });
      console.log(error);

      return {
        success: false,
        message: error.message,
      };
    }
  },
  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!data.success) {
        set({ isLoading: false, isAuthenticated: false });
        return { success: false, message: data.message };
      }
      console.log("LOGIN SUCCESS:", data.user);
      set({ isLoading: false, isAuthenticated: true, user: data.user });

      return {
        success: true,
        message: data.message,
      };
    } catch (error) {
      set({ isLoading: false });
      console.log(error);

      return {
        success: false,
        message: error.message,
      };
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await fetch(`${API_URL}/check-auth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      if (data.user) {
        set({ isAuthenticated: true, user: data.user, isCheckingAuth: false });
      } else {
        set({ isAuthenticated: false, user: null, isCheckingAuth: false });
      }
    } catch (error) {
      set({ isCheckingAuth: false, isAuthenticated: false, user: null });
      console.log(error);
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      set({ isLoading: false, isAuthenticated: false, user: null });
    } catch (error) {
      set({ isLoading: false, error: error.message });
      throw error;
    }
  },
  updateUser: async (userId, updatedUser) => {
    try {
      const res = await fetch(`${API_URL}/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set({ user: data.data });

      return { success: true, message: "User updated", data: data.data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
// update the ui immediately, without needing a refresh
// set((state) => ({
//   products: state.products.map((product) =>
//     product._id === pid ? data.data : product
//   ),
// }));
