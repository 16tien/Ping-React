import { createContext } from "react";

export interface HeaderTitleContextType {
  title: string;
  setTitle: (title: string) => void;
}

export const HeaderTitleContext = createContext<HeaderTitleContextType>({
  title: "Device Manager",
  setTitle: () => {},
});
