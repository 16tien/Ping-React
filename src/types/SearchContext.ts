export interface SearchContextType {
  keyword: string;
  setKeyword: (value: string) => void;

  searchComponent: React.ReactNode;
  setSearchComponent: (node: React.ReactNode) => void;
}
