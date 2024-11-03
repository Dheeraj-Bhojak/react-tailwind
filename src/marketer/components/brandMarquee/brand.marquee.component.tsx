import React, { useEffect } from "react";
import Slider from "react-slick";
import HeighLighter from "../../../assets/effects/bg_img/5.png";
// import WOW from "wowjs";

const MarqueeTwo: React.FC = () => {
  // useEffect(() => {
  //   const wow = new WOW.WOW();
  //   wow.init();
  // }, []);
  const settings2 = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 501,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const brandIcons = [
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/7ae42bac3b34999c0db3.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/b2bd91d7b87b2181ca45.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/6591cdc0702b32310306.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3b7d9f4b073deb6a9b74.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/3cd767dea94a85078ca4.png",
    "https://assets.algoexpert.io/spas/main/prod/g523bdeb478-prod/dist/images/a2b3c3709ffedce2a22a.png",
  ];

  return (
    <div className=" bg-gray-100  p-[48px]">
      <div className="marquee-container bg-white p-10 text-center ">
        <p className=" block pb-14 text-gray-800 text-3xl font-bold relative ">
          <span className="wow bounceInUp inline-block  bg-none bg-center m-4">
            {/* style={{ backgroundImage: `url(${HeighLighter})` }} */}
            Collaborating With Leading Brands
          </span>
        </p>

        <div className="items-center justify-center">
          <Slider {...settings2}>
            {brandIcons.map((icon, index) => (
              <div key={index} className="item-center">
                <img
                  src={icon}
                  alt={`Brand ${index}`}
                  className="h-8 mx-auto"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default MarqueeTwo;
