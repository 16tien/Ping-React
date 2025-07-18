import React from "react";

export interface SearchContextType {
  keyword: string;
  setKeyword: (value: string) => void;
  searchComponent: React.ReactNode;
  setSearchComponent: (component: React.ReactNode) => void;
}

export const SearchContext = React.createContext<SearchContextType | undefined>(undefined);
