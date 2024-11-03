import React from "react";
import ErrorCoffee from "../../../assets/images/content/ErrorCoffee.png";
import { Link, useNavigate } from "react-router-dom";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../global_component/buttons/button.component";

const Page404NotFound: React.FC = () => {
  const navigate = useNavigate();

  const goBack = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center pb-20">
      <div className="text-center">
        <p className="text-[14rem] text-gray-800 p-0 caveat-cursive font-black mr-5 -mt-8">
          <span className="text-[#4267b2]">4</span>
          <span className="text-[#efd8bc]">0</span>
          <span className="text-[#fdc100]">4</span>
        </p>

        <img
          src={ErrorCoffee}
          alt="Error for coffee"
          className="-mt-16 h-80 w-auto mx-auto "
        />

        <div className="flex justify-center mx-">
          <Button
            buttonType={BUTTON_TYPE_CLASSES.sideLeftBounceBlue}
            className="lg:w-96 w-1/2 sm:text-lg text-xs font-bold  rounded-full z-10  after:bg-ri-blue before:bg-ri-blue hover:text-white border-1 border-ri-blue"
            onClick={goBack}>
            Go - Back
          </Button>{" "}
        </div>

        <p className="mt-2 text-bold text-4xl">Page not found</p>
        <p className="mt-2 text-gray-500">
          Sorry, we can't find the page you are looking for.
        </p>
        <p className=" text-gray-500">
          Seems like you are having some issues. Visit our
          <Link to={"/"} className="text-blue-600 underline">
            {" "}
            Help center
          </Link>{" "}
          to find your way back.
        </p>
      </div>
    </div>
  );
};

export default Page404NotFound;
