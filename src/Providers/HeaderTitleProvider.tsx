import { useState } from "react";
import { HeaderTitleContext } from "../contexts/HeaderTitleContext";

export const HeaderTitleProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState("Device Manager");

  return (
    <HeaderTitleContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderTitleContext.Provider>
  );
};
