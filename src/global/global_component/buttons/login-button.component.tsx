import React from "react";
import { Link } from "react-router-dom";
// import InfluencerLogin from "../../../assets/icons/vector.png";
// import BrandLogin from "../../../assets/icons/Brand.png";
import Button from "./button.component";
import { BUTTON_TYPE_CLASSES } from "./button.component";

const LoginButton: React.FC = () => {
  return (
    <div className=" rounded-sm ">
      {/* <button className="peer px-5 py-2 flex-auto bg-[#fdc100] hover:bg-amber-400 text-black rounded slideleft bouncein">
        Sign In
      </button> */}
      <Link to="/login">
        <Button
          buttonType={BUTTON_TYPE_CLASSES.slideLeftButtonYellow}
          className="peer px-5 m-0 py-1  flex-auto border-1 border-ri-orange bg-[#fdc100] hover:bg-amber-400 rounded slideleft bouncein">
          <span className="text-sm">Login</span>
        </Button>
      </Link>

      {/* <Button
        buttonType={BUTTON_TYPE_CLASSES.slideBottomleftBounce}
        className="peer mt-2 flex-auto  slideleft bouncein rounded  z-10 px-3">
        Sign In
      </Button>

      <div className="absolute w-36 pt-3 z-10 hidden peer-hover:flex hover:flex flex-col bg-[#fdc100] drop-shadow-lg rounded-lg text-center justify-center">
        <Link
          className="flex flex-row hover:bg-ri-blue hover:text-white pt-2 px-2 py-2  text-center justify-center"
          to="/login">
          <img src={InfluencerLogin} className="h-5 mt-1 mx-2" />
          As a Influencer
        </Link>
        <Link
          className="flex flex-row px-3 py-2  hover:bg-ri-blue hover:text-white  text-center justify-center"
          to="/login">
          <img src={BrandLogin} className="h-7 mt-1 mx-2" />
          As a Brand
        </Link>
      </div> */}
    </div>
  );
};

export default LoginButton;
