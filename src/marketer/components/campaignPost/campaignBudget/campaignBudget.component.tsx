import React, { useEffect, useState } from "react";
import { campaignPostFormState } from "../campaignPostOverview/campaignPostOverview.component";

const CampaignCompensation = [
  {
    id: 1,
    title: "Paid",
    description:
      "If you are paying the influencers (this includes payment for any reason, including reimbursement).",
  },
  {
    id: 2,
    title: "Barter",
    description:
      "If you are sending products to the influencers and will not be making any payments to influencers.",
  },
];

const CampaignTentativeBudget = [
  {
    id: 1,
    title: "Basic",
    description: "Below one Lakh INR",
  },
  {
    id: 2,
    title: "Standard",
    description: "One Lakh to 10 Lakh INR",
  },
  {
    id: 3,
    title: "Premium",
    description: "10 Lakh to 50 Lakh INR",
  },
  {
    id: 4,
    title: "Ultimate",
    description: "50 Lakh INR and above",
  },
];

const CampaignBudget: React.FC<campaignPostFormState> = ({
  campaignPostState,
}) => {
  const { campaignFormObject, setCampaignFormObject } = campaignPostState;
  const campaignBudget = campaignFormObject.campaign_budget;

  const handleOnBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCampaignFormObject((prevState) => ({
      ...prevState,
      campaign_budget: {
        ...prevState.campaign_budget,
        [name]: value,
      },
    }));
  };
  return (
    <div className="" id="marketerBrandForm">
      <div className="bg-white">
        <div className="p-3">
          <div className="w-full  ">
            <div className="2xl:w-3/4 w-full mx-auto  rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md p-5 ">
              <h1 className=" text-3xl font-bold mt-3 mb-2 ">
                Campaign Budget
              </h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae architecto, dolore quo maiores optio veniam?
              </span>
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Compensation type
              </h1>
              <div className="mt-10 w-full  md:flex">
                {CampaignCompensation.map((objective, indx) => {
                  return (
                    <div
                      className={`m-3 justify-between select-none   ${
                        campaignBudget.compensation_type === objective.title
                          ? "border-3 border-ri-orange"
                          : "border-3"
                      }`}
                      key={indx}>
                      <label className="block cursor-pointer p-4">
                        <input
                          type="radio"
                          name="compensation_type"
                          className="hidden "
                          value={objective.title}
                          checked={
                            campaignBudget.compensation_type === objective.title
                          }
                          onChange={handleOnBudgetChange}
                        />
                        <span className="font-bold text-lg">
                          {objective.title}
                        </span>
                        <p className="text-xs text-gray-600 font-thin">
                          {objective.description}
                        </p>
                      </label>
                    </div>
                  );
                })}
              </div>
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Tentative budget
              </h1>
              <div className="mt-10 w-full  lg:flex">
                {CampaignTentativeBudget.map((objective, indx) => {
                  return (
                    <div
                      className={`w-full m-3 justify-between select-none  ${
                        campaignBudget.tentative_budget ===
                        objective.description
                          ? "border-3 border-ri-orange"
                          : "border-3"
                      }`}
                      key={indx}>
                      <label className="block cursor-pointer p-4">
                        <input
                          type="radio"
                          name="tentative_budget"
                          className="hidden "
                          value={objective.description}
                          checked={
                            campaignBudget.tentative_budget ===
                            objective.description
                          }
                          onChange={handleOnBudgetChange}
                        />
                        <span className=" font-bold">
                          <div
                            className={`text-center text-gray-500 ${
                              campaignBudget.tentative_budget ===
                              objective.description
                                ? "text-ri-orange"
                                : ""
                            }`}
                            dangerouslySetInnerHTML={{
                              __html: objective.title,
                            }}
                          />
                        </span>
                        <p className=" ml-2 text-gray-600 text-[14px] md:text-[12px] lg:text-[14px] px-2 text-center">
                          {objective.description}
                        </p>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBudget;
