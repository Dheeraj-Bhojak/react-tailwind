import React, { useEffect } from "react";
import firstImg from "../../../assets/images/why-sign-up-1.png";
import secondImg from "../../../assets/images/why-sign-up-2.png";
import WOW from "wowjs";

const WhySignUp: React.FC = () => {
  useEffect(() => {
    const wow = new WOW.WOW();
    wow.init();
  }, []);

  return (
    <div className="wow-container bg-center">
      <div className="bg-fixed w-full relative lg:min-h-[800px] md:min-h-[600px] sm:min-h-[500px] min-h-[450px] max-h-screen bg-[#F2F2F2] ">
        <div className="flex justify-center items-center overflow-hidden">
          <h2 className="wow bounceInUp md:text-5xl  sm:text-2xl text-lg font-bold z-10 absolute md:top-32 top-20  bottom-auto text-[#4267b2] px-4 py-2 rounded-lg ">
            WHY SIGN UP?
          </h2>
        </div>
        {/* lt */}
        <div className="flex">
          <button
            className="wow  bounceInLeft text-[#f2f2f2]   lg:text-xl md:text-base text-[8px]  absolute top-[38%] bottom-auto xl:left-[12%] lg:left-[10%] md:left-[6%] z-10 bg-[#4267b2] rounded-lg md:px-8 px-2 py-2 transition duration-700"
            data-wow-delay="1.3s">
            Creator Centric
          </button>
          <p className="wow fadeIn absolute top-[44%] bottom-auto text-center xl:left-[12%] lg:left-[6%] md:left-[2%] left-[2%] md:max-w-[150px] md:text-xs xxs:text-[8px] xxs:max-w-[100px]  lg:max-w-[180px] 2xl:max-w-full ">
            Creator are at the core of everything we do.
          </p>
        </div>
        {/* LB */}
        <div className="flex ">
          <button
            className="wow  bounceInLeft  md:text-base text-[8px]  md:px-8 px-2  xxs:px-2  text-[#4267b2] absolute top-[65%] bottom-auto xl:left-[10%] lg:left-[6%] md:left-[2%]  z-10 bg-[#fdc100] rounded-lg  py-2 transition duration-700"
            data-wow-delay="1.3s">
            Support team
          </button>
          <p className="wow fadeIn absolute top-[71%] bottom-auto text-center xl:left-[12%] lg:left-[6%] md:left-[2%] left-[2%] md:max-w-[150px] md:text-xs xxs:text-[8px] xxs:max-w-[100px]  lg:max-w-[180px] 2xl:max-w-full ">
            To help in tour journey of success.
          </p>
        </div>

        {/* RT */}
        <div className="flex">
          <button
            className="wow  bounceInRight text-[#f2f2f2] md:text-base text-[8px]  md:px-8 sm:px-4 xxs:px-2  absolute  top-[38%] bottom-auto  xl:right-[12%] lg:right-[6%] md:right-[2%] right-2 z-10 bg-[#4267b2] rounded-lg  py-2 transition duration-700"
            data-wow-delay="1.3s">
            Creator Centric
          </button>
          <p className="wow fadeIn absolute top-[44%] bottom-auto text-right xl:right-[12%] lg:right-[6%] md:right-[2%] right-[4%] md:max-w-[150px] md:text-xs xxs:text-[8px] xxs:max-w-[100px]  lg:max-w-[180px] 2xl:max-w-full  ">
            Creator are at the core of everything we do.
          </p>
        </div>

        {/* RB */}
        <div className="flex ">
          <button
            className="wow  bounceInRight md:text-base text-[8px]  md:px-8 px-2  xxs:px-2 text-[#4267b2] absolute top-[65%] bottom-auto xl:right-[12%] lg:right-[10%] md:right-[8%] right-[4%] z-10 bg-[#fdc100] rounded-lg  py-2 transition duration-700"
            data-wow-delay="1.3s">
            Perks
          </button>
          <p className="wow fadeIn absolute top-[71%] bottom-auto text-right xl:right-[12%] lg:right-[6%] md:right-[2%] right-[4%] md:max-w-[150px] md:text-xs xxs:text-[8px] xxs:max-w-[100px]  lg:max-w-[180px] 2xl:max-w-full ">
            Paid collaborations, access to exclusive events and goodies.
          </p>
        </div>

        <div className="flex justify-center  overflow-hidden">
          <img
            src={firstImg}
            alt="groupTeam"
            className="wow fadeIn absolute w-auto h-full z-10 bg-[2f2f2f] "
            data-wow-duration="0.3s"
            data-wow-delay="0.6s"
          />
          <img
            src={secondImg}
            alt="Arrows"
            className="wow fadeIn absolute object-center w-auto h-full z-10"
            data-wow-duration="0.3s"
            data-wow-delay=".9s"
          />
        </div>
      </div>
    </div>
  );
};
export default WhySignUp;
