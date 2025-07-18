import React, { useState } from "react";
import { SearchContext } from "../contexts/SearchContext";

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [keyword, setKeyword] = useState("");
  const [searchComponent, setSearchComponent] = useState<React.ReactNode>(null);

  return (
    <SearchContext.Provider
      value={{
        keyword,
        setKeyword,
        searchComponent,
        setSearchComponent,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
