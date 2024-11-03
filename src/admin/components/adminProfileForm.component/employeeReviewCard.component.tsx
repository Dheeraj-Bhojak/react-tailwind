import React, { useState } from "react";
import { formatDate } from "../../../utils/utilsMethods/formateDate";

import user from "../../../assets/images/avatars/user.png";
interface EmployeeReviewCardProps {
  employeeName: string;
  reviewDate: string;
  reviewStatus: string;
  employeeProfilePic: string;
}

const EmployeeReviewCard: React.FC<EmployeeReviewCardProps> = ({
  employeeName,
  reviewDate,
  reviewStatus,
  employeeProfilePic,
}) => {
  const imageHandleErrorOnLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    (e.target as HTMLImageElement).src = user;
  };

  return (
    <div className="mb-6 mt-3 border-b-2 px-2 3xl:px-4">
      <div className="flex items-center">
        <div>
          <img
            src={employeeProfilePic}
            onError={imageHandleErrorOnLoad}
            alt=""
            className="rounded-full w-9 h-9 2xl:w-10 2xl:h-10 3xl:w-14 3xl:h-14"
          />
        </div>
        <div className="ml-3">
          <p className="font-semibold text-xs 2xl:text-sm 3xl:text-base">
            {employeeName}
          </p>
          <p className="text-[10px] 2xl:text-xs 3xl:text-sm mt-[4px] 3xl:mt-0 font-medium text-[#909AAA]">
            {formatDate(reviewDate)}
          </p>
        </div>
      </div>
      <div className="mt-3 mb-3 text-xs 2xl:text-sm 3xl:text-base">
        {reviewStatus}
      </div>
    </div>
  );
};

export default EmployeeReviewCard;
