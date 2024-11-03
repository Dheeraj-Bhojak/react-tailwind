import React, { useState } from "react";
import { CPagination, CPaginationItem } from "@coreui/react";
import { FilterConfigInterface } from "../../../admin/components/am2/companiesTable.component";
interface paginationInterface {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const PaginationComponent: React.FC<paginationInterface> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const pageSize = 5;

  const getVisiblePages = (currentPageNumber: number, totalPages: number) => {
    let startPage = Math.max(1, currentPageNumber - Math.floor(pageSize / 2));
    let endPage = startPage + pageSize - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - pageSize + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <CPagination size="sm" aria-label="">
      <CPaginationItem
        disabled={currentPage === 1}
        className={` ${
          currentPage === 1
            ? "hover: cursor-not-allowed"
            : "hover:cursor-pointer"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}>
        Previous
      </CPaginationItem>
      {visiblePages.map((page) => (
        <CPaginationItem
          key={page}
          className="bg-ri-blue hover:cursor-pointer"
          active={page === currentPage}
          onClick={() => handlePageChange(page)}>
          {page}
        </CPaginationItem>
      ))}
      <CPaginationItem
        className={` ${
          currentPage === 1
            ? "hover:cursor-pointer"
            : "hover: cursor-not-allowed"
        }`}
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}>
        Next
      </CPaginationItem>
    </CPagination>
  );
};

export default PaginationComponent;
