import React, { useContext, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
// import { Niche } from "../../global/constants/NicheLanguageData";
import profile from "../../../assets/img/profile.jpg";
import profile1 from "../../../assets/img/profile1.jpg";
import companyLogo from "../../../assets/img/companyLogo.jpg";

import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FormDataContext } from "../../../utils/context/formData/formData.context";
import PaginationComponent from "../../../global/global_component/pagination/coreuiPagination.component";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";

const companyTableData = [
  {
    id: 1,
    profilePic: profile,
    firstName: "rajat",
    lastName: "gautam",
    companyLogo: companyLogo,
    companyName: "Uprising Science",
    designation: "software engineer",
    industry: "information technology",
    niche: "technlogy",
    profileCompleted: 70,
    activeCampaigns: 30,
    completedCampaigns: 20,
    amProfilePic: profile1,
    am: "Radhika Ratra",
  },
  {
    id: 2,
    profilePic: profile,
    firstName: "Sara",
    lastName: "Johnson",
    companyLogo: companyLogo,
    companyName: "Tech Innovations Inc.",
    designation: "Senior Software Developer",
    industry: "Information Technology",
    niche: "Technology",
    profileCompleted: 24,
    activeCampaigns: 25,
    completedCampaigns: 15,
    amProfilePic: profile1,
    am: "Alex Martin",
  },
  {
    id: 3,
    profilePic: profile,
    firstName: "John",
    lastName: "Doe",
    companyLogo: companyLogo,
    companyName: "DataWorks",
    designation: "Data Analyst",
    industry: "Data Science",
    niche: "Data Analytics",
    profileCompleted: 100,
    activeCampaigns: 10,
    completedCampaigns: 5,
    amProfilePic: profile1,
    am: "Emily Evans",
  },
  {
    id: 4,
    profilePic: profile,
    firstName: "Sophie",
    lastName: "Smith",
    companyLogo: companyLogo,
    companyName: "Digital Solutions Ltd.",
    designation: "UI/UX Designer",
    industry: "Design",
    niche: "User Experience",
    profileCompleted: 15,
    activeCampaigns: 20,
    completedCampaigns: 10,
    amProfilePic: profile1,
    am: "Daniel Brown",
  },
  {
    id: 5,
    profilePic: profile,
    firstName: "Michael",
    lastName: "Clark",
    companyLogo: companyLogo,
    companyName: "CyberSecGuard",
    designation: "cyber security analyst",
    industry: "Cybersecurity",
    niche: "Network Security",
    profileCompleted: 45,
    activeCampaigns: 15,
    completedCampaigns: 8,
    amProfilePic: profile1,
    am: "Jessica Lee",
  },
  {
    id: 6,
    profilePic: profile,
    firstName: "David",
    lastName: "Brown",
    companyLogo: companyLogo,
    companyName: "TechGenius",
    designation: "AI Engineer",
    industry: "Artificial Intelligence",
    niche: "Machine Learning",
    profileCompleted: 60,
    activeCampaigns: 20,
    completedCampaigns: 12,
    amProfilePic: profile1,
    am: "Sophia White",
  },
  {
    id: 7,
    profilePic: profile,
    firstName: "Emily",
    lastName: "Taylor",
    companyLogo: companyLogo,
    companyName: "InnovateTech",
    designation: "Product Manager",
    industry: "Product Management",
    niche: "Product Development",
    profileCompleted: 85,
    activeCampaigns: 18,
    completedCampaigns: 11,
    amProfilePic: profile1,
    am: "Oliver Garcia",
  },
  {
    id: 8,
    profilePic: profile,
    firstName: "Sophia",
    lastName: "Wilson",
    companyLogo: companyLogo,
    companyName: "CodeCrafters",
    designation: "Full Stack Developer",
    industry: "Software Development",
    niche: "Web Development",
    profileCompleted: 40,
    activeCampaigns: 22,
    completedCampaigns: 18,
    amProfilePic: profile1,
    am: "Ethan Johnson",
  },
  {
    id: 9,
    profilePic: profile,
    firstName: "Ethan",
    lastName: "Martinez",
    companyLogo: companyLogo,
    companyName: "DataTech Solutions",
    designation: "Data Scientist",
    industry: "Data Science",
    niche: "Data Analysis",
    profileCompleted: 55,
    activeCampaigns: 17,
    completedCampaigns: 13,
    amProfilePic: profile1,
    am: "Amelia Roberts",
  },
  {
    id: 10,
    profilePic: profile,
    firstName: "Olivia",
    lastName: "Harris",
    companyLogo: companyLogo,
    companyName: "TechVisionaries",
    designation: "IT Consultant",
    industry: "Information Technology",
    niche: "Consulting",
    profileCompleted: 70,
    activeCampaigns: 16,
    completedCampaigns: 10,
    amProfilePic: profile1,
    am: "Noah Thompson",
  },
  {
    id: 11,
    profilePic: profile,
    firstName: "Noah",
    lastName: "Flores",
    companyLogo: companyLogo,
    companyName: "InnovateNow",
    designation: "Tech Lead",
    industry: "Technology",
    niche: "Leadership",
    profileCompleted: 30,
    activeCampaigns: 23,
    completedCampaigns: 17,
    amProfilePic: profile1,
    am: "Sophie Hernandez",
  },
  {
    id: 12,
    profilePic: profile,
    firstName: "Emma",
    lastName: "Garcia",
    companyLogo: companyLogo,
    companyName: "DigitalDynamics",
    designation: "Software Developer",
    industry: "Information Technology",
    niche: "Software Engineering",
    profileCompleted: 15,
    activeCampaigns: 19,
    completedCampaigns: 14,
    amProfilePic: profile1,
    am: "Maxwell Adams",
  },
  {
    id: 13,
    profilePic: profile,
    firstName: "James",
    lastName: "Lopez",
    companyLogo: companyLogo,
    companyName: "TechSavvy Solutions",
    designation: "Network Engineer",
    industry: "Information Technology",
    niche: "Networking",
    profileCompleted: 100,
    activeCampaigns: 21,
    completedCampaigns: 16,
    amProfilePic: profile1,
    am: "Ava Cooper",
  },
  {
    id: 14,
    profilePic: profile,
    firstName: "Ava",
    lastName: "Rivera",
    companyLogo: companyLogo,
    companyName: "CyberDefense Systems",
    designation: "Cybersecurity Specialist",
    industry: "Cybersecurity",
    niche: "Security Operations",
    profileCompleted: 65,
    activeCampaigns: 18,
    completedCampaigns: 13,
    amProfilePic: profile1,
    am: "Jacob Parker",
  },
  {
    id: 15,
    profilePic: profile,
    firstName: "Jacob",
    lastName: "Cooper",
    companyLogo: companyLogo,
    companyName: "TechRise Innovations",
    designation: "Tech Support Engineer",
    industry: "Information Technology",
    niche: "Technical Support",
    profileCompleted: 85,
    activeCampaigns: 14,
    completedCampaigns: 9,
    amProfilePic: profile1,
    am: "Isabella Reed",
  },
  {
    id: 16,
    profilePic: profile,
    firstName: "Isabella",
    lastName: "Lee",
    companyLogo: companyLogo,
    companyName: "InnovateIT Solutions",
    designation: "IT Project Manager",
    industry: "Information Technology",
    niche: "Project Management",
    profileCompleted: 90,
    activeCampaigns: 20,
    completedCampaigns: 15,
    amProfilePic: profile1,
    am: "Nathan Howard",
  },
  {
    id: 17,
    profilePic: profile,
    firstName: "Nathan",
    lastName: "Wright",
    companyLogo: companyLogo,
    companyName: "DataDriven Technologies",
    designation: "Data Engineer",
    industry: "Data Science",
    niche: "Data Management",
    profileCompleted: 45,
    activeCampaigns: 22,
    completedCampaigns: 17,
    amProfilePic: profile1,
    am: "Ella Phillips",
  },
  {
    id: 18,
    profilePic: profile,
    firstName: "Ella",
    lastName: "Mitchell",
    companyLogo: companyLogo,
    companyName: "TechTrends Ltd.",
    designation: "Tech Writer",
    industry: "Media",
    niche: "Technology Journalism",
    profileCompleted: 50,
    activeCampaigns: 16,
    completedCampaigns: 11,
    amProfilePic: profile1,
    am: "Liam King",
  },
  {
    id: 19,
    profilePic: profile,
    firstName: "Liam",
    lastName: "Hill",
    companyLogo: companyLogo,
    companyName: "CodeCrafters",
    designation: "Frontend Developer",
    industry: "Software Development",
    niche: "Web Development",
    profileCompleted: 65,
    activeCampaigns: 18,
    completedCampaigns: 13,
    amProfilePic: profile1,
    am: "Eva Wilson",
  },
  {
    id: 20,
    profilePic: profile,
    firstName: "Eva",
    lastName: "Carter",
    companyLogo: companyLogo,
    companyName: "InnovateTech Solutions",
    designation: "Business Analyst",
    industry: "Consulting",
    niche: "Business Analysis",
    profileCompleted: 30,
    activeCampaigns: 25,
    completedCampaigns: 20,
    amProfilePic: profile1,
    am: "Logan Thomas",
  },
];

const accountManagerData = [
  {
    accountManagerId: 1,
    accountManagerProfilePic: profile1,
    accountManagerName: "ritu chauhan",
    assignedStatus: "assigned",
    activeCampaign: 5,
  },
  {
    accountManagerId: 2,
    accountManagerProfilePic: profile1,
    accountManagerName: "divya joshi",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
  {
    accountManagerId: 3,
    accountManagerProfilePic: profile1,
    accountManagerName: "radhika ratra",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
  {
    accountManagerId: 4,
    accountManagerProfilePic: profile1,
    accountManagerName: "jyoti jain",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
  {
    accountManagerId: 5,
    accountManagerProfilePic: profile1,
    accountManagerName: "manvi arora",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
  {
    accountManagerId: 1,
    accountManagerProfilePic: profile1,
    accountManagerName: "ritu chauhan",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
  {
    accountManagerId: 2,
    accountManagerProfilePic: profile1,
    accountManagerName: "divya joshi",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
  {
    accountManagerId: 3,
    accountManagerProfilePic: profile1,
    accountManagerName: "radhika ratra",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
  {
    accountManagerId: 4,
    accountManagerProfilePic: profile1,
    accountManagerName: "jyoti jain",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
  {
    accountManagerId: 5,
    accountManagerProfilePic: profile1,
    accountManagerName: "manvi arora",
    assignedStatus: "assign to",
    activeCampaign: 5,
  },
];

export interface SortConfigInterface {
  key: string;
  orderBy: "ASC" | "DESC";
}

export interface FilterConfigInterface {
  marketer_id: number | null;
  name: string;
  niche_id: number | null;
  AM2: number | null;
  page: number;
  limit: number;
}

interface ProfilePictureInterface {
  id: number;
  img_name: string;
  img_url: string | null;
  is_active: true;
}

interface AM2Interface {
  id: number;
  user_name: string;
  admin_role: string;
  user: {
    id: number;
    first_name: string;
    last_name: string | null;
    profile_picture: ProfilePictureInterface | null;
  };
}
interface BrandDetailsInterface {
  id: number;
  brand_name: string;
  brand_website: string;
  designation: string;
  industry: string | null;
  niche_category: {
    id: number;
    niche_name: string;
  };
}

interface MarketerDataInterface {
  id: number;
  work_at: string | null;
  profile_completion: number;
  created_at: string;
  company_logo: ProfilePictureInterface | null;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    profile_picture: ProfilePictureInterface | null;
  };
  brand_details: BrandDetailsInterface | null;
  campaign: {
    active: number;
    completed: number;
  };
  AM2: AM2Interface | null;
}

interface SelectOptionForNichesInterface {
  value: number;
  label: string;
}

const AdminCompanyTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [showAmConfirmationModal, setShowAmConfirmationModal] = useState(false);
  const [tableDataRange, setTableDataRange] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { state } = useContext(FormDataContext);
  const { niche } = state;

  const nicheOptions = niche.map((data) => ({
    value: data.id,
    label: data.niche_name,
  }));

  const startIndex = (currentPage - 1) * tableDataRange;
  const endIndex = startIndex + tableDataRange;
  const slicedCompanyTableData = companyTableData.slice(startIndex, endIndex);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Function to toggle between ascending and descending sorting orders
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Function to sort data based on name
  const handleSortByName = () => {
    toggleSortOrder();
    const sorted = [...companyTableData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });
    companyTableData.splice(0, companyTableData.length, ...sorted);
  };

  const handleSortByActiveCampaigns = () => {
    toggleSortOrder();
    const sorted = [...companyTableData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.activeCampaigns - b.activeCampaigns;
      } else {
        return b.activeCampaigns - a.activeCampaigns;
      }
    });
    companyTableData.splice(0, companyTableData.length, ...sorted);
  };

  const handleSortByCompletedCampaigns = () => {
    toggleSortOrder();
    const sorted = [...companyTableData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.completedCampaigns - b.completedCampaigns;
      } else {
        return b.completedCampaigns - a.completedCampaigns;
      }
    });
    companyTableData.splice(0, companyTableData.length, ...sorted);
  };

  const handleSortByProfileCompleted = () => {
    toggleSortOrder();
    const sorted = [...companyTableData].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.profileCompleted - b.profileCompleted;
      } else {
        return b.profileCompleted - a.profileCompleted;
      }
    });
    companyTableData.splice(0, companyTableData.length, ...sorted);
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

  const handleShowAMModal = () => {
    setShowModal(true);
  };

  const handleCloseAMModal = () => {
    setShowModal(false);
  };

  const handleShowAMConfirmationModal = () => {
    setShowAmConfirmationModal(true);
  };

  const handleCloseAMConfirmationModal = () => {
    setShowAmConfirmationModal(false);
  };
  //new

  const [filterConfig, setFilterConfig] = useState<FilterConfigInterface>({
    marketer_id: null,
    name: "",
    niche_id: null,
    AM2: null,
    page: 1,
    limit: 6,
  });

  const [lastPage, setLastPage] = useState<number>(1);

  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    key: "id",
    orderBy: "DESC",
  });
  const [marketerData, setMarketerData] = useState<
    MarketerDataInterface[] | null
  >(null);

  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });
  const [tableLoading, setTableLoading] = useState<boolean>(true);

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const headers = {
    authorization: `Bearer ${access_token}`,
  };

  const handleTableDataRange = (range: number) => {
    setFilterConfig((prev) => ({
      ...prev,
      limit: range,
    }));
    setCurrentPage(1);
  };

  const fetchMarketerTableData = async () => {
    const marketerTableData = `${process.env.REACT_APP_API_URL}admin/marketer`;
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

  useEffect(() => {
    fetchMarketerTableData();
  }, []);

  const handleClearFilterConfig = () => {
    setFilterConfig((prev) => ({
      ...prev,
      marketer_id: null,
      name: "",
      niche_id: null,
      AM2: null,
    }));
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericFields = ["marketer_id", "niche_id", "AM2"];
    setFilterConfig((prevState) => ({
      ...prevState,
      [name]: numericFields.includes(name)
        ? value === "" || isNaN(Number(value))
          ? null
          : Number(value)
        : value,
    }));
  };

  const handleSelectChangeNiche = (
    newValue: SingleValue<SelectOptionForNichesInterface>
  ) => {
    setFilterConfig((prev) => ({
      ...prev,
      niche_id: newValue ? Number(newValue.value) : null, // Convert string to number or use null
    }));
  };

  console.log(filterConfig);
  return (
    <div className="bg-[#EBEBEB] h-full p-3">
      <div className="bg-white rounded-md py-4 px-2 mb-3">
        <div className="flex justify-evenly">
          <input
            type="text"
            name="marketer_id"
            placeholder="Marketer Id"
            onChange={handleChangeInput}
            value={
              filterConfig.marketer_id !== null ? filterConfig.marketer_id : ""
            }
            className="rounded-[4px] h-8 text-sm px-3 w-36 2xl:w-60 bg-[#EBEBEB] custom-input"
          />
          <input
            type="text"
            placeholder="Marketer Name"
            name="name"
            onChange={handleChangeInput}
            value={filterConfig.name}
            className="rounded-[4px] h-8 text-sm px-3 w-36 2xl:w-60 bg-[#EBEBEB] custom-input"
          />
          <Select
            placeholder="Niche"
            className="rounded-[4px] h-8 text-sm px-2 w-36 2xl:w-60 bg-[#EBEBEB] custom-input z-10"
            options={nicheOptions}
            onChange={(newValue) => handleSelectChangeNiche(newValue)}
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
            name="AM2"
            placeholder="AM"
            value={filterConfig.AM2 !== null ? filterConfig.AM2 : ""}
            className="rounded-[4px] h-8 text-sm px-3 w-36 2xl:w-60 bg-[#EBEBEB] custom-input"
            onChange={handleChangeInput}
          />
          <button
            className="bg-[#4267B2] rounded-[4px] w-36 2xl:w-60"
            onClick={fetchMarketerTableData}>
            <p className="text-white text-sm">Search</p>
          </button>
          <button
            className="bg-[#FDC100] rounded-[4px] w-36 2xl:w-60"
            onClick={handleClearFilterConfig}>
            <p className="text-white text-sm">Clear</p>
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
                    onClick={() => handleTableDataRange(6)}>
                    <p className="text-xs 3xl:text-sm font-medium">
                      <span className="font-bold mx-1 border-b">6</span>
                      Rows
                    </p>
                  </CDropdownItem>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    onClick={() => handleTableDataRange(12)}>
                    <p className="text-xs 3xl:text-sm font-medium">
                      <span className="font-bold mx-1 border-b">12</span>
                      Rows
                    </p>
                  </CDropdownItem>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    onClick={() => handleTableDataRange(25)}>
                    <p className="text-xs 3xl:text-sm font-medium">
                      <span className="font-bold mx-1 border-b">25</span>
                      Rows
                    </p>
                  </CDropdownItem>
                  <CDropdownItem
                    className="select-none active:bg-[#4267b2]"
                    onClick={() => handleTableDataRange(50)}>
                    <p className="text-xs 3xl:text-sm font-medium">
                      <span className="font-bold mx-1 border-b">50</span>
                      Rows
                    </p>
                  </CDropdownItem>
                </CDropdownMenu>
              </CDropdown>
            </div>
          </div>
        </div>
        <div className="text-center overflow-x-scroll w-full">
          <table className="w-full">
            <thead className="table-row-border">
              <tr className="table-row-border">
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  Id
                </th>
                <th className="px-14  text-xs 3xl:text-sm" rowSpan={2}>
                  <button onClick={handleSortByName} className="items-center">
                    Name
                    {sortOrder === "asc" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14  text-xs 3xl:text-sm " rowSpan={2}>
                  Company
                </th>
                <th className="px-14  text-xs 3xl:text-sm " rowSpan={2}>
                  Designation
                </th>
                <th className="px-14  text-xs 3xl:text-sm " rowSpan={2}>
                  Industry
                </th>
                <th className="px-14  text-xs 3xl:text-sm " rowSpan={2}>
                  Niche
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  <button
                    onClick={handleSortByProfileCompleted}
                    className="items-center">
                    Profile Completed
                    {sortOrder === "asc" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm border-x" colSpan={2}>
                  Campaigns
                </th>
                <th className="px-14 text-xs 3xl:text-sm " rowSpan={2}>
                  AM
                </th>
                <th className="px-14 text-xs 3xl:text-sm" rowSpan={2}>
                  Action
                </th>
              </tr>
              <tr className="table-row-border">
                <th className="px-14 text-xs 3xl:text-sm border-l">
                  <button
                    onClick={handleSortByActiveCampaigns}
                    className="items-center">
                    Active
                    {sortOrder === "asc" ? (
                      <i className="fa-solid fa-caret-down ml-1"></i>
                    ) : (
                      <i className="fa-solid fa-caret-up ml-1"></i>
                    )}
                  </button>
                </th>
                <th className="px-14 text-xs 3xl:text-sm border-x">
                  <button
                    onClick={handleSortByCompletedCampaigns}
                    className="items-center">
                    Completed
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
              {marketerData && marketerData.length > 0 ? (
                marketerData.map((tableData, index) => (
                  <tr key={index} className="w-full table-row-border">
                    <td className="whitespace-nowrap py-3">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.id}.
                      </p>
                    </td>

                    <td className="py-3">
                      <div className="flex items-center ">
                        <div className="w-3/12 flex justify-start">
                          <img
                            src={
                              tableData.user.profile_picture &&
                              tableData.user.profile_picture.img_url !== null
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

                    <td className=" py-3">
                      <div className="flex items-center">
                        <div className="w-3/12 flex justify-end">
                          <img
                            src={
                              tableData.company_logo &&
                              tableData.company_logo.img_url &&
                              tableData.company_logo.img_url !== null
                                ? tableData.company_logo.img_url
                                : ""
                            }
                            alt=""
                            className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                          />
                        </div>
                        <div className="w-9/12  flex justify-center">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.brand_details &&
                            tableData.brand_details !== null
                              ? truncateName(
                                  tableData.brand_details.brand_name
                                    .charAt(0)
                                    .toUpperCase() +
                                    tableData.brand_details.brand_name.slice(1)
                                )
                              : "be"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="whitespace-nowrap py-3">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.brand_details &&
                        tableData.brand_details !== null ? (
                          truncateName(
                            tableData.brand_details.designation
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")
                          )
                        ) : (
                          <i className="fa-solid fa-minus"></i>
                        )}
                      </p>
                    </td>

                    <td className="whitespace-nowrap py-3">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.brand_details &&
                        tableData.brand_details.industry &&
                        tableData.brand_details.industry !== null ? (
                          tableData.brand_details.industry
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                        ) : (
                          <i className="fa-solid fa-minus"></i>
                        )}
                      </p>
                    </td>
                    <td className="whitespace-nowrap py-3">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.brand_details &&
                        tableData.brand_details !== null ? (
                          tableData.brand_details.niche_category.niche_name
                            .charAt(0)
                            .toUpperCase() +
                          tableData.brand_details.niche_category.niche_name.slice(
                            1
                          )
                        ) : (
                          <i className="fa-solid fa-minus"></i>
                        )}
                      </p>
                    </td>
                    <td className="whitespace-nowrap py-3 flex items-center justify-center">
                      <div className="w-10 h-10">
                        <CircularProgressbar
                          value={tableData.profile_completion}
                          text={`${tableData.profile_completion}%`}
                          styles={buildStyles({
                            textSize: "20px",
                            textColor:
                              tableData.profile_completion < 50
                                ? "#DB6261" // Red if profile_completion is less than 50
                                : tableData.profile_completion <= 75
                                ? "#FDC100" // Yellow if profile_completion is between 51 to 75
                                : tableData.profile_completion < 100
                                ? "#4267B2" // Blue if profile_completion is between 76 to 99
                                : "#52AD60", // Green if profile_completion is 100,
                            pathColor:
                              tableData.profile_completion < 50
                                ? "#DB6261" // Red if profile_completion is less than 50
                                : tableData.profile_completion <= 75
                                ? "#FDC100" // Yellow if profile_completion is between 51 to 75
                                : tableData.profile_completion < 100
                                ? "#4267B2" // Blue if profile_completion is between 76 to 99
                                : "#52AD60", // Green if profile_completion is 100
                            trailColor: "#EAEAEA",
                            strokeLinecap: "butt",
                            rotation: 0.5,
                            pathTransitionDuration: 0.5,
                          })}
                        />
                      </div>
                    </td>

                    <td className="whitespace-nowrap py-3">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.campaign.active}
                      </p>
                    </td>
                    <td className="whitespace-nowrap py-3">
                      <p className="text-xs 3xl:text-sm font-medium">
                        {tableData.campaign.completed}
                      </p>
                    </td>
                    <td className="py-3 whitespace-nowrap">
                      {tableData.AM2 !== null ? (
                        <div className="flex items-center">
                          <div className="w-3/12 flex justify-end">
                            <img
                              src={
                                tableData.AM2.user.profile_picture &&
                                tableData.AM2.user.profile_picture.img_url !==
                                  null
                                  ? tableData.AM2.user.profile_picture.img_url
                                  : ""
                              }
                              alt=""
                              className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                            />
                          </div>
                          <div className="w-9/12 items-center flex pl-5">
                            <p className="text-xs 3xl:text-sm font-medium">
                              {`${tableData.AM2.user.first_name} ${
                                tableData.AM2.user.last_name &&
                                tableData.AM2.user.last_name
                              }`}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="`whitespace-nowrap text-sm">
                          Assign Account manager
                        </p>
                      )}
                    </td>
                    <td className="whitespace-nowrap py-3">
                      <button onClick={handleShowAMModal}>
                        <i className="fa-solid fa-ellipsis-vertical ml-3"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <div className="h-40vh">
                  <div className="justify-center item-center flex">hello</div>
                </div>
              )}
            </tbody>
          </table>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-3 rounded-md w-3/12">
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
                  {/* {accountManagerData.map((accountManager, index) => (
                    <div className="flex items-center justify-between p-3 border-b-1 ">
                      <div className="flex items-center">
                        <img
                          src={accountManager.accountManagerProfilePic}
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full"
                          alt=""
                        />
                        <div className="ml-3 flex flex-col 3xl:flex-row 3xl:items-baseline">
                          <p className="font-sm 3xl:font-base font-medium text-left">
                            {truncateName(accountManager.accountManagerName)}
                          </p>
                          <p className="text-xs ml-0 3xl:ml-1 font-medium text-[#787575]">
                            (Active Campaign: {accountManager.activeCampaign})
                          </p>
                        </div>
                      </div>
                      <button
                        className={`flex py-1 px-2 rounded-md ${
                          accountManager.assignedStatus === "assigned"
                            ? "bg-[#52AD60]"
                            : "bg-[#B1B1B1]"
                        } `}
                        onClick={handleShowAMConfirmationModal}>
                        <p className="text-[10px] 3xl:text-xs text-white">
                          {truncateName(accountManager.assignedStatus)}
                        </p>
                      </button>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          )}
          {showAmConfirmationModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
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

export default AdminCompanyTable;
