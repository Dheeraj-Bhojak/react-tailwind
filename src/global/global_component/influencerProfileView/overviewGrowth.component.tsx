import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTooltip,
} from "@coreui/react";
import React, { useEffect, useState } from "react";

import question from "../../../assets/img/question.png";
import LineChart from "../graphAndChart/lineChart.component";
import { cardVisibleInterface } from "../../../marketer/pages/InfluencerProfile/influencerProfileView.page";

interface OverviewGrowthInterface {
  handleShowCards: (cardName: keyof cardVisibleInterface) => void;
  cardVisible: cardVisibleInterface;
}
const dataGraph = {
  followerGrowth: [
    {
      monthOf: "feb-2024",
      data: [54, 465, 896, 136],
    },
    {
      monthOf: "jan-2024",
      data: [545, 565, 796, 436],
    },
    {
      monthOf: "dec-2023",
      data: [54, 465, 896, 136],
    },
  ],
  followingGrowth: [
    {
      monthOf: "feb-2023",
      data: [21, 31, 2, 4],
    },
    {
      monthOf: "jan-2023",
      data: [8, 5, 12, 2],
    },
    {
      monthOf: "dec-2023",
      data: [3, 1, 0, 6],
    },
  ],
};

const OverviewGrowth: React.FC<OverviewGrowthInterface> = ({
  handleShowCards,
  cardVisible,
}) => {
  const [followerChartRange, setFollowerChartRange] = useState<number>(30);
  const [followingChartRange, setFollowingChartRange] = useState<number>(30);

  const [followingGrowthChartData, setFollowingGrowthChartData] = useState<{
    label: string[];
    data: number[];
  }>({ label: [], data: [] });

  const [followersGrowthChartData, setFollowersGrowthChartData] = useState<{
    label: string[];
    data: number[];
  }>({ label: [], data: [] });

  const handleRangeSelectFollowers = (range: number) => {
    setFollowerChartRange(range);
  };
  const handleRangeSelectFollowing = (range: number) => {
    setFollowingChartRange(range);
  };

  const showFollowersData = () => {
    const length = Math.floor(followerChartRange / 7);
    const label: string[] = Array.from(
      { length },
      (_, index) => `Week${index + 1}`
    );
    const data: number[] = dataGraph.followerGrowth
      .slice(0, length / 4)
      .reduce<number[]>((acc, curr) => {
        return acc.concat(curr.data);
      }, []);
    return [data, label];
  };

  const showFollowingData = () => {
    const length = Math.floor(followingChartRange / 7);
    const label: string[] = Array.from(
      { length },
      (_, index) => `Week${index + 1}`
    );
    const data: number[] = dataGraph.followingGrowth
      .slice(0, length / 4)
      .reduce<number[]>((acc, curr) => {
        return acc.concat(curr.data);
      }, []);
    return [data, label];
  };

  const followingChartData = {
    labels: followingGrowthChartData.label,
    datasets: [
      {
        label: "Weekly Growth",
        data: followingGrowthChartData.data,
        backgroundColor: ["#fdc100"],
        borderColor: ["#fdc100"],
        borderWidth: 2,
      },
    ],
  };
  const followersChartData = {
    labels: followersGrowthChartData.label,
    datasets: [
      {
        label: "Weekly Growth",
        data: followersGrowthChartData.data,
        backgroundColor: ["#4267B2"],
        borderColor: ["#4267B2"],
        borderWidth: 2,
      },
    ],
  };
  useEffect(() => {
    const [data, label] = showFollowersData();
    setFollowersGrowthChartData({
      data: data as number[],
      label: label as string[],
    });
  }, [followerChartRange]);

  useEffect(() => {
    const [data, label] = showFollowingData();
    setFollowingGrowthChartData({
      data: data as number[],
      label: label as string[],
    });
  }, [followingChartRange]);
  return (
    <div id="overview" className="bg-[#ebebeb] flex">
      <div className="w-full">
        <div className="md:flex w-full mb-3 ">
          <div className="md:w-6/12 bg-white rounded-lg ml-4 px-4 mr-4 md:mr-2 pb-3 overflow-hidden">
            <div className="flex w-full ">
              <div className="w-full flex items-center pt-4">
                <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
                  Followers Growth
                </p>
                <CTooltip
                  content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  placement="right">
                  <img
                    className="w-3 h-3 md:w-4 md:h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 ml-2"
                    src={question}
                    alt="questionMark"
                  />
                </CTooltip>
              </div>
              <div className="w-full pt-4">
                <div className="flex justify-end">
                  <CDropdown>
                    <CDropdownToggle size="sm" color="secondary">
                      {"Last " + followerChartRange + " days"}
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        onClick={() => handleRangeSelectFollowers(30)}>
                        Last 30 Days
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => handleRangeSelectFollowers(60)}>
                        Last 60 Days
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => handleRangeSelectFollowers(90)}>
                        Last 90 Days
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </div>
            </div>
            {cardVisible.followersGrowth ? (
              <div>
                <LineChart data={followersChartData} />
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10 ">
                  <button
                    className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                    onClick={() => handleShowCards("followersGrowth")}>
                    Show Example <i className="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
                <div className="blur">
                  <LineChart data={followersChartData} />
                </div>
              </div>
            )}
          </div>
          <div className="md:w-6/12 bg-white rounded-lg mt-[16px] ml-4 md:ml-2 px-4 mr-4 pb-3 overflow-hidden md:mt-0">
            <div className="flex w-full">
              <div className="w-full pt-4 flex items-center">
                <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
                  Following Growth
                </p>
                <CTooltip
                  content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                  placement="right">
                  <img
                    className="w-3 h-3 md:w-4 md:h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 ml-2"
                    src={question}
                    alt="questionMark"
                  />
                </CTooltip>
              </div>
              <div className="w-full pt-4">
                <div className="flex justify-end">
                  <CDropdown>
                    <CDropdownToggle size="sm" color="secondary">
                      {"Last " + followingChartRange + " days"}
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        onClick={() => handleRangeSelectFollowing(30)}>
                        Last 30 Days
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => handleRangeSelectFollowing(60)}>
                        Last 60 Days
                      </CDropdownItem>
                      <CDropdownItem
                        onClick={() => handleRangeSelectFollowing(90)}>
                        Last 90 Days
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </div>
              </div>
            </div>

            {cardVisible.followingGrowth ? (
              <div>
                <LineChart data={followingChartData} />
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                  <button
                    className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                    onClick={() => handleShowCards("followingGrowth")}>
                    Show Example <i className="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
                <div className="blur">
                  <LineChart data={followingChartData} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewGrowth;
