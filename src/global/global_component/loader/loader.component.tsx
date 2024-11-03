import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <i className="fas fa-spinner fa-spin text-ri-blue text-6xl"></i>
    </div>
  );
};

export default Loader;
