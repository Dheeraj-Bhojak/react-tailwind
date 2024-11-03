import React, { Fragment, useEffect, useState } from "react";
import KpiStackCard from "./kpi_states.component";
import graylike from "../../../assets/img/grayLike.png";
import yellowComment from "../../../assets/img/yellowComment.png";
import blueShare from "../../../assets/img/blueShare.png";
import IndustryGauge from "./IndustryGauge.component";
import EngagementFunnelChart from "./EngagementFunnelChart";
import axios from "axios";

interface Cost {
  CPE: { like: number; comment: number; share: number };
  CPC: { like: number; comment: number; share: number };
  CPM: { like: number; comment: number; share: number };
  CPV: { like: number; comment: number; share: number };
}

interface KPIInterface {
  campaignDetails: {
    id: number;
    campaign_name: string;
    platform: string;
    campaign_description: string;
    status: string;
  };
  kpi: {
    CPE: {
      amount: string;
      like: string;
      comment: string;
      share: string;
    };
    CPC: {
      amount: string;
      comment: number;
    };
    CPM: {
      amount: string;
    };
    CPV: {
      amount: string;
    };
    minReport: {
      cardHeading: string;
      cardDataNumber: number;
      progressBarValue: number;
    }[];
  };
}

const Kpi: React.FC<{ campaignId: number; access_token: string }> = ({
  campaignId,
  access_token,
}) => {
  const data = [
    { name: "Awareness", value: 252 },
    { name: "Interest", value: 105 },
  ];

  const [kpiData, setKpiData] = useState<KPIInterface | null>(null);

  const isMobile = () => {
    return window.innerWidth <= 768;
  };

  const Data: {
    state: {
      cardBorderBottomColor: string;
      circleMiddleTextColor: string;
      circlePathColor: string;
    }[];
    campaignPerformance: number;
    cost: Cost;
    engagement: { like: number; comment: number; share: number };
  } = {
    state: [
      {
        cardBorderBottomColor: "#4267B2",
        circleMiddleTextColor: "#4267B2",
        circlePathColor: "#4267B2",
      },
      {
        cardBorderBottomColor: "#FDC100",
        circleMiddleTextColor: "#FDC100",
        circlePathColor: "#FDC100",
      },
      {
        cardBorderBottomColor: "#52AD60",
        circleMiddleTextColor: "#52AD60",
        circlePathColor: "#52AD60",
      },
      {
        cardBorderBottomColor: "#DB6261",
        circleMiddleTextColor: "#DB6261",
        circlePathColor: "#DB6261",
      },
    ],
    campaignPerformance: 73,
    cost: {
      CPE: {
        like: 0.1,
        comment: 5,
        share: 42,
      },
      CPC: {
        like: 0.4,
        comment: 5.7,
        share: 17,
      },
      CPM: {
        like: 0.8,
        comment: 9.1,
        share: 54,
      },
      CPV: {
        like: 0,
        comment: 7.7,
        share: 29,
      },
    },
    engagement: {
      like: 5345,
      comment: 3452,
      share: 246,
    },
  };
  const headers = {
    authorization: `Bearer ${access_token}`,
  };
  const fetchCampaignReportKpi = async () => {
    const fetchCampaignReportKpiUrl = `${process.env.REACT_APP_API_URL}marketer_campaign/report/kpi/${campaignId}`;
    const config = {
      headers,
    };
    try {
      const { data } = await axios.get(fetchCampaignReportKpiUrl, config);
      setKpiData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCampaignReportKpi();
  }, []);

  const [selectCostOption, setSelectCostOptions] = useState("CPE");
  const changeCostTab = (cost: string) => {
    setSelectCostOptions(cost);
  };
  console.log(kpiData?.kpi.minReport[0]?.cardHeading);
  return (
    <div className="bg-[#ebebeb]">
      <div
        className={`grid ${
          isMobile() ? "grid-cols-2" : "grid-cols-4"
        } p-[12px] md:p-4 gap-3`}>
        {Data.state.map((data, index) => (
          <KpiStackCard
            key={index}
            isMobile={isMobile()}
            cardHeading={
              kpiData?.kpi.minReport?.[index]?.cardHeading
                ? kpiData.kpi.minReport[index].cardHeading
                : " - "
            }
            cardDataNumber={
              kpiData?.kpi.minReport?.[index]?.cardDataNumber
                ? `${kpiData.kpi.minReport[index].cardDataNumber}`
                : " - "
            }
            progressBarValue={
              kpiData?.kpi.minReport?.[index]?.progressBarValue
                ? kpiData.kpi.minReport[index].progressBarValue
                : 0
            }
            cardBorderBottomColor={data.cardBorderBottomColor}
            circleMiddleTextColor={data.circleMiddleTextColor}
            circlePathColor={data.circlePathColor}
          />
        ))}
      </div>
      <div className="lg:flex px-[12px] lg:px-4 gap-3 space-y-3 lg:space-y-0">
        <div className="lg:w-1/4 bg-white p-2 rounded-md flex-col items-center justify-center">
          <div>
            <p className="text-gray-color font-medium text-xs lg:text-base 2xl:text-base">
              Campaign Performance
            </p>
          </div>
          {/* <div className="mt-2 flex justify-center">
            <IndustryGauge value={Data.campaignPerformance} />
          </div> */}
        </div>
        <div className="lg:w-1/2 bg-white p-2 rounded-md">
          <div>
            <p className="text-gray-color font-medium text-xs lg:text-base 2xl:text-base">
              Cost
            </p>
          </div>
          <div className="mt-2 lg:flex justify-center p-3">
            <div className="lg:w-1/2 flex items-center justify-center gap-2">
              <div className="lg:space-y-2 flex lg:flex-col gap-[8px] lg:gap-0">
                <button
                  className={`rounded-md py-2 px-4  border flex justify-center items-center ${
                    selectCostOption === "CPE"
                      ? "bg-ri-blue text-white"
                      : "bg-white text-ri-blue"
                  }`}
                  onClick={() => changeCostTab("CPE")}>
                  <p className=" text-xs lg:text-base">CPE</p>
                </button>
                <button
                  className={`rounded-md py-2 px-4 border flex justify-center items-center ${
                    selectCostOption === "CPM"
                      ? "bg-ri-blue text-white"
                      : "bg-white text-ri-blue"
                  }`}
                  onClick={() => changeCostTab("CPM")}>
                  <p className="text-xs lg:text-base">CPM</p>
                </button>
              </div>
              <div className="lg:space-y-2 flex lg:flex-col gap-[8px] lg:gap-0">
                <button
                  className={`rounded-md py-2 px-4 border flex justify-center items-center ${
                    selectCostOption === "CPC"
                      ? "bg-ri-blue text-white"
                      : "bg-white text-ri-blue"
                  }`}
                  onClick={() => changeCostTab("CPC")}>
                  <p className="text-xs lg:text-base">CPC</p>
                </button>
                <button
                  className={`rounded-md py-2 px-4  border flex justify-center items-center ${
                    selectCostOption === "CPV"
                      ? "bg-ri-blue text-white"
                      : "bg-white text-ri-blue"
                  }`}
                  onClick={() => changeCostTab("CPV")}>
                  <p className="text-xs lg:text-base">CPV</p>
                </button>
              </div>
            </div>
            {kpiData && kpiData.kpi && (
              <div className="lg:w-1/2 flex px-[8px] lg:px-0 mt-[12px] lg:mt-0">
                {selectCostOption === "CPE" && kpiData.kpi.CPE ? (
                  <Fragment>
                    <div className="w-1/2">
                      <p className="text-sm lg:text-base font-semibold">
                        Cost Per Engagement: {kpiData.kpi.CPE.amount}
                      </p>
                      <div>
                        <div className="flex items-center mt-3">
                          <div className="w-4 h-4 lg:w-5 lg:h-5 bg-[#D9D9D9]"></div>
                          <div className="ml-[4px] lg:ml-2">
                            <p className="text-xs lg:text-sm">Likes</p>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mt-[4px] lg:mt-2">
                            <div className="w-4 h-4 lg:w-5 lg:h-5 bg-[#FDC100]"></div>
                            <div className="ml-[4px] lg:ml-2">
                              <p className="text-xs lg:text-sm">Comments</p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mt-[4px] lg:mt-2">
                            <div className="w-4 h-4 lg:w-5 lg:h-5 bg-[#4267B2]"></div>
                            <div className="ml-[4px] lg:ml-2">
                              <p className="text-xs lg:text-sm">Share</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2">
                      <div className="flex justify-evenly items-end">
                        <div className="">
                          <div>
                            <p className="text-[9px]  lg:font-semibold text-center">
                              ₹ {kpiData.kpi.CPE.like}
                            </p>
                          </div>
                          <div className="w-6 h-12 bg-[#D9D9D9]"></div>
                          <div className="flex justify-center items-center">
                            <img
                              className="w-3 h-3 lg:w-4 lg:h-4 mt-1"
                              src={graylike}
                              alt=""
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex-col items-center justify-center">
                            <div>
                              <p className="text-center text-[9px]  lg:font-semibold">
                                ₹ {kpiData.kpi.CPE.comment}
                              </p>
                            </div>
                            <div className="w-6 h-16 bg-[#FDC100]"></div>
                            <div className="flex justify-center items-center">
                              <img
                                className="w-3 h-3 lg:w-4 lg:h-4 mt-1"
                                src={yellowComment}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="flex-col items-center justify-center">
                            <div>
                              <p className="text-center text-[9px] lg:font-semibold">
                                ₹ {kpiData.kpi.CPE.share}
                              </p>
                            </div>
                            <div className="w-6 h-20 bg-[#4267B2]"></div>
                            <div className="flex justify-center items-center">
                              <img
                                className="w-3 h-3 lg:w-4 lg:h-4 mt-1"
                                src={blueShare}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ) : selectCostOption === "CPC" ? (
                  <Fragment>
                    <div className="w-1/2">
                      <p className="text-sm lg:text-base font-semibold">
                        Cost Per Comment
                      </p>
                      <div className="flex items-center mt-3">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 bg-ri-blue"></div>
                        <div className="ml-[4px] lg:ml-2">
                          <p className="text-xs lg:text-sm">Comment</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex-col items-center justify-center">
                        <div>
                          <p className="text-center text-[10px] lg:text-[11px] lg:font-semibold">
                            ₹ {Data.cost[selectCostOption as keyof Cost].share}
                          </p>
                        </div>
                        <div className="w-6 h-20 bg-[#4267B2]"></div>
                        <div className="flex justify-center">
                          <img
                            className="w-3 h-3 lg:w-4 lg:h-4 mt-1"
                            src={blueShare}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ) : selectCostOption === "CPM" ? (
                  <Fragment>
                    <div className="w-full text-center">
                      <p className="text-sm lg:text-base font-semibold">
                        Cost per Mille/Thousand Impressions
                      </p>
                      <p className="flex-col items-center justify-center text-xl lg:text-3xl lg:font-semibold">
                        ₹ {Data.cost[selectCostOption as keyof Cost].share}
                      </p>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="w-full text-center">
                      <p className="text-sm lg:text-base font-semibold">
                        Cost per view
                      </p>
                      <p className="flex-col items-center justify-center text-xl lg:text-3xl lg:font-semibold">
                        ₹ {Data.cost[selectCostOption as keyof Cost].share}
                      </p>
                    </div>
                  </Fragment>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="lg:w-1/4 bg-white p-2 rounded-md">
          <div>
            <p className="text-gray-color font-medium text-xs md:text-base 2xl:text-base">
              Engagement
            </p>
          </div>
          {/* <div className="mt-2 max-h-96 flex justify-center">
            <EngagementFunnelChart data={data} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Kpi;
