import React from "react";
import fileIllustration from "../../../assets/images/content/fileIllustration.png";

export interface NoFileDataInterface {
  heading: string;
  subText: string;
}

const NoFileData: React.FC<NoFileDataInterface> = ({ heading, subText }) => {
  return (
    <div className="flex items-center justify-center pt-28 h-full mb-20">
      <div className="text-center">
        <img
          src={fileIllustration}
          alt="file illustration"
          className=" h-auto w-[45%] md:w-[20%] mx-auto "
        />

        <p className="mt-2 text-bold text-2xl">{heading}</p>
        <div className="w-96 items-center mx-auto">
          <p className="mt-2  text-gray-500 text-sm">{subText}</p>
        </div>
      </div>
    </div>
  );
};

export default NoFileData;
