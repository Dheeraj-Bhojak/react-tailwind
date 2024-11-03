import React, { Fragment } from "react";
import { PriceListSeed } from "../../../seeder";
import { subscriptionTypeInterface } from "./Price";

const MiniPriceList: React.FC<subscriptionTypeInterface> = ({
  subscriptionType,
}) => {
  const filteredPriceList = PriceListSeed.slice(2);
  const firstObject = PriceListSeed[1].data[1] as {
    tag: string;
    heading: string;
    price: string;
    monthlyTimePeriod: string;
    yearlyTimePeriod: string;
    yearlyTimePeriodWithDiscount: string;
    yearlyPlan: string;
    button: string;
    option: string;
  };

  return (
    <Fragment>
      <div className="bundle-option">
        <div className="w-full">
          <div className="w-1/4"></div>

          <div className="w-3/4"></div>
        </div>
      </div>
      <div
        className={`xs:w-[416px] flex w-full flex-col border-2 rounded-t-md rounded-b-md  ${
          firstObject.heading === "Professional"
            ? " border-[#219abc] border-y-2"
            : ""
        } `}>
        {firstObject.heading === "Professional" && (
          <div className="bg-[#40CEFF]">
            <p className="text-[14px] text-center p-[0.5rem] uppercase font-bold tracking-wider">
              Most Popular
            </p>
          </div>
        )}
        <div className="p-2">
          <p className="text-lg font-[18px]"> {firstObject.heading}</p>
          <p
            className="text-xs line-through"
            style={{
              visibility: subscriptionType === "Monthly" ? "hidden" : "visible",
            }}>
            {firstObject.price}
          </p>

          {subscriptionType === "Monthly" ? (
            <h3 className="font-bold  text-lg text-ri-blue">
              ₹{firstObject.price}
            </h3>
          ) : (
            <h3 className="font-bold  text-lg text-ri-blue">
              ₹{firstObject.yearlyPlan}
            </h3>
          )}
          {subscriptionType === "Monthly" ? (
            <p className="text-xs">{firstObject.monthlyTimePeriod}</p>
          ) : (
            <p className="text-xs">
              billed at{" "}
              <span className="line-through">
                {firstObject.yearlyTimePeriod}
              </span>
              <span className="font-bold">
                {" "}
                {firstObject.yearlyTimePeriodWithDiscount} INR/yr
              </span>
            </p>
          )}
          <button className="bg-[#fdc100] p-1 h-[40px] py-2 w-full rounded-full mt-4 text-white text-[13px]">
            {firstObject.button}
          </button>
          <p className="my-2 text-xs text-center">{firstObject.option}</p>
        </div>
        <p className="font-bold text-xl my-2 px-2 float-left">Features</p>
        {filteredPriceList.map((item, index) => (
          <div
            key={index}
            className="flex border-b-2 border-[#BEBED8] border-dotted px-2">
            <div className="w-10/12 flex flex-col">
              {item.heading && (
                <h3 className="font-bold float-left leading-[28px] ">
                  {item.heading}
                </h3>
              )}
              {item.subHeading && (
                <p className="ml-3 leading-[28px] font-[14px]">
                  {item.subHeading}
                </p>
              )}
            </div>
            <div className="w-2/12 flex items-center justify-end pr-2">
              {item.data.length > 0 && (
                <span>
                  {item.heading === "Social Networks" ? (
                    item.data.map((icon, indx) => {
                      return (
                        <i key={indx} className={`fa-brands fa-${icon} pl-2`} />
                      );
                    })
                  ) : typeof item.data[0] === "object" ? null : item.data[0] ===
                    true ? (
                    <i className="fa-regular fa-circle-check text-green-600"></i>
                  ) : item.data[0] === false ? (
                    <i className="fa-regular fa-circle-xmark text-red-600"></i>
                  ) : typeof item.data[0] === "string" ? (
                    <p className="text-[13px] text-[#0d0205]">{item.data[0]}</p>
                  ) : (
                    item.data[0]
                  )}
                </span>
              )}
            </div>
          </div>
        ))}
        <div className="p-2">
          <p className="text-lg  font-bold mt-3"> {firstObject.heading}</p>
          <p
            className="text-xs line-through"
            style={{
              visibility: subscriptionType === "Monthly" ? "hidden" : "visible",
            }}>
            {firstObject.price}
          </p>

          {subscriptionType === "Monthly" ? (
            <h3 className="font-bold  text-lg text-ri-blue">
              ₹{firstObject.price}
            </h3>
          ) : (
            <h3 className="font-bold  text-lg text-ri-blue">
              ₹{firstObject.yearlyPlan}
            </h3>
          )}
          {subscriptionType === "Monthly" ? (
            <p className="text-xs">{firstObject.monthlyTimePeriod}</p>
          ) : (
            <p className="text-xs">
              billed at{" "}
              <span className="line-through">
                {firstObject.yearlyTimePeriod}
              </span>
              <span className="font-bold">
                {" "}
                {firstObject.yearlyTimePeriodWithDiscount} INR/yr
              </span>
            </p>
          )}
          <button className="bg-[#fdc100] p-1 py-2 w-full rounded-full mt-4 text-white">
            {firstObject.button}
          </button>
          <p className="my-2 text-xs text-center">{firstObject.option}</p>
        </div>

        {firstObject.heading === "Professional" && (
          <div className=" bg-[#8ecae6]">
            <p className="text-[14px] text-center p-[0.5rem] uppercase font-bold tracking-wider">
              Most Popular
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default MiniPriceList;
