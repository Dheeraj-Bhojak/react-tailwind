import React, { useState } from "react";

import IndustryGauge from "../graphAndChart/industryGauge.component";
import SimilarAccountCards from "./similarAccountCard.component";

import man1 from "../../../assets/img/man1.jpg";
import reach from "../../../assets/img/reach.png";
import reachWhite from "../../../assets/img/reachWhite.png";
import engagement from "../../../assets/img/engagement.png";
import engagementWhite from "../../../assets/img/engagementWhite.png";
import views from "../../../assets/img/views.png";
import viewsWhite from "../../../assets/img/viewsWhite.png";
import pricing from "../../../assets/img/pricing.png";
import pricingWhite from "../../../assets/img/pricingWhite.png";
import {
  IndustryComparisonInterface,
  similarAccountInterface,
} from "../../../marketer/pages/InfluencerProfile/profieResult";
import { cardVisibleInterface } from "../../../marketer/pages/InfluencerProfile/influencerProfileView.page";

type IndustryComparisonDataKey = "reach" | "views" | "engagement" | "pricing";

interface industryDataInterface {
  industryComparison: IndustryComparisonInterface;
  similarAccount: similarAccountInterface[];
  handleShowCards: (cardName: keyof cardVisibleInterface) => void;
  cardVisible: cardVisibleInterface;
}

const IndustryComparison: React.FC<industryDataInterface> = ({
  industryComparison,
  similarAccount,
  handleShowCards,
  cardVisible,
}) => {
  const similarAccountsData = [
    {
      profileName: "Rajat Gautam",
      followersCount: "25M",
      engRate: "6.5%",
      profilePic: man1,
    },
    {
      profileName: "John Doe",
      followersCount: "30M",
      engRate: "7.2%",
      profilePic: man1,
    },
    {
      profileName: "Emily Smith",
      followersCount: "20M",
      engRate: "5.8%",
      profilePic: man1,
    },
    {
      profileName: "Michael",
      followersCount: "18M",
      engRate: "4.9%",
      profilePic: man1,
    },
    {
      profileName: "Sophia Brown",
      followersCount: "22M",
      engRate: "5.5%",
      profilePic: man1,
    },
    {
      profileName: "Daniel Williams",
      followersCount: "28M",
      engRate: "6.8%",
      profilePic: man1,
    },
  ];
  const IndustryComparisonData: Record<
    IndustryComparisonDataKey,
    { value: number; perPost: number; IA: number }
  > = {
    reach: {
      value: 76,
      perPost: 34,
      IA: 70,
    },
    views: {
      value: 34,
      perPost: 134,
      IA: 170,
    },
    engagement: {
      value: 98,
      perPost: 234,
      IA: 270,
    },
    pricing: {
      value: 75,
      perPost: 334,
      IA: 370,
    },
  };
  const cardsPerRow = 2;
  const rows = [];
  for (let i = 0; i < similarAccount.length; i += cardsPerRow) {
    rows.push(similarAccount.slice(i, i + cardsPerRow));
  }
  const [gaugeActive, setGaugeActive] =
    useState<IndustryComparisonDataKey>("reach");
  const handleGaugeOptionChange = (optionData: IndustryComparisonDataKey) => {
    setGaugeActive(optionData);
  };
  return (
    <div id="industry-comparison" className="bg-[#ebebeb] w-full pt-3">
      <div className="md:flex">
        <div className="bg-white md:w-6/12 p-3 pl-4 ml-4 mr-3 mb-3 rounded-lg">
          <div>
            <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg">
              Industry Comparison
            </p>
          </div>
          {cardVisible.industryComparison ? (
            <div>
              <div className="flex mt-4">
                <div className="w-11/12 md:w-9/12">
                  <div>
                    <div className="justify-center flex w-full pt-4">
                      <IndustryGauge
                        value={IndustryComparisonData[gaugeActive].value}
                      />
                    </div>
                    <div className="mb-7 mt-3">
                      <div className="flex justify-center">
                        <p className="text-[#909AAA] text-sm xl:text-sm 2xl:text-lg font-medium">
                          Reach Per Post:
                        </p>
                        <p className="ml-2 text-sm xl:text-sm 2xl:text-lg font-medium">
                          175
                        </p>
                      </div>
                      <div className="flex justify-center">
                        <p className="text-[#909AAA] text-sm xl:text-sm 2xl:text-lg font-medium">
                          Industry Average:
                        </p>
                        <p className="ml-2 text-sm xl:text-sm 2xl:text-lg font-medium">
                          500
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full 2xl:pt-20">
                    <div className="flex justify-center items-center">
                      <div className="bg-[#DD3900] flex items-center justify-center rounded-md w-16 h-6 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                        <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                          0-165
                        </p>
                      </div>
                      <div className="bg-[#FFDF13] flex items-center justify-center rounded-md w-16 h-6 mx-4 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                        <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                          331-495
                        </p>
                      </div>
                      <div className="bg-[#7691CC] flex items-center justify-center rounded-md w-16 h-6 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                        <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                          661-825
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center items-center mt-4">
                      <div className="bg-[#FF4101] flex items-center justify-center rounded-md w-16 h-6 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                        <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                          166-330
                        </p>
                      </div>
                      <div className="bg-[#FDC103] flex items-center justify-center rounded-md w-16 h-6 mx-4 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                        <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                          496-660
                        </p>
                      </div>
                      <div className="bg-[#4267B2] flex items-center justify-center rounded-md w-16 h-6 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                        <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                          826K-1000
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-4/12 md:w-3/12 flex justify-center">
                  <div className="xl:pt-4">
                    <button
                      onClick={() => handleGaugeOptionChange("reach")}
                      className={`w-[72px] h-[72px] 2xl:w-24 2xl:h-24 xl:w-[70px] xl:h-[70px] border border=[#D9D9D9] rounded-lg mb-3 ${
                        gaugeActive === "reach" ? "bg-ri-blue" : "bg-white"
                      }`}>
                      <img
                        className="w-6 h-6 2xl:w-9 2xl:h-9 xl:w-7 xl:h-7 mx-auto mt-2"
                        src={gaugeActive === "reach" ? reachWhite : reach}
                        alt="reachWhite"
                      />
                      <p
                        className={`text-[#4267B2] text-[10px] 2xl:text-sm xl:text-[10px] text-center font-thin mt-1 ${
                          gaugeActive === "reach"
                            ? "text-white"
                            : "text-ri-blue"
                        }`}>
                        Reach
                      </p>
                    </button>
                    <div
                      className={`w-[72px] h-[72px] 2xl:w-24 2xl:h-24 xl:w-[70px] xl:h-[70px] p-1 border border=[#D9D9D9] rounded-lg mb-3 cursor-pointer ${
                        gaugeActive === "views" ? "bg-ri-blue" : "bg-white"
                      }`}
                      onClick={() => handleGaugeOptionChange("views")}>
                      <img
                        className="w-6 h-6 2xl:w-9 2xl:h-9 xl:w-7 xl:h-7 mx-auto mt-2"
                        src={gaugeActive === "views" ? viewsWhite : views}
                        alt="reachWhite"
                      />
                      <p
                        className={`text-[#4267B2] text-[10px] 2xl:text-sm xl:text-[10px] text-center font-thin mt-1 ${
                          gaugeActive === "views"
                            ? "text-white"
                            : "text-ri-blue"
                        }`}>
                        Views
                      </p>
                    </div>
                    <div
                      className={`w-[72px] h-[72px] 2xl:w-24 2xl:h-24 xl:w-[70px] xl:h-[70px] p-1 border border=[#D9D9D9] rounded-lg mb-3 cursor-pointer ${
                        gaugeActive === "engagement" ? "bg-ri-blue" : "bg-white"
                      }`}
                      onClick={() => handleGaugeOptionChange("engagement")}>
                      <img
                        className="w-6 h-6 2xl:w-9 2xl:h-9 xl:w-7 xl:h-7 mx-auto mt-2"
                        src={
                          gaugeActive === "engagement"
                            ? engagementWhite
                            : engagement
                        }
                        alt="reachWhite"
                      />
                      <p
                        className={`text-[#4267B2] text-[10px] 2xl:text-sm xl:text-[10px] text-center font-thin mt-1 ${
                          gaugeActive === "engagement"
                            ? "text-white"
                            : "text-ri-blue"
                        }`}>
                        Engagement
                      </p>
                    </div>
                    <div
                      className={`w-[72px] h-[72px] 2xl:w-24 2xl:h-24 xl:w-[70px] xl:h-[70px] p-1 border border=[#D9D9D9] rounded-lg cursor-pointer ${
                        gaugeActive === "pricing" ? "bg-ri-blue" : "bg-white"
                      }`}
                      onClick={() => handleGaugeOptionChange("pricing")}>
                      <img
                        className="w-6 h-6 2xl:w-9 2xl:h-9 xl:w-7 xl:h-7 mx-auto mt-2"
                        src={gaugeActive === "pricing" ? pricingWhite : pricing}
                        alt="reachWhite"
                      />
                      <p
                        className={`text-[#4267B2] text-[10px] 2xl:text-sm xl:text-[10px] text-center font-thin mt-1 ${
                          gaugeActive === "pricing"
                            ? "text-white"
                            : "text-ri-blue"
                        }`}>
                        Pricing
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative w-full">
              <div className="absolute inset-0 flex flex-col justify-center items-center z-10">
                <button
                  className="text-gray-700 text-sm bg-white px-4 py-2 rounded-full shadow-lg z-10"
                  onClick={() => handleShowCards("industryComparison")}>
                  Show Example <i className="fa-solid fa-lock text-sm"></i>
                </button>
              </div>
              <div className="blur">
                <div className="flex mt-4">
                  <div className="w-11/12 md:w-9/12">
                    <div>
                      <div className="justify-center flex w-full pt-4">
                        <IndustryGauge
                          value={IndustryComparisonData[gaugeActive].value}
                        />
                      </div>
                      <div className="mb-7 mt-3">
                        <div className="flex justify-center">
                          <p className="text-[#909AAA] text-sm xl:text-sm 2xl:text-lg font-medium">
                            Reach Per Post:
                          </p>
                          <p className="ml-2 text-sm xl:text-sm 2xl:text-lg font-medium">
                            175
                          </p>
                        </div>
                        <div className="flex justify-center">
                          <p className="text-[#909AAA] text-sm xl:text-sm 2xl:text-lg font-medium">
                            Industry Average:
                          </p>
                          <p className="ml-2 text-sm xl:text-sm 2xl:text-lg font-medium">
                            500
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full 2xl:pt-20">
                      <div className="flex justify-center items-center">
                        <div className="bg-[#DD3900] flex items-center justify-center rounded-md w-16 h-6 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                          <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                            0-165
                          </p>
                        </div>
                        <div className="bg-[#FFDF13] flex items-center justify-center rounded-md w-16 h-6 mx-4 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                          <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                            331-495
                          </p>
                        </div>
                        <div className="bg-[#7691CC] flex items-center justify-center rounded-md w-16 h-6 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                          <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                            661-825
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center items-center mt-4">
                        <div className="bg-[#FF4101] flex items-center justify-center rounded-md w-16 h-6 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                          <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                            166-330
                          </p>
                        </div>
                        <div className="bg-[#FDC103] flex items-center justify-center rounded-md w-16 h-6 mx-4 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                          <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                            496-660
                          </p>
                        </div>
                        <div className="bg-[#4267B2] flex items-center justify-center rounded-md w-16 h-6 2xl:w-24 2xl:h-9 xl:w-24 xl:h-8">
                          <p className="text-white text-[10px] xl:text-sm 2xl:text-base">
                            826K-1000
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-4/12 md:w-3/12 flex justify-center">
                    <div className="xl:pt-4">
                      <button
                        onClick={() => handleGaugeOptionChange("reach")}
                        className={`w-[72px] h-[72px] 2xl:w-24 2xl:h-24 xl:w-[70px] xl:h-[70px] border border=[#D9D9D9] rounded-lg mb-3 ${
                          gaugeActive === "reach" ? "bg-ri-blue" : "bg-white"
                        }`}>
                        <img
                          className="w-6 h-6 2xl:w-9 2xl:h-9 xl:w-7 xl:h-7 mx-auto mt-2"
                          src={gaugeActive === "reach" ? reachWhite : reach}
                          alt="reachWhite"
                        />
                        <p
                          className={`text-[#4267B2] text-[10px] 2xl:text-sm xl:text-[10px] text-center font-thin mt-1 ${
                            gaugeActive === "reach"
                              ? "text-white"
                              : "text-ri-blue"
                          }`}>
                          Reach
                        </p>
                      </button>
                      <div
                        className={`w-[72px] h-[72px] 2xl:w-24 2xl:h-24 xl:w-[70px] xl:h-[70px] p-1 border border=[#D9D9D9] rounded-lg mb-3 cursor-pointer ${
                          gaugeActive === "views" ? "bg-ri-blue" : "bg-white"
                        }`}
                        onClick={() => handleGaugeOptionChange("views")}>
                        <img
                          className="w-6 h-6 2xl:w-9 2xl:h-9 xl:w-7 xl:h-7 mx-auto mt-2"
                          src={gaugeActive === "views" ? viewsWhite : views}
                          alt="reachWhite"
                        />
                        <p
                          className={`text-[#4267B2] text-[10px] 2xl:text-sm xl:text-[10px] text-center font-thin mt-1 ${
                            gaugeActive === "views"
                              ? "text-white"
                              : "text-ri-blue"
                          }`}>
                          Views
                        </p>
                      </div>
                      <div
                        className={`w-[72px] h-[72px] 2xl:w-24 2xl:h-24 xl:w-[70px] xl:h-[70px] p-1 border border=[#D9D9D9] rounded-lg mb-3 cursor-pointer ${
                          gaugeActive === "engagement"
                            ? "bg-ri-blue"
                            : "bg-white"
                        }`}
                        onClick={() => handleGaugeOptionChange("engagement")}>
                        <img
                          className="w-6 h-6 2xl:w-9 2xl:h-9 xl:w-7 xl:h-7 mx-auto mt-2"
                          src={
                            gaugeActive === "engagement"
                              ? engagementWhite
                              : engagement
                          }
                          alt="reachWhite"
                        />
                        <p
                          className={`text-[#4267B2] text-[10px] 2xl:text-sm xl:text-[10px] text-center font-thin mt-1 ${
                            gaugeActive === "engagement"
                              ? "text-white"
                              : "text-ri-blue"
                          }`}>
                          Engagement
                        </p>
                      </div>
                      <div
                        className={`w-[72px] h-[72px] 2xl:w-24 2xl:h-24 xl:w-[70px] xl:h-[70px] p-1 border border=[#D9D9D9] rounded-lg cursor-pointer ${
                          gaugeActive === "pricing" ? "bg-ri-blue" : "bg-white"
                        }`}
                        onClick={() => handleGaugeOptionChange("pricing")}>
                        <img
                          className="w-6 h-6 2xl:w-9 2xl:h-9 xl:w-7 xl:h-7 mx-auto mt-2"
                          src={
                            gaugeActive === "pricing" ? pricingWhite : pricing
                          }
                          alt="reachWhite"
                        />
                        <p
                          className={`text-[#4267B2] text-[10px] 2xl:text-sm xl:text-[10px] text-center font-thin mt-1 ${
                            gaugeActive === "pricing"
                              ? "text-white"
                              : "text-ri-blue"
                          }`}>
                          Pricing
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="bg-white md:w-6/12 p-3 md:mb-4 rounded-lg md:ml-2 ml-4 mr-4">
          <p className="text-gray-color font-medium text-sm md:text-base 2xl:text-lg mb-2">
            Similar Accounts
          </p>
          <div className="">
            {rows.map((row, index) => (
              <div key={index} className="flex mb-3">
                {row.map((cardData, cardIndex) => (
                  <SimilarAccountCards key={cardIndex} influencer={cardData} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default IndustryComparison;
