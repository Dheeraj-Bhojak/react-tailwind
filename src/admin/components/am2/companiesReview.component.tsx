import React from "react";

const name: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-3 rounded-md mt-20 3xl:mt-0 w-7/12 3xl:w-6/12">
        {/* <div className="flex justify-between">
          <div className="flex items-center">
            <img
              src={selectedRowProfilePic}
              className="rounded-full w-7 h-7 mr-2"
              alt=""
            />
            <p className="text-lg font-semibold">
              Give Review for {truncateReviewSection(selectedRowName)}
            </p>
          </div>
          <button onClick={handleCloseModal}>
            <i className="fa-solid fa-circle-xmark"></i>
          </button>
        </div> */}
        {/* max-h-[300px] 3xl:max-h-80 */}
        <div className="mt-[4px] 3xl:mt-2 overflow-scroll">
          {/* <p>Selected Row ID: {selectedRowId}</p> */}
          {/* <div className="border-b-1 pb-4">
            {reviewSectionData.map((reviewSection, index) => (
              <div key={index} className="3xl:mt-2 items-start flex">
                <div className="w-7/12">
                  <div className="flex items-center">
                    <div className="bg-[#4267B2] py-1 px-2 rounded-md text-white text-[10px] 3xl:text-sm inline-block">
                      <p>
                        {truncateReviewSection(reviewSection.reviewButtonTitle)}
                      </p>
                    </div>
                    <div className="ml-3">
                      <FiveStarComponent />
                    </div>
                  </div>
                  <div className=" mt-2 flex items-start">
                    <p className="text-[10px] 3xl:text-sm text-start">
                      ( {reviewSection.reviewSubText} )
                    </p>
                  </div>
                </div>
                <div className="w-5/12 flex flex-col items-start">
                  <p className="font-medium text-[10px] 3xl:text-sm">
                    Write a review
                  </p>
                  <textarea
                    maxLength={512}
                    className="resize-none w-full rounded-md text-sm px-2 border-1 custom-input"></textarea>
                </div>
              </div>
            ))}
          </div> */}
          {/* <div className="gap-3 flex flex-col justify-center items-center mt-1">
            <div className="flex flex-col items-start w-7/12">
              <p className="font-medium text-[10px] 3xl:text-sm">Write Us</p>
              <textarea
                rows={3}
                maxLength={1000}
                className="resize-none w-full rounded-md text-sm px-2 border-1 custom-input"></textarea>
            </div>
            <button className="bg-[#fdc100] text-white py-1 px-3 rounded-md flex items-center justify-center text-[10px] 3xl:text-sm h-6 3xl:h-8">
              Submit
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default name;
