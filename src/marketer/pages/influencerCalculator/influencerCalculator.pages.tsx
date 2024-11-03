import { platform } from "os";
import React, { Fragment, useState } from "react";

const InfluencerPriceCalculator: React.FC = () => {
  const [priceDetails, setPriceDetails] = useState({
    platform: "instagram",
    followers: "",
    engagement: "",
    totalTime: "",
  });

  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

  const calculateEstimatedPrice = (
    followers: string,
    engagement: string,
    time: string
  ): number => {
    let basePrice = 0;

    switch (followers) {
      case "1":
        basePrice += 1500;
        break;
      case "2":
        basePrice += 4500;
        break;
      case "3":
        basePrice += 10000;
        break;
      default:
        break;
    }
    switch (engagement) {
      case "1":
        basePrice *= 1.2;
        break;
      case "2":
        basePrice *= 1.5;
        break;
      case "3":
        basePrice *= 1.8;
        break;
      default:
        break;
    }
    switch (time) {
      case "1":
        basePrice *= 1.1;
        break;
      case "2":
        basePrice *= 1.2;
        break;
      case "3":
        basePrice *= 1.3;
        break;
      default:
        break;
    }
    return Math.ceil(basePrice);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    console.log("hello");
    const { name, value } = e.target;
    setPriceDetails({
      ...priceDetails,
      [name]: value,
    });
  };

  const calculatePrice = () => {
    const price = calculateEstimatedPrice(
      priceDetails.followers,
      priceDetails.engagement,
      priceDetails.totalTime
    );
    setEstimatedPrice(price);
  };

  return (
    <Fragment>
      <div className="flex justify-center ">
        <h1 className="">Influencer Price calculator</h1>
      </div>
      <div className="mt-4">
        <p className="text-xl font-bold text-center">
          Estimated Price: ₹{estimatedPrice}
        </p>
      </div>
      <div className="min-h-[70vh] bg-gray-100">
        <div className="">
          <div className="lg:flex mt-5">
            <div className="lg:w-1/2 lg:mt-0 mt-2 justify-center p-3 bg-white border-1 rounded-lg mx-1 shadow-md">
              <h1 className=" text-xl font-bold  mb-2 ">Choose Platform</h1>
              <p className="text-[12px] mb-2 text-[#222]">
                Choose the platform where you ready for collab.
              </p>
              <div className={` flex flex-wrap `}>
                <div className="w-1/2">
                  <label className={`p-2  cursor-pointer min-w-[40px] flex`}>
                    <input
                      type="radio"
                      name="platform"
                      value="instagram"
                      className="hidden"
                      onChange={handleChange}
                    />
                    <i
                      className={`fa-brands fa-instagram fa-2x ${
                        priceDetails.platform === "instagram"
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
                      onChange={handleChange}
                    />
                    <i
                      className={`fa-brands fa-youtube fa-2x   ${
                        priceDetails.platform === "youtube"
                          ? " text-[#ff0000]"
                          : ""
                      }`}></i>
                    <span className="ml-4">{"Youtube"}</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 lg:mt-0 mt-2 justify-center p-3 bg-white border-white border-1 rounded-lg mx-1 shadow-md ">
              <h1 className="text-xl font-bold ">Total Followers</h1>
              <p className="text-[12px] mb-2 text-[#222]">
                Choose the category you are in
              </p>
              <select
                id="influencer_nicheOptions"
                name="followers"
                value={priceDetails.followers}
                onChange={handleChange}
                className="bg-gray-50 border-1 p-2 border-gray-500 lg:w-10/12 w-full text-sm rounded-md appearance-none relative  ">
                <option value={""} disabled>
                  Select influencer category
                </option>
                <option value={1}>
                  Nano (Below 10k Followers/ Subscribers)
                </option>
                <option value={2}>
                  Micro (10k to 100k Followers/ Subscribers)
                </option>
                <option value={3}>
                  Macro (100k and above Followers/ Subscribers)
                </option>
              </select>
            </div>
          </div>
          <div className="lg:flex mt-2">
            <div className="lg:w-1/2 lg:mt-0 mt-2 justify-center p-3 bg-white border-white border-1 rounded-lg mx-1 shadow-md">
              <h1 className=" text-xl font-bold">Engagement Percentage</h1>
              <p className="text-[12px] mb-2 text-[#222]">
                Please Select Your Engagement Percentage Rate
              </p>
              <select
                name="engagement"
                value={priceDetails.engagement}
                onChange={handleChange}
                className="bg-gray-50 border-1 p-2 border-gray-500 lg:w-10/12 w-full text-sm rounded-md appearance-none relative  ">
                <option value={""} disabled>
                  Select influencer category
                </option>
                <option value={1}>{"<5% Day"} (Engagement Less Then 5%)</option>
                <option value={2}>
                  {"5%-8.5%"} ( Engagement between 5% and 8.5% )
                </option>
                <option value={3}>
                  {"> 8.5 Days"} (Engagement More then 8.5% )
                </option>
              </select>
            </div>
            <div className="lg:w-1/2 lg:mt-0 mt-2 justify-center p-3 bg-white border-gray-200 border-2 rounded-lg mx-1 shadow-md">
              <h1 className=" text-xl font-bold">Total Time</h1>
              <p className="text-[12px] mb-2 text-[#222]">
                Days Taken To Create Post
              </p>
              <div className="w-full">
                <select
                  name="totalTime"
                  value={priceDetails.totalTime}
                  onChange={handleChange}
                  className="bg-gray-50 border-1 p-2 border-gray-500 lg:w-10/12 w-full text-sm rounded-md appearance-none relative  ">
                  <option value={""} disabled>
                    Select category
                  </option>
                  <option value={1}>
                    {"< 1 Day"} (Take Less Then One Day)
                  </option>
                  <option value={2}>
                    {"1-2 Days"} (Take One Or two Days )
                  </option>
                  <option value={3}>
                    {"> 2 Days"} (Takes More then 2 Days )
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            className="w-2/6 py-3 text-white border-1 rounded bg-ri-blue"
            onClick={calculatePrice}>
            Calculate Price
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default InfluencerPriceCalculator;
