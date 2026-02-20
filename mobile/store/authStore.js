import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/api";

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isLoading: false,
  isCheckingAuth: true,

  // ✅ REGISTER WITH ROLE
  register: async (username, email, password, role) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          role, // 🔥 IMPORTANT
        }),
      });

      const text = await response.text();

      if (!response.ok) {
        return { success: false, error: text };
      }

      const data = JSON.parse(text);

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({
        token: data.token,
        user: data.user,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.log("Register error:", error.message);
      return { success: false, error: "Network error" };
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ LOGIN
  login: async (email, password) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();

      if (!response.ok) {
        return { success: false, error: text };
      }

      const data = JSON.parse(text);

      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);

      set({
        token: data.token,
        user: data.user,
        isLoading: false,
      });

      return { success: true };
    } catch (error) {
      console.log("Login error:", error.message);
      return { success: false, error: "Network error" };
    } finally {
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });

    try {
      const token = await AsyncStorage.getItem("token");
      const userJson = await AsyncStorage.getItem("user");
      const user = userJson ? JSON.parse(userJson) : null;

      set({ token: token || null, user });
    } catch (error) {
      console.log("Auth check failed", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null });
  },
}));
