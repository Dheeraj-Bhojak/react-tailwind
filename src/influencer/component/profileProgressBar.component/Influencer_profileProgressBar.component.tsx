import React, { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar } from "react-circular-progressbar";

import imageUrl from "../../../assets/images/avatars/3.jpg";

const ProfilePicture = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (percentage < 60) {
        setPercentage(percentage + 1);
      }
    }, 50);
  }, [percentage]);

  return (
    <div className="relative" style={{ width: "100px", height: "100px" }}>
      <img
        className="rounded-full absolute w-10/12 mt-2 ml-2  "
        src={imageUrl}
      />
      <div className="absolute ">
        <CircularProgressbar value={percentage} />
        <div className="z-5 -mt-4 text-indigo-600 font-bold text-center">{`${percentage}%`}</div>
      </div>
    </div>
  );
};

export default ProfilePicture;
