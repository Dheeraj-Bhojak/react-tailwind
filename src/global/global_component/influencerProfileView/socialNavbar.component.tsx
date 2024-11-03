import React from "react";
import { socialIcons } from "../../../seeder";
import { PlatformDataInterfaceForSocialNavBar } from "../../../marketer/pages/InfluencerProfile/profieResult";

interface SocialNavbarProps {
  platformData: PlatformDataInterfaceForSocialNavBar[];
  selectedPlatform: number;
  setSelectedPlatform: React.Dispatch<React.SetStateAction<number>>;
}

const SocialNavbar: React.FC<SocialNavbarProps> = ({
  platformData,
  selectedPlatform,
  setSelectedPlatform,
}) => {
  const handleLinkClick = (index: number) => {
    setSelectedPlatform(index);
  };

  return (
    <div className="flex flex-col w-full p-2 xl:p-3 2xl:p-4 px-4 border-t-2 border-gray-400 overflow-x-scroll">
      <div className="flex flex-row items-center">
        {platformData.map((platform, index) => (
          <span
            key={index}
            className={
              selectedPlatform === index
                ? "bg-[#36454f] rounded p-1 mr-0 py-1  text-white border- whitespace-nowrap"
                : "ml-2 whitespace-nowrap"
            }>
            <button
              className="flex items-center text-[10px] sm:text-lg mx-4 justify-center"
              onClick={() => handleLinkClick(index)}>
              <img
                src={socialIcons["instagram"]}
                alt={platform.overview.profile.platfrom}
                className="w-4 h-4 sm:w-5 sm:h-5 mr-[4px] sm:mr-2"
              />
              {platform.overview.profile.platformUser_name}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SocialNavbar;
