import React, { Fragment } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const range = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const pageNumbers = range(
    Math.max(1, currentPage - 1),
    Math.min(totalPages, currentPage + 2)
  );

  return (
    <div className="flex justify-center mt-4 w-full pb-4 ">
      <div className="justify-center items-center">
        <div className="w-1/2 ">
          {" "}
          <ul className="flex space-x-2 text-white">
            <li>
              <button
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-2 py-2 rounded-md  ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-950"
                    : "bg-ri-blue hover:bg-ri-blue"
                } `}
                disabled={currentPage === 1}>
                {"<"}
              </button>
            </li>
            {currentPage >= 4 ? (
              <Fragment>
                <li>
                  <button
                    onClick={() => onPageChange(1)}
                    className={` px-3 py-2 rounded-md ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-950"
                        : "bg-ri-orange hover:bg-ri-blue"
                    } `}
                    disabled={currentPage === 1}>
                    1
                  </button>
                </li>

                <li>
                  <p
                    className={` py-2 rounded-md 
               text-black`}>
                    .
                  </p>
                </li>
                <li>
                  <p
                    className={` py-2 rounded-md 
               text-black`}>
                    .
                  </p>
                </li>
                <li>
                  <p
                    className={` py-2 rounded-md 
               text-black`}>
                    .
                  </p>
                </li>
              </Fragment>
            ) : (
              ""
            )}
            {pageNumbers.map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  onClick={() => onPageChange(pageNumber)}
                  className={`px-3 py-2 rounded-md ${
                    currentPage === pageNumber
                      ? "bg-ri-orange"
                      : "bg-gray-300 hover:bg-ri-blue text-black"
                  } `}>
                  {pageNumber}
                </button>
              </li>
            ))}
            {currentPage <= 97 ? (
              <Fragment>
                <li>
                  <p
                    className={` py-2 rounded-md 
               text-black`}>
                    .
                  </p>
                </li>
                <li>
                  <p
                    className={` py-2 rounded-md 
               text-black`}>
                    .
                  </p>
                </li>
                <li>
                  <p
                    className={` py-2 rounded-md 
               text-black`}>
                    .
                  </p>
                </li>
                <li>
                  <button
                    onClick={() => onPageChange(totalPages)}
                    className={`px-3 py-2 rounded-md ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-black"
                        : "bg-ri-orange hover:bg-ri-blue"
                    } `}
                    disabled={currentPage === totalPages}>
                    {totalPages}
                  </button>
                </li>
              </Fragment>
            ) : (
              ""
            )}
            <li>
              <button
                onClick={() => onPageChange(currentPage + 1)}
                className={` px-2 py-2 rounded-md  ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-black"
                    : "bg-ri-blue hover:bg-ri-blue"
                } `}
                disabled={currentPage === totalPages}>
                {">"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
