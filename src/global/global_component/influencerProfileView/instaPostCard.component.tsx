import React from "react";
import post1 from "../../../assets/img/post1.jpg";
import like from "../../../assets/img/like.png";
import comment from "../../../assets/img/comment.png";
import shareInsta from "../../../assets/img/shareInsta.png";
import share from "../../../assets/img/share.png";
import { formatDateDifference } from "../../../utils/utilsMethods/formateDate";
import { ContentPostInterface } from "../../../marketer/pages/InfluencerProfile/profieResult";

interface InstaPostCardProps {
  content: ContentPostInterface;
}

const InstaPostCard: React.FC<InstaPostCardProps> = ({ content }) => {
  return (
    <div className="w-3/12 m-[8px] md:m-3 relative">
      <div
        className="pb-[100%] bg-cover bg-center relative"
        style={{ backgroundImage: `${content.media_url}` }}>
        <button
          className="absolute top-2 md:top-5 bg-white rounded-[4px] md:rounded-md w-6 h-6 md:w-7 md:h-7 xl:w-7 xl:h-7 2xl:w-9 2xl:h-9 mr-[8px] md:mr-5 items-center flex justify-center"
          onClick={() => window.open(content.pram_link, "_blank")}>
          <img
            src={share}
            alt=""
            className="w-4 h-4 md:w-5 md:h-5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6"
          />
        </button>
        <div className="absolute left-0 w-5/12 xl:w-5/12 2xl:w-4/12 h-3 md:h-6 bg-[#EAEAEA] flex items-center justify-center rounded-tr-md py-[12px]">
          <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm text-[#636971]">
            {formatDateDifference(content.post_at)}
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
              {content.like_count}
            </p>
          </div>
          <div className="ml-4 flex items-center">
            <img
              className="w-2 h-2 md:w-3 md:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4"
              src={comment}
              alt=""
            />
            <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm ml-[1px] md:ml-1">
              {content.comments_count}
            </p>
          </div>
          {/* <div className="ml-4 flex items-center">
            <img
              className="w-2 h-2 md:w-3 md:h-3 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4"
              src={shareInsta}
              alt=""
            />
            <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm ml-[1px] md:ml-1">
              {shareCount}
            </p>
          </div> */}
        </div>
        <div className="md:w-1/2 flex justify-start md:justify-end">
          {/* <p className="text-[10px] md:text-xs xl:text-xs 2xl:text-sm mt-[4px] md:mt-0">
            {engagementRate} ER
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default InstaPostCard;
