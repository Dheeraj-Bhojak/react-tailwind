import React from "react";
import userAvatar from "../../../../assets/images/avatars/7.jpg";

const updatePage: React.FC = () => {
  return (
    <>
      <div className="container">
        <div className="w-full">
          <div className="xl:w-3/12 h-64 border border-red-800">
            <img
              className="w-[90%] h-full rounded-full object-contain border-gray-400 "
              src={userAvatar}
              alt="product designer"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default updatePage;
