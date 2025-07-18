import { useEffect } from "react";
import { useSearch } from "../hooks/useSearch";
import { DatePicker } from "antd";

const HomePage: React.FC = () => {
  const { setSearchComponent, setKeyword } = useSearch();

  useEffect(() => {
    setSearchComponent?.(
      <DatePicker
        placeholder="Chọn ngày"
        onChange={(_, dateString) => {
          if (typeof dateString === "string") {
            setKeyword(dateString);
          }
        }}
        format="YYYY-MM-DD"
      />
    );

    return () => setSearchComponent?.(null);
  }, [setKeyword, setSearchComponent]);

  return <></>;
};

export default HomePage;
