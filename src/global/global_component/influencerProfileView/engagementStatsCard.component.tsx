import React, { useEffect, useState } from "react";

interface EngagementStatsCardProps {
  imageIcon: string;
  cardHeading: string;
  cardData: string;
  cardGrowthColorTile: string;
  cardGrowth: string;
  cardGrowthColor: string;
  graphTrend: string | null;
  marginLeftClass: string;
  marginRightClass: string;
}

const EngagementStatsCard: React.FC<EngagementStatsCardProps> = (props) => {
  const {
    imageIcon,
    cardData,
    cardGrowth,
    cardGrowthColor,
    graphTrend,
    marginLeftClass,
    marginRightClass,
    cardHeading,
  } = props;

  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const heading = isMobileView
    ? "Avg. " + cardHeading
    : "Average " + cardHeading;

  return (
    <div className="relative w-full">
      <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
        <button className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10">
          Show Example <i className="fa-solid fa-lock text-sm"></i>
        </button>
      </div>
      <div className="blur">
        <div className={`${marginLeftClass} ${marginRightClass}`}>
          <div className="flex items-center">
            <img
              className="w-5 h-5 md:w-8 md:h-8 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8"
              src={imageIcon}
              alt="followersIcon"
            />
            <p className="text-gray-color font-medium text-sm md:text-base xl:text-base 2xl:text-xl ml-1 md:ml-3">
              {heading}
            </p>
          </div>
          <div className="py-1">
            <p className="font-semibold text-4xl md:text-4xl xl:text-4xl 2xl:text-6xl">
              {cardData}
            </p>
          </div>
          <div className="flex items-center pt-1">
            <p
              style={{ color: cardGrowthColor }}
              className="text-xs md:text-lg xl:text-lg 2xl:text-xl font-medium">
              {cardGrowth}
            </p>
            <p className="text-[#909AAA] text-xs md:text-lg xl:text-lg 2xl:text-xl ml-1 font-medium">
              in last 30 days
            </p>
            {graphTrend && (
              <img
                className="w-8 h-8 xl:w-6 xl:h-6 2xl:w-8 2xl:h-8 ml-1"
                src={graphTrend}
                alt="trendUp"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementStatsCard;
