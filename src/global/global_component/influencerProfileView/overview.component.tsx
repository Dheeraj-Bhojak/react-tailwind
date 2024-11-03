import React, { useEffect, useState } from "react";
import postFrequency from "../../../assets/img/postFrequency.png";
import user from "./../../../assets/images/avatars/user.png";
import following from "../../../assets/img/following.png";

import { OverViewInterface } from "../../../marketer/pages/InfluencerProfile/profieResult";
import LineChart from "../graphAndChart/lineChart.component";
import ProfileStatsCard from "./profileStatsCard.component";
import { cardVisibleInterface } from "../../../marketer/pages/InfluencerProfile/influencerProfileView.page";

interface OverViewDataInterface {
  overview: OverViewInterface;
  handleShowCards: (cardName: keyof cardVisibleInterface) => void;
  cardVisible: cardVisibleInterface;
}

const Overview: React.FC<OverViewDataInterface> = ({ overview }) => {
  const [error, setError] = useState(false);

  const handleProfileImgError = () => {
    setError(true);
  };

  const { profile, followsGrowth } = overview;

  const profileStatsData = [
    {
      cardHeading: "Followers",
      cardData: "21M",
      performanceTag: "Excellent",
      cardGrowth: "+1.1",
      cardGrowthColor: "#52AD60",
      cardGrowthColorTile: "#52AD60",
      mobileCardHeading: "Followers",
    },
    {
      cardHeading: "Engagement",
      cardData: "6.68%",
      performanceTag: "Poor",
      cardGrowth: "+1.1",
      cardGrowthColor: "#52AD60",
      cardGrowthColorTile: "#DB6261",
      mobileCardHeading: "Engage.",
    },
    {
      cardHeading: "Following",
      cardData: "254",
      performanceTag: "Good",
      cardGrowth: "+1.1",
      cardGrowthColor: "#52AD60",
      cardGrowthColorTile: "#EEB028",
      mobileCardHeading: "Following",
    },
    {
      imageIcon: postFrequency,
      cardHeading: "Post Frequency",
      cardData: "21",
      performanceTag: "",
      cardGrowth: "+1.1",
      cardGrowthColor: "#52AD60",
      cardGrowthColorTile: "",
      mobileCardHeading: "Post Freq.",
    },
  ];
  return (
    <div id="overview" className="bg-[#ebebeb] flex">
      <div className="w-full">
        <div className="bg-white mt-3 mx-3 rounded-lg p-6">
          <div className="w-full flex">
            <div className="w-11/12 flex items-center">
              <img
                className="rounded-full w-7 h-7 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10"
                src={error ? user : profile.profile_picture_url}
                alt="profilePic"
                onError={handleProfileImgError}
              />
              <p className="px-2 font-bold text-sm xl:text-base 2xl:text-lg">
                {overview.profile.username}
              </p>
            </div>
            <div className="w-1/12 flex justify-end">
              <button className="w-7 h-7 xl:w-7 xl:h-7 2xl:w-10 2xl:h-10 bg-white rounded-md border-gray items-center justify-center flex">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </button>
            </div>
          </div>
          <div className="w-full mt-3">
            <p className="text-gray-color font-normal text-sm xl:text-sm 2xl:text-base whitespace-pre-wrap">
              {overview.profile.biography}
            </p>
          </div>
        </div>

        <div className="w-full flex mb-3 flex-wrap px-2 justify-center items-center">
          {followsGrowth.map((data, index) => (
            <ProfileStatsCard
              key={index}
              data={data}
              marginLeftClass={index === 0 ? "mt-3" : "mt-3"}
              marginRightClass={
                index === profileStatsData.length - 1 ? "ml-0" : "mr-0"
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
