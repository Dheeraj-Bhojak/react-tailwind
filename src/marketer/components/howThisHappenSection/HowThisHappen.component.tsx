import React, { useState } from "react";
import Button from "../../../global/global_component/buttons/button.component";
import { BUTTON_TYPE_CLASSES } from "../../../global/global_component/buttons/button.component";

const ProcessData = [
  {
    id: 1,
    icon: "post-campaign",
    title: "Post Campaign",
    screenshot: "post-campaign-ss",
  },
  {
    id: 2,
    icon: "find-influencer",
    title: "Find Influencer",
    screenshot: "find-influencer-ss",
  },
  {
    id: 3,
    icon: "approve-content",
    title: "Approve Content",
    screenshot: "approve-content-ss",
  },
  {
    id: 4,
    icon: "review-report",
    title: "Review Report",
    screenshot: "review-report1-ss",
  },
];

const HowThisHappen: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(ProcessData[0]);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
  };
 

  return (
    <>
      <div className="bg-[#feea3a]">
        <div className="flex flex-col lg:flex-row p-5">
          <div className="lg:w-1/4 mb-5 md:mb-0 md:pr-5">
            <p className="text-3xl lg:text-7xl  font-extrabold text-black whitespace-no-wrap lg:pt-28 lg:pl-5 justify-center mx-auto flex items-center align-middle">
              HOW DOES THIS HAPPEN?
            </p>
          </div>
          <div className="lg:w-3/4">
            <div className="flex justify-center">
              {ProcessData.map((process) => (
                <div
                  key={process.id}
                  className={`text-center align-middle ${
                    selectedImage.id === process.id
                      ? "filter-none"
                      : "filter grayscale hover:grayscale-0"
                  }`}
                >
                  <img
                    src={require(`../../../assets/icons/${process.icon}.png`)}
                    alt={`Icon ${process.id}`}
                    onClick={() => handleImageClick(process)}
                    className={`cursor-pointer   rounded-full  h-16 md:h-24 w-16 md:w-24 md:mx-10  `}
                  />
                  <p className=" font-extrabold md:text-base text-sm mt-1 mx-1">
                    {process.title}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-16">
              <img
                src={require(`../../../assets/images/screenshots/${selectedImage.screenshot}.png`)}
                alt="Selected Screenshot"
                className="mx-auto  sm:h-80  md:h-96 lg:h-[520px] md:w-3/6 lg:w-auto rounded-lg ri-shadow"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mx-">
          <Button
            buttonType={BUTTON_TYPE_CLASSES.sideLeftBounceBlue}
            className="lg:w-96 w-1/2 sm:text-lg text-xs font-bold  rounded-full z-10  after:bg-ri-blue before:bg-ri-blue hover:text-white border-1 border-ri-blue"
          >
            Want To Experience it
          </Button>
        </div>
      </div>
    </>
  );
};

export default HowThisHappen;
