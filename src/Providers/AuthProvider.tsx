import React from "react";
import { UserContext } from "../contexts/UserContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { User } from "../types/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser, removeUser] = useLocalStorage<User | null>("user", null);

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
