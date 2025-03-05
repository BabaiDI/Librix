import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  range?: number;
  onPageChange: (page: number) => void;
}

const PaginationButton = ({
  page,
  currentPage,
  onPageChange,
}: {
  page: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => (
  <button
    onClick={() => onPageChange(page)}
    className={`px-3 py-1 rounded-lg border transition-all duration-300 ${
      currentPage === page
        ? "bg-blue-500 text-white border-blue-500"
        : "hover:bg-blue-600 hover:text-white border-gray-600"
    }`}
  >
    {page}
  </button>
);

const PaginationEllipsis = () => <span className="px-3 py-1 text-gray-300">...</span>;

const PaginationNavButton = ({
  direction,
  onClick,
  disabled,
}: {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-lg border transition-all duration-300 hover:bg-gray-700 ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
    }`}
  >
    {direction === "left" ? (
      <ChevronLeftIcon className="w-5 h-5 text-white" />
    ) : (
      <ChevronRightIcon className="w-5 h-5 text-white" />
    )}
  </button>
);

export default function Pagination({
  currentPage,
  totalPages,
  range = 2,
  onPageChange,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: number[] = [];

    for (
      let i = Math.max(2, currentPage - range);
      i <= Math.min(totalPages - 1, currentPage + range);
      i++
    ) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="sticky bottom-1 left-0 right-0 bg-gray-900 shadow-md rounded-lg py-2 m-2 px-4 flex items-center justify-center gap-2 w-full md:w-auto">
      <PaginationNavButton
        direction="left"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />

      {currentPage > range - 2 && (
        <PaginationButton page={1} currentPage={currentPage} onPageChange={onPageChange} />
      )}

      {currentPage > range + 2 && <PaginationEllipsis />}
      {getPageNumbers().map((page, index) => (
        <PaginationButton
          key={index}
          page={page}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}

      {totalPages - currentPage > range + 1 && <PaginationEllipsis />}

      {totalPages > 1 && totalPages - currentPage > range - 3 && (
        <PaginationButton page={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
      )}

      <PaginationNavButton
        direction="right"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}
