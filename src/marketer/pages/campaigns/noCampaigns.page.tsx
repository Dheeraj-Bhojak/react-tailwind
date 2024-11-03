import React from "react";
import fileIllustration from "../../../assets/images/content/fileIllustration.png";

const NoCampaigns: React.FC = () => {
  return (
    <div className="flex items-center justify-center pt-28 h-full mb-20">
      <div className="text-center">
        <img
          src={fileIllustration}
          alt="file illustration"
          className=" h-auto w-[45%] md:w-[20%] mx-auto "
        />
        <p className="mt-2 text-bold text-2xl">No Campaign</p>
        <div className="w-96 items-center mx-auto">
          <p className="mt-2  text-gray-500 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            laborum dignissimos iusto error amet omnis laboriosam molestias
            praesentium facere odit non nam. Odit, recusandae distinctio?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoCampaigns;
