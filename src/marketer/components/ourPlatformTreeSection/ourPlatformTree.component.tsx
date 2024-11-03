import React, { useEffect, useRef } from "react";
import $ from "jquery";

import findInfluencerImg from "../../../assets/effects/Find-influencer.gif";
import campaignManagement from "../../../assets/effects/Campaign-Management.gif";
import performanceMatrices from "../../../assets/effects/Performance-Matrices.gif";
import reportingImg from "../../../assets/effects/Reporting.gif";
import BgElement from "../../../assets/effects/bg_img/our-platform-bg1.png";
import BgElement2 from "../../../assets/effects/bg_img/our-platform-bg2.png";
import BgElement3 from "../../../assets/effects/bg_img/our-platform-bg3.png";
import BgElement4 from "../../../assets/effects/bg_img/our-platform-bg4.png";
import { WOW } from "wowjs";
import Button from "../../../global/global_component/buttons/button.component";
import { BUTTON_TYPE_CLASSES } from "../../../global/global_component/buttons/button.component";

const OurPlatformTree: React.FC = () => {
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
    <>
      <div
        className="wow-container justify-center items-center text-center  relative"
        ref={contentRef}>
        <div className="text-center my-16 font-archivo relative">
          <h2 className="  text-gray-900 animated-title">
            <span className="text-4xl uppercase">What Help Do We Provide?</span>
          </h2>
        </div>

        <div className="flex  justify-center">
          <div className="flex lg:w-3/4 justify-center text-center align-middle">
            <div className="w-1/2 p-2">
              <div className="flex justify-center items-center">
                <img
                  src={findInfluencerImg}
                  className="md:h-1/2 md:w-full h-48 w-36 mb-10"
                  alt="Image"
                />
              </div>

              <div className="flex  flex-col items-center justify-center">
                <div className=" md:text-9xl text-6xl mb-4 relative  my-10 h-[80vh] ">
                  <div
                    className=" wow bounceInLeft absolute bg-contain bg-no-repeat -top-10 flex h-60 w-full -z-[1] "
                    style={{ backgroundImage: `url(${BgElement2})` }}></div>
                  <p
                    className="  text-white md:w-60 w-36 "
                    style={{ WebkitTextStroke: "2px #feea3a" }}>
                    {" "}
                    02
                  </p>
                </div>
                <div className="text-lg text-black">Performance Matrix</div>
              </div>
              <div className="flex justify-center items-center ">
                <img
                  src={campaignManagement}
                  alt=""
                  className="h-full w-full"
                />
              </div>

              <div className="flex  flex-col items-center justify-center h-52  my-10">
                <div className="md:text-9xl text-6xl mb-4 relative ">
                  <div
                    className=" wow bounceInLeft absolute bg-contain bg-no-repeat -top-10 flex h-60 w-full -z-[1]"
                    style={{ backgroundImage: `url(${BgElement4})` }}></div>
                  <p
                    className=" text-white md:w-60 w-36"
                    style={{ WebkitTextStroke: "1px #feea3a" }}>
                    {" "}
                    04
                  </p>
                </div>
                <div className="text-lg mt-10 text-black">
                  Campaign Monitoring
                </div>
              </div>
            </div>

            <div className="w-1/2 p-2">
              <div className="flex  flex-col items-center justify-center my-10">
                <div className=" md:text-9xl text-6xl mb-5 relative">
                  <div
                    className=" wow bounceInRight absolute bg-contain  bg-no-repeat  -top-10 flex h-60 w-full -z-[1] "
                    style={{ backgroundImage: `url(${BgElement})` }}></div>
                  <p
                    className="  text-white md:w-60 w-36 "
                    style={{ WebkitTextStroke: "2px #feea3a" }}>
                    {" "}
                    01
                  </p>
                </div>
                <div className="text-lg text-black">Find Influencer</div>
              </div>
              <div className="flex justify-center items-center">
                <img
                  src={performanceMatrices}
                  className="flex justify-center items-center"
                  alt=""
                />
              </div>

              <div className="flex  flex-col items-center justify-center h-52 my-10">
                <div className="md:text-9xl text-6xl mb-4 relative">
                  <div
                    className=" wow bounceInRight absolute bg-contain  bg-no-repeat -top-10 flex h-60 w-full -z-[1]"
                    style={{ backgroundImage: `url(${BgElement3})` }}></div>
                  <p
                    className=" text-white md:w-60 w-36 text-family-cap"
                    style={{ WebkitTextStroke: "2px #feea3a" }}>
                    {" "}
                    03
                  </p>
                </div>
                <div className="text-lg text-black">Influencer Outreach</div>
              </div>
              <div className="flex justify-center items-center ">
                <img
                  src={reportingImg}
                  alt=""
                  className="flex justify-center items-center"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-10  ">
          <Button
            buttonType={BUTTON_TYPE_CLASSES.sideLeftBounceBlue}
            className=" rounded-full z-10 after:bg-ri-blue before:bg-ri-blue hover:text-white border-1 border-ri-blue">
            get started
          </Button>
        </div>
      </div>
    </>
  );
};

export default OurPlatformTree;
