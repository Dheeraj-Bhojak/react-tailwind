import { CProgress } from "@coreui/react";
import React from "react";

interface ProgressBarProps {
  progressValue: number;
  name: string;
  color: string;
}

const ProgressBarComponent: React.FC<ProgressBarProps> = ({
  progressValue,
  name,
  color,
}) => {
  return (
    <div className="pb-2.5">
      <div className="flex justify-around w-full my-2">
        <div className="w-1/2">
          <p className="text-xs xl:text-sm 2xl:text-base font-medium">{name}</p>
        </div>
        <div className="w-1/2 flex justify-end">
          <p className="text-xs xl:text-sm 2xl:text-base font-medium">
            {progressValue}%
          </p>
        </div>
      </div>

      <CProgress
        value={progressValue}
        height={7}
        color={color}
        className="-mt-2"
      />
    </div>
  );
};

export default ProgressBarComponent;
