import React, { useContext, useEffect, useState } from "react";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { campaignTableData } from "../../../../seeder";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import axios from "axios";
import Select, { SingleValue } from "react-select";
import { FormDataContext } from "../../../../utils/context/formData/formData.context";
import { SortConfigInterface } from "../../am2/companiesTable.component";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../../../../global/global_component/pagination/coreuiPagination.component";

interface imagePictureInterface {
  id: number;
  img_name: string;
  img_url: string;
}
interface NicheOptionInterface {
  value: number;
  label: string;
}

export interface FilterConfigInterface {
  campaign_id: number | null;
  am3_id: number | null;
  influencer_expected_id: number | null;
  campaign_name: string;
  niche_id: number | null;
  status: string;
  tentative_budget: number | null;
  page: number;
  limit: number;
}
interface CampaignTableDataInterface {
  id: number;
  campaign_name: string;
  status: string;
  marketer: {
    id: number;
    brand_details: {
      id: number;
      brand_name: string;
      designation: string;
      industry: null;
    };
  };
  campaign_product: {
    id: number;
    product_images: imagePictureInterface[] | [];
  };
  tentative_budget: {
    id: number;
    budget_description: string;
  };
  niches_category: {
    id: number;
    niche_name: string;
  };
  number_of_influencer: {
    id: number;
    influencer_count_title: string;
  };
  collaboration: {
    applied?: number;
  };
}

const CampaignTableAM3 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTentativeDropdownOpen, setIsTentativeDropdownOpen] = useState(false);
  const [selectedTentativeBudget, setSelectedTentativeBudget] = useState("");
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [
    isExpectedInfluencerDropdownOpen,
    setIsExpectedInfluencerDropdownOpen,
  ] = useState(false);
  const [selectedExpectedInfluencers, setSelectedExpectedInfluencers] =
    useState("");

  const handleTableDataRange = (range: number) => {
    setFilterConfig((prev) => ({
      ...prev,
      limit: range,
    }));
    setCurrentPage(1);
  };

  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const truncateName = (name: string) => {
    const capitalized = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return capitalized.length > 14
      ? `${capitalized.slice(0, 14)}...`
      : capitalized;
  };

  // const formatReach = (reach: string | number) => {
  //   const followersNumber = typeof reach === "string" ? parseInt(reach) : reach;
  //   if (followersNumber >= 1000000) {
  //     const formatted = (followersNumber / 1000000).toFixed(1);
  //     return formatted.endsWith(".0")
  //       ? formatted.slice(0, -2) + "M"
  //       : formatted + "M";
  //   } else if (followersNumber >= 1000) {
  //     const formatted = (followersNumber / 1000).toFixed(1);
  //     return formatted.endsWith(".0")
  //       ? formatted.slice(0, -2) + "K"
  //       : formatted + "K";
  //   } else {
  //     return followersNumber.toString();
  //   }
  // };

  // const formatBudgetSpent = (spent: number) => {
  //   if (spent >= 10000000) {
  //     const formatted = (spent / 10000000).toFixed(2);
  //     return formatted.endsWith(".00")
  //       ? formatted.slice(0, -3) + " Cr"
  //       : formatted + " Cr";
  //   } else if (spent >= 100000) {
  //     const formatted = (spent / 100000).toFixed(2);
  //     return formatted.endsWith(".00")
  //       ? formatted.slice(0, -3) + " L"
  //       : formatted + " L";
  //   } else {
  //     return spent.toString();
  //   }
  // };

  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    key: "id",
    orderBy: "DESC",
  });

  const initialFilterConfig = {
    campaign_id: null,
    am3_id: null,
    influencer_expected_id: null,
    campaign_name: "",
    niche_id: null,
    status: "",
    tentative_budget: null,
    page: 1,
    limit: 10,
  };

  const [filterConfig, setFilterConfig] =
    useState<FilterConfigInterface>(initialFilterConfig);

  const clearFilterTableData = () => {
    setFilterConfig(initialFilterConfig);
  };

  const [campaignData, setCampaignData] = useState<
    CampaignTableDataInterface[]
  >([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const headers = {
    authorization: `Bearer ${access_token}`,
  };
  const fetchCampaignTableData = async () => {
    const campaignTableDataAPi = `${process.env.REACT_APP_API_URL}admin/am3/campaigns`;
    const config = {
      headers,
      params: { ...filterConfig, ...sortConfig },
    };
    try {
      const { data } = await axios.get(campaignTableDataAPi, config);
      setCampaignData(data.campaignDetails);
      setLastPage(data.pagination.lastPage);
      console.log(data);
    } catch (error: any) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    fetchCampaignTableData();
    console.log("data", sortConfig);
  }, [filterConfig, sortConfig]);
  const { state } = useContext(FormDataContext);
  const { niche } = state;
  const [nicheOptions, setNicheOptions] = useState<NicheOptionInterface[]>([]);
  useEffect(() => {
    if (niche && Array.isArray(niche)) {
      const Options = niche.map((nicheData) => ({
        value: nicheData.id,
        label: nicheData.niche_name,
      }));
      setNicheOptions(Options);
    }
  }, [niche]);
  const handleSelectChange = (newValue: SingleValue<NicheOptionInterface>) => {
    setFilterConfig((prevState) => ({
      ...prevState,
      niche_id: newValue ? newValue.value : null,
    }));
  };
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "campaign_name") {
      setFilterConfig((prev) => ({
        ...prev,
        campaign_name: value,
      }));
    } else {
      setFilterConfig((prevState) => ({
        ...prevState,
        [name]:
          value !== ""
            ? isNaN(Number(value))
              ? value
              : parseInt(value, 10)
            : null,
      }));
    }
  };
  const handleSortChange = (sortKey: string) => {
    setSortConfig((prev) => ({
      ...prev,
      key: sortKey,
      orderBy: prev.orderBy === "ASC" ? "DESC" : "ASC",
    }));
  };
  const handleStatusSelection = (status: string) => {
    setFilterConfig((prev) => ({
      ...prev,
      status,
    }));
    setIsStatusDropdownOpen(false);
  };
  const handleTentativeBudgetSelection = (value: number | null) => {
    setFilterConfig((prev) => ({
      ...prev,
      tentative_budget: value,
    }));
    setIsTentativeDropdownOpen(false);
  };
  const handleExpectedInfluencersSelection = (value: number | null) => {
    setFilterConfig((prev) => ({
      ...prev,
      influencer_expected_id: value,
    }));
    setIsExpectedInfluencerDropdownOpen(false);
  };

  const handlePageChange: React.Dispatch<React.SetStateAction<number>> = (
    page
  ) => {
    setFilterConfig((prevConfig) => ({
      ...prevConfig,
      page: typeof page === "function" ? page(prevConfig.page) : page,
    }));
  };

  console.log("data", sortConfig);

  return (
    <div className="bg-[#EBEBEB] h-full p-3">
      <div className="bg-white py-4 px-2 rounded-md mb-3">
        <div className="flex justify-evenly">
          <input
            type="text"
            placeholder="Campaign Id"
            name="campaign_id"
            value={
              filterConfig.campaign_id !== null
                ? filterConfig.campaign_id.toString()
                : ""
            }
            onChange={handleInputChange}
            className="rounded-[4px] h-8 text-sm px-3 w-2/12 2xl:w-60  bg-[#EBEBEB] custom-input"
          />
          <input
            type="text"
            className="rounded-[4px] h-8 text-sm px-3 w-2/12 2xl:w-60  bg-[#EBEBEB] custom-input"
            placeholder="Campaign Name"
            name="campaign_name"
            value={filterConfig.campaign_name}
            onChange={handleInputChange}
          />
          <Select
            placeholder="Niche"
            onChange={handleSelectChange}
            value={
              nicheOptions.find(
                (option) => option.value === filterConfig.niche_id
              ) || null
            }
            className="z-10 rounded-[4px] h-8 text-sm px-2 w-2/12 2xl:w-60 bg-[#EBEBEB] custom-input"
            options={nicheOptions}
            styles={{
              control: (baseStyles, state) => ({
                backgroundColor: "#EBEBEB",
                height: "2rem",
                border: "2px",
                fontSize: "14px",
              }),
            }}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />

          {/* <button
            className="bg-[#4267B2] text-white rounded-[4px] w-2/12 2xl:w-60"
            // onClick={searchTableDataApiCall}
          >
            search
          </button> */}
          <button
            className="bg-[#FDC100] text-white rounded-[4px] w-2/12 2xl:w-60"
            onClick={clearFilterTableData}>
            Clear Filter
          </button>
        </div>
      </div>
      <div className="bg-white py-2 rounded-md">
        <div className="border-b-2 flex justify-between px-16 py-2 items-center">
          <div className="py-2">
            <p className="text-base 2xl:text-lg text-gray-color font-medium">
              Company Table
            </p>
          </div>
          <div className="py-2">
            <PaginationComponent
              currentPage={filterConfig.page}
              setCurrentPage={handlePageChange}
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
                    {filterConfig.limit}
                  </span>
                </CDropdownToggle>
                <CDropdownMenu>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    onClick={() => handleTableDataRange(10)}>
                    <p className="text-xs 3xl:text-sm font-medium">
                      10{" "}
                      <span className=" text-xs font-normal text-black">
                        Campaigns
                      </span>
                    </p>
                  </CDropdownItem>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    onClick={() => handleTableDataRange(20)}>
                    <p className="text-xs 3xl:text-sm font-medium">
                      20{" "}
                      <span className=" text-xs font-normal text-black">
                        Campaigns
                      </span>
                    </p>
                  </CDropdownItem>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    onClick={() => handleTableDataRange(50)}>
                    <p className="text-xs 3xl:text-sm font-medium">
                      50{" "}
                      <span className=" text-xs font-normal text-black">
                        Campaigns
                      </span>
                    </p>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>
        </div>
        <div className="text-center overflow-x-scroll w-full h-[60vh]">
          <table className="w-full">
            <thead>
              <tr className="table-row-border">
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  ID
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  <button
                    onClick={() => handleSortChange("campaign_name")}
                    className="items-center">
                    Campaign Name
                    {sortOrder === "asc" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  Company
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  Industry
                </th>
                <th
                  className="px-14 text-xs 3xl:text-sm border-r border-l"
                  colSpan={2}>
                  Budget
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
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
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.status === "active"
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleStatusSelection("active")}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          Active
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.status === "completed"
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleStatusSelection("completed")}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          Completed
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.status === "under_review"
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleStatusSelection("under_review")}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          Under Review
                        </p>
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.status === ""
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleStatusSelection("")}>
                        <p className="text-xs 3xl:text-sm font-medium">All</p>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  Reach
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  Engagement
                </th>
                <th
                  className="px-14 text-xs 3xl:text-sm border-r border-l"
                  colSpan={2}>
                  Influencers
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  Action
                </th>
              </tr>
              <tr className=" border-b-1 ">
                <th className="px-14 text-xs 3xl:text-sm border-r border-l">
                  <CDropdown>
                    <CDropdownToggle
                      caret={false}
                      className="border-none bg-white text-[#909AAA] font-semibold text-xs 3xl:text-sm hover:text-[#909AAA]">
                      Tentative
                      <i
                        className={`fa-solid fa-caret-${
                          isTentativeDropdownOpen ? "up" : "down"
                        }`}></i>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.tentative_budget === 1
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleTentativeBudgetSelection(1)}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          Below ₹1 Lakh
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.tentative_budget === 2
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleTentativeBudgetSelection(2)}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          ₹1 Lakh to 10 Lakh
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.tentative_budget === 3
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleTentativeBudgetSelection(3)}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          ₹10 Lakh to 50 Lakh
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.tentative_budget === 4
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleTentativeBudgetSelection(4)}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          ₹50 Lakh & Above
                        </p>
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.tentative_budget === null
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleTentativeBudgetSelection(null)}>
                        <p className="text-xs 3xl:text-sm font-medium">All</p>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </th>
                <th className="px-14 text-xs 3xl:text-sm border-r">
                  <button className="items-center">
                    Spent
                    {sortOrder === "asc" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm border-r border-l">
                  <CDropdown>
                    <CDropdownToggle
                      caret={false}
                      className="border-none bg-white text-[#909AAA] font-semibold text-xs 3xl:text-sm hover:text-[#909AAA]">
                      Expected{" "}
                      <i
                        className={`fa-solid fa-caret-${
                          isExpectedInfluencerDropdownOpen ? "up" : "down"
                        }`}></i>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.influencer_expected_id === 1
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleExpectedInfluencersSelection(1)}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          1-10 Influencer
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.influencer_expected_id === 2
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleExpectedInfluencersSelection(2)}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          11-20 Influencer
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.influencer_expected_id === 3
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleExpectedInfluencersSelection(3)}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          21-50 Influencer
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.influencer_expected_id === 4
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() => handleExpectedInfluencersSelection(4)}>
                        <p className="text-xs 3xl:text-sm font-medium">
                          50 & Above Influencer
                        </p>
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem
                        className={`select-none active:bg-[#4267b2] ${
                          filterConfig.influencer_expected_id === null
                            ? "bg-ri-blue text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleExpectedInfluencersSelection(null)
                        }>
                        <p className="text-xs 3xl:text-sm font-medium">
                          All Influencer
                        </p>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </th>
                <th className="px-14 text-xs 3xl:text-sm border-r">
                  <button className="items-center">
                    Collab
                    {sortOrder === "asc" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {campaignData.map((tableData, index) => (
                <tr key={index} className="w-full border-b-1">
                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.id}.
                    </p>
                  </td>

                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-4/12 flex justify-end pr-4">
                        <img
                          src={
                            tableData.campaign_product.product_images.length > 0
                              ? tableData.campaign_product.product_images[0]
                                  .img_url
                              : ""
                          }
                          alt=""
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                        />
                      </div>
                      <div className="w-8/12 items-center flex justify-start">
                        <p className="text-xs 3xl:text-sm font-medium">
                          {truncateName(tableData.campaign_name)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.marketer.brand_details.brand_name ? (
                        truncateName(
                          tableData.marketer.brand_details.brand_name
                        )
                      ) : (
                        <i className="fa-solid fa-minus"></i>
                      )}
                    </p>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.marketer.brand_details.industry ? (
                        truncateName(tableData.marketer.brand_details.industry)
                      ) : (
                        <i className="fa-solid fa-minus"></i>
                      )}
                    </p>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.tentative_budget.budget_description}
                    </p>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {/* {formatBudgetSpent(tableData.budget.spent)} */}
                      <i className="fa-solid fa-minus"></i>
                    </p>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <div
                      className={`py-1 px-2 rounded-md inline-block ${
                        tableData.status.toLowerCase() === "active"
                          ? "bg-[#4267B2]"
                          : tableData.status.toLowerCase() === "completed"
                          ? "bg-[#52AD60]"
                          : tableData.status.toLowerCase() === "under review"
                          ? "bg-[#FDC100]"
                          : "bg-gray-500" // Default color if status doesn't match any case
                      }`}>
                      <p className="text-[10px] 3xl:text-xs text-white">
                        {truncateName(tableData.status)}
                      </p>
                    </div>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {/* {formatReach(tableData.reach)} */}{" "}
                      <i className="fa-solid fa-minus"></i>
                    </p>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {/* {tableData.engagement}% */}{" "}
                      <i className="fa-solid fa-minus"></i>
                    </p>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.number_of_influencer.influencer_count_title}
                    </p>
                  </td>

                  <td className="whitespace-nowrap py-3">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {/* {tableData.influencers.coming} */}
                      {tableData.collaboration.applied ? (
                        tableData.collaboration.applied
                      ) : (
                        <i className="fa-solid fa-minus"></i>
                      )}
                    </p>
                  </td>
                  <td className="whitespace-nowrap py-3">
                    <CDropdown>
                      <CDropdownToggle className="bg-[#4267B2] border-0 text-white py-1 px-2 rounded-sm text-sm hover:bg-[#4267B2]">
                        Take Action
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2] hover:cursor-pointer "
                          onClick={() =>
                            navigate(`/admin-app/campaign/view/${tableData.id}`)
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            View Campaign
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2] hover:cursor-pointer "
                          onClick={() =>
                            navigate(
                              `/admin-app/campaign/collab/${tableData.id}`
                            )
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            View Collab List
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2] hover:cursor-pointer "
                          onClick={() => navigate("")}>
                          <p className="text-xs 3xl:text-sm font-medium">
                            Marketer Details
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

export default CampaignTableAM3;
