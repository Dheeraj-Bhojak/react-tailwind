import React, { useEffect, useState } from "react";
import like from "../../../assets/img/like.png";
import comment from "../../../assets/img/comment.png";
import shareInsta from "../../../assets/img/shareInsta.png";
import share from "../../../assets/img/share.png";

interface ReelsPostCardProps {
  reelsLikeCount: string;
  reelsCommentCount: string;
  reelsShareCount: string;
  reelsTimestamp: string;
  reelsEngagementRate: string;
}

const reelImage =
  "https://scontent.cdninstagram.com/v/t51.29350-15/432001274_1421178158517619_7935737372569581918_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=18de74&_nc_ohc=BY6d2X8E9F8Ab595SSV&_nc_ht=scontent.cdninstagram.com&edm=AEQ6tj4EAAAA&oh=00_AfBIt3cNXPOWf-LlJ7KdgVPL9ChFrUKjJpoVxaNNH6-Z_g&oe=661BFBD5";

const ReelsPostCard: React.FC<ReelsPostCardProps> = ({
  reelsLikeCount,
  reelsCommentCount,
  reelsTimestamp,
  reelsShareCount,
  reelsEngagementRate,
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust the breakpoint as needed
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sm:w-3/12 m-[8px] md:m-3 relative">
      <div
        className="bg-cover bg-center relative"
        style={{ backgroundImage: `url(${reelImage})`, paddingTop: "215%" }}>
        <button className="absolute top-2 md:top-5 bg-white rounded-[4px] md:rounded-md w-6 h-6 md:w-7 md:h-7 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 mr-[8px] md:mr-5 items-center flex justify-center">
          <img
            src={share}
            alt=""
            className="w-4 h-4 md:w-5 md:h-5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6"
          />
        </button>
        <div className="absolute left-0 w-5/12 xl:w-5/12 2xl:w-4/12 h-3 md:h-6 bg-[#EAEAEA] flex items-center justify-center rounded-tr-md py-[12px]">
          <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm text-[#636971]">
            {reelsTimestamp}
          </p>
        </div>
      </div>
      <div className="w-full md:flex mt-2">
        <div className="md:w-1/2 flex justify-between">
          <div className="flex items-center ">
            <img
              className="w-2 h-2 md:w-3 md:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4"
              src={like}
              alt=""
            />
            <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm ml-[1px] md:ml-1">
              {reelsLikeCount}
            </p>
          </div>
          <div className="ml-4 flex items-center">
            <img
              className="w-2 h-2 md:w-3 md:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4"
              src={comment}
              alt=""
            />
            <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm ml-[1px] md:ml-1">
              {reelsCommentCount}
            </p>
          </div>
          <div className="ml-4 flex items-center">
            <img
              className="w-2 h-2 md:w-3 md:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4"
              src={shareInsta}
              alt=""
            />
            <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm ml-[1px] md:ml-1">
              {reelsShareCount}
            </p>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-start md:justify-end">
          <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm mt-[4px] md:mt-0">
            {reelsEngagementRate} ER
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReelsPostCard;
