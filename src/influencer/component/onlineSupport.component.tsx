import React from "react";
import { Link } from "react-router-dom";

const HelpAndSupport: React.FC = () => {
  return (
    <div className="sm:flex min-h-full md:h-48 ">
      <div className="w-full lg:w-1/2 ">
        <img
          src={require("../../assets/icons/onlineSupport.png")}
          alt="Help and Support"
          loading="lazy"
          className="w-48 h-48 object-cover xxs:mx-auto md:mx-0"
        />
      </div>

      <div className="w-full lg:w-1/2 pl-8 pt-8 ">
        <h2 className="text-2xl font-bold mb-4">Help and Support</h2>
        <p className="mb-8">
          In case of any queries,
          <Link to="/help" className="font-bold text-ri-blue" target="blank">
            Contact us
          </Link>{" "}
          or refer to{" "}
          <Link to="/faqs" className="font-bold text-ri-orange" target="blank">
            FAQs
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HelpAndSupport;
