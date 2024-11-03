import React from "react";
interface LimitReachMessageInterface {
  message: string;
}

const LimitReach: React.FC<LimitReachMessageInterface> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <p className="text-center">
        <h1 className="text-2xl ">{message}</h1>
      </p>
    </div>
  );
};

export default LimitReach;
