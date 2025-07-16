import type { LoginResponse } from "../types/auth";
import axiosInstance from "../utils/axiosInstance";

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
  const res= await axiosInstance.post("/login", {
    email: email,
    password: password,
  });
  return res.data
};

export const checkAuth = async () => {
  return axiosInstance.get("/auth/me");
};

export const logout = async () => {
  return axiosInstance.post("/logout");
};
