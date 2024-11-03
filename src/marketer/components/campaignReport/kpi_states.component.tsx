import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface KpiStackCardProps {
  isMobile: boolean;
  cardHeading: string;
  cardDataNumber: string;
  cardBorderBottomColor: string;
  circleMiddleTextColor: string;
  circlePathColor: string;
  progressBarValue: number;
}

const KpiStackCard: React.FC<KpiStackCardProps> = ({
  isMobile,
  cardHeading,
  cardDataNumber,
  cardBorderBottomColor,
  circleMiddleTextColor,
  circlePathColor,
  progressBarValue,
}) => {
  return (
    <div
      style={{ borderBottomColor: cardBorderBottomColor }}
      className={`bg-white border-b-4 p-2 rounded-md ${
        isMobile ? "w-full" : "w-1/2 md:w-full"
      }`}>
      <div className="w-full">
        <p className="text-gray-color font-medium text-xs md:text-base 2xl:text-base">
          {cardHeading}
        </p>
      </div>
      <div className="flex">
        <div className="w-1/2 flex justify-start items-end">
          <p className="font-semibold text-2xl md:text-3xl">{cardDataNumber}</p>
        </div>
        <div className="w-1/2 flex justify-end">
          <div className="w-10 h-10 md:w-12 md:h-12">
            <CircularProgressbar
              value={progressBarValue}
              text={`${progressBarValue}%`}
              styles={buildStyles({
                textSize: "20px",
                textColor: circleMiddleTextColor,
                pathColor: circlePathColor,
                trailColor: "#EAEAEA",
                strokeLinecap: "butt",
                rotation: 0.5,
                pathTransitionDuration: 0.5,
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KpiStackCard;
