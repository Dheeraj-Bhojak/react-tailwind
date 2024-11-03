import React from "react";

import { PricingDataInterface } from "../../../../utils/constants/userConstants/pricingData";
import SubscriptionButton from "../../razorPayButton/subscriptionButton.component";

import MostPopular from "../../../../assets/img/most-popular.png";

interface PricingInfoBoxInterface {
  price: PricingDataInterface;
  planPeriod: string;
  onButtonClick: (heading: string) => void;
}

const PricingInfoBox: React.FC<PricingInfoBoxInterface> = ({
  price,
  planPeriod,
}) => {
  return (
    <div
      className={`p-6 rounded-xl xl:w-3/12  ${
        price.header.isPopular
          ? "border-2 border-ri-orange bg-[#fffbf0] shadow-md"
          : "border-1 "
      }`}>
      {price.header.isPopular ? (
        <div className="justify-end flex">
          <img src={MostPopular} alt="" className="absolute h-20 w-20" />
        </div>
      ) : (
        ""
      )}
      <div>
        <p className="font-medium text-base">
          {price.header.heading.charAt(0).toUpperCase() +
            price.header.heading.slice(1)}
        </p>{" "}
        <p
          className="text-xs  line-through font-medium mt-[25px] xl:mt-[35px]"
          style={{
            visibility: planPeriod === "monthly" ? "hidden" : "visible",
          }}>
          ₹{price.header.monthlyPrice}
        </p>
        <p className="text-xl xl:text-2xl font-medium ">
          ₹{price.header.billPrice}
          <span className="text-xs xl:text-sm"> /month</span>
        </p>
        <p className="text-[#b1b1b1] text-xs xl:text-sm mt-2">
          {price.header.billPeriod}
          <span className="text-xs line-through mr-1">
            {price.header.yearlyPrice
              ? ` ₹${price.header.yearlyPrice} /Month`
              : " "}
          </span>
          <span className="text-xs text-black text-bold">
            {price.header.discountedYearlyPrice
              ? ` ₹${price.header.discountedYearlyPrice} /Month`
              : " "}
          </span>
        </p>
        <div className="py-8">
          <p className="text-[#b1b1b1] text-xs xl:text-sm ">
            {price.header.priceDescription}
          </p>
        </div>
        <div className="mx-4 mt-4">
          <SubscriptionButton
            planId={price.plan_id}
            isPopular={price.header.isPopular}
            buttonName={price.header.button}
          />
          <p className="text-[#b1b1b1] text-xs xl:text-sm mt-2 text-center">
            No credit card required
          </p>
        </div>
        {price.data.map((priceData, indx) => (
          <div className="mt-6" key={indx}>
            <p className="text-sm xl:text-base font-medium">
              {priceData.heading}
            </p>
            {priceData.subHeading.map((subHeadingData, indx) => (
              <div className="flex items-center mt-2 gap-2" key={indx}>
                <i className="fa-solid fa-check text-[#4267B2]"></i>
                <p className="text-sm xl:text-base">{subHeadingData}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingInfoBox;
