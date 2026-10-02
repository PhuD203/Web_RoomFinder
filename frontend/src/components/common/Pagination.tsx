// import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { PaginationProps } from "../../types";

export default function Pagination({
  totalroom,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const totalPages = Math.ceil(totalroom / 12);

  const getPages = (): (number | "...")[] => {
    if (totalPages <= 0) return [];

    // Chỉ có 1 trang
    if (totalPages === 1) {
      return [1];
    }

    // Có từ 2 -> 6 trang: hiển thị tất cả
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | "...")[] = [];

    // Luôn có trang 1
    pages.push(1);

    // currentPage ở đầu
    if (currentPage <= 3) {
      pages.push(2, 3, 4, 5);
      pages.push("...");
    }

    // currentPage ở cuối
    else if (currentPage >= totalPages - 2) {
      pages.push("...");
      pages.push(
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
      );
    }

    // currentPage ở giữa
    else {
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...");
    }

    // Luôn có trang cuối
    pages.push(totalPages);

    return pages;
  };
  return (
    <div className="flex items-center justify-center gap-2">
      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => {
              onPageChange(page);
              const params = new URLSearchParams(searchParams);
              params.set("page", String(page));
              setSearchParams(params);
            }}
            className={`w-10 h-10 rounded-lg ${
              currentPage === page
                ? "bg-[#2D2F33] text-white"
                : "bg-white border"
            }`}
          >
            {page}
          </button>
        ),
      )}
    </div>
  );
}
