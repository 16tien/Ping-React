import { useUser } from "../contexts/UserContext";
import { loginApi } from "../api/authApi";

export const useAuth = () => {
  const { user, setUser, removeUser } = useUser();

  const login = async (email: string, password: string) => {
    const { user, message } = await loginApi(email, password);
    setUser(user);
    return message;
  };

  const logout = () => {
    removeUser(); 
  };

  return { user, login, logout };
};
