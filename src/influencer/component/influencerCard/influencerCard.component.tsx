import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { socialIcons } from "../../../seeder";
import _ from "lodash";

interface InfluencerObj {
  user: {
    Avg_views: number;
    id: number;
    name: string;
    niches: string[];
    platform: string[];
    platformScore: number;
    profilePicture: string;
    subscribers: number;
    userName: string;
  };
}

const InfluencerCard: React.FC<InfluencerObj> = ({ user }) => {
  return (
    <Fragment>
      <div className="font-semibold text-center rounded-3xl border shadow-lg px-10 pb-10 pt-2 max-w-[18rem]">
        <div className="bg-indigo-500 -mx-10 h-20 -m-2 p-2 mb-20 rounded-bottom rounded-3xl">
          <img
            className="-mb-2 w-28 h-[116px] rounded-full shadow-lg mx-auto border-1 border-gray-600"
            src={require(`../../../assets/images/avatars/${user.profilePicture}`)}
            alt="product designer"
          />

          <div className="inline-flex z-50 ">
            {_.map(user.platform, (socialPlatform, idx) => {
              return (
                <img
                  src={socialIcons[socialPlatform]}
                  loading="lazy"
                  width="20"
                  height="20"
                  alt="Instagram"
                  className=" rounded-full -ml-1"
                  key={idx}
                />
              );
            })}
          </div>
          <h1
            className="text-lg text-black mb-24"
            style={{ WebkitTextStroke: "0.3px indigo" }}>
            {user.name}
          </h1>
        </div>
        <div className="bg-white">
          <div className=" mt-24">
            {user.niches.map((niche, idx) => (
              <div
                key={idx}
                data-te-chip-init
                data-te-ripple-init
                className="[word-wrap: break-word] my-[5px] mr-2 inline-flex  h-[20px] cursor-pointer items-center justify-between rounded-[6px] bg-[#bcc2c5] px-[12px] py-0 text-[13px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none transition-[opacity] duration-300 ease-linear hover:!shadow-none active:bg-[#cacfd1] dark:bg-neutral-600 dark:text-neutral-200"
                data-te-close="true">
                {niche}
              </div>
            ))}
          </div>
          <button className="w-5/12 bg-indigo-600 px-8 py-2 mt-2 rounded-3xl text-gray-100 text-xs font-semibold uppercase tracking-wide">
            Hire
          </button>
          <Link to={`/influencer-profile/${user.id}`}>
            <button className="w-5/12 border-1 border-black bg-white py-2 mt-2 mx-1 rounded-3xl text-gray-950 text-xs  font-semibold uppercase">
              Profile
            </button>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};
export default InfluencerCard;
