import React, { useState, useEffect, useContext, useRef } from "react";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import Select, { SingleValue } from "react-select";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import _ from "lodash";
import { FormDataContext } from "../../../utils/context/formData/formData.context";
import {
  accountManager,
  AccountManagerDataContext,
} from "../../../utils/context/formData/accountManager.context";
import PaginationComponent from "../../../global/global_component/pagination/coreuiPagination.component";

interface ProfilePicture {
  id: number;
  img_name: string;
  img_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  delete_at: string | null;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  gender: string;
  dob: string;
  created_at: string;
  profile_picture: ProfilePicture;
}

interface City {
  id: number;
  location_title: string;
  location_description: string;
  country: string;
}

interface Niche {
  id: number;
  niche_name: string;
}

interface AdminUser {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: ProfilePicture;
}

interface AM1 {
  id: number;
  admin_role: string;
  user: AdminUser;
}

interface InfluencerData {
  id: number;
  interest: string | null;
  niche: Niche | null;
  city: City | null;
  user: User;
  AM1: AM1;
}

interface ApiResponse {
  message: string;
  influencerData: InfluencerData[];
}

interface AM1User {
  id: number;
  first_name: string;
  last_name: string;
  profile_picture: ProfilePicture | null;
}

interface AM1ApiResponse {
  id: number;
  admin_role: string;
  user: AM1User;
}

interface QueryParams {
  key: string;
  orderBy: "ASC" | "DESC";
  influencer_id: number | null;
  influencer_name: string;
  city: number | null;
  gender: string;
  state: string;
  niche: number | null;
  am_id: number | null;
  page: number;
  limit: number;
}

interface SelectOptionInterface {
  value: number;
  label: string;
}
interface SelectStateOptionInterface {
  value: string;
  label: string;
}

const AdminInfluencerTable: React.FC = () => {
  const [am1ShowModal, setAm1ShowModal] = useState<{
    isModalActive: boolean;
    am1_id: number | null;
  }>({
    isModalActive: false,
    am1_id: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("ASC"); // Initial sorting order
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [showAmConfirmationModal, setShowAmConfirmationModal] = useState(false);

  const handleTableDataRange = (range: number) => {
    setFilterConfig((prev) => ({
      ...prev,
      limit: range,
    }));
  };

  const { state } = useContext(FormDataContext);
  const { niche, locationData } = state;
  const { amState } = useContext(AccountManagerDataContext);
  const { am1 } = amState;

  const nicheOptions = niche.map((nicheData) => ({
    value: nicheData.id,
    label: nicheData.niche_name,
  }));
  nicheOptions.unshift({ value: 0, label: "Select a Niche" });

  const cityOptions = locationData.map((location) => ({
    value: location.id,
    label: `${location.location_title}, (${location.location_description})`,
  }));
  cityOptions.unshift({ value: 0, label: "Select a City" });

  const locationDescriptionsSet = new Set<string>();
  locationData.forEach((location) => {
    locationDescriptionsSet.add(location.location_description);
  });
  // console.log("stateData filter", locationDescriptionsSet);
  const stateOptions = Array.from(locationDescriptionsSet).map(
    (description, index) => ({
      value: description,
      label: description,
    })
  );
  stateOptions.unshift({ value: "", label: "Select a state" });

  const formatFollowers = (followers: string): string => {
    const followersNumber =
      typeof followers === "string" ? parseInt(followers) : followers;
    if (followersNumber >= 1000000) {
      const formatted = (followersNumber / 1000000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "M"
        : formatted + "M";
    } else if (followersNumber >= 1000) {
      const formatted = (followersNumber / 1000).toFixed(1);
      return formatted.endsWith(".0")
        ? formatted.slice(0, -2) + "K"
        : formatted + "K";
    } else {
      return followersNumber.toString();
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
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

  const handleShowAMModal = (id: number) => {
    setAm1ShowModal({
      isModalActive: true,
      am1_id: id,
    });
  };

  const handleCloseAMModal = () => {
    setAm1ShowModal({
      isModalActive: false,
      am1_id: null,
    });
  };

  const handleShowAMConfirmationModal = () => {
    setShowAmConfirmationModal(true);
  };

  const handleCloseAMConfirmationModal = () => {
    setShowAmConfirmationModal(false);
  };

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const [sortByFollowers, setSortByFollowers] = useState<"asc" | "desc">("asc");
  const [influencerData, setInfluencerData] = useState<InfluencerData[]>([]);
  const [am1Data, setAm1Data] = useState<accountManager[]>([]);
  console.log("am1 data", am1Data);
  const [filteredAm1Data, setFilteredAm1Data] = useState<accountManager[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  useEffect(() => {
    setAm1Data(am1);
    setFilteredAm1Data(am1);
  }, [am1]);

  const filterAm1Data = (searchText: string) => {
    setFilteredAm1Data(
      am1Data.filter((am1) =>
        am1.user.first_name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  };

  const filterWithIdAm1Data = (id: string) => {
    if (id) {
      const numericId = parseInt(id, 10);
      setFilteredAm1Data(am1Data.filter((am1) => am1.id === numericId));
    } else {
      setFilteredAm1Data(am1Data);
    }
  };
  const [filterConfig, setFilterConfig] = useState<QueryParams>({
    key: "created_at",
    orderBy: "DESC",
    influencer_id: null,
    influencer_name: "",
    gender: "",
    niche: null,
    city: null,
    state: "",
    am_id: null,
    page: 1,
    limit: 6,
  });

  const [selectedGender, setSelectedGender] = useState("");

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("am1 call huaa");
    const numericFields = ["influencer_id", "am_id"];
    setFilterConfig((prevState) => ({
      ...prevState,
      [name]: numericFields.includes(name)
        ? value === "" || isNaN(Number(value))
          ? null
          : Number(value)
        : value,
    }));
  };

  const handleSelectChange = (
    newValue: SingleValue<SelectOptionInterface>,
    key: keyof QueryParams
  ) => {
    setFilterConfig((prev) => ({
      ...prev,
      [key]: newValue ? newValue.value : "",
    }));
  };

  const handleSelectStateChange = (
    newValue: SingleValue<SelectStateOptionInterface>
  ) => {
    setFilterConfig((prev) => ({
      ...prev,
      state: newValue ? newValue.value : "",
    }));
  };
  useEffect(() => {
    setFilterConfig((prev) => ({
      ...prev,
      page: currentPage,
    }));
  }, [currentPage]);

  const handleSortConfigChange = (sortKey: string) => {
    setFilterConfig((prev) => ({
      ...prev,
      key: sortKey,
      orderBy: prev.orderBy === "ASC" ? "DESC" : "ASC",
    }));
  };
  const handleGenderSelection = (genderString: string) => {
    setFilterConfig((prev) => ({
      ...prev,
      gender: genderString,
    }));
  };
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const fetchInfluencerTableData = async () => {
      const influencerTableDataApi = `${process.env.REACT_APP_API_URL}admin/influencer`;
      const headers = {
        authorization: `Bearer ${access_token}`,
      };
      const config = {
        headers,
        params: filterConfig,
      };
      try {
        const { data } = await axios.get(influencerTableDataApi, config);
        setInfluencerData(data.influencerDetails);
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

    const debouncedFetch = _.debounce(fetchInfluencerTableData, 600);
    debouncedFetch();
    return () => {
      debouncedFetch.cancel();
    };
  }, [filterConfig]);

  const resetSearchFilter = () => {
    setFilterConfig((prev) => ({
      ...prev,
      influencer_id: null,
      influencer_name: "",
      gender: "",
      niche: null,
      city: null,
      state: "",
      am_id: null,
    }));
  };
  return (
    <div className="bg-[#EBEBEB] h-full p-3">
      <div className="bg-white w-full rounded-md py-4 px-2 mb-3">
        <div className="flex flex-col 2xl:flex-row">
          <div className="flex justify-around w-full 2xl:w-1/2">
            <input
              type="text"
              name="influencer_id"
              onChange={handleChangeInput}
              value={
                filterConfig.influencer_id !== null
                  ? filterConfig.influencer_id
                  : ""
              }
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48  bg-[#EBEBEB] custom-input"
              placeholder="Id"
            />
            <input
              type="text"
              name="influencer_name"
              onChange={handleChangeInput}
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48 bg-[#EBEBEB] custom-input"
              placeholder="Name"
            />
            <Select
              placeholder="Niche"
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48 bg-[#EBEBEB] custom-input"
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
            <Select
              placeholder="City"
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48 bg-[#EBEBEB] custom-input"
              options={cityOptions}
              onChange={(newValue) => handleSelectChange(newValue, "city")}
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
          </div>
          <div className="flex justify-around w-full 2xl:w-1/2 mt-[12px] 2xl:mt-0">
            <Select
              placeholder="State"
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48 bg-[#EBEBEB] custom-input"
              options={stateOptions}
              onChange={(newValue) => handleSelectStateChange(newValue)}
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
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48 bg-[#EBEBEB] custom-input"
              placeholder="AM"
              onChange={handleChangeInput}
            />
            <button
              className="bg-ri-orange rounded-[4px] w-60 2xl:w-48"
              onClick={resetSearchFilter}>
              <p className="text-white text-sm">Reset</p>
            </button>
            <button className="bg-[#4267B2] rounded-[4px] w-60 2xl:w-48">
              <p className="text-white text-sm">Search</p>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white w-full rounded-md py-0 max-h-[451px] 3xl:max-h-[1054px] overflow-scroll">
        <div className="border-b-2 flex justify-between px-16 items-center">
          <div className="py-2">
            <p className="text-sm 2xl:text-base text-gray-color font-medium">
              Influencer Table
            </p>
          </div>
          <div className="py-2 z-0">
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
                    className={`select-none active:bg-[#4267b2] ${
                      filterConfig.limit === 6 ? `bg-ri-blue text-white` : ``
                    }`}
                    onClick={() => handleTableDataRange(6)}>
                    <p className="text-xs 3xl:text-sm font-medium">6 Rows</p>
                  </CDropdownItem>
                  <CDropdownItem
                    className={`select-none active:bg-[#4267b2] ${
                      filterConfig.limit === 12 ? `bg-ri-blue text-white` : ``
                    }`}
                    onClick={() => handleTableDataRange(12)}>
                    <p className="text-xs 3xl:text-sm font-medium">12 Rows</p>
                  </CDropdownItem>
                  <CDropdownItem
                    className={`select-none active:bg-[#4267b2] ${
                      filterConfig.limit === 20 ? `bg-ri-blue text-white` : ``
                    }`}
                    onClick={() => handleTableDataRange(20)}>
                    <p className="text-xs 3xl:text-sm font-medium">20 Rows</p>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>
        </div>
        <div className="text-center overflow-x-scroll">
          <table className="w-full">
            {/* <thead className="fixed bg-white w-full mt-12 overflow-x-scroll"> */}
            <thead className="sticky">
              <tr className="table-row-border">
                <th className="px-14 text-xs 3xl:text-sm relative">
                  <button
                    onClick={() => handleSortConfigChange("id")}
                    className="items-center">
                    id
                    {filterConfig.key === "id" &&
                    filterConfig.orderBy === "ASC" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm relative">
                  <button
                    onClick={() => handleSortConfigChange("name")}
                    className="items-center">
                    Name
                    {filterConfig.key === "name" &&
                    filterConfig.orderBy === "ASC" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm ">
                  <button
                    onClick={() => handleSortConfigChange("created_at")}
                    className="items-center">
                    Name
                    {filterConfig.key === "created_at" &&
                    filterConfig.orderBy === "ASC" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm relative ">
                  <CDropdown>
                    <CDropdownToggle
                      caret={false}
                      className="border-none bg-white text-black font-semibold text-xs 3xl:text-sm hover:text-[#909AAA]">
                      Gender{" "}
                      <i
                        className={`fa-solid fa-caret-${
                          isGenderDropdownOpen ? "up" : "down"
                        }`}></i>
                    </CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem
                        className="select-none flex active:bg-[#4267b2]"
                        onClick={() => handleGenderSelection("M")}>
                        <i className="fa-solid fa-mars text-blue-500 mr-4"></i>
                        <p className="text-xs 3xl:text-sm font-medium">Male</p>
                      </CDropdownItem>
                      <CDropdownItem
                        className="select-none flex active:bg-[#4267b2]"
                        onClick={() => handleGenderSelection("F")}>
                        <i className="fa-solid fa-venus text-pink-500 mr-4"></i>
                        <p className="text-xs 3xl:text-sm font-medium">
                          Female
                        </p>
                      </CDropdownItem>
                      <CDropdownItem
                        className="select-none flex active:bg-[#4267b2]"
                        onClick={() => handleGenderSelection("O")}>
                        <i className="fa-solid fa-transgender text-orange-500 mr-3"></i>
                        <p className="text-xs 3xl:text-sm font-medium">
                          Others
                        </p>
                      </CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem
                        className="select-none active:bg-[#4267b2]"
                        onClick={() => handleGenderSelection("")}>
                        <p className="text-xs 3xl:text-sm font-medium">All</p>
                      </CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown>
                </th>
                <th className="px-14 text-xs 3xl:text-sm">Age</th>
                <th className="px-14 text-xs 3xl:text-sm relative">Niche</th>
                <th className="px-14 text-xs 3xl:text-sm">City</th>
                <th className="px-14 text-xs 3xl:text-sm">State</th>
                <th className="px-14 text-xs 3xl:text-sm">Username</th>
                <th className="px-14 text-xs 3xl:text-sm relative">
                  <button
                    className="items-center"
                    // onClick={handleSortByFollowers}
                  >
                    Followers
                    {sortByFollowers === "asc" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm">AM</th>
                <th className="px-14 text-xs 3xl:text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll max-h-[500px]">
              {influencerData.map((tableData, index) => (
                <tr key={index} className="w-full table-row-border">
                  <td className="py-3 whitespace-nowrap">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.id}.
                    </p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-4/12 flex justify-end">
                        <img
                          src={tableData.user.profile_picture.img_url}
                          alt=""
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                        />
                      </div>
                      <div className="w-8/12 items-center flex pl-5">
                        <p className="text-xs 3xl:text-sm font-medium">
                          {_.capitalize(tableData.user.first_name)}{" "}
                          {_.capitalize(tableData.user.last_name)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {formatDate(tableData.user.created_at)}
                    </p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <i
                      className={`fa-solid ${
                        tableData.user.gender === "M"
                          ? "fa-mars"
                          : tableData.user.gender === "F"
                          ? "fa-venus"
                          : "fa-transgender"
                      } ${
                        tableData.user.gender === "M"
                          ? "text-blue-500"
                          : tableData.user.gender === "F"
                          ? "text-pink-500"
                          : "text-orange-500"
                      }`}></i>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.user.dob}
                    </p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.niche && tableData.niche.niche_name}
                    </p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.city && tableData.city.location_title}
                    </p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <p className="text-xs 3xl:text-sm font-medium">
                      {tableData.city && tableData.city.location_description}
                    </p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <p className="text-xs 3xl:text-sm font-medium">
                      <i className="fa-solid fa-minus"></i>
                    </p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <p className="text-xs 3xl:text-sm font-medium">
                      <i className="fa-solid fa-minus"></i>
                    </p>
                  </td>
                  <td className="py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-4/12 flex justify-end">
                        <img
                          src={tableData.AM1.user.profile_picture.img_url}
                          alt=""
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                        />
                      </div>
                      <div className=" w-8/12 items-center flex pl-5">
                        <p className="text-xs 3xl:text-sm font-medium">
                          {tableData.AM1.user.first_name}{" "}
                          {tableData.AM1.user.last_name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <button>
                      <i
                        className="fa-solid fa-ellipsis-vertical ml-3 p-2 hover:cursor-pointer"
                        onClick={() => handleShowAMModal(tableData.AM1.id)}></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {am1ShowModal.isModalActive && (
            <div className="z-10 fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-3 rounded-md lg:w-4/12 sm:w-6/12">
                <div className="flex justify-between">
                  <p className="text-lg font-semibold">Account Manager</p>
                  <button onClick={handleCloseAMModal}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
                <div className="flex w-full gap-2 mt-3">
                  <input
                    type="search"
                    onChange={(e) => filterWithIdAm1Data(e.target.value)}
                    placeholder="Search Id"
                    className="w-5/12 p-1 text-xs 3xl:text-sm rounded-md border-1 custom-input"
                  />
                  <input
                    type="search"
                    placeholder="Search Name"
                    onChange={(e) => filterAm1Data(e.target.value)}
                    className="w-5/12 p-1 text-xs 3xl:text-sm rounded-md border-1 custom-input"
                  />
                  <button className="bg-[#4267B2] w-2/12 text-xs 3xl:text-sm rounded-md text-white">
                    Search
                  </button>
                </div>

                <div className="mt-2 max-h-[300px] 3xl:max-h-80 overflow-scroll">
                  {filteredAm1Data.map((accountManager, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border-b-1 ">
                      <div className="flex items-center">
                        <img
                          src={
                            accountManager.user.profile_picture &&
                            accountManager.user.profile_picture.img_url
                              ? accountManager.user.profile_picture.img_url
                              : ""
                          }
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                          alt=""
                        />
                        <div className="ml-3 flex flex-col 3xl:flex-row 3xl:items-baseline">
                          <p className="font-sm 3xl:font-base font-medium text-left">
                            {_.truncate(
                              `${accountManager.user.first_name} ${accountManager.user.last_name}`,
                              { length: 14, omission: "..." }
                            )}
                          </p>
                        </div>
                      </div>
                      <button
                        className={`flex py-1  w-20 rounded-md ${
                          accountManager.id === am1ShowModal.am1_id
                            ? "bg-[#52AD60]"
                            : "bg-[#B1B1B1]"
                        } `}
                        onClick={handleShowAMConfirmationModal}>
                        <p className="text-[10px] 3xl:text-xs mx-auto text-white">
                          {accountManager.id === am1ShowModal.am1_id
                            ? "Assigned"
                            : "Assigned To"}
                        </p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {showAmConfirmationModal && (
            <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-3 rounded-md w-2/12">
                <p>Please confirm?</p>
                <div className="flex items-center justify-center gap-5 mt-3">
                  <button className="bg-[#4267B2] py-1 px-3 rounded-md text-white">
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
  );
};

export default AdminInfluencerTable;
