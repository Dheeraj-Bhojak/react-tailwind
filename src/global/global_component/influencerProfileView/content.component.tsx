import React, { ChangeEvent, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import InstaPostCard from "./instaPostCard.component";
import ReelsPostCard from "./reelPostCard.component";

import "swiper/css"; // Import Swiper CSS
import "swiper/css/pagination"; // Import Swiper styles
import { ContentPostInterface } from "../../../marketer/pages/InfluencerProfile/profieResult";

interface ContentDataInterface {
  content: ContentPostInterface[];
}
const Content: React.FC<ContentDataInterface> = ({ content }) => {
  const reelsPostData = [
    {
      reelsLikeCount: "18.6K",
      reelsCommentCount: "23.3K",
      reelsShareCount: "256",
      reelsTimestamp: "3 Days Ago",
      reelsEngagementRate: "11.96%",
    },
    {
      reelsLikeCount: "17.2K",
      reelsCommentCount: "24.8K",
      reelsShareCount: "287",
      reelsTimestamp: "2 Days Ago",
      reelsEngagementRate: "12.21%",
    },
    {
      reelsLikeCount: "15.9K",
      reelsCommentCount: "22.1K",
      reelsShareCount: "211",
      reelsTimestamp: "4 Days Ago",
      reelsEngagementRate: "11.45%",
    },
    {
      reelsLikeCount: "18.5K",
      reelsCommentCount: "25.6K",
      reelsShareCount: "298",
      reelsTimestamp: "1 Day Ago",
      reelsEngagementRate: "12.73%",
    },
  ];

  const instaPostData = [
    {
      likeCount: "16.6K",
      commentCount: "23.3K",
      shareCount: "256",
      timestamp: "3 Days Ago",
      engagementRate: "11.96%",
    },
    {
      likeCount: "17.2K",
      commentCount: "24.8K",
      shareCount: "287",
      timestamp: "2 Days Ago",
      engagementRate: "12.21%",
    },
    {
      likeCount: "15.9K",
      commentCount: "22.1K",
      shareCount: "211",
      timestamp: "4 Days Ago",
      engagementRate: "11.45%",
    },
    {
      likeCount: "18.5K",
      commentCount: "25.6K",
      shareCount: "298",
      timestamp: "1 Day Ago",
      engagementRate: "12.73%",
    },
    {
      likeCount: "16.3K",
      commentCount: "22.9K",
      shareCount: "265",
      timestamp: "5 Days Ago",
      engagementRate: "11.77%",
    },
    {
      likeCount: "17.8K",
      commentCount: "24.5K",
      shareCount: "275",
      timestamp: "2 Days Ago",
      engagementRate: "12.09%",
    },
    {
      likeCount: "16.7K",
      commentCount: "23.7K",
      shareCount: "245",
      timestamp: "4 Days Ago",
      engagementRate: "11.84%",
    },
    {
      likeCount: "18.2K",
      commentCount: "25.2K",
      shareCount: "283",
      timestamp: "1 Day Ago",
      engagementRate: "12.41%",
    },
  ];

  const postsPerRow = 4;

  const rows = [];
  for (let i = 0; i < content.length; i += postsPerRow) {
    rows.push(content.slice(i, i + postsPerRow));
  }

  const reelsPerRow = 4;

  const reelsRows = [];
  for (let i = 0; i < reelsPostData.length; i += reelsPerRow) {
    reelsRows.push(reelsPostData.slice(i, i + reelsPerRow));
  }

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

  const [selectedContent, setSelectedContent] = useState<string>("posts");

  const contentShowHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedContent(event.target.value);
  };

  return (
    <div id="content" className="bg-[#ebebeb] w-full pt-[16px] md:pt-0">
      <div className="bg-white ml-4 mr-4 rounded-lg px-[8px] py-4 md:p-4">
        <div className="w-full flex items-center mb-2">
          <div className="w-6/12 flex justify-start">
            <div className="bg-[#EBEBEB]  p-1 rounded-md flex justify-center items-center">
              <div className="flex w-full">
                <div>
                  <input
                    type="radio"
                    name="option"
                    id="posts"
                    value="posts"
                    className="peer hidden"
                    onChange={contentShowHandler}
                    checked={selectedContent === "posts"}
                  />
                  <label
                    htmlFor="posts"
                    className="block cursor-pointer select-none rounded-md p-1 text-center px-2 peer-checked:bg-white peer-checked:text-black">
                    <p className="text-xs md:text-base">Posts</p>
                  </label>
                </div>

                <div>
                  <input
                    type="radio"
                    name="option"
                    id="reels"
                    value="reels"
                    className="peer hidden"
                    onChange={contentShowHandler}
                    checked={selectedContent === "reels"}
                  />
                  <label
                    htmlFor="reels"
                    className="block cursor-pointer select-none rounded-md px-3 p-1 text-center peer-checked:bg-white peer-checked:text-black">
                    <p className="text-xs md:text-base">Reels</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <CDropdown>
              <CDropdownToggle size="sm" color="secondary">
                Last 90 Days
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#">Last 60 Days</CDropdownItem>
                <CDropdownItem href="#">Last 30 Days</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </div>
        <div className="">
          {selectedContent === "posts" ? (
            <>
              {isMobile ? (
                <Swiper
                  spaceBetween={10} // Adjust as per your requirement
                  slidesPerView={0.5} // Display one slide at a time initially on mobile
                >
                  {rows.map((row, index) => (
                    <SwiperSlide key={index}>
                      <div className="flex">
                        {row.map((postData, postIndex) => (
                          <InstaPostCard key={postIndex} content={postData} />
                        ))}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                rows.map((row, index) => (
                  <div key={index} className="flex">
                    {row.map((postData, postIndex) => (
                      <InstaPostCard key={postIndex} content={postData} />
                    ))}
                  </div>
                ))
              )}
            </>
          ) : (
            <>
              {isMobile ? (
                <Swiper
                  spaceBetween={10} // Adjust as per your requirement
                  slidesPerView={2} // Display one slide at a time initially on mobile
                >
                  {reelsRows.length > 0 && (
                    <div className="flex">
                      {reelsRows[0].map((reelsData, reelsIndex) => (
                        <SwiperSlide key={reelsIndex}>
                          <ReelsPostCard
                            key={reelsIndex}
                            reelsLikeCount={reelsData.reelsLikeCount}
                            reelsCommentCount={reelsData.reelsCommentCount}
                            reelsShareCount={reelsData.reelsShareCount}
                            reelsTimestamp={reelsData.reelsTimestamp}
                            reelsEngagementRate={reelsData.reelsEngagementRate}
                          />
                        </SwiperSlide>
                      ))}
                    </div>
                  )}
                </Swiper>
              ) : (
                reelsRows.length > 0 && (
                  <div className="flex">
                    {reelsRows[0].map((reelsData, reelsIndex) => (
                      <ReelsPostCard
                        key={reelsIndex}
                        reelsLikeCount={reelsData.reelsLikeCount}
                        reelsCommentCount={reelsData.reelsCommentCount}
                        reelsShareCount={reelsData.reelsShareCount}
                        reelsTimestamp={reelsData.reelsTimestamp}
                        reelsEngagementRate={reelsData.reelsEngagementRate}
                      />
                    ))}
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
