import React, { useContext, useEffect, useState } from "react";
import profile from "../../../assets/img/profile.jpg";
import profile1 from "../../../assets/img/profile1.jpg";
import {
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import Select, { SingleValue } from "react-select";
// import { Niche } from "../../../global/constants/NicheLanguageData";
// import { locationData } from "../../../global/constants/LocationData";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FormDataContext } from "../../../../utils/context/formData/formData.context";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import CallToast from "../../../../utils/utilsMethods/callToast.utils";
import PaginationComponent from "../../../../global/global_component/pagination/coreuiPagination.component";
import FiveStarComponent from "../../fiveStar.component";
// import FiveStarComponent from "../FiveStarComponent";
interface OptionInterface {
  value: number;
  label: string;
}
// const nicheOptions = Niche.map((niche) => ({
//   value: niche.id,
//   label: niche.niche_name,
// }));

// const cityOptions = locationData.flatMap((data) =>
//   data.locationData.map((location) => ({
//     value: location.id,
//     label: location.location_title,
//   }))
// );
const assignTagData = [
  { id: 1, tagName: "reliable" },
  { id: 2, tagName: "innovative" },
  { id: 3, tagName: "team oriented" },
  { id: 4, tagName: "adaptable" },
  { id: 5, tagName: "strategic" },
  { id: 6, tagName: "goal driven" },
  { id: 7, tagName: "collaborative" },
  { id: 8, tagName: "detail oriented" },
  { id: 9, tagName: "motivated" },
  { id: 10, tagName: "proactive" },
  { id: 11, tagName: "efficient" },
  { id: 12, tagName: "communicative" },
  { id: 13, tagName: "dedicated" },
  { id: 14, tagName: "punctual" },
  { id: 15, tagName: "analytical" },
  { id: 16, tagName: "creative" },
  { id: 17, tagName: "customer focused" },
  { id: 18, tagName: "visionary" },
  { id: 19, tagName: "skilled" },
  { id: 20, tagName: "dynamic" },
  { id: 21, tagName: "results oriented" },
  { id: 22, tagName: "organized" },
  { id: 23, tagName: "flexible" },
  { id: 24, tagName: "ethical" },
  { id: 25, tagName: "knowledgeable" },
  { id: 26, tagName: "approachable" },
  { id: 27, tagName: "resilient" },
  { id: 28, tagName: "tech savvy" },
  { id: 29, tagName: "leadership" },
  { id: 30, tagName: "empathetic" },
];

// const locationDescriptionsSet = new Set();

// locationData.forEach((data) => {
//   data.locationData.forEach((location) => {
//     locationDescriptionsSet.add(location.location_description);
//   });
// });

// const stateOptions = Array.from(locationDescriptionsSet).map(
//   (description, index) => ({
//     value: index + 1, // Assuming index starts from 1
//     label: description,
//   })
// );
// new interface
interface ProfilePictureInterface {
  id: number;
  img_name: string;
  img_url: string;
  is_active: boolean;
}

interface InstagramInterface {
  id: number;
  followers: number;
  username: string;
}

export interface InfluencerTableDataInterface {
  id: number;
  created_at: string;
  profile_completion: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    dob: string;
    profile_picture: ProfilePictureInterface[];
  };
  niche: {
    id: number;
    niche_name: string;
  };
  city: {
    id: number;
    location_title: string;
    location_description: string;
  };
  language: {
    id: number;
    language_name: string;
  };
  instagram: InstagramInterface[];
  AM1: {
    id: number;
    user: {
      id: number;
    };
  };
}

export interface SortConfigInterface {
  key: string;
  orderBy: "ASC" | "DESC";
}

export interface FilterConfigInterface {
  influencer_id: number | null;
  gender: "" | "m" | "f" | "o";
  niche_id: number | null;
  name: string;
  city: number | null;
  state: "";
  username: "";
}

export interface ratingReviewInterface {
  reviewButtonTitle: string;
  reviewSubText: string;
  reviewText: string;
  rating: number;
}

const InfluencerTableAM1 = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [tableDataRange, setTableDataRange] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc"); // Initial sorting order
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState(""); // State to store selected gender
  const [sortByFollowers, setSortByFollowers] = useState<"asc" | "desc">("asc");
  const [showAssignTagModal, setShowAssignTagModal] = useState(false);
  const [selectedTagName, setSelectedTagName] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRowName, setSelectedRowName] = useState<string>("");
  const [selectedRowProfilePic, setSelectedRowProfilePic] = useState<string>();

  const handleShowAssignTagModal = (
    tagName: string,
    name: string,
    profilePic: string
  ) => {
    setSelectedTagName(tagName); // Update the selected tag name state
    setShowAssignTagModal(true);
    setSelectedRowName(name);
    setSelectedRowProfilePic(profilePic);
  };

  const reviewSectionData = [
    {
      reviewButtonTitle: "content quality",
      reviewText: "",
      rating: 0,
      reviewSubText: "Aesthetics, Creativity, Story Telling, Brand Image",
    },
    {
      reviewButtonTitle: "authenticity & credibility",
      reviewText: "",
      rating: 0,
      reviewSubText:
        "Reputation, Perceived Trust Worthiness, Interactive Followers",
    },
    {
      reviewButtonTitle: "relationship potential",
      reviewText: "",
      rating: 0,
      reviewSubText: "Scalability, Creative Ideation, Professionalism",
    },
    {
      reviewButtonTitle: "ethical standards",
      reviewText: "",
      rating: 0,
      reviewSubText: "Temptations towards wrong means, Content Boosting",
    },
  ];

  const [reviewRating, setReviewRating] =
    useState<ratingReviewInterface[]>(reviewSectionData);

  const handleCloseAssignTagModal = () => {
    setShowAssignTagModal(false);
    setSelectedTagName(""); // Reset selected tag name when modal is closed
    setSelectedTags([]);
    setSelectedRowName("");
  };

  const handleShowModal = (id: number, name: string, profilePic: string) => {
    setSelectedRowId(id);
    setShowModal(true);
    setSelectedRowName(name);
    setSelectedRowProfilePic(profilePic);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRowId(null);
  };

  const handleAssignTagSubmitBtn = () => {};

  const handleTagClick = (tagName: string) => {
    if (!selectedTags.includes(tagName)) {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const handleRemoveTag = (tagName: string) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
  };

  const handleTableDataRange = (range: number) => {
    setPaginationConfig((prev) => ({
      ...prev,
      limit: range,
    }));
  };

  const startIndex = (currentPage - 1) * tableDataRange;
  const endIndex = startIndex + tableDataRange;

  const handleGenderSelection = (gender: string) => {
    if (gender === "Default") {
      setSelectedGender("");
    } else {
      setSelectedGender(gender);
    }
    setIsGenderDropdownOpen(false);
  };

  const formatFollowers = (followers: number): string => {
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

  //   const handleSortByFollowers = () => {
  //     // Toggle sorting order
  //     const newSortOrder = sortByFollowers === "asc" ? "desc" : "asc";
  //     setSortByFollowers(newSortOrder);

  //     // Sort table data based on followers
  //     const sorted = [...tableData].sort((a, b) => {
  //       const followersA = parseInt(a.followers);
  //       const followersB = parseInt(b.followers);

  //       if (newSortOrder === "asc") {
  //         return followersA - followersB;
  //       } else {
  //         return followersB - followersA;
  //       }
  //     });

  //     // Update tableData state with sorted data
  //     tableData.splice(0, tableData.length, ...sorted);
  //   };

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

  const truncateReviewSection = (name: string) => {
    const capitalized = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return capitalized;
  };

  const { state } = useContext(FormDataContext);
  const { niche, locationData } = state;
  const [cityOptions, setCityOptions] = useState<OptionInterface[]>([]);
  const [stateOptions, setStateOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [nicheOptions, setNicheOptions] = useState<OptionInterface[]>([]);
  useEffect(() => {
    if (niche && Array.isArray(niche)) {
      const Options = niche.map((nicheData) => ({
        value: nicheData.id,
        label: nicheData.niche_name,
      }));
      setNicheOptions(Options);
    }
    if (locationData && Array.isArray(locationData)) {
      const options = locationData.map((location) => ({
        value: location.id,
        label: location.location_title,
      }));
      setCityOptions(options);
    }

    if (locationData && Array.isArray(locationData)) {
      const locationDescriptionsSet = new Set<string>();

      locationData.forEach((location) => {
        locationDescriptionsSet.add(location.location_description);
      });

      const stateOptions: { value: string; label: string }[] = Array.from(
        locationDescriptionsSet
      ).map((description, index) => ({
        value: description, // Assuming index starts from 1
        label: description,
      }));

      setStateOptions(stateOptions);
    }
  }, [niche, locationData]);

  const [influencerTableData, setInfluencerTableData] = useState<
    InfluencerTableDataInterface[] | null
  >(null);
  const [lastPage, setLastPage] = useState<number>(0);

  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    key: "created_at",
    orderBy: "DESC",
  });
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });
  const [filterConfig, setFilterConfig] = useState<FilterConfigInterface>({
    influencer_id: null,
    name: "",
    niche_id: null,
    city: null,
    gender: "",
    state: "",
    username: "",
  });

  const [paginationConfig, setPaginationConfig] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const headers = {
    authorization: `Bearer ${access_token}`,
  };

  const fetchInfluencerTableData = async () => {
    const influencerTableDataApi = `${process.env.REACT_APP_API_URL}admin/am1/influencer`;
    const config = {
      headers,
      params: {
        ...sortConfig,
        ...filterConfig,
        ...paginationConfig,
      },
    };
    try {
      const { data } = await axios.get(influencerTableDataApi, config);
      setInfluencerTableData(data.influencerData);
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

  const handleSortConfigChange = (sortKey: string) => {
    setSortConfig((prev) => ({
      key: sortKey,
      orderBy: prev.orderBy === "ASC" ? "DESC" : "ASC",
    }));
  };

  const handleFilterConfigChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setFilterConfig((prevState) => ({
      ...prevState,
      [name]:
        name === "influencer_id"
          ? value !== "" && !isNaN(Number(value))
            ? parseInt(value, 10)
            : null
          : value,
    }));
  };

  const handleSelectChange = (
    newValue: SingleValue<OptionInterface>,
    name: string
  ) => {
    setFilterConfig((prevState) => ({
      ...prevState,
      [name]: newValue ? newValue.value : null,
    }));
  };

  const handleStateSelectChange = (
    newValue: SingleValue<{
      value: string;
      label: string;
    }>,
    name: string
  ) => {
    setFilterConfig((prevState) => ({
      ...prevState,
      [name]: newValue ? newValue.value : null,
    }));
  };

  useEffect(() => {
    fetchInfluencerTableData();
  }, [sortConfig, paginationConfig]);

  const CancelClearFilterConfig = () => {
    setFilterConfig({
      influencer_id: null,
      name: "",
      niche_id: null,
      city: null,
      gender: "",
      state: "",
      username: "",
    });
  };

  return (
    <div className="bg-[#EBEBEB] p-3">
      <div className="bg-white w-full rounded-md py-4 px-2 mb-3">
        <div className="flex flex-col 2xl:flex-row">
          <div className="flex justify-around w-full 2xl:w-1/2">
            <input
              type="text"
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48  bg-[#EBEBEB] custom-input"
              placeholder="Id"
              name="influencer_id"
              value={
                filterConfig.influencer_id !== null
                  ? filterConfig.influencer_id.toString()
                  : ""
              }
              onChange={handleFilterConfigChange}
            />
            <input
              type="text"
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48 bg-[#EBEBEB] custom-input"
              placeholder="Name"
              name="name"
              value={filterConfig.name}
              onChange={handleFilterConfigChange}
            />
            <Select
              placeholder="Niche"
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48 bg-[#EBEBEB] custom-input"
              options={nicheOptions}
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "niche_id")
              }
              value={
                nicheOptions.find(
                  (option) => option.value === filterConfig.niche_id
                ) || null
              }
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
              value={
                cityOptions.find(
                  (option) => option.value === filterConfig.city
                ) || null
              }
              onChange={(selectedOption) =>
                handleSelectChange(selectedOption, "city")
              }
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
              value={
                stateOptions.find(
                  (option) => option.value === filterConfig.state
                ) || null
              }
              onChange={(selectedOption) =>
                handleStateSelectChange(selectedOption, "state")
              }
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
              className="rounded-[4px] h-8 text-sm px-2 w-60 2xl:w-48 bg-[#EBEBEB] custom-input"
              placeholder="Username"
              name="username"
              value={filterConfig.username}
              onChange={handleFilterConfigChange}
            />
            <button
              className="bg-[#4267B2] rounded-[4px] w-60 2xl:w-48"
              onClick={fetchInfluencerTableData}>
              <p className="text-white text-sm">Search</p>
            </button>
            <button
              className="bg-ri-orange rounded-[4px] w-60 2xl:w-48"
              onClick={CancelClearFilterConfig}>
              <p className="text-white text-sm">Cancel</p>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white w-full rounded-md py-2">
        <div className="border-b-2 flex justify-between px-16 items-center">
          <div className="py-2">
            <p className="text-sm 2xl:text-base text-gray-color font-medium">
              Influencer Table
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
        <div className="text-center overflow-x-scroll">
          <table className="w-full h-[60vh]">
            <thead className="sticky">
              <tr className="table-row-border">
                <th className="px-14 text-xs 3xl:text-sm relative">
                  <button
                    onClick={() => handleSortConfigChange("id")}
                    className="items-center">
                    id
                    {sortConfig.key === "id" && sortConfig.orderBy === "ASC" ? (
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
                    {sortConfig.key === "name" &&
                    sortConfig.orderBy === "ASC" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm">Created At</th>
                <th className="px-14 text-xs 3xl:text-sm relative ">
                  <CDropdown>
                    <CDropdownToggle
                      caret={false}
                      className="border-none bg-white text-[#909AAA] font-semibold text-xs 3xl:text-sm hover:text-[#909AAA]">
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
                        {" "}
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
                    onClick={() => handleSortConfigChange("followers")}>
                    Followers
                    {sortConfig.key === "id" && sortConfig.orderBy === "ASC" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm">
                  <button
                    onClick={() => handleSortConfigChange("profile_compete")}
                    className="items-center">
                    Profile Completed
                    {sortConfig.key === "id" && sortConfig.orderBy === "ASC" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm">Action</th>
              </tr>
            </thead>
            <tbody className="overflow-y-scroll min-h-[60vh]">
              {influencerTableData &&
                influencerTableData.map((tableData, index) => (
                  <tr key={index} className="w-full">
                    <td className="py-3 whitespace-nowrap">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.id}.
                      </p>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-4/12 flex justify-end">
                          <img
                            src={tableData.user.profile_picture[0].img_url}
                            alt=""
                            className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                          />
                        </div>
                        <div className="w-8/12 items-center flex pl-5">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.user.first_name.charAt(0).toUpperCase() +
                              tableData.user.first_name.slice(1)}{" "}
                            {tableData.user.last_name.charAt(0).toUpperCase() +
                              tableData.user.last_name.slice(1)}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {formatDate(tableData.created_at)}
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
                        {tableData.niche.niche_name.charAt(0).toUpperCase() +
                          tableData.niche.niche_name.slice(1)}
                      </p>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.city.location_title.charAt(0).toUpperCase() +
                          tableData.city.location_title.slice(1)}
                      </p>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.city.location_description
                          .charAt(0)
                          .toUpperCase() +
                          tableData.city.location_description.slice(1)}
                      </p>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.instagram[0]
                          ? tableData.instagram[0].username
                          : "no-data"}
                      </p>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {formatFollowers(
                          tableData.instagram[0]
                            ? tableData.instagram[0].followers
                            : 0
                        )}
                      </p>
                    </td>
                    <td className="whitespace-nowrap flex items-center justify-center">
                      <div className="w-10 h-10">
                        <CircularProgressbar
                          value={tableData.profile_completion}
                          text={`${tableData.profile_completion}%`}
                          styles={buildStyles({
                            textSize: "30px",
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
                    <td className="py-3 whitespace-nowrap">
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
                              handleShowModal(
                                tableData.id,
                                tableData.user.first_name,
                                tableData.user.profile_picture[0].img_url
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
                                assignTagData[0]?.tagName,
                                tableData.user.first_name,
                                tableData.user.profile_picture[0].img_url
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
                ))}
            </tbody>
          </table>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
              <div className="bg-white p-3 rounded-md mt-20 3xl:mt-0 w-7/12 3xl:w-6/12">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={selectedRowProfilePic}
                      className="rounded-full w-7 h-7 mr-2"
                      alt=""
                    />
                    <p className="text-lg font-semibold">
                      Give Review for {truncateReviewSection(selectedRowName)}
                    </p>
                  </div>
                  <button onClick={handleCloseModal}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
                {/* max-h-[300px] 3xl:max-h-80 */}
                <div className="mt-[4px] 3xl:mt-2 overflow-scroll">
                  <div className="border-b-1 pb-4">
                    {reviewSectionData.map((reviewSection, index) => (
                      <div key={index} className="3xl:mt-2 items-start flex">
                        <div className="w-7/12">
                          <div className="flex items-center">
                            <div className="bg-[#4267B2] py-1 px-2 rounded-md text-white text-[10px] 3xl:text-sm inline-block">
                              <p>
                                {truncateReviewSection(
                                  reviewSection.reviewButtonTitle
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
                          <div className=" mt-2 flex items-start">
                            <p className="text-[10px] 3xl:text-sm text-start">
                              ( {reviewSection.reviewSubText} )
                            </p>
                          </div>
                        </div>
                        <div className="w-5/12 flex flex-col items-start">
                          <p className="font-medium text-[10px] 3xl:text-sm">
                            Write a review
                          </p>
                          <textarea
                            maxLength={512}
                            className="resize-none w-full rounded-md text-sm px-2 border-1 custom-input"></textarea>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="gap-3 flex flex-col justify-center items-center mt-1">
                    <div className="flex flex-col items-start w-7/12">
                      <p className="font-medium text-[10px] 3xl:text-sm">
                        Write Us
                      </p>
                      <textarea
                        rows={3}
                        maxLength={1000}
                        className="resize-none w-full rounded-md text-sm px-2 border-1 custom-input"></textarea>
                    </div>
                    <button className="bg-[#fdc100] text-white py-1 px-3 rounded-md flex items-center justify-center text-[10px] 3xl:text-sm h-6 3xl:h-8">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showAssignTagModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-10">
              <div className="bg-white p-3 rounded-md w-7/12 3xl:w-6/12">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <img
                      src={selectedRowProfilePic}
                      className="rounded-full w-7 h-7 mr-2"
                      alt=""
                    />
                    <p className="text-lg font-semibold">
                      Assign Tag for {truncateReviewSection(selectedRowName)}
                    </p>
                  </div>
                  <button onClick={handleCloseAssignTagModal}>
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                </div>
                <div className="mt-2">
                  <div className="mb-2 border-1 p-2 min-h-[55px] items-center flex flex-wrap rounded-md w-full">
                    {selectedTags.map((tag, index) => (
                      <div key={index} className="flex mr-2 my-1">
                        <div className="flex bg-[#4267B2] py-1 px-3 rounded-l-md text-sm text-white">
                          <p>{truncateReviewSection(tag)}</p>{" "}
                        </div>
                        <button
                          className="bg-[#FDC100] text-white flex items-center justify-center text-sm rounded-r-md px-2"
                          onClick={() => handleRemoveTag(tag)}>
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-b-1 py-3">
                    {assignTagData.map((assignTag, index) => (
                      <button
                        key={index}
                        className={`bg-[#4267B2] text-white inline-block m-2 py-1 px-3 rounded-md text-sm ${
                          selectedTags.includes(assignTag.tagName)
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                        onClick={() => handleTagClick(assignTag.tagName)}
                        disabled={selectedTags.includes(assignTag.tagName)}>
                        <p>{truncateReviewSection(assignTag.tagName)}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-end mr-5">
                    <button
                      className="bg-[#FDC100] text-white py-1 px-3 rounded-md"
                      onClick={handleAssignTagSubmitBtn}>
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
  );
};

export default InfluencerTableAM1;
