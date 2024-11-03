import React from "react";
import _ from "lodash";
import followersLogo from "../../../assets/icons/Subscribers.png";
import engagementRateLogo from "../../../assets/icons/Engagement-Rate.png";
import { formatNumberShort } from "../../../utils/utilsMethods/formatNumberSort.utils";

interface InfluencerObj {
  influencer: {
    id: number;
    name: string;
    platform: string[];
    userName: string;
    profilePicture: string;
    niches: string[];
    platformScore: number;
    subscribers: number;
    Avg_views: number;
  };
}

const InfluencerCard: React.FC<InfluencerObj> = ({ influencer }) => {
  return (
    <>
      <div className=" flex-shrink-0 px-5" key={influencer.id}>
        <div className="w-64 bg-gray-800 rounded-2xl overflow-hidden relative">
          <div
            className="h-80 w-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${require("../../../assets/images/users/" +
                influencer.profilePicture)})`,
            }}>
            <div
              className="absolute bottom-0 text-white  w-full opacity-[0.9] "
              id="grad1"></div>
            <div className="bottom-0 absolute">
              <p className="text-base text-left text-ri-yellow px-4">
                {influencer.niches[_.random(0, 4)]}
              </p>
              <p
                className="text-xl left-0 text-white font-semibold px-4 mb-4"
                style={{ WebkitTextStroke: "0.3px black" }}>
                {influencer.name}
              </p>
            </div>

            <div className="z-10 text-[12px] right-0 text-ri-blue absolute top-16">
              <svg width="50" height="140">
                <rect
                  x="0"
                  y="0"
                  rx="20"
                  width="50"
                  height="140"
                  fill="white"
                  opacity="0.6"
                />
                <image
                  href={followersLogo}
                  x="3"
                  y="10"
                  height="40"
                  width="44"
                />
                <text
                  x="25"
                  y="63"
                  textAnchor="middle"
                  fill="black"
                  fontSize="15">
                  {formatNumberShort(influencer.subscribers)}
                </text>

                <image
                  href={engagementRateLogo}
                  x="3"
                  y="70"
                  height="40"
                  width="44"
                />

                <text
                  x="25"
                  y="120"
                  textAnchor="middle"
                  fill="black"
                  fontSize="15">
                  {_.random(0, 100) / 10}
                </text>
              </svg>
            </div>

            <div className="absolute top-8 right-2 transform -translate-y-1/2">
              <svg
                width="50"
                height="50"
                viewBox="0 0 288 288"
                xmlns="http://www.w3.org/2000/svg">
                <polygon
                  points="150,15 258,77 258,202 150,265 42,202 42,77"
                  fill="#FF4F00"
                />
                <text
                  x="148"
                  y="185"
                  textAnchor="middle"
                  fill="white"
                  fontSize="114">
                  {influencer.platformScore / 10}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default InfluencerCard;
