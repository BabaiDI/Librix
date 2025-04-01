interface PaginationRange {
  start: number;
  end: number;
}

export const getPaginationRangeFromRequest = (
  page: number = 1,
  pageSize: number = 30
): PaginationRange => {
  const paginationRange = getPaginationRange(page, pageSize);

  return paginationRange;
};

const getPaginationRange = (page: number, pageSize: number) => ({
  start: (page - 1) * pageSize,
  end: page * pageSize - 1,
});
