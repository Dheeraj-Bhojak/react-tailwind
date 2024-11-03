import React, { Fragment, useState } from "react";
import product3 from "../../../assets/img/product3.jpg";
import product2 from "../../../assets/img/product2.jpg";
import product4 from "../../../assets/img/product4.jpg";
import { formatDateDifference } from "../../../utils/utilsMethods/formateDate";

const contentApprovalStatusCardData = [
  {
    status: "approved",
    date: "7 hours ago",
    caption:
      "Join me for a Get Ready With Me session where Ill walk you through my morning routine, from skincare and makeup to outfit selection. Lets chat, share tips, and get ready together for the day ahead!",
    postPictutre: product3,
    note: "To be uploaded on June 8, 2024",
  },
  {
    status: "rejected",
    date: "2 hours ago",
    caption:
      "Join me for a Get Ready With Me session where Ill walk you through my morning routine, from skincare and makeup to outfit selection. Lets chat, share tips, and get ready together for the day ahead!",
    postPictutre: product2,
    note: "The video quality was poor and the audio choosen for the video was not at all trending. Please shoot again with a trending audio and upload once again.",
  },
  {
    status: "pending",
    date: "12 hours ago",
    caption:
      "Join me for a Get Ready With Me session where Ill walk you through my morning routine, from skincare and makeup to outfit selection. Lets chat, share tips, and get ready together for the day ahead!",
    postPictutre: product4,
    note: "Your post will soon get approved. Please wait for some time.",
  },
];

interface contentReviewInterface {
  content_review: {
    status: string;
    updated_at: string;
    caption: string;
    image: string;
    deliverable_note: string;
  };
  campaign_description: string;
}

const ContentDeliverableHistory: React.FC<contentReviewInterface> = ({
  content_review,
  campaign_description,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleText = () => setIsExpanded(!isExpanded);

  const truncatedText = campaign_description.slice(0, 100);
  const remainingText = campaign_description.slice(100);

  return (
    <Fragment>
      {content_review && (
        <div className="bg-white mt-3 p-3 rounded-md w-full">
          <div className="flex flex-col xl:flex-row gap-3">
            <div className="flex justify-center xl:justify-start   ">
              <img src={product4} alt="" className="w-48 h-48 rounded-md" />
            </div>
            <div className="flex flex-col gap-3 xl:w-[80%] 2xl:w-[91%]">
              <div className="flex gap-2 items-center">
                <p className="font-medium text-sm 2xl:text-base">Status:</p>
                <p
                  className={`text-xs ${
                    content_review.status === "approved"
                      ? "bg-[#52AD60]"
                      : content_review.status === "rejected"
                      ? "bg-[#DB6261]"
                      : "bg-[#fdc100]"
                  } text-white flex items-center justify-center py-1 px-2 rounded`}>
                  {content_review.status.charAt(0).toUpperCase() +
                    content_review.status.slice(1)}
                </p>
              </div>

              <div className="flex gap-2 items-center w-full">
                <p className="font-medium text-sm 2xl:text-base">Date:</p>
                <p className="text-sm 2xl:text-base whitespace-nowrap">
                  {formatDateDifference(content_review.updated_at)}
                </p>
              </div>

              <div className="flex gap-2 items-start">
                <p className="font-medium text-sm 2xl:text-base">Caption:</p>
                <p className="text-sm 2xl:text-base">
                  {truncatedText}
                  {!isExpanded && "..."}
                  {isExpanded && <span>{remainingText}</span>}
                  <button
                    onClick={toggleText}
                    className="text-blue-500 ml-2 underline">
                    {isExpanded ? "Show less" : "Show more"}
                  </button>
                </p>
              </div>
              <div className="flex gap-2 items-start">
                <p className="font-medium text-sm 2xl:text-base">Note:</p>
                <p className="text-sm 2xl:text-base">
                  {content_review.deliverable_note}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ContentDeliverableHistory;
