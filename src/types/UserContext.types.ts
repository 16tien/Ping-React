import type { User } from "./auth";

export interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}
