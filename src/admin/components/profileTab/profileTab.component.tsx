import React, { useState } from "react";
import _ from "lodash";
import YoutubeTabLayout from "../youtubetabLayout/youtubrabLayout.component";
import { socialIcons } from "../../../seeder";
import "./profileTab.styles.css";
interface UserProfileDetails {
  user: {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    niche: string;
    gender: string;
    platform: string[];
    location: string;
    qg_score: number;
    qg_tags: string[];
    projects: string[];
  };
  platformData: {
    id: number;
    platformName: string;
    platformContent: string[];
    reach: { engagementRate: string; followers: string };
    targetAudience: {
      gender: {
        male: number;
        female: number;
        unrecognized: number;
      };
      geoLocation: {
        id: number;
        countryName: string;
        audienceCount: number;
      }[];
      age: {
        kids: number;
        teenager: number;
        youngAdult: number;
        adult: number;
        senior: number;
      };
    };
  }[];
}

interface UserProfileDetailsProps {
  userProfile: UserProfileDetails;
}
const ProfileTabComponent: React.FC<UserProfileDetailsProps> = ({
  userProfile,
}) => {
  const { platformData } = userProfile;
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };
  const Component = YoutubeTabLayout;
  return (
    <div>
      <div className=" w-full pt-2 pl-3 bg-white flex h-[74px] border-light border-b-2  relative overflow-x-auto tab-bar-container ">
        <div className="w-10/12 absolute flex overflow-x-auto scrollbar">
          {platformData.map((tab) => (
            <div
              key={tab.id}
              className={`text-sm cursor-pointer mr-1 min-w-[140px] p-2 px-4 tab  ${
                activeTab === tab.id
                  ? "pb-0.5 text-black bg-white border-x-1 border-gray-400 border-t-1  border-b-white rounded-t-lg"
                  : ""
              }`}
              onClick={() => handleTabClick(tab.id)}>
              {_.capitalize(tab.platformName)}{" "}
              <img
                src={socialIcons[tab.platformName]}
                loading="lazy"
                width="16"
                height="16"
                alt={`${socialIcons[tab.platformName]}`}
                className="ml-1 inline"
              />
            </div>
          ))}
        </div>
        <div className="2/12">
          <p className="center">hello</p>
        </div>
      </div>
      <div className="tab-content border-x-2 border-light">
        {platformData.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane ${activeTab === tab.id ? "active" : ""}`}>
            <Component platformData={tab} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileTabComponent;
