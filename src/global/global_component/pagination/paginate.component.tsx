import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
// import styles from "./paginate.style.scss";

interface PaginateInterface {
  pageCount: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const PaginationContainer = styled.div.attrs({ id: "pagination-container" })`
  .pagination {
    display: flex;
    justify-content: space-between;
    list-style: none;
    cursor: pointer;

    & a {
      padding: 10px;
      color: black;
      border: 1px solid #aaa;

      &:hover {
        border: 1px solid black;
        transition: transform 0.3s;
      }
    }
  }

  .paginationLink {
    border: 2px solid black;

    &:hover {
      background-color: #dddddd;
    }
  }

  .paginationActive {
    & a {
      color: white !important;
      border: 2px solid #4267b2;
      background: #4267b2;
    }
  }

  .paginationDisabled {
    & a {
      visibility: hidden;
      color: #6f6f6f;
      border: 2px #6f6f6f solid;
    }
  }
`;

const Paginate: React.FC<PaginateInterface> = ({
  pageCount,
  setCurrentPage,
}) => {
  function handlePageClick({ selected }: { selected: number }) {
    setCurrentPage(selected);
  }

  return (
    <div className="max-w-[512px] p-4">
      <PaginationContainer>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="pagination"
          previousLinkClassName="paginationLink"
          nextLinkClassName="paginationLink"
          disabledClassName="paginationDisabled"
          activeClassName="paginationActive"
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
        />
      </PaginationContainer>
    </div>
  );
};

export default Paginate;
