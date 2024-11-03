import React from "react";
const Pricing = () => {
  return (
    <div>
      <div className=" relative">
        <div className="background-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="100%"
            height="560"
            preserveAspectRatio="none"
            viewBox="0 0 1440 560">
            <g mask="url(#SvgjsMask1000)" fill="none">
              <rect width="1440" height="560" x="0" y="0" fill="#0e2a47"></rect>
              <path
                d="M -948.2540666473597,498 C -852.25,420.8 -660.25,140.4 -468.2540666473596,112 C -276.25,83.6 -180.25,352.2 11.745933352640407,356 C 203.75,359.8 299.75,129.6 491.7459333526404,131 C 683.75,132.4 782.1,359.2 971.7459333526403,363 C 1161.4,366.8 1346.35,192.6 1440,150"
                stroke="rgba(51, 121, 194, 0.58)"
                strokeWidth="2"></path>
              <path
                d="M -444.75463924229183,467 C -348.75,392.8 -156.75,98.2 35.24536075770815,96 C 227.25,93.8 323.25,448.4 515.2453607577081,456 C 707.25,463.6 803.25,132 995.2453607577081,134 C 1187.25,136 1386.29,478.8 1475.245360757708,466 C 1564.2,453.2 1447.05,149.2 1440,70"
                stroke="rgba(51, 121, 194, 0.58)"
                strokeWidth="2"></path>
              <path
                d="M -603.7971756553504,92 C -507.8,163.2 -315.8,445.2 -123.79717565535039,448 C 68.2,450.8 164.2,127.6 356.2028243446496,106 C 548.2,84.4 644.2,332.4 836.2028243446496,340 C 1028.2,347.6 1195.44,129 1316.2028243446496,144 C 1436.96,159 1415.24,360.8 1440,415"
                stroke="rgba(51, 121, 194, 0.58)"
                strokeWidth="2"></path>
              <path
                d="M -176.07849281098618,301 C -80.08,285.8 111.92,216.8 303.9215071890138,225 C 495.92,233.2 591.92,334.6 783.9215071890138,342 C 975.92,349.4 1071.92,232 1263.921507189014,262 C 1455.92,292 1708.71,495.8 1743.921507189014,492 C 1779.14,488.2 1500.78,292.8 1440,243"
                stroke="rgba(51, 121, 194, 0.58)"
                strokeWidth="2"></path>
            </g>
            <defs>
              <mask id="SvgjsMask1000">
                <rect width="1440" height="560" fill="#ffffff"></rect>
              </mask>
            </defs>
          </svg>
        </div>
        <div className="absolute w-96  top-32 left-[545px] text-white p-4 z-10">
          <h1 className="text-5xl text-center">
            Save Time and Improve Campaigns with the Best Data
          </h1>
        </div>
      </div>
      <div className=" text-center  ">
        <h1 className="mt-14">Plans</h1>
      </div>
      <div className=" text-center  ">
        <h1 className="mt-14">Save 20 with yearly plans</h1>
      </div>
      <div className="flex h-52 w-8/12 mx-auto border border-black">
        <div className="w-1/4 border-r pt-3 text-center border-black"></div>
        <div className="w-1/4 border-r pt-3 text-center border-black">
          <p className=" text-lg">Create your own Bundle</p>
          <h3 className=" font-bold  mt-5 text-lg to-blue-500">Custom</h3>
          <p className=" mt-2">paid monthly</p>
          <button className="bg-blue-900 w-32 rounded-md mt-2 text-white">
            View Bundles
          </button>
          <p className="mt-1">no credit card required</p>
        </div>
        <div className="w-1/4 border-r pt-3 text-center border-black">
          <p className=" text-lg">Create your own Bundle</p>
          <h3 className=" font-bold mt-5 text-lg to-blue-500">Custom</h3>
          <p className="mt-2">paid monthly</p>
          <button className="bg-blue-900 w-32 rounded-md mt-2 text-white">
            View Bundles
          </button>
          <p className="mt-1">no credit card required</p>
        </div>
        <div className="w-1/4 pt-3 text-center">
          <p className=" text-lg">Create your own Bundle</p>
          <h3 className="font-bold mt-5 text-lg to-blue-500">Custom</h3>
          <p className="mt-2">paid monthly</p>
          <button className="bg-blue-900 w-32 rounded-md mt-2 text-white">
            View Bundles
          </button>
          <p className="mt-1">no credit card required</p>
        </div>
      </div>

      {/* <div className="calculator">
        <h1 className="mt-2 md:text-4xl text-xl font-bold">
        Estimated influencer pricing calculator
      </h1>

      <div className="lg:flex">
        <div className="lg:w-1/2 m-1">
          <h1 className=" text-xl font-bold mt-5">Compensation type</h1>
          <p className="text-[12px] mb-2 text-[#222]">
            <span className="font-semibold">Note:</span> The quality of
            influencer is higher in paid campaigns.
          </p>
          <div className="w-full">
            <select
              id="influencer_nicheOptions"
              // value={compensationType}
              onChange={handleNicheChange}
              className="bg-gray-50 border-1 p-2 border-gray-500 lg:w-10/12 w-full cursor-pointer text-sm rounded-md appearance-none relative  ">
              <option value={""} disabled>
                Select compensation type
              </option>
              <option value="Paid">Paid</option>
              <option value="Barter">Barter</option>
            </select>
          </div>
        </div>
        <div className="lg:w-1/2 m-1">
          <h1 className=" text-xl font-bold mt-5">Influencer category</h1>
          <p className="text-[12px] mb-2 text-[#222]">
            Choose the category of influencer you require for your campaign
          </p>
          <div className="w-full">
            <select
              id="influencer_nicheOptions"
              // value={influencerCategory}
              onChange={handleNicheChange}
              className="bg-gray-50 border-1 p-2 border-gray-500 lg:w-10/12 w-full text-sm rounded-md appearance-none relative  ">
              <option value={""} disabled>
                Select influencer category
              </option>
              <option value="1">Nano (Below 10k Followers/ Subscribers)</option>
              <option value="2">
                Micro (10k to 100k Followers/ Subscribers)
              </option>
              <option value="3">
                Macro (100k and above Followers/ Subscribers)
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="lg:w-full m-1 lg:flex">
        <div className="lg:w-1/2">
          <h1 className="text-xl font-bold mt-3">Influencer Niche</h1>
          <p className="text-[12px] mb-2 text-[#222]">
            Choose the niche of influencer you require for your campaign
          </p>
          <div className="w-full">
            <select
              id="influencer_nicheOptions"
              // value={niche}
              onChange={handleNicheChange}
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
        <div className="lg:w-1/2">
          <h1 className="text-xl font-bold mt-3">Influencer count </h1>
          <p className="text-[12px] mb-2 text-[#222]">
            Choose the number of influencer you require for your campaign
          </p>
          <div className="w-full flex">
            <button
              className="px-4 border mr-5 py-1 bg-ri-yellow rounded-full"
              onClick={decrement}>
              -{" "}
            </button>
            <input
              type="text"
              className="border w-24 text-center"
              value={count}
              onChange={handleInputChange}
            />
            <button
              className="px-4 border ml-5 py-1 bg-ri-yellow rounded-full"
              onClick={increment}>
              +
            </button>
            {/* {error && <p className="text-red-500">{error}</p>} */}
      {/*
          </div>
        </div>
      </div>
      <div className="w-full lg:flex">
        <div className="lg:w-1/2">
          <h1 className=" text-3xl font-bold mt-5 mb-2 ">Choose Platform</h1>
          <div className={` flex flex-wrap `}>
            <div className="w-1/2">
              <label className={`p-2 m-3 cursor-pointer min-w-[40px] flex`}>
                <input
                  type="radio"
                  name="platform"
                  value="instagram"
                  className="hidden"
                  onChange={handleChangePlatForm}
                />
                <i
                  className={`fa-brands fa-instagram fa-2x  ${
                    platform === "instagram"
                      ? " bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-red-400 to-indigo-700"
                      : ""
                  }`}></i>
                <span className="ml-4">{"Instagram"}</span>
              </label>
            </div>
            <div className="w-1/2">
              <label className={`p-2 m-3 cursor-pointer min-w-[40px] flex`}>
                <input
                  type="radio"
                  name="platform"
                  value="youtube"
                  className="hidden"
                  onChange={handleChangePlatForm}
                />
                <i
                  className={`fa-brands fa-youtube fa-2x   ${
                    platform === "youtube" ? " text-[#ff0000]" : ""
                  }`}></i>
                <span className="ml-4">{"Youtube"}</span>
              </label>
            </div>
          </div>
          
        </div>
        <div className="lg:w-1/2 m-auto">
          <h1 className="text-xl font-semibold ">Total deliverables</h1>
          <p className="text-base">
            4 Deliverables X 5 Influencer ={" "}
            <span className="text-2xl font-bold">20</span>
          </p>
          <h1 className="text-xl font-semibold mt-2">Estimated cost</h1>
          <p className="text-2xl font-bold"> ₹ 6,608</p>
        </div>
      </div>
      </div> */}
    </div>
  );
};

export default Pricing;
