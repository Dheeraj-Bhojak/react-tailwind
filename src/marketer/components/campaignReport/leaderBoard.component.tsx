import React, { useState, useEffect } from "react";
import "swiper/swiper-bundle.css";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { InfluencerBreakDownInterface } from "../../pages/campaignReport/campaignReport.component";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import PaginationComponent from "../../../global/global_component/pagination/coreuiPagination.component";

interface LeaderBoardsInterface {
  campaignId: number;
  access_token: string;
}

interface InfluencerBreakDownLeaderBoardInterface {
  id: number;
  status: string;
  campaign: {
    id: number;
    campaign_name: string;
    platform: string;
    status: string;
  };
  influencer: {
    id: number;
    IsActive: true;
    instagram: {
      followers: number;
    };
    user: {
      first_name: string;
      last_name: string;
      profile_picture: {
        id: number;
        img_name: string;
        img_url: string;
        is_active: true;
      };
    };
  };
  summary: {
    impressions: number;
    total_interactions: number;
    reach: number;
    amount: number;
    engagement_rate: number;
    likes: number;
  };
}

export interface SortConfigInterface {
  key: string;
  orderBy: "ASC" | "DESC";
}

const InfluencerLeaderBoards: React.FC<LeaderBoardsInterface> = ({
  campaignId,
  access_token,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleTableDataRange = (range: number) => {
    setPaginationConfig((prev) => ({
      ...prev,
      limit: range,
    }));
  };

  //
  const [influencerBreakDownData, setInfluencerBreakDownData] = useState<
    InfluencerBreakDownLeaderBoardInterface[] | null
  >(null);
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
  const fetchInfluencerBreakDownTableData = async () => {
    const influencerBreakDownTableDataApi = `${process.env.REACT_APP_API_URL}marketer_campaign/report/influencer_board/${campaignId}`;
    const config = {
      headers,
      params: {
        ...sortConfig,
        ...paginationConfig,
      },
    };
    try {
      const { data } = await axios.get(influencerBreakDownTableDataApi, config);
      setInfluencerBreakDownData(data.influencerLeaderBoardReport);
      setLastPage(data.pagination.lastPage);
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
    fetchInfluencerBreakDownTableData();
  }, [sortConfig, paginationConfig]);

  console.log("data", influencerBreakDownData);
  return (
    <div className="bg-[#ededed] pt-3 pb-3 px-3">
      <div className="bg-white rounded-md">
        <div className="border-b-1 pb-3 pt-3 border-[#D9D9D9] flex">
          <div className="w-1/2 items-center flex">
            <p className="ml-2 text-[#909aaa] font-medium text-xs md:text-base 2xl:text-base">
              Influencer LeaderBoards Table
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
              <p className="text-[10px] sm:text-base whitespace-nowrap">
                Rows Per Page:
              </p>
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
                      paginationConfig.limit === 10
                        ? `bg-ri-blue text-white`
                        : ``
                    }`}
                    onClick={() => handleTableDataRange(10)}>
                    <p className="text-xs 3xl:text-sm font-medium">10 Rows</p>
                  </CDropdownItem>
                  <CDropdownItem
                    className={`select-none active:bg-[#4267b2] ${
                      paginationConfig.limit === 20
                        ? `bg-ri-blue text-white`
                        : ``
                    }`}
                    onClick={() => handleTableDataRange(20)}>
                    <p className="text-xs 3xl:text-sm font-medium">20 Rows</p>
                  </CDropdownItem>
                  <CDropdownItem
                    className={`select-none active:bg-[#4267b2] ${
                      paginationConfig.limit === 50
                        ? `bg-ri-blue text-white`
                        : ``
                    }`}
                    onClick={() => handleTableDataRange(50)}>
                    <p className="text-xs 3xl:text-sm font-medium">50 Rows</p>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>
        </div>
        <div>
          <div className="text-center overflow-x-scroll">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className=" md:w-24 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Profile
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Influencer
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Spend
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    View
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Eng.
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    Likes
                  </th>
                  <th className="ml-2 text-gray-color font-medium text-xs md:text-base 2xl:text-base">
                    impressions
                  </th>
                </tr>
              </thead>
              <tbody>
                {influencerBreakDownData &&
                  influencerBreakDownData.map((influencer, index) => (
                    <tr key={index} className="border-b-2">
                      <td className="py-3 flex items-center justify-center px-2">
                        <div className="flex items-center ">
                          <img
                            className="rounded-full w-6 h-6 md:w-7 md:h-7 lg:w-9 lg:h-9 object-cover"
                            src={
                              influencer.influencer.user.profile_picture.img_url
                                ? influencer.influencer.user.profile_picture
                                    .img_url
                                : ""
                            }
                            alt="influencer"
                          />
                        </div>
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-2">
                        <p className="pl-3 text-xs md:text-sm  font-medium">
                          {`${influencer.influencer.user.first_name} ${influencer.influencer.user.last_name}`}
                        </p>
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-2">
                        {influencer.summary.amount}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-2">
                        {influencer.summary.reach}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-2">
                        {influencer.summary.engagement_rate} {"%"}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-2">
                        {influencer.summary.likes}
                      </td>
                      <td className="text-center text-xs md:text-sm font-medium px-2">
                        {influencer.summary.impressions}
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

export default InfluencerLeaderBoards;
