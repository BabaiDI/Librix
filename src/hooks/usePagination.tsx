import { useSearchParams } from "react-router";

export const usePagination = (itemCount: number = 0, defaultPageSize: number = 30) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  let totalPages = 1;

  if (itemCount > 0 && defaultPageSize > 0) {
    totalPages = Math.ceil(itemCount / defaultPageSize);
  }

  const onPageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", String(newPage));
      setSearchParams(newParams);
    }
  };

  return {
    page,
    totalPages,
    onPageChange,
  };
};
