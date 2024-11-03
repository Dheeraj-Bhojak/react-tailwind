import React from "react";
import { BUTTON_TYPE_CLASSES } from "../../../global/global_component/buttons/button.component";
import HeroImage from "../../../assets/images/influencerHero.png";
import Button from "../../../global/global_component/buttons/button.component";

const HeroInfluencer: React.FC = () => {
  return (
    <>
      <div className="relative flex flex-col-reverse  lg:pt-0 lg:flex-col bg-[#4267b2] pt-6">
        <div className="xl:w-1/2">
          <div className="inset-y-0 top-0 right-0 z-0 w-full items-start  px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-6/12 lg:max-w-full lg:absolute xl:px-0">
            <img
              className="object-contain w-full rounded lg:rounded-none lg:shadow-none md:h-96 lg:h-full -z-10"
              src={HeroImage}
              alt=""
            />
          </div>
        </div>
        <div className="xl:w-1/2">
          <div className="relative flex flex-col items-start xl:pl-36 xl:items-end max-[1024px]:items-center w-full  px-4 md:px-0  lg:max-w-screen-xl">
            <div className="mb-16 lg:my-16 lg:max-w-lg lg:pr-5">
              <h2 className="mb-10  text-2xl font-bold leading-none  text-[#fafafa] ">
                Collaborate with
                <br />
                <span className="text-[100px] ">Brands</span> <br />
                <br className="hidden md:block mt" />
                through our {/* this is yellow */}
                <span className="inline-block mt-3 text-4xl text-[#fdc100]">
                  CAMPAIGN MARKET PLACE
                </span>
              </h2>
              <div className="w-48 h-8 relative"></div>
              <ul className="list-none p-0 text-right font-bold  text-[#fefefe] 	">
                <li className="mb-2">6k+ Brands</li>
                <li className="mb-2 ">30K+ Influencer</li>
                <li className="mb-2 ">3k+ Active Campaigns</li>
              </ul>
              <div className="flex items-center text-center">
                <Button
                  className="rounded-full border-1 w-1/2 border-ri-orange z-[1] "
                  buttonType={BUTTON_TYPE_CLASSES.slideLeftButtonYellow}>
                  Get started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default HeroInfluencer;
