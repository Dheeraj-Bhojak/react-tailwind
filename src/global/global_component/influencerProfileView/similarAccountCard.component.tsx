import React from "react";

import followers from "../../../assets/img/followers.png";
import engagement from "../../../assets/img/engagement.png";
import { similarAccountInterface } from "../../../marketer/pages/InfluencerProfile/profieResult";
import { formatNumberShort } from "../../../utils/utilsMethods/formatNumberSort.utils";

interface SimilarAccountCardsProps {
  influencer: similarAccountInterface;
}

const SimilarAccountCards: React.FC<SimilarAccountCardsProps> = ({
  influencer,
}) => {
  return (
    <div className="flex w-6/12 bg-white p-[4px] md:p-2 xl:p-3 2xl:p-4 rounded-lg border border-[#D9D9D9] shadow-md items-center mx-2 relative">
      <div
        className="ml-1 w-11 h-11 2xl:w-28 2xl:h-28 xl:w-20 xl:h-20 bg-cover bg-center bg-no-repeat rounded-full relative"
        style={{
          backgroundImage: `url(${influencer.profile_picture.img_url})`,
        }}>
        <svg
          className="absolute bottom-0 right-0 transform translate-x-1/8 translate-y-1/4"
          width="40%"
          height="40%"
          viewBox="0 0 288 288"
          xmlns="http://www.w3.org/2000/svg">
          <polygon
            points="150,15 258,77 258,202 150,265 42,202 42,77"
            fill="#FF4F00"
          />
          <text x="148" y="185" textAnchor="middle" fill="white" fontSize="90">
            8.3 {/*  this is  influencer q score */}
          </text>
        </svg>
      </div>
      <div className="ml-2 xl:ml-2 2xl:ml-5">
        <div>
          <p className="text-[10px] xl:text-xs 2xl:text-xl font-medium">
            {influencer.fullName}
          </p>
        </div>
        <div className="flex my-1 md:my-2 items-center">
          <img
            className="w-4 h-4 xl:w-4 xl:h-4 2xl:w-6 2xl:h-6"
            src={followers}
            alt=""
          />
          <p className="text-[10px] ml-1 md:ml-3 xl:text-xs 2xl:text-xl font-medium text-[#909AAA] ">
            {formatNumberShort(influencer.audience)}
          </p>
        </div>

        <div className="flex my-1 md:my-2 items-center">
          <img
            className="w-4 h-4 xl:w-4 xl:h-4 2xl:w-6 2xl:h-6"
            src={engagement}
            alt=""
          />
          <p className="ml-1 md:ml-3 text-[10px] xl:text-xs 2xl:text-xl font-medium text-[#909AAA] ">
            {influencer.engagement} %
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimilarAccountCards;
