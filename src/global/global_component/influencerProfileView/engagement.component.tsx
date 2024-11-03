import React from "react";

import { CTooltip } from "@coreui/react";

import question from "../../../assets/img/question.png";
import blueHeart from "../../../assets/img/blueHeart.png";
import blueComment from "../../../assets/img/blueComment.png";
import BubbleChart from "../graphAndChart/bubbleChart.component";
import HashtagsWordCloud from "./hashTagWordcloud";
import EngagementStatsCard from "./engagementStatsCard.component";
import EngRateHistoryLineChart from "./engRateHistoryLinechart.coponent";
import { cardVisibleInterface } from "../../../marketer/pages/InfluencerProfile/influencerProfileView.page";
interface engagementInterface {
  handleShowCards: (cardName: keyof cardVisibleInterface) => void;
  cardVisible: cardVisibleInterface;
}
const Engagement: React.FC<engagementInterface> = ({
  handleShowCards,
  cardVisible,
}) => {
  const words = [
    {
      text: "told",
      value: 64,
    },
    {
      text: "mistake",
      value: 11,
    },
    {
      text: "thought",
      value: 16,
    },
    {
      text: "bad",
      value: 17,
    },
    { text: "apple", value: 100 },
    { text: "banana", value: 400 },
    { text: "orange", value: 505 },
    { text: "grape", value: 30 },
    { text: "watermelon", value: 28 },
    { text: "kiwi", value: 25 },
    { text: "strawberry", value: 22 },
    { text: "pineapple", value: 20 },
    { text: "blueberry", value: 18 },
    { text: "peach", value: 15 },
    { text: "mango", value: 14 },
    { text: "pear", value: 12 },
    { text: "cherry", value: 10 },
    { text: "lemon", value: 9 },
    { text: "lime", value: 8 },
    { text: "pomegranate", value: 7 },
    { text: "fig", value: 6 },
    { text: "plum", value: 5 },
    { text: "apricot", value: 5 },
    { text: "nectarine", value: 5 },
    { text: "coconut", value: 5 },
    { text: "blackberry", value: 5 },
    { text: "raspberry", value: 5 },
    { text: "cranberry", value: 5 },
    { text: "honeydew", value: 5 },
    { text: "cantaloupe", value: 5 },
    { text: "guava", value: 5 },
    { text: "passionfruit", value: 5 },
    { text: "tangerine", value: 5 },
    { text: "persimmon", value: 5 },
  ];

  // const options: Options = {
  //   colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  //   enableTooltip: false,
  //   deterministic: false,
  //   fontFamily: "impact",
  //   fontSizes: [20, 100],
  //   fontStyle: "normal",
  //   fontWeight: "normal",
  //   padding: 1,
  //   rotations: 0,
  //   rotationAngles: [0, 90],
  //   scale: "sqrt",
  //   spiral: "archimedean",
  //   transitionDuration: 1000,
  //   enableOptimizations: false,
  //   svgAttributes: {},
  //   textAttributes: {},
  //   tooltipOptions: {},
  // };

  const bubbleData = [
    { x: 54, y: 7, r: 10 },
    { x: 62, y: 91, r: 10 },
    { x: 45, y: 57, r: 10 },
    { x: 95, y: 78, r: 10 },
    { x: 81, y: 89, r: 10 },
    { x: 8, y: 13, r: 10 },
    { x: 85, y: 75, r: 10 },
    { x: 38, y: 29, r: 10 },
    { x: 89, y: 26, r: 10 },
    { x: 53, y: 82, r: 10 },
    { x: 67, y: 66, r: 10 },
    { x: 40, y: 41, r: 10 },
    { x: 85, y: 54, r: 10 },
    { x: 93, y: 22, r: 10 },
    { x: 97, y: 72, r: 10 },
    { x: 31, y: 58, r: 10 },
    { x: 5, y: 50, r: 10 },
    { x: 43, y: 52, r: 10 },
    { x: 44, y: 32, r: 10 },
    { x: 88, y: 42, r: 10 },
    { x: 29, y: 34, r: 10 },
    { x: 85, y: 62, r: 10 },
    { x: 86, y: 36, r: 10 },
    { x: 96, y: 29, r: 10 },
    { x: 43, y: 4, r: 10 },
  ];

  const engRateData = {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
      "Day 11",
      "Day 12",
      "Day 13",
      "Day 14",
      "Day 15",
      "Day 16",
      "Day 17",
      "Day 18",
      "Day 19",
      "Day 20",
      "Day 21",
      "Day 22",
      "Day 23",
      "Day 24",
      "Day 25",
      "Day 26",
      "Day 27",
      "Day 28",
      "Day 29",
      "Day 30",
    ],
    datasets: [
      {
        label: "Weekly Growth",
        data: [
          3.5, 4.2, 5.8, 6.3, 7.1, 8.9, 9.6, 10.4, 11.2, 12.7, 4.8, 5.1, 6.9,
          7.5, 8.2, 9.3, 10.6, 11.9, 12.1, 13.4, 4.3, 5.7, 6.5, 7.8, 8.6, 9.1,
          10.9, 11.5, 12.3, 13.8,
        ],
        backgroundColor: ["#4267B2"],
        borderColor: ["#4267B2"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div id="engagement" className="bg-[#ebebeb] w-full pt-3">
      <div>
        <div className="md:flex">
          <div className="md:w-6/12 ml-4 mr-4 md:mr-2 bg-white rounded-lg p-4">
            <div className="flex w-full items-center">
              <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
                Likes & Comments Spread
              </p>
              <CTooltip
                content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                placement="right">
                <img
                  className="w-4 h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 ml-2"
                  src={question}
                  alt="questionMark"
                />
              </CTooltip>
            </div>
            {cardVisible.likeComment ? (
              <div>
                <BubbleChart bubbleData={bubbleData} />
              </div>
            ) : (
              <div className="relative w-full">
                <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                  <button
                    className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                    onClick={() => handleShowCards("likeComment")}>
                    Show Example <i className="fa-solid fa-lock text-sm"></i>
                  </button>
                </div>
                <div className="blur">
                  <BubbleChart bubbleData={bubbleData} />
                </div>
              </div>
            )}
          </div>
          <div className="md:w-3/12 md:ml-2 md:mr-2 ml-4 mr-4 mt-[16px] md:mt-0 bg-white rounded-lg p-4">
            <div>
              <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg mb-2">
                Hashtags
              </p>
            </div>

            <div>
              {cardVisible.hashtags ? (
                <HashtagsWordCloud />
              ) : (
                <div className="relative w-full">
                  <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                    <button
                      className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                      onClick={() => handleShowCards("hashtags")}>
                      Show Example <i className="fa-solid fa-lock text-sm"></i>
                    </button>
                  </div>
                  <div className="blur">
                    <HashtagsWordCloud />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="md:w-3/12 ml-4 md:ml-2 mr-4 flex md:flex-col mt-[16px] md:mt-0 justify-between">
            <div className="bg-white w-1/2 md:w-full rounded-lg pl-4 py-4 md:mb-4 md:mt-0 mr-4 md:mr-0">
              <EngagementStatsCard
                imageIcon={blueHeart}
                cardHeading="Likes"
                cardData="776.6K"
                cardGrowth="-21%"
                cardGrowthColor="#D24545"
                cardGrowthColorTile=""
                graphTrend={""}
                marginLeftClass={""}
                marginRightClass={""}
              />
            </div>
            <div className="bg-white w-1/2 md:w-full rounded-lg pl-4 py-4 md:mt-0 md:mr-0">
              <EngagementStatsCard
                imageIcon={blueComment}
                cardHeading="Comments"
                cardData="7K"
                cardGrowth="+6%"
                cardGrowthColor="#52AD60"
                cardGrowthColorTile=""
                graphTrend={null}
                marginLeftClass={""}
                marginRightClass={""}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-white mx-3 mt-3 p-4 rounded-lg">
          <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
            Engagement Rate History
          </p>
          {cardVisible.engagementRate ? (
            <div>
              <EngRateHistoryLineChart data={engRateData} />
            </div>
          ) : (
            <div className="relative w-full">
              <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                <button
                  className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                  onClick={() => handleShowCards("engagementRate")}>
                  Show Example <i className="fa-solid fa-lock text-sm"></i>
                </button>
              </div>
              <div className="blur">
                <EngRateHistoryLineChart data={engRateData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Engagement;
