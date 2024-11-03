import React, { useEffect, useState } from "react";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PaginationComponent from "../../../../global/global_component/pagination/coreuiPagination.component";

interface influencerBreakdownInterface {
  id: number;
  status: string;
  campaign: {
    id: number;
    campaign_name: string;
    instagram_deliverables: {
      reels: number;
      story_with_link: number;
      video_post: number;
      static_post: number;
    };
  };
  influencer: {
    id: number;
    qikgro_score: number;
    user: {
      first_name: string;
      last_name: string;
      profile_picture: {
        img_name: string;
        img_url: string;
        is_active: boolean;
      } | null;
    };
  };
  collab_pricing: [];
}

const CampaignInfluencerTableAM3 = () => {
  const [tableDataRange, setTableDataRange] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const { id } = useParams();
  const campaignId = parseInt(id ?? "0", 10);

  const navigate = useNavigate();
  const handleTableDataRange = (range: number) => {
    setTableDataRange(range);
    setCurrentPage(1);
  };

  const formatBudgetSpent = (spent: number) => {
    if (spent >= 10000000) {
      const formatted = (spent / 10000000).toFixed(2);
      return formatted.endsWith(".00")
        ? formatted.slice(0, -3) + " Cr"
        : formatted + " Cr";
    } else if (spent >= 100000) {
      const formatted = (spent / 100000).toFixed(2);
      return formatted.endsWith(".00")
        ? formatted.slice(0, -3) + " L"
        : formatted + " L";
    } else {
      return spent.toString();
    }
  };

  const handleStatusSelection = (status: string) => {
    if (status === "default") {
      setSelectedStatus("");
    } else {
      setSelectedStatus(status);
    }
    setIsStatusDropdownOpen(false);
  };

  const [influencerBreakdown, setInfluencerBreakdown] = useState<
    influencerBreakdownInterface[]
  >([]);
  const [lastPage, setLastPage] = useState<number>(0);

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const headers = {
    authorization: `Bearer ${access_token}`,
  };
  const fetchInfluencerCollaborationBreakDown = async (id: number) => {
    const influencerBreakdown = `${process.env.REACT_APP_API_URL}admin/am3/campaign/influencer_breakdown/${id}`;
    const config = {
      headers,
    };
    try {
      const { data } = await axios.get(influencerBreakdown, config);
      setInfluencerBreakdown(data.campaignInfluencerBreakdown);
      setLastPage(data.pagination.lastPage);
    } catch (error: any) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchInfluencerCollaborationBreakDown(campaignId);
  }, []);
  const [filterConfig, setFilterConfig] = useState<{
    first_name: string;
    status: string;
    collabId: number | null;
  }>({
    first_name: "",
    status: "",
    collabId: null,
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "collabId" && /^\d*$/.test(value)) {
      setFilterConfig((prev) => ({
        ...prev,
        collabId: parseInt(value, 10),
      }));
    } else {
      setFilterConfig((prev) => ({
        ...prev,
        first_name: value,
      }));
    }
    setFilterConfig((prevState) => ({
      ...prevState,
      [name]:
        value !== ""
          ? isNaN(Number(value))
            ? value
            : parseInt(value, 10)
          : null,
    }));
  };

  return (
    <div className="bg-[#EBEBEB] h-full p-3">
      <div className="bg-white py-4 px-2 rounded-md mb-3">
        <div className="flex justify-evenly">
          <input
            type="text"
            placeholder=" Collaboration Id"
            name="collabId"
            value={
              filterConfig.collabId !== null
                ? filterConfig.collabId.toString()
                : ""
            }
            onChange={handleInputChange}
            className="rounded-[4px] h-8 text-sm px-3 w-2/12 2xl:w-60  bg-[#EBEBEB] custom-input"
          />
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={filterConfig.first_name}
            onChange={handleInputChange}
            className="rounded-[4px] h-8 text-sm px-3 w-2/12 2xl:w-60  bg-[#EBEBEB] custom-input"
          />

          <button
            className="bg-[#4267B2] text-white rounded-[4px] w-2/12 2xl:w-60"
            //   onClick={searchTableDataApiCall}
          >
            search
          </button>
          <button className="bg-[#FDC100] text-white rounded-[4px] w-2/12 2xl:w-60">
            Clear
          </button>
        </div>
      </div>

      <div className="bg-white py-2 rounded-md">
        <div className="border-b-1 flex justify-between px-16 py-2 items-center">
          <div className="py-2">
            <p className="text-sm 2xl:text-base text-gray-color font-medium">
              Company Table
            </p>
          </div>
          <div className="py-2">
            <PaginationComponent
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={lastPage}
            />
          </div>
          <div className="py-2">
            <div className="w-1/2 flex items-center">
              <p className="whitespace-nowrap text-sm 2xl:text-base text-gray-color font-medium">
                Rows Per Page:
              </p>
              <CDropdown className="ml-2">
                <CDropdownToggle
                  size="sm"
                  color="secondary"
                  className="text-[10px] sm:text-base">
                  <span className="text-xs 3xl:text-sm font-medium">
                    {tableDataRange}
                  </span>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    onClick={() => handleTableDataRange(6)}>
                    <p className="text-xs 3xl:text-sm font-medium">6</p>
                  </CDropdownItem>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    onClick={() => handleTableDataRange(12)}>
                    <p className="text-xs 3xl:text-sm font-medium">12</p>
                  </CDropdownItem>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    //   onClick={() =>
                    // handleTableDataRange(campaignInfluencerAM3TableData.length)
                    //   }
                  >
                    <p className="text-xs 3xl:text-sm font-medium">All Data</p>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>
        </div>
        <div className="text-center">
          <table className="w-full">
            <thead className="">
              <tr className="table-row-border">
                <th className="px-14 text-xs 3xl:text-sm relative">Id</th>
                <th className="px-14 text-xs 3xl:text-sm">
                  <button className="items-center">
                    Influencer Name
                    {sortOrder === "ASC" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm">
                  <CDropdown>
                    <CDropdownToggle
                      caret={false}
                      className="border-none bg-white text-[#909AAA] font-semibold text-xs 3xl:text-sm hover:text-[#909AAA]">
                      Status{" "}
                      <i
                        className={`fa-solid fa-caret-${
                          isStatusDropdownOpen ? "up" : "down"
                        }`}></i>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        className="select-none active:bg-[#4267b2]"
                        onClick={() => handleStatusSelection("selected")}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          Selected
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className="select-none active:bg-[#4267b2]"
                        onClick={() => handleStatusSelection("hired")}>
                        <p className="text-xs 3xl:text-sm font-medium">Hired</p>
                      </CDropdownItem>
                      <CDropdownItem
                        className="select-none active:bg-[#4267b2]"
                        onClick={() => handleStatusSelection("sorted")}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          Sorted
                        </p>
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem
                        className="select-none active:bg-[#4267b2]"
                        onClick={() => handleStatusSelection("")}>
                        <p className="text-xs 3xl:text-sm font-medium">All</p>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </th>
                <th className="px-14 text-xs 3xl:text-sm">
                  <button
                    //   onClick={handleSortBySpent}
                    className="items-center">
                    Spent
                    {sortOrder === "ASC" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm">Deliverables</th>
                <th className="px-14 text-xs 3xl:text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {influencerBreakdown &&
                influencerBreakdown.map((tableData, index) => (
                  <tr key={index} className="w-full border-b-1">
                    <td className="whitespace-nowrap py-3">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.id}.
                      </p>
                    </td>

                    <td className="py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-4/12 flex justify-end">
                          <img
                            src={
                              tableData.influencer.user.profile_picture &&
                              tableData.influencer.user.profile_picture
                                .img_url !== null
                                ? tableData.influencer.user.profile_picture
                                    .img_url
                                : ""
                            }
                            alt=""
                            className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                          />
                        </div>
                        <div className="w-8/12 items-center flex pl-5">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.influencer.user.first_name
                              .charAt(0)
                              .toUpperCase() +
                              tableData.influencer.user.first_name.slice(1)}
                            {tableData.influencer.user.last_name
                              .charAt(0)
                              .toUpperCase() +
                              tableData.influencer.user.last_name.slice(1)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap py-3">
                      <div
                        className={`py-1 px-2 rounded-md inline-block ${
                          tableData.status === "selected"
                            ? "bg-[#4267B2]"
                            : tableData.status === "hired"
                            ? "bg-[#52AD60]"
                            : tableData.status === "sorted"
                            ? "bg-[#FDC100]"
                            : "bg-gray-500" // Default color if status doesn't match any case
                        }`}>
                        <p className="text-[10px] 3xl:text-xs text-white">
                          {tableData.status.charAt(0).toUpperCase() +
                            tableData.status.slice(1)}
                        </p>
                      </div>
                    </td>

                    <td className="whitespace-nowrap py-3">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {formatBudgetSpent(tableData.influencer.id)} influencer
                        Id
                      </p>
                    </td>

                    <td className="whitespace-nowrap py-3">
                      <div className="flex">
                        <div className="w-6/12 flex justify-end">
                          <p className="text-xs 3xl:text-sm font-medium">
                            Reels:{" "}
                            {tableData.campaign.instagram_deliverables.reels}
                          </p>
                        </div>
                        <p className="text-xs 3xl:text-sm font-medium mx-1">
                          |
                        </p>
                        <div className="w-6/12 flex justify-start">
                          <p className="text-xs 3xl:text-sm font-medium">
                            Stories With Link:{" "}
                            {
                              tableData.campaign.instagram_deliverables
                                .story_with_link
                            }
                          </p>
                        </div>
                      </div>

                      <div className="flex mt-1">
                        <div className="w-6/12 flex justify-end">
                          <p className="text-xs 3xl:text-sm font-medium">
                            Video_post:{" "}
                            {
                              tableData.campaign.instagram_deliverables
                                .video_post
                            }
                          </p>
                        </div>
                        <p className="text-xs 3xl:text-sm font-medium mx-1">
                          |
                        </p>
                        <div className="w-6/12 flex justify-start">
                          <p className="text-xs 3xl:text-sm font-medium">
                            Static Post:{" "}
                            {
                              tableData.campaign.instagram_deliverables
                                .static_post
                            }
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 whitespace-nowrap">
                      <CDropdown>
                        <CDropdownToggle className="bg-[#4267B2] border-0 text-white py-1 px-2 rounded-sm text-sm hover:bg-[#4267B2]">
                          <span className="text-xs 3xl:text-sm">
                            Take Action
                          </span>
                        </CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem className="select-none active:bg-ri-blue">
                            <p className="text-xs 3xl:text-sm font-medium">
                              Call
                            </p>
                          </CDropdownItem>
                          <CDropdownItem className="select-none active:bg-ri-blue">
                            <p className="text-xs 3xl:text-sm font-medium">
                              Email
                            </p>
                          </CDropdownItem>
                          <CDropdownItem className="select-none active:bg-ri-blue">
                            <p className="text-xs 3xl:text-sm font-medium">
                              Message
                            </p>
                          </CDropdownItem>
                          <CDropdownDivider />
                          <CDropdownHeader>Hiring Action</CDropdownHeader>
                          <CDropdownItem className="select-none active:bg-ri-blue">
                            <p
                              className="text-xs 3xl:text-sm font-medium"
                              onClick={() =>
                                navigate(
                                  `/admin-app/campaign/collaboration/agreement/${tableData.id}`
                                )
                              }>
                              Create Agreement
                            </p>
                          </CDropdownItem>
                        </CDropdownMenu>
                      </CDropdown>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CampaignInfluencerTableAM3;
