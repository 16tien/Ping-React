import { useContext, useEffect } from "react";
import { HeaderTitleContext } from "../contexts/HeaderTitleContext";

export const useHeaderTitle = () => useContext(HeaderTitleContext);

export const useSetHeaderTitle = (title: string) => {
  const { setTitle } = useHeaderTitle();

  useEffect(() => {
    setTitle(title);
    return () => setTitle("Device Manager");
  }, [title, setTitle]);
};
