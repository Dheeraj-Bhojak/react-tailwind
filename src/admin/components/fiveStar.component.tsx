import React from "react";
import { ratingReviewInterface } from "./am2/companiesTable.component";

interface ratingProp {
  rating: number;
  setReviewRating: React.Dispatch<
    React.SetStateAction<ratingReviewInterface[]>
  >;
  index: number;
}

const FiveStarComponent: React.FC<ratingProp> = ({
  rating,
  setReviewRating,
  index,
}) => {
  const handleStarClick = (newRating: number) => {
    setReviewRating((prev) => {
      const newRatings = [...prev];
      newRatings[index] = { ...newRatings[index], rating: newRating + 1 };
      return newRatings;
    });
  };

  return (
    <div className="flex">
      {Array(5)
        .fill(0)
        .map((_, ratingValue) => (
          <div
            className="mx-[3px]"
            key={ratingValue}
            onClick={() => handleStarClick(ratingValue)}>
            <i
              className={`fa-solid fa-star text-lg cursor-pointer ${
                ratingValue < rating ? "text-[#FDC100]" : "text-gray-400"
              }`}></i>
          </div>
        ))}
    </div>
  );
};

export default FiveStarComponent;
