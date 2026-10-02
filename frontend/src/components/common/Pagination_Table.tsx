import type { PaginationProps } from "../../types";

const Pagination_Admin = ({
  currentPage,
  totalroom,
  onPageChange,
}: PaginationProps) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalroom) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="rounded-lg border border-gray-300 px-5 py-2 text-sm
                   transition hover:bg-gray-100
                   disabled:cursor-not-allowed disabled:opacity-40"
      >
        ← Trước
      </button>

      <span className="text-sm text-gray-600">
        Trang {currentPage} / {totalroom}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalroom}
        className="rounded-lg border border-gray-300 px-5 py-2 text-sm
                   transition hover:bg-gray-100
                   disabled:cursor-not-allowed disabled:opacity-40"
      >
        Sau →
      </button>
    </div>
  );
};

export default Pagination_Admin;
