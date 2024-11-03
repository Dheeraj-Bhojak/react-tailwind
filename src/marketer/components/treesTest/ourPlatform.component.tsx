import React, { Fragment, useEffect, useRef } from "react";
import $ from "jquery";
import { WOW } from "wowjs";
import Button from "../../../global/global_component/buttons/button.component";
import { BUTTON_TYPE_CLASSES } from "../../../global/global_component/buttons/button.component";

import findInfluencerImg from "../../../assets/effects/Find-influencer.gif";
import campaignManagement from "../../../assets/effects/Campaign-Management.gif";
import performanceMatrices from "../../../assets/effects/Performance-Matrices.gif";
import reportingImg from "../../../assets/effects/Reporting.gif";
import BgElement from "../../../assets/effects/bg_img/our-platform-bg1.png";
import BgElement2 from "../../../assets/effects/bg_img/our-platform-bg2.png";
import BgElement3 from "../../../assets/effects/bg_img/our-platform-bg3.png";
import BgElement4 from "../../../assets/effects/bg_img/our-platform-bg4.png";

const OurPlatformTreeData = [
  {
    id: 1,
    title: "Find Influencer",
    description:
      "Search the most prominent influencer, ambassadors, content creators, or affiliates using various criteria across all social media platforms.",
    titleImg: "../../../assets/effects/Find-influencer.gif",
    titleBackground: "../../../assets/effects/bg_img/our-platform-bg1.png",
  },
  {
    id: 2,
    title: "Performance Matrix",
    description:
      "Review influencer profiles filled with valuable data, including engagement rates and audience demographics, to make sure they are the right match before extending an invitation to join your campaign.",
    titleImg: "../../../assets/effects/Campaign-Management.gif",
    titleBackground: "../../../assets/effects/bg_img/our-platform-bg2.png",
  },
  {
    id: 3,
    title: "Campaign Management",
    description:
      "Through automated communication, pre-built customizable term sheets, structured content approval processes and affiliate links.   ",
    titleImg: "../../../assets/effects/Performance-Matrices.gif",
    titleBackground: "../../../assets/effects/bg_img/our-platform-bg3.png",
  },
  {
    id: 4,
    title: "Reporting",
    description:
      "Analyse the impact influencers have on brand visibility, engagement, and sales over time by measuring full-funnel ROI and sales — in one dashboard.",
    titleImg: "../../../assets/effects/Reporting.gif",
    titleBackground: "../../../assets/effects/bg_img/our-platform-bg4.png",
  },
];

const OurPlatformTree2: React.FC = () => {
  const contentRef = useRef(null);
  useEffect(() => {
    const wow = new WOW({ live: false });
    wow.init();
    let scrolled = false;
    $(window).on("scroll", () => {
      if (!scrolled) {
        scrolled = true;
        wow.sync();
      }
    });
  }, []);

  return (
    <Fragment>
      <div className="flex flex-col wow-container justify-center items-center text-center relative -z-[1] ">
        <div className="text-center my-16 font-archivo relative">
          <h2 className="  text-gray-900 animated-title">
            <span className="text-4xl uppercase">What Help Do We Provide?</span>
          </h2>
        </div>
        <div className="flex-1 flex mt-28">
          <div className="w-7/12 ">
            <img
              src={findInfluencerImg}
              alt="Find Influencer"
              className="w-[60%]   float-right"
            />
          </div>
          <div className="w-5/12">
            <div className="flex  flex-col items-center  justify-center">
              <div className="md:text-[20vh] text-6xl mb-4 relative  my-10  ">
                <div
                  className="wow bounceInRight absolute bg-contain bg-no-repeat -top-10 flex h-screen w-full -z-[1] "
                  style={{ backgroundImage: `url(${BgElement})` }}></div>
                <p
                  className="  text-white w-36  md:w-60  md:text-9xl"
                  style={{ WebkitTextStroke: "1px #feea3a" }}>
                  {" "}
                  01
                </p>
              </div>
              <div className="text-lg text-black">Find Influencer</div>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex-1 flex mt-28">
          <div className="w-5/12">
            <div className="flex  flex-col items-center  justify-center">
              <div className=" md:text-[20vh] text-6xl mb-4 relative  my-10  ">
                <div
                  className=" wow bounceInLeft absolute bg-contain bg-no-repeat -top-10 flex h-[100vh] w-full -z-[1]"
                  style={{ backgroundImage: `url(${BgElement2})` }}></div>
                <p
                  className="  text-white md:w-60 w-36  md:text-9xl "
                  style={{ WebkitTextStroke: "1px #feea3a" }}>
                  {" "}
                  02
                </p>
              </div>
              <div className="text-lg text-black">Performance Matrix</div>
            </div>
          </div>
          <div className="w-7/12 ">
            <img
              src={performanceMatrices}
              alt="Performance Matrices"
              className="w-[60%]"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="flex-1 flex mt-28">
          <div className="w-7/12 ">
            <img
              src={campaignManagement}
              alt="Campaign Management"
              className="w-[60%] float-right"
            />
          </div>
          <div className="w-5/12">
            <div className="flex  flex-col items-center  justify-center">
              <div className=" md:text-[20vh] text-6xl mb-4 relative  my-10 ">
                <div
                  className=" wow bounceInRight absolute bg-contain bg-no-repeat -top-10 flex h-[100vh] w-full -z-[1] "
                  style={{ backgroundImage: `url(${BgElement3})` }}></div>
                <p
                  className="  text-white md:w-60 w-36  md:text-9xl "
                  style={{ WebkitTextStroke: "1px #feea3a" }}>
                  {" "}
                  03
                </p>
              </div>
              <div className="text-lg text-black">Campaign Management</div>
            </div>
          </div>
        </div>

        {/* Row 4 */}
        <div className="flex-1 flex mt-28">
          <div className="w-5/12">
            <div className="flex  flex-col items-center  justify-center">
              <div className=" md:text-[20vh] text-6xl mb-4 relative  my-10  ">
                <div
                  className=" wow bounceInLeft absolute bg-contain bg-no-repeat -top-10 flex h-[100vh] w-full -z-[1] "
                  style={{ backgroundImage: `url(${BgElement4})` }}></div>
                <p
                  className="  text-white md:w-60 w-36  md:text-9xl "
                  style={{ WebkitTextStroke: "1px #feea3a" }}>
                  {" "}
                  04
                </p>
              </div>
              <div className="text-lg text-black">Reporting</div>
            </div>
          </div>
          <div className="w-7/12 ">
            {/* Place your content for Column 2 here */}
            <img src={reportingImg} alt="Reporting" className="w-[60%]" />
          </div>
        </div>
      </div>
      <div className="text-center mt-10 w-full z-[10]">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.sideLeftBounceBlue}
          className="lg:w-96 w-1/2 sm:text-lg text-xs font-bold  rounded-full  after:bg-ri-blue before:bg-ri-blue hover:text-white border-1 border-ri-blue">
          get started
        </Button>
      </div>
    </Fragment>
  );
};

export default OurPlatformTree2;
