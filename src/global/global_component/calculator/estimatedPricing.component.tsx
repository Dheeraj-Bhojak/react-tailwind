import React, { useEffect, useState } from "react";
import {
  InstagramDeliverables,
  YoutubeDeliverables,
} from "../../../marketer/components/campaignPost/campaignPostOverview/campaignPostOverview.component";
import _ from "lodash";
import { niches_categories } from "../../../seeder";
import PlatformDeliverableItem from "../../../influencer/component/deliverables/Deliverables.component";

type PlatformDeliverablesType = {
  youtube_deliverables: YoutubeDeliverables;
  instagram_deliverables: InstagramDeliverables;
};

const PricingCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState({
    platform: "instagram",
    influencerCount: 0,
    compensationType: "",
    niche: 0,
    influencerCategory: "",
    youtube_deliverables: {
      dedicated_video: 0,
      integrated_video: 0,
      shorts: 0,
    },
    instagram_deliverables: {
      reels: 0,
      story_with_link: 0,
      video_post: 0,
      static_post: 0,
    },
  });

  const handleNicheChange = () => {};
  const [calculatedResult, setCalculatedResult] = useState({
    totalDeliverables: 0,
    estimatedCost: 0,
  });

  useEffect(() => {
    if (calculatorState.platform === "instagram") {
      const instagramDeliverables = calculatorState.instagram_deliverables;
      setCalculatedResult((prev) => ({
        ...prev,
        totalDeliverables: Object.values(instagramDeliverables).reduce(
          (acc, val) => acc + val,
          0
        ),
      }));
    } else if (calculatorState.platform === "youtube") {
      const youtubeDeliverables = calculatorState.youtube_deliverables;
      setCalculatedResult((prev) => ({
        ...prev,
        totalDeliverables: Object.values(youtubeDeliverables).reduce(
          (acc, val) => acc + val,
          0
        ),
      }));
    }
  }, [calculatorState]);

  useEffect(() => {
    let totalCost = 0;
    if (
      calculatorState.platform === "instagram" &&
      calculatorState.compensationType === "Paid"
    ) {
      if (calculatorState.influencerCategory === "1") {
        totalCost = 200;
      } else if (calculatorState.influencerCategory === "2") {
        totalCost = 300;
      } else if (calculatorState.influencerCategory === "3") {
        totalCost = 450;
      }
    } else if (
      calculatorState.platform === "youtube" &&
      calculatorState.compensationType === "paid"
    ) {
      if (Number(calculatorState.influencerCategory) % 3 === 0) {
        totalCost = 150;
      } else if ((Number(calculatorState.influencerCategory) + 1) % 3 === 0) {
        totalCost = 200;
      } else if ((Number(calculatorState.influencerCategory) + 1) % 3 === 0) {
        totalCost = 250;
      }
    } else {
      totalCost = 0;
    }
    setCalculatedResult((prev) => ({
      ...prev,
      estimatedCost:
        calculatedResult.totalDeliverables *
        calculatorState.influencerCount *
        totalCost,
    }));
  }, [calculatorState]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!isNaN(Number(value)) && Number(value) <= 50) {
      setCalculatorState((prev) => ({
        ...prev,
        influencerCount: Number(value),
      }));
    } else if (!isNaN(Number(value)) && Number(value) > 50) {
      setCalculatorState((prev) => ({
        ...prev,
        influencerCount: 50,
      }));
    }
  };

  const increment = () => {
    if (calculatorState.influencerCount < 50) {
      setCalculatorState((prev) => ({
        ...prev,
        influencerCount: calculatorState.influencerCount + 1,
      }));
    }
  };

  const decrement = () => {
    if (calculatorState.influencerCount > 0) {
      setCalculatorState((prev) => ({
        ...prev,
        influencerCount: calculatorState.influencerCount - 1,
      }));
    }
  };

  const handleIncrementAndDecrementInstagram = (
    category: keyof PlatformDeliverablesType,
    instagram_deliverables_key: keyof InstagramDeliverables,
    value: number,
    operation: string
  ) => {
    if (operation === "+") {
      setCalculatorState((prev) => ({
        ...prev,
        [category]: {
          ...calculatorState["instagram_deliverables"],
          [instagram_deliverables_key]: value < 50 ? value + 1 : 50,
        },
      }));
    }
    if (operation === "-") {
      setCalculatorState((prev) => ({
        ...prev,
        [category]: {
          ...calculatorState["instagram_deliverables"],
          [instagram_deliverables_key]: value > 0 ? value - 1 : 0,
        },
      }));
    }
  };
  const handleIncrementAndDecrementYoutube = (
    category: keyof PlatformDeliverablesType,
    youtube_deliverables_key: keyof YoutubeDeliverables,
    value: number,
    operation: string
  ) => {
    if (operation === "+") {
      setCalculatorState((prev) => ({
        ...prev,
        [category]: {
          ...calculatorState["youtube_deliverables"],

          [youtube_deliverables_key]: value < 50 ? value + 1 : 50,
        },
      }));
    }
    if (operation === "-") {
      setCalculatorState((prev) => ({
        ...prev,
        [category]: {
          ...calculatorState["youtube_deliverables"],
          [youtube_deliverables_key]: value > 0 ? value - 1 : 0,
        },
      }));
    }
  };

  const handleChangeCalculator = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.preventDefault();
    setCalculatorState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleChangeCalculatorSelect = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setCalculatorState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="max-w-[1576px] mx-auto p-4">
      <h1 className="mt-2 md:text-4xl text-xl font-bold">
        Estimated influencer pricing calculator
      </h1>

      <div className="lg:flex mt-5">
        <div className="lg:w-1/3 lg:mt-0 mt-2 justify-center p-3 border-gray-200 border-1 rounded-lg mx-1 shadow-md">
          <h1 className=" text-xl font-bold  mb-2 ">Choose Platform</h1>
          <p className="text-[12px] mb-2 text-[#222]">
            Choose the platform of influencer you require for your campaign
          </p>
          <div className={` flex flex-wrap `}>
            <div className="w-1/2">
              <label className={`p-2  cursor-pointer min-w-[40px] flex`}>
                <input
                  type="radio"
                  name="platform"
                  value="instagram"
                  className="hidden"
                  onChange={handleChangeCalculator}
                />
                <i
                  className={`fa-brands fa-instagram fa-2x  ${
                    calculatorState.platform === "instagram"
                      ? " bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-red-400 to-indigo-700"
                      : ""
                  }`}></i>
                <span className="ml-4">{"Instagram"}</span>
              </label>
            </div>
            <div className="w-1/2">
              <label className={`p-2  cursor-pointer min-w-[36px] flex`}>
                <input
                  type="radio"
                  name="platform"
                  value="youtube"
                  className="hidden"
                  onChange={handleChangeCalculator}
                />
                <i
                  className={`fa-brands fa-youtube fa-2x   ${
                    calculatorState.platform === "youtube"
                      ? " text-[#ff0000]"
                      : ""
                  }`}></i>
                <span className="ml-4">{"Youtube"}</span>
              </label>
            </div>
          </div>
        </div>
        <div className="lg:w-1/3 lg:mt-0 mt-2 justify-center p-3 border-gray-200 border-1 rounded-lg mx-1 shadow-md ">
          <h1 className="text-xl font-bold ">Influencer count</h1>
          <p className="text-[12px] mb-2 text-[#222]">
            Choose the number of influencer you require for your campaign
          </p>
          <div className="w-full flex justify-center ">
            <button
              className="px-4 border mr-5 py-1 bg-ri-yellow rounded-full"
              onClick={decrement}>
              -
            </button>
            <input
              type="text"
              className="border w-24 text-center"
              value={calculatorState.influencerCount}
              onChange={handleInputChange}
            />
            <button
              className="px-4 border ml-5 py-1 bg-ri-yellow rounded-full"
              onClick={increment}>
              +
            </button>
            {/* {error && <p className="text-red-500">{error}</p>} */}
          </div>
        </div>
        <div className="lg:w-1/3 lg:mt-0 mt-2 justify-center p-3 border-gray-200 border-1 rounded-lg mx-1 shadow-md">
          <h1 className=" text-xl font-bold">Compensation type</h1>
          <p className="text-[12px] mb-2 text-[#222]">
            <span className="font-semibold">Note:</span> The quality of
            influencer is higher in paid campaigns.
          </p>
          <div className="w-full">
            <select
              id="influencer_nicheOptions"
              value={calculatorState.compensationType}
              name="compensationType"
              onChange={handleChangeCalculatorSelect}
              className="bg-gray-50 border-1 p-2 border-gray-500 lg:w-10/12 w-full cursor-pointer text-sm rounded-md appearance-none relative  ">
              <option value={""} disabled>
                Select compensation type
              </option>
              <option value="Paid">Paid</option>
              <option value="Barter">Barter</option>
            </select>
          </div>
        </div>
      </div>
      <div className="lg:w-full mt-4 lg:flex">
        <div className="lg:w-1/2 lg:mt-0 mt-2 justify-center p-3 border-gray-200 border-2 rounded-lg mx-1 shadow-md">
          <h1 className="text-xl font-bold mt-3">Influencer Niche</h1>
          <p className="text-[12px] mb-2 text-[#222]">
            Choose the niche of influencer you require for your campaign
          </p>
          <div className="w-full">
            <select
              id="influencer_nicheOptions"
              name="niche"
              value={calculatorState.niche}
              onChange={handleChangeCalculatorSelect}
              className="bg-gray-50 border-1 p-2 border-gray-500 lg:w-10/12 w-full  text-sm rounded-md appearance-none relative  ">
              <option value={""} disabled>
                Select A Niche
              </option>
              {niches_categories.map((niche, indx) => (
                <option key={indx} value={niche.id}>
                  {`${_.toUpper(niche.niche_name)} `}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="lg:w-1/2 lg:mt-0 mt-2 justify-center p-3 border-gray-200 border-2 rounded-lg mx-1 shadow-md">
          <h1 className=" text-xl font-bold">Influencer category</h1>
          <p className="text-[12px] mb-2 text-[#222]">
            Choose the category of influencer you require for your campaign
          </p>
          <div className="w-full">
            <select
              id="influencer_nicheOptions"
              name="influencerCategory"
              value={calculatorState.influencerCategory}
              onChange={handleChangeCalculatorSelect}
              className="bg-gray-50 border-1 p-2 border-gray-500 lg:w-10/12 w-full text-sm rounded-md appearance-none relative  ">
              <option value={""} disabled>
                Select influencer category
              </option>
              <option value={1}>Nano (Below 10k Followers/ Subscribers)</option>
              <option value={2}>
                Micro (10k to 100k Followers/ Subscribers)
              </option>
              <option value={3}>
                Macro (100k and above Followers/ Subscribers)
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="lg:w-full lg:flex">
        <div className="lg:w-1/2 lg:mt-0 mt-2 justify-center p-3 border-gray-200 border-2 rounded-lg mx-1 shadow-md">
          {calculatorState.platform ? (
            <div>
              <h1 className=" text-3xl font-bold mb-4">Deliverables</h1>
              {calculatorState.platform === "instagram" ? (
                <ul>
                  {Object.entries(calculatorState.instagram_deliverables).map(
                    ([item, value], indx) => (
                      <li className="lg:w-full flex" key={indx}>
                        <div className="w-1/3">{_.capitalize(item)}</div>
                        <div className="w-1/2 flex justify-center items-center">
                          <button
                            className="px-3 mr-1 border  py-1 bg-ri-yellow rounded-full"
                            onClick={() =>
                              handleIncrementAndDecrementInstagram(
                                "instagram_deliverables",
                                item as keyof typeof calculatorState.instagram_deliverables,
                                value,
                                "-"
                              )
                            }>
                            -{" "}
                          </button>
                          <input
                            type="text"
                            disabled
                            className="border w-16 text-center"
                            value={value}
                            placeholder="no of influencer"
                          />
                          <button
                            className="px-3 ml-1 border py-1 bg-ri-yellow rounded-full"
                            onClick={() =>
                              handleIncrementAndDecrementInstagram(
                                "instagram_deliverables",
                                item as keyof typeof calculatorState.instagram_deliverables,
                                value,
                                "+"
                              )
                            }>
                            +
                          </button>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                ""
              )}
              {calculatorState.platform === "youtube" ? (
                <ul>
                  {Object.entries(calculatorState.youtube_deliverables).map(
                    ([item, value], indx) => (
                      <li className="lg:w-full flex" key={indx}>
                        <div className="w-1/3">{_.capitalize(item)}</div>
                        <div className="w-1/2 flex justify-center items-center">
                          <button
                            className="px-3 mr-1 border  py-1 bg-ri-yellow rounded-full"
                            onClick={() =>
                              handleIncrementAndDecrementYoutube(
                                "youtube_deliverables",
                                item as keyof typeof calculatorState.youtube_deliverables,
                                value,
                                "-"
                              )
                            }>
                            -{" "}
                          </button>
                          <input
                            type="text"
                            disabled
                            className="border w-16 text-center"
                            value={value}
                            placeholder="no of influencer"
                          />
                          <button
                            className="px-3 ml-1 border py-1 bg-ri-yellow rounded-full"
                            onClick={() =>
                              handleIncrementAndDecrementYoutube(
                                "youtube_deliverables",
                                item as keyof typeof calculatorState.youtube_deliverables,
                                value,
                                "+"
                              )
                            }>
                            +
                          </button>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="lg:w-1/2 text-center m-auto">
          <h1 className="text-xl font-semibold ">Total deliverables</h1>
          <p className="text-base">
            {calculatedResult.totalDeliverables} Deliverables X{" "}
            {calculatorState.influencerCount} Influencer ={" "}
            <span className="text-2xl font-bold">
              {calculatedResult.totalDeliverables *
                calculatorState.influencerCount}
            </span>
          </p>
          <h1 className="text-xl font-semibold mt-2">Estimated cost</h1>
          <p className="text-2xl font-bold">
            {" "}
            ₹ {calculatedResult.estimatedCost}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
