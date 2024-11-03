import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CFormRange } from "@coreui/react";
import MoreDetailsComponent from "./moreDetails.component";
import SeeAllFeaturesComponent from "./seeAllFeatures.component";
import PriceBreakdown from "./priceBreakdown.component";

export const customBundleData = [
  {
    name: "discover",
    subHeading: `Access the world's largest influencer database`,
    bundleType: {
      Basic: {
        name: "Basic",
        platform: ["instagram", "youtube"],
        price: "1800",
        additionalData: {
          name: "Monthly results",
          display_message:
            "This Product includes 2,000 results per month. The price for 1,000 additional results starts at $5/month.",
          value: {
            min: 2000,
            max: 100000,
          },
        },
      },
      Pro: {
        name: "Pro",
        platform: ["instagram", "youtube"],
        price: "2500",
        additionalData: {
          name: "Monthly results",
          display_message:
            "This Product includes 3,000 results per month. The price for 1,000 additional results starts at $5/month.",
          value: {
            min: 3000,
            max: 100000,
          },
        },
      },
    },
  },
];

type PlanType = "Basic" | "Pro";

const ViewBundle = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [BasicDropdownValue, setBasicDropdownValue] = useState<string>("");
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [showMoreDetailsModal, setShowMoreDetailsModal] =
    useState<boolean>(false);
  const [showAllFeaturesModal, setShowAllFeaturesModal] =
    useState<boolean>(false);
  const [showPriceBreakdown, setShowPriceBreakdown] = useState<boolean>(false);

  const handleShowMoreDetails = useCallback(() => {
    setShowMoreDetailsModal(true);
  }, []);

  const handleCloseShowMoreDetailsModal = () => {
    setShowMoreDetailsModal(false);
  };

  const handleShowAllDetails = useCallback(() => {
    setShowAllFeaturesModal(true);
  }, []);

  const handleCloseAllFeaturesModal = () => {
    setShowAllFeaturesModal(false);
  };

  const handleShowPriceBreakdownModal = useCallback(() => {
    setShowPriceBreakdown(true);
  }, []);

  const handleClosePriceBreakdownModal = () => {
    setShowPriceBreakdown(false);
  };

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (selectedPlan) {
      const minValue =
        customBundleData[0].bundleType[selectedPlan].additionalData.value.min;
      setSliderValue(newValue < minValue ? minValue : newValue);
    }
  };

  useEffect(() => {
    if (selectedPlan) {
      const minValue =
        customBundleData[0].bundleType[selectedPlan].additionalData.value.min;
      setSliderValue(minValue);
    }
  }, [selectedPlan]);

  let minValue = 0;
  let maxValue = 0;

  if (selectedPlan) {
    minValue =
      customBundleData[0].bundleType[selectedPlan].additionalData.value.min;
    maxValue =
      customBundleData[0].bundleType[selectedPlan].additionalData.value.max;
  }

  const BackToPricesButton = () => {
    navigate("/admin/pricing-screen");
  };

  const handlePlanChange = (plan: PlanType) => {
    if (plan === "Pro") {
      setBasicDropdownValue("");
    }
    setSelectedPlan(plan);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setBasicDropdownValue(value);
    if (value) {
      setSelectedPlan("Basic");
    }
  };

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleCancelPurchaseButton = () => {
    setSelectedPlan(null);
    setBasicDropdownValue("");
  };

  const getPlanPrice = () => {
    if (selectedPlan) {
      const planDetails =
        customBundleData[0].bundleType[
          selectedPlan as keyof (typeof customBundleData)[0]["bundleType"]
        ];
      if (planDetails) {
        const minValue = planDetails.additionalData.value.min;
        const additionalResults = Math.max(0, sliderValue - minValue);
        return (
          parseInt(planDetails.price) + Math.floor(additionalResults / 1000) * 5
        );
      }
    }
    return 0;
  };

  return (
    <div className="mx-2 md:mx-0">
      <div className="text-center flex flex-col">
        <p className="text-2xl xl:text-3xl 2xl:text-4xl font-medium">
          Design Your Customized Packages
        </p>
        <p className="mt-3 text-sm xl:text-base 2xl:text-lg">
          Incorporate the essential tools necessary for your expanding business
        </p>
        <button
          className="flex items-center mt-3 justify-center"
          onClick={BackToPricesButton}>
          <i className="fa-solid fa-angle-left text-[#4267B2] text-sm xl:text-base 2xl:text-lg"></i>
          <p className="text-[#4267B2] font-medium text-sm xl:text-base 2xl:text-lg ml-3">
            Back To Prices
          </p>
        </button>
      </div>
      <div className="p-3 mt-4">
        {customBundleData.map((bundle, index) => (
          <div
            key={index}
            className="gap-4 flex flex-col lg:flex-row lg:w-[80%] mx-auto">
            <div className="lg:w-8/12 lg:self-start">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg lg:text-2xl">
                  {bundle.name.charAt(0).toUpperCase() + bundle.name.slice(1)}
                </p>
                <button onClick={handleShowAllDetails}>
                  <p className="font-semibold text-sm">See all features</p>
                </button>
              </div>
              <p className="text-xs md:text-sm lg:text-base mt-3">
                {bundle.subHeading}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                {Object.entries(bundle.bundleType).map(
                  ([planType, planDetails]) => (
                    <label
                      key={planType}
                      className={`sm:w-6/12 p-3 rounded-md border-1 flex flex-col justify-center items-center cursor-pointer ${
                        selectedPlan ===
                        planType.charAt(0).toUpperCase() + planType.slice(1)
                          ? "border-[#4267B2] bg-[#DAE6FF]"
                          : "border-gray-300"
                      } `}
                      onClick={() => {
                        if (planType === "Pro") {
                          handlePlanChange("Pro");
                        }
                      }}>
                      <input
                        type="radio"
                        name="plan"
                        className="hidden"
                        value={
                          planType.charAt(0).toUpperCase() + planType.slice(1)
                        }
                        checked={
                          selectedPlan ===
                          planType.charAt(0).toUpperCase() + planType.slice(1)
                        }
                        readOnly
                      />
                      <p className="text-sm lg:text-base font-medium">
                        {planType.charAt(0).toUpperCase() + planType.slice(1)}
                      </p>
                      {planType === "Basic" ? (
                        <select
                          value={BasicDropdownValue}
                          onChange={handleDropdownChange}
                          className={`h-8 lg:h-9 px-3 rounded border-1 custom-input text-sm lg:text-base mt-2 `}>
                          <option value="">Select Social Media</option>
                          {planDetails.platform.map((platform, index) => (
                            <option key={index} value={platform}>
                              {platform.charAt(0).toUpperCase() +
                                platform.slice(1)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="flex mt-2 gap-2">
                          {planDetails.platform.map((platform, index) => (
                            <i
                              key={index}
                              className={`fa-brands fa-${platform.toLowerCase()} text-[#4267B2] text-xl`}></i>
                          ))}
                        </div>
                      )}
                      <p className="text-sm lg:text-base font-medium mt-2">
                        ₹{planDetails.price}/month
                      </p>
                    </label>
                  )
                )}
              </div>
              {selectedPlan && (
                <div className="mt-3">
                  <p className="font-medium text-sm lg:text-base">
                    Monthly results
                  </p>
                  <div className="flex justify-between mt-3">
                    <div className="w-8/12">
                      <p className="text-sm lg:text-base">
                        {selectedPlan === "Basic"
                          ? customBundleData[0].bundleType.Basic.additionalData
                              .display_message
                          : customBundleData[0].bundleType.Pro.additionalData
                              .display_message}
                      </p>
                      <button onClick={handleShowMoreDetails}>
                        <p className="font-medium text-sm lg:text-base">
                          More Details
                        </p>
                      </button>
                    </div>
                    <div className="w-4/12 flex justify-end items-start">
                      <div className="bg-[#eeeeee] border-1 border-[#787575] rounded py-2 px-4">
                        <p className="text-sm lg:text-base">{sliderValue}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    {selectedPlan ? (
                      <>
                        <CFormRange
                          id="customRange1"
                          min={minValue}
                          max={maxValue}
                          value={sliderValue}
                          onChange={handleSliderChange}
                          step={1000}
                        />
                        <div className="flex justify-between">
                          <p className="font-medium text-sm lg:text-base">
                            {minValue}
                          </p>
                          <p className="font-medium text-sm lg:text-base">
                            {maxValue}
                          </p>
                        </div>
                      </>
                    ) : (
                      <p>Please select a plan</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="lg:w-4/12 border-1 p-3 rounded-md lg:self-start">
              <p className="font-medium text-base lg:text-lg xl:text-xl">
                Your Bundle
              </p>
              <p className="text-sm 2xl:text-base mt-2">
                Choose Products to compose your Bundle
              </p>
              {selectedPlan && (
                <div className="bg-[#EEEEEE] p-3 relative rounded border-1 border-[#D9D9D9] mt-3">
                  <div className="flex">
                    <p className="font-medium text-sm lg:text-base xl:text-lg">
                      Discover
                    </p>
                    <p className="font-medium text-sm lg:text-base xl:text-lg mx-2">
                      |
                    </p>
                    <p className="font-medium text-sm lg:text-base xl:text-lg">
                      {selectedPlan}
                    </p>
                  </div>
                  <button
                    className="absolute top-2 self-start items-center justify-center flex"
                    onClick={handleCancelPurchaseButton}>
                    <i className="fa-solid fa-xmark text-xl mr-3"></i>
                  </button>
                  <div>
                    <p className="text-sm 2xl:text-base mt-2 text-[#787575]">
                      {selectedPlan === "Basic" && BasicDropdownValue
                        ? capitalizeFirstLetter(BasicDropdownValue)
                        : selectedPlan &&
                          customBundleData[0].bundleType[
                            selectedPlan as keyof (typeof customBundleData)[0]["bundleType"]
                          ].platform
                            .map((platform) => capitalizeFirstLetter(platform))
                            .join(" + ")}
                    </p>
                  </div>
                  <div className="flex mt-2">
                    <p className="text-sm 2xl:text-base mt-2">
                      ₹{getPlanPrice()}/month
                    </p>
                    <p className="text-sm 2xl:text-base mt-2 mx-2">|</p>
                    <p className="text-sm 2xl:text-base mt-2">
                      {sliderValue} results/month
                    </p>
                  </div>
                </div>
              )}
              <div className="border-t-1 mt-3"></div>
              <div className="mt-3 flex flex-col items-center">
                <p className="font-semibold xl:text-lg">Monthly Price</p>
                <p className="font-medium xl:text-lg mt-3">
                  ₹{getPlanPrice()}/month
                </p>
                <button className="bg-[#4267B2] text-white py-2 px-4 rounded-md mt-3">
                  <p className="text-sm 2xl:text-base">Start your trial</p>
                </button>
                <button
                  className="mt-3"
                  onClick={handleShowPriceBreakdownModal}>
                  <p className="font-semibold xl:text-lg">
                    View Price Breakdown
                  </p>
                </button>
              </div>
            </div>
          </div>
        ))}
        {showMoreDetailsModal && (
          <div>
            <MoreDetailsComponent
              closeModal={handleCloseShowMoreDetailsModal}
            />
          </div>
        )}
        {showAllFeaturesModal && (
          <div>
            <SeeAllFeaturesComponent closeModal={handleCloseAllFeaturesModal} />
          </div>
        )}
        {showPriceBreakdown && (
          <PriceBreakdown closeModal={handleClosePriceBreakdownModal} />
        )}
      </div>
    </div>
  );
};

export default ViewBundle;
