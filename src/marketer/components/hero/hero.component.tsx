import React, { useState, useEffect } from "react";
import Button from "../../../global/global_component/buttons/button.component";
import { BUTTON_TYPE_CLASSES } from "../../../global/global_component/buttons/button.component";
import BackgroundVideo from "../homeBackground.component.tsx/homeBackground.component";

const wordsArray = [
  " Targeting customers",
  " Content creation",
  " Establishing trust",
  " Driving Sales",
];
/**
 * Hero
 * Marketer hero
 * @returns
 */
const Hero: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % wordsArray.length);
    }, 2500); // Adjust interval duration as needed

    return () => clearInterval(interval);
  }, []);

  const setupInsta = () => {
    let appId = "415964360967464";
    let redUri = "https://qikgro.com/auth";
    let url = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redUri}&scope=user_profile,user_media&response_type=code`;
    window.open(url, "_blank");
  };
  return (
    <>
      <div className=" hero relative  overflow-hidden w-full 2xl:h-[85vh]  lg:h-[700px]  h-[400px]  mx-auto xl:px-0 flex  -p-12 bg-[#4267B2] object-right-bottom">
        <BackgroundVideo />
        <div className="  p-5 absolute items-center w-full lg:w-1/2 ">
          <div className="max-w-2xl mb-8">
            <div className="text-2xl font-bold tracking-tight text-white lg:text-2xl  xl:text-4xl 2xl:text-6xl leading-tight dark:text-white">
              Find The Best <br />
              <span className="lg:text-[88px] xl:text-[96px] 2xl:text-[108px] text-6xl ">
                Influencer
              </span>{" "}
              <br />
              <div className="flex flex-row">
                <span className="lg:text-2xl  xl:text-4xl 2xl:text-6xl mr-4 mt-1">
                  for{" "}
                </span>
                <div>
                  {wordsArray.map((word, index) => (
                    <span
                      key={index}
                      className={`block  text-xl lg:text-5xl mt-2 xl:text-6xl 2xl:text-6xl text-[#fdc100] absolute transition-transform  duration-3000  ${
                        activeIndex === index ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        transform: `translateY(${
                          activeIndex === index ? "0" : "-100%"
                        })`,
                      }}>
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:mt-12 mt-4">
              <p className=" w-8/12 xl:w-full md:text-base text-sm leading-normal text-white lg:text-lg xl:text-xl dark:text-gray-300 mt-3">
                QikGro helps to search creators, Manage campaigns and drive
                revenue for your business
              </p>
            </div>
            <div className="flex flex-col ps- items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row mt-5   ">
              <Button
                className=" rounded-full border-1 lg:w-96 w-1/2 sm:text-lg text-xs font-bold  border-ri-orange z-[1] "
                buttonType={BUTTON_TYPE_CLASSES.slideLeftButtonYellow}
                onClick={setupInsta}>
                Get Free Trial
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
