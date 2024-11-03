import React from "react";

const BackgroundVideo: React.FC = () => {
  return (
    <video
      className="back-video-hero absolute md:object-cover object right-0 bottom-0 flex w-full h-auto bg-transparent bg-ri-blue 2xl:h-[50vh]"
      autoPlay
      loop
      muted>
      <source
        src={require("../../../assets/effects/LP_1920X864.mp4")}
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  );
};

export default BackgroundVideo;
