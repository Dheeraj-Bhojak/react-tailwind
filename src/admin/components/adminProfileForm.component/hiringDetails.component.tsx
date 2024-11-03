import React from "react";
import { formatDate } from "../../../utils/utilsMethods/formateDate";

interface HiringDetailsProps {
  hiringDate: string;
  hiringStatus: string;
}

const HiringDetails: React.FC<HiringDetailsProps> = ({
  hiringDate,
  hiringStatus,
}) => {
  return (
    <div className="ml-12 3xl:ml-16">
      <ul style={{ listStyleType: "disc" }}>
        <li>
          <div className="mb-3 3xl:mb-7">
            <p className="text-[10px] 2xl:text-[12px] 3xl:text-sm font-medium text-[#909AAA]">
              {formatDate(hiringDate)}
            </p>
            <p className="text-[12px] 2xl:text-[14px] 3xl:text-base font-medium">
              {hiringStatus}
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HiringDetails;
