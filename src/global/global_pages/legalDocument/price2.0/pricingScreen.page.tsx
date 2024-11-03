import React, { useState } from "react";
import pricingBackground from "../../../../assets/img/pricingBackground.png";
import PricingInfoBox from "../../../global_component/pricing/2.0/pricingInfoBox.component";

import { pricing } from "../../../../utils/constants/userConstants/pricingData";
import ViewBundle from "../../../global_component/pricing/2.0/viewBundle.component";

const PricingScreen = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [packagePeriod, setPackagePeriod] = useState("monthly");
  const [showEnterpriseSection, setShowEnterpriseSection] = useState(false);

  const onChangeMonthlyAnnually = () => {
    setIsMonthly(!isMonthly);
    packagePeriod === "monthly"
      ? setPackagePeriod("yearly")
      : setPackagePeriod("monthly");
  };

  const handleEnterpriseButtonClick = (heading: string) => {
    if (heading === "enterprise") {
      setShowEnterpriseSection(true);
    }
  };

  console.log(packagePeriod);
  return (
    <div>
      <div className="relative">
        {/* Make sure the Image must be in the following dimension: 3421 X 849. If you're taking another image instead of this, remember to crop it in the given size. */}
        <img
          src={pricingBackground}
          alt=""
          className="md:h-72 h-36 w-full object-cover "
        />
        <div className="absolute inset-0 flex top-0 items-center justify-center">
          <div className="text-white text-center">
            <p className="text-xs md:text-sm  font-bold xl:text-base">
              7-DAY FREE TRIAL ON ALL PLANS
            </p>
            <p className="text-3xl md:text-4xl xl:text-5xl mt-2 font-medium">
              Choose Your Plan
            </p>
            <p className="mt-4 text-base xl:text-lg mx-5 font-medium">
              Finally, a solution that lets you pay for what you need, when you
              need it
            </p>
          </div>
        </div>
      </div>
      <div className="xl:container mx-auto mt-5">
        {showEnterpriseSection ? (
          <div className="enterprise-section">
            <ViewBundle />
          </div>
        ) : (
          <div className="mx-auto">
            <div className="flex xl:flex-row justify-center items-center">
              <div className="flex flex-col xl:flex-row items-center">
                <div className="flex rounded-full border border-gray-300 overflow-hidden ">
                  <div
                    className={`cursor-pointer p-3 rounded-full transition-all duration-300 ${
                      packagePeriod === "monthly" ? "bg-[#4267B2]" : "bg-white"
                    }`}
                    onClick={onChangeMonthlyAnnually}
                    style={{ width: "50%" }}>
                    <p
                      className={`transition-all duration-300 ${
                        packagePeriod === "monthly"
                          ? "text-white"
                          : "text-black"
                      }`}>
                      Monthly
                    </p>
                  </div>
                  <div
                    className={`cursor-pointer p-3 rounded-full transition-all duration-600 ${
                      packagePeriod === "yearly" ? "bg-[#4267B2]" : "bg-white"
                    }`}
                    onClick={onChangeMonthlyAnnually}
                    style={{ width: "50%" }}>
                    <p
                      className={`transition-all duration-600 ${
                        packagePeriod === "yearly" ? "text-white" : "text-black"
                      }`}>
                      Yearly
                    </p>
                  </div>
                </div>
                <div className="mt-[16px] xl:mt-0 mx-4">
                  <p className="font-medium text-sm xl:text-base text-center ml-0 xl:ml-4">
                    Pay annually and get{" "}
                    <span className="text-[#4267B2]">20% off</span>
                  </p>
                </div>
              </div>
              {/* <div className="mt-[16px] xl:mt-0">
                <p className="font-semibold text-sm xl:text-base">
                  Prices in INR ₹
                </p>
              </div> */}
            </div>
            <div className="mb-14 mt-3 flex flex-col xl:flex-row gap-3 mx-9 md:mx-44 lg:mx-64 xl:mx-0 justify-center">
              {packagePeriod === "monthly"
                ? pricing.monthly.map((price, indx) => {
                    return (
                      <PricingInfoBox
                        price={price}
                        key={indx}
                        onButtonClick={handleEnterpriseButtonClick}
                        planPeriod={packagePeriod}
                      />
                    );
                  })
                : packagePeriod === "yearly"
                ? pricing.yearly.map((price, indx) => {
                    return (
                      <PricingInfoBox
                        price={price}
                        key={indx}
                        onButtonClick={handleEnterpriseButtonClick}
                        planPeriod={packagePeriod}
                      />
                    );
                  })
                : "No Data Found"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingScreen;
