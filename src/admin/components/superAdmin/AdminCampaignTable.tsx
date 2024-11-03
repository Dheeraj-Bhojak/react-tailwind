import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import Select, { SingleValue } from "react-select";

import companyLogo from "../../../assets/img/companyLogo.jpg";
import profile from "../../../assets/img/profile.jpg";
import profile1 from "../../../assets/img/profile1.jpg";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import PaginationComponent from "../../../global/global_component/pagination/coreuiPagination.component";
import _ from "lodash";
import { FormDataContext } from "../../../utils/context/formData/formData.context";
import {
  accountManager,
  AccountManagerDataContext,
} from "../../../utils/context/formData/accountManager.context";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";

interface SelectStateOptionInterface {
  value: string;
  label: string;
}

interface SelectOptionInterface {
  value: number;
  label: string;
}

interface MarketerInterface {
  id: number;
  brand_details: {
    id: number;
    brand_name: string;
    designation: string;
    industry: null | string;
  };
}

interface pictureInterface {
  id: number;
  img_name: string;
  img_url: string | null;
}
interface am3Interface {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: pictureInterface | null;
  };
}

interface campaignInterface {
  id: number;
  campaign_name: string;
  status: string;
  marketer: MarketerInterface;
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
    response: number;
    hired: number;
  };
  AM3: am3Interface | null;
  campaign_picture: pictureInterface | null;
}

type tentativeBudgetType =
  | "All"
  | "Basic"
  | "Standard"
  | "Premium"
  | "Ultimate";

type influencerCountType = "1-10" | "11-20" | "21-50" | "51+" | "All";

type campaignStatusType = "Active" | "Complete" | "Under_Review" | "All";
type SortKey =
  | "id"
  | "campaign_name"
  | "spent_budget"
  | "engagement"
  | "collab";

type SortConfigInterface = {
  key: SortKey;
  orderBy: "ASC" | "DESC";
};

interface selectFilterConfigInterface {
  tentative: tentativeBudgetType;
  status: campaignStatusType;
  influencer_count: influencerCountType;
}

interface filterConfigInterface {
  campaign_id: number | null;
  status: string;
  am_id: number | null;
  influencer_expected: string;
  campaign_name: string;
  niche: number | null;
}

interface pageDataConfigInterface {
  page: number;
  limit: number;
}

const AdminCampaignTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [
    isExpectedInfluencerDropdownOpen,
    setIsExpectedInfluencerDropdownOpen,
  ] = useState(false);
  const [selectedExpectedInfluencers, setSelectedExpectedInfluencers] =
    useState("");
  const [showAmConfirmationModal, setShowAmConfirmationModal] = useState(false);
  const [fetchCampaignNow, setFetchCampaignNow] = useState<boolean>(false);

  const [am3ModalConfig, setAm3ModalConfig] = useState<{
    isModalOpen: boolean;
    campaignAMId: number;
    campaign_id: number;
  }>({
    isModalOpen: false,
    campaignAMId: 0,
    campaign_id: 0,
  });

  const handleTableDataRange = (range: number) => {
    setPageDataConfig((prev) => ({
      ...prev,
      limit: range,
    }));
  };

  const { amState } = useContext(AccountManagerDataContext);
  const { am3 } = amState;
  const moveToStartById = (
    amArray: accountManager[],
    targetId: number
  ): accountManager[] => {
    const targetIndex = amArray.findIndex((item) => item.id === targetId);

    if (targetIndex === -1) {
      console.log(`No object with id ${targetId} found.`);
      return amArray;
    }
    const [targetObject] = amArray.splice(targetIndex, 1);
    amArray.unshift(targetObject);
    return amArray;
  };

  const truncateName = (name: string) => {
    const capitalized = _.startCase(_.toLower(name));
    return _.truncate(capitalized, {
      length: 14,
      omission: "...",
    });
  };

  const handleShowAMModal = (id: number, campaign_id: number) => {
    setAm3ModalConfig({ isModalOpen: true, campaignAMId: id, campaign_id });
  };

  const handleCloseAMModal = () => {
    setAm3ModalConfig({ isModalOpen: false, campaignAMId: 0, campaign_id: 0 });
  };

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const headers = {
    authorization: `Bearer ${access_token}`,
  };

  const [campaignData, setCampaignData] = useState<campaignInterface[] | null>(
    []
  );

  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    key: "id",
    orderBy: "ASC",
  });

  const handleSortConfigChange = (key: SortKey) => {
    setSortConfig({
      key: key,
      orderBy: sortConfig.orderBy === "ASC" ? "DESC" : "ASC",
    });
  };

  const [filterConfig, setFilterConfig] = useState<filterConfigInterface>({
    campaign_id: null,
    status: "",
    am_id: null,
    influencer_expected: "",
    campaign_name: "",
    niche: null,
  });

  const [pageDataConfig, setPageDataConfig] = useState<pageDataConfigInterface>(
    { page: 1, limit: 12 }
  );

  const [selectFilterConfig, SetSelectFilterConfig] =
    useState<selectFilterConfigInterface>({
      tentative: "All",
      status: "All",
      influencer_count: "All",
    });

  const handleDropdownSelection = (
    value: string,
    key: keyof selectFilterConfigInterface
  ) => {
    SetSelectFilterConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  console.log("selectFilterConfig", selectFilterConfig);

  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });

  const [lastPage, setLastPage] = useState<number>(1);

  const fetchCampaignData = async () => {
    const campaignFetchApi = `${process.env.REACT_APP_API_URL}admin/campaigns`;
    const config = {
      headers,
      params: {
        ...sortConfig,
        ...filterConfig,
        ...pageDataConfig,
        ...selectFilterConfig,
      },
    };

    try {
      const { data } = await axios.get(campaignFetchApi, config);
      setCampaignData(data.campaign);
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
    fetchCampaignData();
  }, [fetchCampaignNow, sortConfig, pageDataConfig]);

  useEffect(() => {
    setPageDataConfig((prev) => ({
      ...prev,
      page: currentPage,
    }));
  }, [currentPage]);

  const { state } = useContext(FormDataContext);
  const { niche } = state;

  const nicheOptions = niche.map((nicheData) => ({
    value: nicheData.id,
    label: nicheData.niche_name,
  }));
  nicheOptions.unshift({ value: 0, label: "Select a Niche" });

  const handleSelectChange = (
    newValue: SingleValue<SelectOptionInterface>,
    key: keyof filterConfigInterface
  ) => {
    setFilterConfig((prev) => ({
      ...prev,
      [key]: newValue ? newValue.value : "",
    }));
  };

  const handleSearchCampaign = () => {
    setFetchCampaignNow(!fetchCampaignNow);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = ["campaign_id", "am_id"];
    setFilterConfig((prevState) => ({
      ...prevState,
      [name]: numericFields.includes(name)
        ? value === "" || isNaN(Number(value))
          ? null
          : Number(value)
        : value,
    }));
  };

  const [assignedAccountManager, setAssignedAccountManager] = useState<{
    campaign_id: number;
    AM3_id: number;
  }>({
    campaign_id: 0,
    AM3_id: 0,
  });

  const handleShowAMConfirmationModal = (
    campaign_id: number,
    AM3_id: number
  ) => {
    console.log("campaignData", campaign_id);
    console.log("AM3_id", AM3_id);
    setAssignedAccountManager(() => ({
      campaign_id,
      AM3_id,
    }));
    setShowAmConfirmationModal(true);
  };

  const handleCloseAMConfirmationModal = () => {
    setAssignedAccountManager(() => ({
      campaign_id: 0,
      AM3_id: 0,
    }));
    setShowAmConfirmationModal(false);
  };

  const assignNewCampaignAccountManager = async () => {
    const assignNewAM3Api = `${process.env.REACT_APP_API_URL}admin/assign-campaign-am`;
    try {
      const { data, status } = await axios.post(
        assignNewAM3Api,
        assignedAccountManager,
        { headers }
      );
      const { message, theme } = CallToast(status, data.message);
      setResponseToast(() => ({
        message,
        theme,
        showToast: true,
      }));
      setTimeout(() => {
        setResponseToast((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
      handleSearchCampaign();
      handleCloseAMModal();
      handleCloseAMConfirmationModal();
    } catch (error: any) {
      console.log("error", error);
      const { status, data } = error.response;
      const { message, theme } = CallToast(status, data.message);
      setResponseToast(() => ({
        message,
        theme,
        showToast: true,
      }));
      handleCloseAMConfirmationModal();
      setTimeout(() => {
        setResponseToast((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
    }
  };

  return (
    <Fragment>
      {responseToast.showToast ? (
        <ToastNotification
          message={responseToast.message}
          theme={responseToast.theme}
        />
      ) : (
        ""
      )}
      <div className="bg-[#EBEBEB] h-full p-3">
        <div className="bg-white py-4 px-2 rounded-md mb-3">
          <div className="flex flex-col xl:flex-row">
            <div className="flex justify-around w-full mb-2">
              <input
                type="text"
                name="campaign_id"
                onChange={handleChangeInput}
                value={
                  filterConfig.campaign_id !== null
                    ? filterConfig.campaign_id
                    : ""
                }
                className="rounded-[4px] h-8 text-sm px-2 w-48 mr-1 bg-[#EBEBEB] custom-input"
                placeholder="Id"
              />
              <input
                type="text"
                name="campaign_name"
                onChange={handleChangeInput}
                className="rounded-[4px] h-8 text-sm px-2 w-48 mr-1 bg-[#EBEBEB] custom-input"
                placeholder="Name"
                value={
                  filterConfig.campaign_name !== null
                    ? filterConfig.campaign_name
                    : ""
                }
              />
              <Select
                placeholder="Niche"
                className="rounded-[4px] h-8 text-sm px-2 w-48 mr-1 bg-[#EBEBEB] custom-input"
                options={nicheOptions}
                onChange={(newValue) => handleSelectChange(newValue, "niche")}
                styles={{
                  control: (baseStyles, state) => ({
                    backgroundColor: "#EBEBEB",
                    height: "2rem",
                    border: "none",
                    fontSize: "14px",
                  }),
                }}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null,
                }}
              />
              <input
                type="text"
                name="am_id"
                value={filterConfig.am_id !== null ? filterConfig.am_id : ""}
                className="rounded-[4px] h-8 text-sm px-2 w-48 mr-1 bg-[#EBEBEB] custom-input"
                placeholder="AM"
                onChange={handleChangeInput}
              />
            </div>
            <div className="flex justify-around w-full 2xl:w-1/2  ">
              <button
                className="bg-ri-orange rounded-[4px] w-20 h-7"
                // onClick={resetSearchFilter}
              >
                <p className="text-white text-sm ">Reset</p>
              </button>
              <button
                className="bg-[#4267B2] rounded-[4px] w-20"
                onClick={handleSearchCampaign}>
                <p className="text-white text-sm ">Search</p>
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white py-2 rounded-md">
          <div className="border-b-2 flex justify-between px-16 items-center">
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
                      {pageDataConfig.limit}
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
                      onClick={() => handleTableDataRange(50)}>
                      <p className="text-xs 3xl:text-sm font-medium">50</p>
                    </CDropdownItem>
                  </CDropdownMenu>
                </CDropdown>
              </div>
            </div>
          </div>
          <div className="text-center overflow-x-scroll w-full">
            <table className="w-full">
              <thead>
                <tr className="table-row-border">
                  <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                    <button
                      onClick={() => handleSortConfigChange("id")}
                      className="items-center">
                      id
                      {sortConfig.key === "id" &&
                      sortConfig.orderBy === "ASC" ? (
                        <i className="fa-solid fa-caret-down ml-1"></i>
                      ) : (
                        <i className="fa-solid fa-caret-up ml-1"></i>
                      )}
                    </button>
                  </th>
                  <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                    <button
                      onClick={() => handleSortConfigChange("campaign_name")}
                      className="items-center">
                      Campaign Name
                      {sortConfig.key === "campaign_name" &&
                      sortConfig.orderBy === "ASC" ? (
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
                    className="px-14 text-xs 3xl:text-sm border-r py-2 border-l"
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
                          className="select-none active:bg-[#4267b2]"
                          onClick={() =>
                            handleDropdownSelection("active", "status")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            Active
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2]"
                          onClick={() =>
                            handleDropdownSelection("completed", "status")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            Completed
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2]"
                          onClick={() =>
                            handleDropdownSelection("under review", "status")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            Under Review
                          </p>
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2]"
                          onClick={() => handleDropdownSelection("", "status")}>
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
                    Assigned To
                  </th>
                  <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                    Action
                  </th>
                </tr>
                <tr className="table-row-border">
                  <th className="px-14 text-xs 3xl:text-sm border-r border-l">
                    <CDropdown>
                      <CDropdownToggle
                        caret={false}
                        className="border-none bg-white text-black font-semibold text-xs 3xl:text-sm hover:text-[#909AAA]">
                        Tentative
                        <i className={`fa-solid fa-caret-up`}></i>
                      </CDropdownToggle>
                      <CDropdownMenu>
                        <CDropdownItem
                          className={`select-none active:bg-[#4267b2] ${
                            selectFilterConfig.tentative === "Basic"
                              ? "bg-ri-blue text-white"
                              : ""
                          }`}
                          onClick={() =>
                            handleDropdownSelection("Basic", "tentative")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            Below ₹1 Lakh
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className={`select-none active:bg-[#4267b2] ${
                            selectFilterConfig.tentative === "Standard"
                              ? "bg-ri-blue text-white"
                              : ""
                          }`}
                          onClick={() =>
                            handleDropdownSelection("Standard", "tentative")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            ₹1 Lakh to 10 Lakh
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className={`select-none active:bg-[#4267b2] ${
                            selectFilterConfig.tentative === "Premium"
                              ? "bg-ri-blue text-white"
                              : ""
                          }`}
                          onClick={() =>
                            handleDropdownSelection("Premium", "tentative")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            ₹10 Lakh to 50 Lakh
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className={`select-none active:bg-[#4267b2] ${
                            selectFilterConfig.tentative === "Ultimate"
                              ? "bg-ri-blue text-white"
                              : ""
                          }`}
                          onClick={() =>
                            handleDropdownSelection("Ultimate", "tentative")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            ₹50 Lakh & Above
                          </p>
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem
                          className={`select-none active:bg-[#4267b2] ${
                            selectFilterConfig.tentative === "All"
                              ? "bg-ri-blue text-white"
                              : ""
                          }`}
                          onClick={() =>
                            handleDropdownSelection("All", "tentative")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">All</p>
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </th>
                  <th className="px-14 text-xs 3xl:text-sm border-r">
                    <button
                      onClick={() => handleSortConfigChange("spent_budget")}
                      className="items-center">
                      Spent
                      {sortConfig.key === "spent_budget" &&
                      sortConfig.orderBy === "ASC" ? (
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
                          className="select-none active:bg-[#4267b2]"
                          onClick={() =>
                            handleDropdownSelection("1-10", "influencer_count")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            1-10 Influencer
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2]"
                          onClick={() =>
                            handleDropdownSelection("11-20", "influencer_count")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            11-20 Influencer
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2]"
                          onClick={() =>
                            handleDropdownSelection("21-50", "influencer_count")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            21-50 Influencer
                          </p>
                        </CDropdownItem>
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2]"
                          onClick={() =>
                            handleDropdownSelection(
                              "50 & Above",
                              "influencer_count"
                            )
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">
                            50 & Above
                          </p>
                        </CDropdownItem>
                        <CDropdownDivider />
                        <CDropdownItem
                          className="select-none active:bg-[#4267b2]"
                          onClick={() =>
                            handleDropdownSelection("", "influencer_count")
                          }>
                          <p className="text-xs 3xl:text-sm font-medium">All</p>
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </th>
                  <th className="px-14 text-xs 3xl:text-sm border-r">
                    <button
                      onClick={() => handleSortConfigChange("collab")}
                      className="items-center">
                      Coming
                      {sortConfig.key === "collab" &&
                      sortConfig.orderBy === "ASC" ? (
                        <i className="fa-solid fa-caret-down ml-1"></i>
                      ) : (
                        <i className="fa-solid fa-caret-up ml-1"></i>
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaignData &&
                  campaignData.map((tableData, index) => (
                    <tr key={index} className="w-full table-row-border">
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
                                tableData.campaign_picture &&
                                tableData.campaign_picture.img_url
                                  ? tableData.campaign_picture.img_url
                                  : ""
                              }
                              alt={
                                tableData.campaign_picture &&
                                tableData.campaign_picture.img_name
                                  ? tableData.campaign_picture.img_name
                                  : ""
                              }
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
                          {truncateName(
                            tableData.marketer.brand_details.brand_name
                          )}
                        </p>
                      </td>

                      <td className="whitespace-nowrap py-3">
                        <p className="text-xs 3xl:text-sm font-medium">
                          {tableData.marketer.brand_details.industry !==
                          null ? (
                            truncateName(
                              tableData.marketer.brand_details.industry
                            )
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
                          {/* {formatBudgetSpent(tableData.budget.spetn)} */}
                          <i className="fa-solid fa-minus"></i>
                        </p>
                      </td>

                      <td className="whitespace-nowrap py-3">
                        <div
                          className={`py-1 px-2 rounded-md inline-block ${
                            tableData.status.toLocaleLowerCase() === "active"
                              ? "bg-[#4267B2]"
                              : tableData.status.toLocaleLowerCase() ===
                                "completed"
                              ? "bg-[#52AD60]"
                              : tableData.status.toLocaleLowerCase() ===
                                "under review"
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
                          {/* {formatReach(tableData.reach)} */}
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
                          {
                            tableData.number_of_influencer
                              .influencer_count_title
                          }
                        </p>
                      </td>

                      <td className="whitespace-nowrap py-3">
                        <p className="text-xs 3xl:text-sm font-medium">
                          {tableData.collaboration.response ? (
                            tableData.collaboration.response
                          ) : (
                            <i className="fa-solid fa-minus"></i>
                          )}
                        </p>
                      </td>

                      <td className="py-3 whitespace-nowrap">
                        {tableData.AM3 ? (
                          <div className="flex items-center">
                            <div className="w-3/12 flex justify-end">
                              <img
                                src={
                                  tableData.AM3.user.profile_picture &&
                                  tableData.AM3.user.profile_picture.img_url
                                    ? tableData.AM3.user.profile_picture.img_url
                                    : ""
                                }
                                alt={
                                  tableData.AM3.user.profile_picture &&
                                  tableData.AM3.user.profile_picture.img_name
                                    ? tableData.AM3.user.profile_picture
                                        .img_name
                                    : ""
                                }
                                className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                              />
                            </div>
                            <div className="w-9/12 items-center flex pl-5">
                              <p className="text-xs 3xl:text-sm font-medium">
                                {`${
                                  tableData.AM3.user &&
                                  tableData.AM3.user.last_name
                                    ? `${tableData.AM3.user.first_name} ${tableData.AM3.user.last_name}`
                                    : `${tableData.AM3.user.first_name}`
                                }`}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <button
                            className="bg-ri-blue rounded-md px-2 text-white "
                            onClick={() => handleShowAMModal(0, tableData.id)}>
                            Assign A New AM
                          </button>
                        )}
                      </td>
                      <td className="py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleShowAMModal(
                                tableData.AM3 && tableData.AM3.id
                                  ? tableData.AM3.id
                                  : 0,
                                tableData.id
                              )
                            }>
                            <i className="fa-solid fa-ellipsis-vertical ml-3"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {am3ModalConfig.isModalOpen && (
              <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-3 rounded-md w-6/12 ">
                  <div className="flex justify-between">
                    <p className="text-lg font-semibold">Account Manager</p>
                    <button onClick={handleCloseAMModal}>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>

                  <div className="flex w-full gap-2 mt-3">
                    <input
                      type="search"
                      placeholder="Search Id"
                      className="w-5/12 p-1 text-xs 3xl:text-sm rounded-md border-1 custom-input"
                    />
                    <input
                      type="search"
                      placeholder="Search Name"
                      className="w-5/12 p-1 text-xs 3xl:text-sm rounded-md border-1 custom-input"
                    />
                    <button className="bg-[#4267B2] w-2/12 text-xs 3xl:text-sm rounded-md text-white">
                      Search
                    </button>
                  </div>

                  <div className="mt-2 max-h-[300px] 3xl:max-h-80 overflow-scroll">
                    {moveToStartById(am3, am3ModalConfig.campaignAMId).map(
                      (accountManager, index) => (
                        <div
                          className=" flex items-center justify-between p-3 border-b-1 "
                          key={index}>
                          <div className="flex items-center">
                            <img
                              src={accountManager.user.profile_picture?.img_url}
                              className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                              alt=""
                            />
                            <div className="ml-3 flex flex-col 3xl:flex-row 3xl:items-baseline">
                              <p className="font-sm 3xl:font-base font-medium text-left">
                                {truncateName(
                                  `${accountManager.user.first_name}  ${accountManager.user.last_name}`
                                )}
                              </p>
                              {/* <p className="text-xs ml-0 3xl:ml-1 font-medium text-[#787575]">
                            (Active Campaign: {accountManager.activeCampaign})
                          </p> */}
                            </div>
                          </div>
                          <button
                            className={`flex py-1 px-2 rounded-md ${
                              accountManager.id === am3ModalConfig.campaignAMId
                                ? "bg-[#52AD60]"
                                : "bg-[#B1B1B1]"
                            } `}
                            onClick={() =>
                              handleShowAMConfirmationModal(
                                am3ModalConfig.campaign_id,
                                accountManager.id
                              )
                            }
                            disabled={
                              accountManager.id === am3ModalConfig.campaignAMId
                            }>
                            <p className="text-[10px] 3xl:text-xs text-white">
                              {accountManager.id === am3ModalConfig.campaignAMId
                                ? "Assigned"
                                : "Assign to"}
                            </p>
                          </button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
            {showAmConfirmationModal && (
              <div className=" z-20  fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-3 rounded-md w-60">
                  <h1 className="font-medium border-b-1 border-[#555]">
                    ARE YOU SURE?
                  </h1>
                  <p className=" text-sm text-left">
                    Assign a New Account manager
                  </p>
                  <div className="flex items-center justify-center gap-5 mt-3">
                    <button
                      className="bg-[#4267B2] py-1 px-3 rounded-md text-white"
                      onClick={assignNewCampaignAccountManager}>
                      Yes
                    </button>
                    <button
                      className="bg-[#FDC100] py-1 px-3 rounded-md text-white"
                      onClick={handleCloseAMConfirmationModal}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminCampaignTable;
