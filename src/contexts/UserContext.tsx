// contexts/UserContext.tsx
import { createContext, useContext } from "react";
import type { User } from "../types/auth";

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
  removeUser: () => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  removeUser: () => {},
});

export const useUser = () => useContext(UserContext);
