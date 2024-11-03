import React from "react";

import followers from "../../../assets/img/followers.png";
import trend from "../../../assets/img/trend.png";
import engagement from "../../../assets/img/engagement.png";
import following from "../../../assets/img/following.png";
import postFrequency from "../../../assets/img/postFrequency.png";
import _ from "lodash";

interface ProfileStatsCardProps {
  data: {
    name: string;
    value: string;
    growthPercentage: string;
    progressTag?: string;
  };
  marginLeftClass: string;
  marginRightClass: string;
}

const ProfileStatsCard: React.FC<ProfileStatsCardProps> = ({
  data,
  marginLeftClass,
  marginRightClass,
}) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div className="w-1/2 md:w-1/4">
      <div
        className={`w-[92%] md:w-[96%] justify-center items-center mx-auto bg-white rounded-lg p-3 md:p-4blur-sm  ${marginLeftClass} ${marginRightClass}`}>
        <div className="flex items-center">
          <img
            className="w-[18px] h-[18px] md:w-8 md:h-8 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8"
            src={
              data.name === "followers"
                ? followers
                : data.name === "post frequency"
                ? postFrequency
                : data.name === "engagement"
                ? engagement
                : data.name === "following"
                ? following
                : ""
            }
            alt="followersIcon"
          />
          <p
            className="text-gray-color font-medium text-sm md:text-base xl:text-base
         2xl:text-xl ml-1 md:ml-3">
            {/* {isMobile ? mobileCardHeading : cardHeading} */}
            {_.capitalize(data.name)}
          </p>
          {/* Apply background color dynamically using inline style */}
          <div
            className="ml-1 md:ml-3 rounded-md px-2"
            style={{
              backgroundColor: `${
                data.progressTag === "excellent"
                  ? "#52AD60"
                  : data.progressTag === "good"
                  ? "#EEB028"
                  : data.progressTag === "poor"
                  ? "#DB6261"
                  : "#DB6261"
              }`,
            }}>
            <p className="text-white text-[9px] md:text-sm">
              {_.capitalize(data.progressTag)}
            </p>
          </div>
        </div>
        <div className="py-1">
          <p className="font-semibold text-2xl md:text-3xl xl:text-4xl 2xl:text-6xl">
            {data.value}
          </p>
        </div>
        <div className="flex items-center pt-1">
          <p
            style={{ color: "#52AD60" }}
            className="text-xs md:text-lg xl:text-lg 2xl:text-xl font-medium">
            {data.growthPercentage ? data.growthPercentage : " - "}
          </p>
          <p className="text-[#909AAA] text-xs md:text-lg xl:text-lg 2xl:text-xl ml-1 font-medium">
            in last 30 days
          </p>

          <img
            className="w-4 h-4 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 ml-1"
            src={trend}
            alt="trendUp"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileStatsCard;
