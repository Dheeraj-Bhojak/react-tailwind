import React from "react";

interface PriceBreakdownProps {
  closeModal: () => void;
}

const PriceBreakdown: React.FC<PriceBreakdownProps> = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-4 rounded-md w-[90%] md:w-[70%] lg:w-[35%] 2xl:w-[20%] xl:mt-20 2xl:mt-0">
        <p className="font-medium text-lg 2xl:text-xl">Price Breakdown</p>
        <button className="absolute top-5 mr-5 self-start" onClick={closeModal}>
          <i className="fa-solid fa-x text-xl"></i>
        </button>

        <div className="mt-3">
          <p className="text-sm 2xl:text-base mt-3 font-medium">
            Monthly Subscription
          </p>

          <div className="mt-3 flex justify-between">
            <div>
              <p className="text-sm 2xl:text-base font-medium">
                Discover | Pro
              </p>
              <p className="text-sm 2xl:text-base text-[#787575] mt-1">
                Instagram + YouTube
              </p>
              <p className="text-sm 2xl:text-base mt-1">
                3000 results/month (included)
              </p>
            </div>
            <div>
              <p className="text-sm 2xl:text-base font-medium">₹3000</p>
            </div>
          </div>

          <div className="mt-3 flex justify-between">
            <div>
              <p className="text-sm 2xl:text-base font-medium">
                IRM & Data | Basic
              </p>
              <p className="text-sm 2xl:text-base text-[#787575] mt-1">
                YouTube
              </p>
              <p className="text-sm 2xl:text-base mt-1">
                4000 results/month (included)
              </p>
            </div>
            <div>
              <p className="text-sm 2xl:text-base font-medium">₹3000</p>
            </div>
          </div>

          <div className="border-b-1 mt-4"></div>

          <div className="mt-4 flex justify-between">
            <p className="font-medium text-base 2xl:text-lg">Monthly Price:</p>
            <div className="flex flex-col items-end">
              <p className="font-medium text-base 2xl:text-lg">₹6000/month</p>
              <p className="text-xs 2xl:text-sm text-[#787575]">
                (billed monthly)
              </p>
            </div>
          </div>

          <div className="mt-4 text-center bg-[#F0F0F0] py-2 px-1 rounded-md border-1 border-[#B1B1B1]">
            <p className="text-[11px] md:text-sm">
              <span className="font-bold">You are saving 10%</span> by
              purchasing these products together.
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs 2xl:text-sm ">
              We've estimated your monthly cost based on the options you've
              chosen. Prices shown are subject to the applicable taxes and your
              final fee may be increased for any additional purchases you make.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceBreakdown;
