import React, { Fragment, useState } from "react";
import PriceList from "../../../global_component/pricing/Price";
import MiniPriceList from "../../../global_component/pricing/MiniPriceList";

const PricingListLayout: React.FC = () => {
  const [subscriptionType, setSubscriptionType] = useState("Monthly");
  const changePricingPlanDuration = () => {
    setSubscriptionType(
      subscriptionType === "Monthly" ? "Annually" : "Monthly"
    );
  };
  return (
    <Fragment>
      <div className="">
        <section>
          <div className="bg-gradient-to-r from-ri-blue to-teal-100 justify-center items-center p-12">
            <div className="flex justify-center items-center">
              <h1 className="ld:text-6xl text-2xl text-black font-semibold  p-10 text-center  max-w-[45rem]">
                Save Time and Improve Campaigns with the Best Data
              </h1>
            </div>
          </div>
        </section>
        <div className="mt-10 justify-center items-center flex">
          <h1 className="flex text-xl font-semibold">
            Save 20% With Year plan
          </h1>
        </div>
        <div className="justify-center items-center flex">
          <label className="inline-flex items-center p-2 rounded-md cursor-pointer dark:text-gray-800 ">
            <input
              id="Toggle3"
              type="checkbox"
              className="hidden peer"
              checked={subscriptionType === "Monthly"}
              onChange={changePricingPlanDuration}
            />
            <span
              className={`px-4 py-2 rounded-l-md ${
                subscriptionType === "Monthly"
                  ? "dark:bg-ri-orange"
                  : "dark:bg-gray-200"
              } border`}>
              Monthly
            </span>
            <span
              className={`px-4 py-2 rounded-r-md ${
                subscriptionType === "Annually"
                  ? "dark:bg-ri-orange"
                  : "dark:bg-gray-200"
              } border`}>
              Annually
            </span>
          </label>
        </div>
        <p className="text-center mb-5">Prices in INR</p>
        <div className="pricing_table mb-5">
          <div className="lg:block hidden">
            <PriceList subscriptionType={subscriptionType} />
          </div>
          <div className="lg:hidden flex">
            <div className="mx-auto">
              <MiniPriceList subscriptionType={subscriptionType} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default PricingListLayout;
