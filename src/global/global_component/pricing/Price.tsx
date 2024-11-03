import React, { Fragment } from "react";
import { PriceListSeed } from "../../../seeder";
import "./pricingTableRows.css";

export interface SubscriptionPlan {
  tag: string;
  heading: string;
  price: string;
  monthlyTimePeriod: string;
  yearlyTimePeriod: string;
  yearlyTimePeriodWithDiscount: string;
  button: string;
  option: string;
}
export interface subscriptionTypeInterface {
  subscriptionType: string;
}

export interface DataObject {
  heading?: string;
  subHeading?: string;
  data: (string | boolean | SubscriptionPlan)[];
}

export interface InterfaceObject {
  data: DataObject[];
}

const PriceList: React.FC<subscriptionTypeInterface> = ({
  subscriptionType,
}) => {
  let count = 0;
  return (
    <div>
      <table className=" w-8/12 m-auto text-center my-8  mb-10 ">
        {PriceListSeed.map((element, index) => {
          return (
            <tbody id="pricingTable" key={index}>
              <tr className="border-black border-dashed border-b-[1.5px]">
                {element.heading ? (
                  <th className="text-left">{element.heading}</th>
                ) : element.subHeading ? (
                  <td className="text-left pl-2">{element.subHeading}</td>
                ) : (
                  <td className="text-left "></td>
                )}
                {element.data.map((element, indx) => {
                  count++;
                  return (
                    <Fragment key={count}>
                      <td>
                        {typeof element === "object" ? (
                          <div
                            className={`w-full rounded border  pt-3 text-center ${
                              element.tag ? "h-[267px] pb-10" : "h-64"
                            } border-black`}>
                            {element.tag ? (
                              <p className=" text-lg mb-8 bg-emerald-600">
                                {element.tag}
                              </p>
                            ) : (
                              <></>
                            )}
                            <p className=" text-ri-orange mx-auto text-lg h-10 font-bold ">
                              {element.heading}
                            </p>
                            <p
                              className="text-xs line-through"
                              style={{
                                visibility:
                                  subscriptionType === "Monthly"
                                    ? "hidden"
                                    : "visible",
                              }}>
                              {element.yearlyPlan}
                            </p>
                            {subscriptionType === "Monthly" ? (
                              <h3 className="font-bold  text-lg text-ri-blue">
                                ₹{element.price}
                              </h3>
                            ) : (
                              <h3 className="font-bold  text-lg text-ri-blue">
                                ₹{element.yearlyPlan}
                              </h3>
                            )}
                            {subscriptionType === "Monthly" ? (
                              <p className="text-xs">
                                {element.monthlyTimePeriod}
                              </p>
                            ) : (
                              <p className="text-xs">
                                billed at{" "}
                                <span className="line-through">
                                  {element.yearlyTimePeriod}
                                </span>
                                <span className="font-bold">
                                  {" "}
                                  {element.yearlyTimePeriodWithDiscount} INR/yr
                                </span>
                              </p>
                            )}
                            <button className="bg-ri-blue p-1 w-36 rounded-md m-4 mt-2 text-[14px] text-white">
                              {element.button}
                            </button>
                            <p className="">{element.option}</p>
                          </div>
                        ) : element === true ? (
                          <i className="fa-solid fa-check text-green-600 "></i>
                        ) : element === false ? (
                          <i className="fa-solid fa-xmark text-red-600"></i>
                        ) : (
                          element
                        )}
                      </td>
                    </Fragment>
                  );
                })}
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};
export default PriceList;
