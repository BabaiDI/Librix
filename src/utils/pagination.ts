interface PaginationRange {
  start: number;
  end: number;
}

export const getPaginationRangeFromRequest = (
  request: Request,
  pageSize: number = 30
): PaginationRange => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const paginationRange = getPaginationRange(page, pageSize);

  return paginationRange;
};

const getPaginationRange = (page: number, pageSize: number) => ({
  start: (page - 1) * pageSize,
  end: page * pageSize - 1,
});
