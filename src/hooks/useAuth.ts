// src/features/auth/hooks/useAuth.ts
import { useUser } from "../contexts/UserContext";
import { loginApi } from "../api/authApi";

export const useAuth = () => {
  const { user, setUser } = useUser();

  const login = async (email: string, password: string) => {
    const { user, message } = await loginApi(email, password);
    setUser(user);
    return message 
  };  

  const logout = () => {
    setUser(null);
  };

  return { user, login, logout };
};
