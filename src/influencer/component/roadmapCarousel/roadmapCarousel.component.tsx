import React, { useState, useEffect } from "react";
import "./roadmapCarousel.style.css";

const images: string[] = [
  "influencer-roadmap-2",
  "influencer-roadmap-3",
  "influencer-roadmap-4",
  "influencer-roadmap-5",
];

const RoadMapScreenShots: string[] = [
  "Create-a-profile",
  "Apply-to-campagin",
  "Create-Content",
  "Get-Rewarded",
];

const RoadMapCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);
    if (isPaused) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isPaused]);
  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="justify-center items-center h-full min-h-[80vh] py-16 mx-auto sm:max-w-xl md:max-w-full  md:px-24 lg:px-6 lg:py-2">
      <div className=" mb-12 flex flex-wrap items-center">
        <div className="w-full h-1/2 shrink-0 grow-0 basis-auto md:px-6 lg:mb-0 lg:w-6/12">
          <div
            className="relative overflow-hidden rounded-lg bg-cover bg-[50%] bg-no-repeat "
            data-te-ripple-init
            data-te-ripple-color="light">
            <div className="image-carousel">
              <img
                src={require(`../../../assets/images/roadmap/${images[currentImageIndex]}.png`)}
                alt={`Image ${currentImageIndex}`}
              />
            </div>
            <div className=" bottom-0 left-0 w-full flex justify-center space-x-2 p-4 ">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    currentImageIndex === index ? "bg-blue-500" : "bg-gray-300"
                  }`}
                  onClick={() => handleImageChange(index)}></button>
              ))}
            </div>
          </div>
        </div>

        <div className=" w-full h-1/2 shrink-0 grow-0 basis-auto lg:mb-0 lg:w-6/12">
          <div
            className="relative overflow-hidden rounded-lg bg-cover bg-[56%] bg-no-repeat  "
            data-te-ripple-init
            data-te-ripple-color="light">
            <div
              className="image-carousel"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}>
              <img
                src={require(`../../../assets/images/roadmap/${RoadMapScreenShots[currentImageIndex]}.png`)}
                alt={`Image ${currentImageIndex + 1}`}
                className=" h-full w-auto mb-10 object-cover transition-transform duration-1000 transform ri-shadow rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadMapCarousel;
