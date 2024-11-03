import React from "react";

const PlatformDeliverableItem: React.FC<{
  icon: string;
  text: string;
  count: number;
}> = ({ icon, text, count }) => {
  return (
    <div className="w-full border-1 border-gray-300 p-1 mb-2 flex flex-row rounded-md ">
      <div className="w-1/2 flex flex-row items-center">
        <img src={icon} alt="Your Image" className="h-8 w-auto mr-2 ml-1" />
        <p>{text}</p>
      </div>
      <div className="w-2/3 my-auto">
        <p className="text-right mr-8">{count}</p>
      </div>
    </div>
  );
};

export default PlatformDeliverableItem;
