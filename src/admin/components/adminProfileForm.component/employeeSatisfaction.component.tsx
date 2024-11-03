import { CProgress } from "@coreui/react";
import React, { Fragment } from "react";

interface ProgressBarProps {
  satisfaction_score: { Excited: number; Not_So_Good: number; Good: number };
}
const EmployeeSatisfactionSliders: React.FC<ProgressBarProps> = ({
  satisfaction_score,
}) => {
  return (
    <Fragment>
      <div className="flex items-center justify-evenly py-[10px] 2xl:py-[15px] 3xl:py-6">
        <div className="w-2/10">
          <p className="text-[20px] text-lg 3xl:text-3xl font-medium">{"😄"}</p>
        </div>
        <div className="w-10/12 ml-3">
          <CProgress
            value={satisfaction_score.Excited}
            height={7}
            color={"#4267b2"}
          />
        </div>
        <div className="w-2/12 ml-3">
          <p className="font-medium text-[10px] 2xl:text-[14px] 3xl:text-lg">
            {satisfaction_score.Excited}%
          </p>
        </div>
      </div>
      <div className="flex items-center justify-evenly py-[10px] 2xl:py-[15px] 3xl:py-6">
        <div className="w-2/10">
          <p className="text-[20px] text-lg 3xl:text-3xl font-medium">{"😊"}</p>
        </div>
        <div className="w-10/12 ml-3">
          <CProgress
            value={satisfaction_score.Good}
            height={7}
            color={"#4267b2"}
          />
        </div>
        <div className="w-2/12 ml-3">
          <p className="font-medium text-[10px] 2xl:text-[14px] 3xl:text-lg">
            {satisfaction_score.Good}%
          </p>
        </div>
      </div>
      <div className="flex items-center justify-evenly py-[10px] 2xl:py-[15px] 3xl:py-6">
        <div className="w-2/10">
          <p className="text-[20px] text-lg 3xl:text-3xl font-medium">{"😐"}</p>
        </div>
        <div className="w-10/12 ml-3">
          <CProgress
            value={satisfaction_score.Not_So_Good}
            height={7}
            color={"#4267b2"}
          />
        </div>
        <div className="w-2/12 ml-3">
          <p className="font-medium text-[10px] 2xl:text-[14px] 3xl:text-lg">
            {satisfaction_score.Not_So_Good}%
          </p>
        </div>
      </div>
    </Fragment>
  );
};

export default EmployeeSatisfactionSliders;
