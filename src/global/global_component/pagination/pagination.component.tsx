import React, { Dispatch, SetStateAction } from "react";

interface paginationInterface {
  currentPageNumber: number;
  limit: number;
  setCurrentPageNumber: Dispatch<SetStateAction<number>>;
}

const SimplePagination: React.FC<paginationInterface> = ({
  currentPageNumber,
  setCurrentPageNumber,
  limit,
}) => {
  const next = () => {
    if (currentPageNumber >= limit) {
      return;
    } else {
      setCurrentPageNumber(currentPageNumber + 1);
    }
  };

  const prev = () => {
    if (currentPageNumber <= 1) {
      return;
    } else {
      setCurrentPageNumber(currentPageNumber - 1);
    }
  };

  return (
    <div className="w-full flex justify-center border-1 p-4">
      <div className="flex items-center gap-8 text-center">
        <button onClick={prev} disabled={currentPageNumber <= 1}>
          <i className="fa-solid fa-arrow-left h-4 w-4 stroke-slate-950 text-xl"></i>{" "}
        </button>

        <p color="gray" className="font-normal">
          Page <strong className="text-gray-900">{currentPageNumber}</strong> of{" "}
          <strong className="text-gray-900">{limit}</strong>
        </p>
        <button onClick={next} disabled={currentPageNumber >= limit}>
          <i className="fa-solid fa-arrow-right h-4 w-4 stroke-slate-950 text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default SimplePagination;
