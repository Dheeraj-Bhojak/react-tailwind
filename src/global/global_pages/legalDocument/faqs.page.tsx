import React from "react";
import FAQ from "../../../influencer/component/faq/faq.component";
import { Link } from "react-router-dom";

const FAQsPage: React.FC = () => {
  return (
    <div className="bg-gray-100">
      <FAQ />
      <div className="bg-gray-100 max-w-2xl mx-auto pb-10">
        <div className="rounded">
          <div className="w-full p-2">
            <p className="mb-8">
              If you need further assistance, feel free to
              <Link
                to="/contact-us"
                className="font-bold text-ri-blue underline ml-2"
                target="blank">
                Contact us
              </Link>{" "}
              for support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
