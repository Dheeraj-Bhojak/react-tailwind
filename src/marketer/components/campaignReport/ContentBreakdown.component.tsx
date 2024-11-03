import React, { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";

import profile from "../../../assets/img/profile.jpg";
import share from "../../../assets/img/share.png";
import post1 from "../../../assets/img/post1.jpg";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import PaginationComponent from "../../../global/global_component/pagination/coreuiPagination.component";
import { formatNumberShort } from "../../../utils/utilsMethods/formatNumberSort.utils";

export interface SortConfigInterface {
  key: string;
  orderBy: "ASC" | "DESC";
}

interface Product {
  content: string;
  link: string;
  spend: string;
  impression: string;
  reach: string;
  views: string;
  engagement: string;
  likes: string;
  comments: string;
  shares: string;
  influencer: string;
  contentImg: string;
  postedBy: string;
}

export interface ContentBreakDownInterface {
  id: number;
  impressions: number;
  total_interactions: number;
  reach: number;
  saved: number;
  shares: number;
  comments: number;
  likes: number;
  post_media_link: string;
  IgPostCollabWithId: number;
  IgPostCollabWithStatus: string;
  campaignId: number;
  campaign_name: string;
  influencerId: number;
  userId: number;
  first_name: string;
  last_name: string;
  profile_pictureId: number;
  profile_picture_img_name: string;
  profile_picture_img_url: string;
  ig_deliverablesId: number;
  media_type: string;
  deliverable_name: string;
  collab_pricingId: number;
  amount: number;
  content_img_name: string;
  content_img_url: string;
}

const ContentBreakdown: React.FC<{
  deliverableId: number;
  campaignId: number;
  access_token: string;
}> = ({ deliverableId, campaignId, access_token }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const handleTableDataRange = (range: number) => {
    setPaginationConfig((prev) => ({
      ...prev,
      limit: range,
    }));
  };

  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    key: "created_at",
    orderBy: "DESC",
  });
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });
  const [lastPage, setLastPage] = useState<number>(0);
  const [paginationConfig, setPaginationConfig] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });
  const headers = {
    authorization: `Bearer ${access_token}`,
  };

  const [contentBreakDownData, setContentBreakDownData] = useState<
    ContentBreakDownInterface[] | null
  >(null);
  const fetchContentBreakDownTable = async () => {
    const contentBreakDownTableDataApi = `${process.env.REACT_APP_API_URL}marketer_campaign/report/content_break/${deliverableId}`;
    const config = {
      headers,
      params: {
        campaign_id: campaignId,
        ...sortConfig,
        ...paginationConfig,
      },
    };
    try {
      const { data } = await axios.get(contentBreakDownTableDataApi, config);
      setContentBreakDownData(data.contentInsights);
      // setLastPage(data.pagination.lastPage);
    } catch (error: any) {
      const { status, data } = error.response;
      const { message, theme } = CallToast(status, data.message);
      setResponseToast({ message, theme, showToast: true });
      setTimeout(() => {
        setResponseToast((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
    }
  };

  useEffect(() => {
    fetchContentBreakDownTable();
  }, []);

  const openInstagramPost = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <div className="bg-[#ededed] px-3 pb-3 ds">
      <div className="bg-white rounded-md">
        <div className="border-b-1 pb-3 pt-3 border-[#D9D9D9] flex">
          <div className="w-1/2">
            <p className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
              Content Breakdown
            </p>
          </div>
          <div className="w-1/2 flex">
            <div className="w-1/2">
              <PaginationComponent
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={lastPage}
              />
            </div>
            <div className="w-1/2 flex items-center">
              <CDropdown className="ml-2">
                <CDropdownToggle
                  size="sm"
                  color="secondary"
                  className="text-[10px] sm:text-base">
                  <span className="text-xs 3xl:text-sm font-medium">
                    {paginationConfig.limit}
                  </span>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    className={`select-none active:bg-[#4267b2] ${
                      paginationConfig.limit === 5
                        ? `bg-ri-blue text-white`
                        : ``
                    }`}
                    onClick={() => handleTableDataRange(5)}>
                    <p className="text-xs 3xl:text-sm font-medium">5 Rows</p>
                  </CDropdownItem>
                  <CDropdownItem
                    className={`select-none active:bg-[#4267b2] ${
                      paginationConfig.limit === 10
                        ? `bg-ri-blue text-white`
                        : ``
                    }`}
                    onClick={() => handleTableDataRange(10)}>
                    <p className="text-xs 3xl:text-sm font-medium">10 Rows</p>
                  </CDropdownItem>
                  <CDropdownItem
                    className={`select-none active:bg-[#4267b2] ${
                      paginationConfig.limit === 25
                        ? `bg-ri-blue text-white`
                        : ``
                    }`}
                    onClick={() => handleTableDataRange(25)}>
                    <p className="text-xs 3xl:text-sm font-medium">25 Rows</p>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>
        </div>
        <div className="w-full overflow-x-scroll">
          <div className="text-center overflow-x-scroll">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Content
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Link
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Posted By
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Spend
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Impressions
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Reach
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs  2xl:text-base px-2">
                    Total Interactions
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Eng.
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Likes
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Comments
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody>
                {contentBreakDownData &&
                  contentBreakDownData.map((content, index) => (
                    <tr key={index} className="border-b-2">
                      <td className="py-3 flex items-center justify-center px-4 mx-4">
                        <img
                          className=" w-14 h-14 md:w-12 md:h-12"
                          src={content.content_img_url}
                          alt={content.content_img_name}
                        />
                        <span className="pl-3 text-xs md:text-sm font-medium whitespace-nowrap">
                          {content.deliverable_name}
                        </span>
                      </td>
                      <td className="">
                        <div
                          className="flex justify-center hover:cursor-pointer"
                          onClick={() =>
                            openInstagramPost(content.post_media_link)
                          }>
                          <img
                            className="w-4 h-4 md:w-6 md:h-6"
                            src={share}
                            alt="link"
                          />
                        </div>
                      </td>
                      <td className="flex items-center justify-center px-4 mx-4">
                        <img
                          className="rounded-full w-12 h-12 md:w-14 md:h-14"
                          src={content.profile_picture_img_url}
                          alt={content.profile_picture_img_name}
                        />
                        <span className="  text-xs md:text-sm font-medium px-4  whitespace-nowrap">
                          {`${content.first_name} ${content.last_name}`}
                        </span>
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-4 border-x-2">
                        {`₹${content.amount}`}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-4 border-x-2">
                        {formatNumberShort(content.impressions)}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-4 border-x-2">
                        {formatNumberShort(content.reach)}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-4 border-x-2">
                        {formatNumberShort(content.total_interactions)}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-4 border-x-2">
                        {content.total_interactions}
                        {/* engagement here */}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-4 border-x-2">
                        {formatNumberShort(content.likes)}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-4 border-x-2">
                        {formatNumberShort(content.comments)}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-4 border-x-2">
                        {formatNumberShort(content.shares)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBreakdown;
