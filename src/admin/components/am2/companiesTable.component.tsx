import React, { Fragment, useContext, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import axios from "axios";
import _ from "lodash";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import { FormDataContext } from "../../../utils/context/formData/formData.context";
import PaginationComponent from "../../../global/global_component/pagination/coreuiPagination.component";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import FiveStarComponent from "../fiveStar.component";

const reviewSectionData = [
  {
    reviewButtonTitle: "campaign expectations",
    reviewSubText:
      "Objectives, Clear Guidelines, Innovative Campaign Strategies",
    reviewText: "",
    rating: 0,
  },
  {
    reviewButtonTitle: "compensation",
    reviewSubText:
      "Transparent Payment Terms, Fair Budget & Resources Allocations",
    reviewText: "",
    rating: 0,
  },
  {
    reviewButtonTitle: "long term relationships",
    reviewSubText: "Scalability, Future Campaign Opportunities",
    reviewText: "",
    rating: 0,
  },
  {
    reviewButtonTitle: "brand reputations",
    reviewSubText:
      "Industry Recognition, Ethical Business Practice, Positive Experience",
    reviewText: "",
    rating: 0,
  },
];

export interface ratingReviewInterface {
  reviewButtonTitle: string;
  reviewSubText: string;
  reviewText: string;
  rating: number;
}

interface NicheOptionInterface {
  value: number;
  label: string;
}

interface imagePicture {
  id: number;
  img_name: string;
  img_url: string;
}

export interface SortConfigInterface {
  key: string;
  orderBy: "ASC" | "DESC";
}

export interface FilterConfigInterface {
  marketer_id: number | null;
  name: string;
  niche_id: number | null;
  page: number;
  limit: number;
}

interface MarketerDataInterface {
  id: number;
  profile_completion: number;
  user: {
    id: 1;
    first_name: string;
    last_name: string;
    profile_picture: {
      id: 18;
      img_name: string;
      img_url: null;
      is_active: true;
    };
  };
  company_logo: {
    id: 18;
    img_name: string;
    img_url: null;
    is_active: true;
  } | null;
  brand_details: {
    id: 1;
    brand_name: string;
    designation: string;
    industry: string | null;
    brand_website: string | null;
    niche_category: {
      id: 6;
      niche_name: string;
    };
  };
  campaign_count: {
    active_campaign: number;
    completed_campaigns: number;
  };
}

const MarketerTable: React.FC = () => {
  const [reviewRating, setReviewRating] =
    useState<ratingReviewInterface[]>(reviewSectionData);
  const [lastPage, setLastPage] = useState<number>(0);

  const [reviewText, setReviewText] = useState<string>("");
  const [selectedRowAssignTag, setSelectedRowAssignTag] = useState<{
    marketerName: string;
    MarketerProfile: string;
    isModalActive: boolean;
    marketerId: number | null;
    tag: string;
  }>({
    marketerName: "",
    MarketerProfile: "",
    isModalActive: false,
    marketerId: null,
    tag: "",
  });

  const [selectedRowReview, setSelectedRowReview] = useState<{
    marketerName: string;
    MarketerProfile: string;
    isModalActive: boolean;
    marketerId: number | null;
  }>({
    marketerName: "",
    MarketerProfile: "",
    isModalActive: false,
    marketerId: null,
  });

  const [nicheOptions, setNicheOptions] = useState<NicheOptionInterface[]>([]);
  const [marketerData, setMarketerData] = useState<
    MarketerDataInterface[] | null
  >(null);

  const [apiFetchCall, setApiFetchCall] = useState<boolean>(false);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });
  const [filterConfig, setFilterConfig] = useState<FilterConfigInterface>({
    marketer_id: null,
    name: "",
    niche_id: null,
    page: 1,
    limit: 6,
  });

  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    key: "id",
    orderBy: "DESC",
  });

  // const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedTag(event.target.value);
  // };
  const { state } = useContext(FormDataContext);
  const { niche } = state;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const headers = {
    authorization: `Bearer ${access_token}`,
  };
  const fetchMarketerTableData = async () => {
    const marketerTableData = `${process.env.REACT_APP_API_URL}admin/am2/marketer`;
    const config = {
      headers,
      params: { ...sortConfig, ...filterConfig },
    };
    try {
      const { data } = await axios.get(marketerTableData, config);
      setMarketerData(data.marketerData);
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
    } finally {
      setTableLoading(false);
    }
  };

  const searchTableDataApiCall = () => {
    setSortConfig(() => ({
      key: "id",
      orderBy: "DESC",
    }));
    setApiFetchCall(!apiFetchCall);
  };

  useEffect(() => {
    fetchMarketerTableData();
  }, [apiFetchCall, sortConfig]);

  useEffect(() => {
    if (niche && Array.isArray(niche)) {
      const Options = niche.map((nicheData) => ({
        value: nicheData.id,
        label: nicheData.niche_name,
      }));
      setNicheOptions(Options);
    }
  }, [niche]);

  const fetchMarketerTag = async (id: number) => {
    const getMarketerTagApi = `${process.env.REACT_APP_API_URL}admin/am2/tag/${id}`;
    try {
      const { data } = await axios.get(getMarketerTagApi, { headers });
      setSelectedRowAssignTag((prev) => ({
        ...prev,
        tag: data.company_size,
      }));
    } catch (error: any) {
      console.log(error.response.data);
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

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedRowAssignTag((prev) => ({
      ...prev,
      tag: e.target.value,
    }));
  };

  const handleShowAssignTagModal = (
    companyName: string,
    profilePic: string,
    marketerId: number
  ) => {
    fetchMarketerTag(marketerId);
    setSelectedRowAssignTag((prev) => ({
      ...prev,
      marketerName: companyName,
      MarketerProfile: profilePic,
      isModalActive: true,
      marketerId,
    }));
  };
  const handleHideAssignTagModal = () => {
    setSelectedRowAssignTag((prev) => ({
      marketerName: "",
      MarketerProfile: "",
      isModalActive: false,
      marketerId: null,
      tag: "",
    }));
  };

  const handleShowReviewModal = (
    id: number,
    name: string,
    profilePic: string
  ) => {
    setSelectedRowReview(() => ({
      marketerName: name,
      MarketerProfile: profilePic,
      isModalActive: true,
      marketerId: id,
    }));
  };

  const handleHideReviewModal = () => {
    setSelectedRowReview(() => ({
      marketerName: "",
      MarketerProfile: "",
      isModalActive: false,
      marketerId: null,
    }));
  };
  const truncateName = (name: string) => {
    return _.truncate(_.startCase(name.toLowerCase()), {
      length: 17,
      omission: "...",
    });
  };

  const handleAssignTagSubmitBtn = async (tagAssignTo: number | null) => {
    if (tagAssignTo !== null) {
      console.log("?tagAssignTo", tagAssignTo);
      const marketerAssignTagApi = `${process.env.REACT_APP_API_URL}admin/am2/assign-tag`;
      const headers = {
        authorization: `Bearer ${access_token}`,
      };
      try {
        const { data, status } = await axios.post(
          marketerAssignTagApi,
          { tag: selectedRowAssignTag.tag, assign_to: tagAssignTo },
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
      } catch (error: any) {
        const { status, data } = error.response;
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
      }
      handleHideAssignTagModal();
    }
  };
  const handleSortChange = (sortKey: string) => {
    setSortConfig((prev) => ({
      ...prev,
      key: sortKey,
      orderBy: prev.orderBy === "ASC" ? "DESC" : "ASC",
    }));
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
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

  const handleSelectChange = (newValue: SingleValue<NicheOptionInterface>) => {
    setFilterConfig((prevState) => ({
      ...prevState,
      niche_id: newValue ? newValue.value : null,
    }));
  };

  const handleDataPerPage = (key: string, value: number) => {
    setFilterConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleUpdateRatingMessageData = (
    index: number,
    ratingMessage: string
  ) => {
    setReviewRating((prev) => {
      const newRatings = [...prev];
      newRatings[index] = { ...newRatings[index], reviewText: ratingMessage };
      return newRatings;
    });
  };

  useEffect(() => {
    setFilterConfig((prev) => ({
      ...prev,
      page: currentPage,
    }));
  }, [currentPage]);

  const postReview = async () => {
    const postReviewApi = `${process.env.REACT_APP_API_URL}admin/am2/review_marketer`;

    try {
      const { data } = await axios.post(postReviewApi, { headers });
    } catch (error) {}
  };

  const handleSubmitReview = () => {};

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
        <div className="bg-white rounded-md py-4 px-2 mb-3">
          <div className="flex justify-evenly">
            <input
              type="text"
              placeholder="Id"
              name="marketer_id"
              value={
                filterConfig.marketer_id !== null
                  ? filterConfig.marketer_id.toString()
                  : ""
              }
              onChange={handleInputChange}
              className="rounded-[4px] h-8 text-sm px-3 w-2/12 2xl:w-60  bg-[#EBEBEB] custom-input"
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={filterConfig.name}
              onChange={handleInputChange}
              className="rounded-[4px] h-8 text-sm px-3 w-2/12 2xl:w-60  bg-[#EBEBEB] custom-input"
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

            <button
              className="bg-[#4267B2] text-white rounded-[4px] w-2/12 2xl:w-60"
              onClick={searchTableDataApiCall}>
              search
            </button>
            <button className="bg-[#FDC100] text-white rounded-[4px] w-2/12 2xl:w-60">
              Clear
            </button>
          </div>
        </div>
        <div className="bg-white rounded-md py-2">
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
                      {filterConfig.limit}
                    </span>
                  </CDropdownToggle>
                  <CDropdownMenu>
                    <CDropdownItem
                      className="select-none active:bg-[#4267b2]"
                      onClick={() => handleDataPerPage("limit", 6)}>
                      <p className="text-xs 3xl:text-sm font-medium">
                        <span className="text-sm font-bold">6</span> Data Per
                        Row
                      </p>
                    </CDropdownItem>
                    <CDropdownItem
                      className="select-none border active:bg-[#4267b2]"
                      onClick={() => handleDataPerPage("limit", 12)}>
                      <p className="text-xs 3xl:text-sm font-medium">
                        <span className="text-sm font-bold"> 12</span> Data Per
                        Row
                      </p>
                    </CDropdownItem>
                    <CDropdownItem
                      className="select-none active:bg-[#4267b2]"
                      onClick={() => handleDataPerPage("limit", 20)}>
                      <p className="text-xs 3xl:text-sm font-medium">
                        <span className="text-sm font-bold"> 20</span>
                        Data Per Row
                      </p>
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
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm"
                    rowSpan={2}>
                    Id
                  </th>
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm"
                    rowSpan={2}>
                    <button
                      onClick={() => handleSortChange("first_name")}
                      className="items-center">
                      Name
                      {sortConfig.key === "first_name" &&
                      sortConfig.orderBy === "ASC" ? (
                        <i className="fa-solid fa-caret-down ml-1"></i>
                      ) : (
                        <i className="fa-solid fa-caret-up ml-1"></i>
                      )}
                    </button>
                  </th>
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm"
                    rowSpan={2}>
                    Company
                  </th>
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm"
                    rowSpan={2}>
                    Designation
                  </th>
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm"
                    rowSpan={2}>
                    Industry
                  </th>
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm"
                    rowSpan={2}>
                    Niche
                  </th>
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm"
                    rowSpan={2}>
                    <button
                      onClick={() => handleSortChange("profile_completed")}
                      className="items-center">
                      Profile Completed
                      {sortConfig.key === "profile_completed" &&
                      sortConfig.orderBy === "ASC" ? (
                        <i className="fa-solid fa-caret-down ml-1"></i>
                      ) : (
                        <i className="fa-solid fa-caret-up ml-1"></i>
                      )}
                    </button>
                  </th>
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm border-x"
                    colSpan={2}>
                    Campaigns
                  </th>
                  <th
                    className="px-14 table-heading text-xs 3xl:text-sm"
                    rowSpan={2}>
                    Action
                  </th>
                </tr>
                <tr className="border-b-1">
                  <th className="px-14 table-heading text-xs 3xl:text-sm border-l">
                    Active
                  </th>
                  <th className="px-14 table-heading text-xs 3xl:text-sm border-x">
                    Completed
                  </th>
                </tr>
              </thead>
              <tbody>
                {marketerData &&
                  marketerData.map((tableData, index) =>
                    tableData.user ? (
                      <tr key={index} className="w-full border-b-1">
                        <td className="whitespace-nowrap py-3">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.id}.
                          </p>
                        </td>

                        <td className=" py-3">
                          <div className="flex items-center">
                            <div className="w-3/12 flex justify-start">
                              <img
                                src={
                                  tableData.user.profile_picture &&
                                  tableData.user.profile_picture.img_url
                                    ? tableData.user.profile_picture.img_url
                                    : ""
                                }
                                alt=""
                                className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                              />
                            </div>
                            <div className="w-9/12 items-center flex justify-start">
                              <p className="text-xs 3xl:text-sm font-medium">
                                {truncateName(
                                  tableData.user.first_name
                                    .charAt(0)
                                    .toUpperCase() +
                                    tableData.user.first_name.slice(1) +
                                    " " +
                                    tableData.user.last_name
                                      .charAt(0)
                                      .toUpperCase() +
                                    tableData.user.last_name.slice(1)
                                )}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className=" whitespace-nowrap py-3">
                          <div className="flex items-center">
                            <div className="w-3/12 flex justify-start">
                              <img
                                src={
                                  tableData.company_logo &&
                                  tableData.company_logo.img_url
                                    ? tableData.company_logo.img_url
                                    : ""
                                }
                                alt=""
                                className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                              />
                            </div>
                            <div className="w-9/12 items-center flex">
                              <p className="text-xs 3xl:text-sm font-medium">
                                {tableData.brand_details &&
                                tableData.brand_details.brand_name ? (
                                  truncateName(
                                    _.capitalize(
                                      tableData.brand_details.brand_name
                                    )
                                  )
                                ) : (
                                  <i className="fa-solid fa-minus"></i>
                                )}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className=" whitespace-nowrap py-3">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.brand_details &&
                            tableData.brand_details.designation ? (
                              truncateName(
                                _.capitalize(
                                  tableData.brand_details.designation
                                )
                              )
                            ) : (
                              <i className="fa-solid fa-minus"></i>
                            )}
                          </p>
                        </td>

                        <td className=" whitespace-nowrap py-3">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.brand_details &&
                            tableData.brand_details.industry ? (
                              truncateName(
                                _.capitalize(tableData.brand_details.industry)
                              )
                            ) : (
                              <i className="fa-solid fa-minus"></i>
                            )}
                          </p>
                        </td>
                        <td className=" whitespace-nowrap py-3">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.brand_details &&
                            tableData.brand_details.niche_category &&
                            tableData.brand_details.niche_category
                              .niche_name ? (
                              truncateName(
                                _.capitalize(
                                  tableData.brand_details.niche_category
                                    .niche_name
                                )
                              )
                            ) : (
                              <i className="fa-solid fa-minus"></i>
                            )}
                          </p>
                        </td>
                        <td className=" whitespace-nowrap py-3 flex items-center justify-center">
                          <div className="w-10 h-10">
                            <CircularProgressbar
                              value={tableData.profile_completion}
                              text={`${tableData.profile_completion}%`}
                              styles={buildStyles({
                                textSize: "20px",
                                textColor:
                                  tableData.profile_completion < 50
                                    ? "#DB6261"
                                    : tableData.profile_completion <= 75
                                    ? "#FDC100"
                                    : tableData.profile_completion < 100
                                    ? "#4267B2"
                                    : "#52AD60",
                                pathColor:
                                  tableData.profile_completion < 50
                                    ? "#DB6261"
                                    : tableData.profile_completion <= 75
                                    ? "#FDC100"
                                    : tableData.profile_completion < 100
                                    ? "#4267B2"
                                    : "#52AD60",
                                trailColor: "#EAEAEA",
                                strokeLinecap: "butt",
                                rotation: 0.5,
                                pathTransitionDuration: 0.5,
                              })}
                            />
                          </div>
                        </td>
                        <td className=" whitespace-nowrap py-3">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.campaign_count &&
                              tableData.campaign_count.active_campaign}
                          </p>
                        </td>
                        <td className=" whitespace-nowrap py-3">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.campaign_count &&
                              tableData.campaign_count.completed_campaigns}
                          </p>
                        </td>
                        <td>
                          <CDropdown>
                            <CDropdownToggle className="bg-[#4267B2] border-0 text-white py-1 px-2 rounded-sm text-sm hover:bg-[#4267B2]">
                              Take Action
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem className="select-none active:bg-[#4267b2]">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  Call
                                </p>
                              </CDropdownItem>
                              <CDropdownItem className="select-none active:bg-[#4267b2]">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  Email
                                </p>
                              </CDropdownItem>
                              <CDropdownItem className="select-none active:bg-[#4267b2]">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  Message
                                </p>
                              </CDropdownItem>
                              <CDropdownDivider />
                              <CDropdownItem
                                className="select-none active:bg-[#4267b2]"
                                onClick={() =>
                                  handleShowReviewModal(
                                    tableData.id,
                                    tableData.user.first_name,
                                    tableData.user.profile_picture &&
                                      tableData.user.profile_picture.img_url
                                      ? tableData.user.profile_picture.img_url
                                      : ""
                                  )
                                }>
                                <p className="text-xs 3xl:text-sm font-medium">
                                  Give Review
                                </p>
                              </CDropdownItem>
                              <CDropdownItem
                                className="select-none active:bg-[#4267b2]"
                                onClick={() =>
                                  handleShowAssignTagModal(
                                    tableData.user.first_name,
                                    tableData.user.profile_picture &&
                                      tableData.user.profile_picture.img_url
                                      ? tableData.user.profile_picture.img_url
                                      : "",
                                    tableData.id
                                  )
                                }>
                                <p className="text-xs 3xl:text-sm font-medium">
                                  Assign Tag
                                </p>
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </td>
                      </tr>
                    ) : (
                      ""
                    )
                  )}
              </tbody>
            </table>

            {selectedRowReview.isModalActive && (
              <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-3 rounded-md mt-20 3xl:mt-0 w-7/12 3xl:w-6/12">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={selectedRowReview.MarketerProfile}
                        className="rounded-full w-7 h-7 mr-2"
                        alt=""
                      />
                      <p className="text-lg font-semibold">
                        Give Review for{" "}
                        {_.startCase(_.toLower(selectedRowReview.marketerName))}
                      </p>
                    </div>
                    <button onClick={handleHideReviewModal}>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>
                  <div className="mt-[4px] 3xl:mt-2 overflow-scroll">
                    <div className="pb-2">
                      {reviewRating.map((reviewSection, index) => (
                        <div
                          key={index}
                          className="3xl:mt-2 items-start lg:items-center lg:flex mx-auto mt-6">
                          <div className="w-5/12 ">
                            <div className="flex items-center">
                              <div className="bg-[#4267B2] py-1 px-2 rounded-md text-white text-[10px] 3xl:text-sm inline-block">
                                <p>
                                  {_.startCase(
                                    _.toLower(reviewSection.reviewButtonTitle)
                                  )}
                                </p>
                              </div>
                              <div className="ml-3">
                                <FiveStarComponent
                                  rating={reviewSection.rating}
                                  setReviewRating={setReviewRating}
                                  index={index}
                                />
                              </div>
                            </div>
                            <div className="mt-2 flex items-start">
                              <p className="text-[10px] 3xl:text-sm text-start">
                                ( {reviewSection.reviewSubText} )
                              </p>
                            </div>
                          </div>
                          <div className="w-7/12 flex items-center">
                            <div className="w-9/12">
                              <p className="font-medium text-[10px] 3xl:text-sm">
                                Write a review
                              </p>
                              <textarea
                                maxLength={512}
                                value={reviewSection.reviewText}
                                onChange={(e) =>
                                  handleUpdateRatingMessageData(
                                    index,
                                    e.target.value
                                  )
                                }
                                className="resize-none w-full rounded-md text-sm px-2 border-1 custom-input"></textarea>
                            </div>

                            <div className="w-3/12">
                              <button
                                className="bg-[#fdc100] text-white mx-auto py-1 px-3 rounded-md flex items-center justify-center text-[10px] 3xl:text-sm h-6 3xl:h-8"
                                onClick={() => handleSubmitReview()}>
                                Submit
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedRowAssignTag.isModalActive && (
              <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white p-3 rounded-md w-7/12 3xl:w-6/12">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <img
                        src={selectedRowAssignTag.MarketerProfile}
                        className="rounded-full w-7 h-7 mr-2"
                        alt=""
                      />
                      <p className="text-lg font-semibold">
                        Assign Tag for
                        {_.startCase(
                          _.toLower(selectedRowAssignTag.marketerName)
                        )}
                      </p>
                    </div>
                    <button onClick={handleHideAssignTagModal}>
                      <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                  </div>
                  <div className="mt-2">
                    <div className="border-b-1 py-3 flex justify-evenly">
                      <label className="flex items-center">
                        <i className="fa-solid fa-house mr-2 text-[#4267B2]"></i>
                        <input
                          type="radio"
                          name="myRadio"
                          value="small_business"
                          className="mr-2"
                          checked={
                            selectedRowAssignTag.tag === "small_business"
                          }
                          onChange={handleRadioChange}
                        />
                        Small Business
                      </label>

                      <label className="flex items-center">
                        <i className="fa-solid fa-building mr-2 text-[#4267B2]"></i>
                        <input
                          type="radio"
                          name="myRadio"
                          value="medium_business"
                          className="mr-2"
                          checked={
                            selectedRowAssignTag.tag === "medium_business"
                          }
                          onChange={handleRadioChange}
                        />
                        Medium Sized Business
                      </label>

                      <label className="flex items-center">
                        <i className="fa-solid fa-building-un mr-2 text-[#4267B2]"></i>
                        <input
                          type="radio"
                          name="myRadio"
                          value="big_business"
                          className="mr-2"
                          checked={selectedRowAssignTag.tag === "big_business"}
                          onChange={handleRadioChange}
                        />
                        Big Business
                      </label>
                    </div>
                    <div className="mt-3 flex justify-end mr-5">
                      <button
                        className="bg-[#FDC100] text-white py-1 px-3 rounded-md"
                        onClick={() =>
                          handleAssignTagSubmitBtn(
                            selectedRowAssignTag.marketerId
                          )
                        }>
                        Submit
                      </button>
                    </div>
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

export default MarketerTable;
