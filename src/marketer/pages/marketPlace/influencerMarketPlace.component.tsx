import React, { Fragment, useContext, useEffect, useState } from "react";
// import AdminProfileSettings from "../../../admin/components/adminProfileForm.component/adminProfileForm.component";
// import InfluencerGeneralInfo from "../../components/influencerMarketPlace/influencerGenralInfo.component";
import InfluencerMarketplaceCard from "../../components/cards/influencerCardForMarketPlace.component";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { influencerData } from "../../../seeder";
import Loader from "../../../global/global_component/loader/loader.component";
import Pagination from "../../../global/global_component/pagination/paginationWithNumber.component";
import CIcon from "@coreui/icons-react";
import { cilFilter } from "@coreui/icons";
import Select, { SingleValue } from "react-select";
import { FormDataContext } from "../../../utils/context/formData/formData.context";
export interface InfluencerInterFaceForMarketplace {
  id: number;
  gender: string;
  influencer: {
    id: number;
    interest: string;
    niche: {
      niche_name: string;
    };
    youtube_channel_ids: [
      {
        channel_name: string;
        subscriber_count: string;
      }
    ];
  };
  profile_picture: [
    {
      img_name: string;
      img_url: string;
    }
  ];
  platform: string[];
  fullName: string;
}
interface OptionInterface {
  value: number;
  label: string;
}

const GenderOptions = [
  {
    value: "",
    label: "Select Gender",
  },
  {
    value: "m",
    label: "Male",
  },
  {
    value: "f",
    label: "Female",
  },
  {
    value: "o",
    label: "Other",
  },
];

export interface FilterConfigInterface {
  gender: "" | "m" | "f" | "o";
  niche_id: number | null;
  city: number | null;
  state: string;
}

const InfluencerMarketPlace = () => {
  const [data, setData] = useState<InfluencerInterFaceForMarketplace[] | null>(
    []
  );
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [nicheOptions, setNicheOptions] = useState<OptionInterface[]>([]);
  const [cityOptions, setCityOptions] = useState<OptionInterface[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [stateOptions, setStateOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const { state } = useContext(FormDataContext);
  const { niche, locationData } = state;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    try {
      let campaignMarketplaceApiUrl = `${process.env.REACT_APP_API_URL}marketers/influencer-marketplace`;
      const { data } = await axios.get(campaignMarketplaceApiUrl, {
        params: {
          page: currentPage,
          ...filterConfig,
        },
        headers: {
          authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
      });
      setData(data.data.Influencers);
      setCurrentPage(data.pagination.page);
      setLastPage(data.pagination.lastPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

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
        value: description,
        label: description,
      }));

      setStateOptions(stateOptions);
    }
  }, []);

  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };
  const [filterConfig, setFilterConfig] = useState<FilterConfigInterface>({
    niche_id: null,
    city: null,
    gender: "",
    state: "",
  });

  const ClearFilterConfig = () => {
    setFilterConfig({ niche_id: null, city: null, gender: "", state: "" });
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

  const handleStringValueSelectChange = (
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

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full">
          <div className="bg-[#EBEBEB] h-full p-3">
            <div className="bg-white py-2 px-2 rounded-md">
              <div className="flex justify-evenly items-center">
                <h1 className="text-lg font-bold mt-2 mb-3">
                  Influencer Marketplace
                </h1>

                <div className="flex justify-center items-center">
                  <input
                    type="text"
                    placeholder="Search"
                    className="rounded-l-md h-8 text-sm px-3 w-60 2xl:w-80 bg-[#EBEBEB] custom-input"
                    name="search"
                    value={searchValue}
                    onChange={handleChangeValue}
                  />
                  <button className="bg-[#4267B2] text-white h-8 rounded-r-md px-4 2xl:w-60">
                    Search
                  </button>
                  <button
                    className="bg-ri-orange text-white h-8 rounded-[4px] mx-2 px-3"
                    onClick={toggleModal}>
                    Filter
                    <CIcon icon={cilFilter} className="mx-2" />
                  </button>
                </div>
              </div>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg w-96">
                  <div className="w-full flex justify-between items-center">
                    <h2 className="text-lg font-bold mb-4">Filter Options</h2>
                    <button
                      onClick={toggleModal}
                      className="rounded-md p-2 inline-flex items-center justify-center  hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ri-blue">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium">Cities</label>
                    <Select
                      placeholder="City"
                      className="rounded-[4px] h-8 text-sm px-2 w-full bg-[#EBEBEB] custom-input"
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

                  <div className="mb-4">
                    <label className="block text-sm font-medium">State</label>
                    <Select
                      placeholder="State"
                      className="rounded-[4px] h-8 text-sm px-2 w-full bg-[#EBEBEB] custom-input"
                      options={stateOptions}
                      value={
                        stateOptions.find(
                          (option) => option.value === filterConfig.state
                        ) || null
                      }
                      onChange={(selectedOption) =>
                        handleStringValueSelectChange(selectedOption, "state")
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

                  <div className="mb-4">
                    <label className="block text-sm font-medium">Niche</label>
                    <Select
                      placeholder="Niche"
                      className="rounded-[4px] h-8 text-sm px-2 w-full bg-[#EBEBEB] custom-input"
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
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium">Gender</label>
                    <Select
                      placeholder="Gender"
                      className="rounded-[4px] h-8 text-sm px-2 w-full bg-[#EBEBEB] custom-input"
                      options={GenderOptions.map((option) =>
                        option.value === ""
                          ? { ...option, isDisabled: true }
                          : option
                      )}
                      value={
                        GenderOptions.find(
                          (option) => option.value === filterConfig.gender
                        ) || null
                      }
                      onChange={(selectedOption) =>
                        handleStringValueSelectChange(selectedOption, "gender")
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

                  <div className="flex justify-end space-x-2">
                    <button
                      className="bg-gray-300 text-black h-8 rounded-md px-4"
                      onClick={ClearFilterConfig}>
                      Clear
                    </button>
                    <button
                      className="bg-[#4267B2] text-white h-8 rounded-md px-4"
                      onClick={() => {
                        fetchData();
                        toggleModal();
                      }}>
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="border relative p-4 bg-white ">
              <h1 className=" text-2xl font-bold mx-auto text-center mb-4 pb-2 border-b-2 ">
                INFLUENCER
              </h1>
              <div className="flex bg-white ">
                <div className="grid grid-cols-1 1.4md:grid-cols-2 0.5xl:grid-cols-3 1.5xl:grid-cols-4 2.5xl:grid-cols-5 gap-4 mx-auto">
                  {data &&
                    data.map((influencerData) => (
                      <div key={influencerData.id}>
                        <InfluencerMarketplaceCard
                          data={influencerData}
                          key={influencerData.id}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={lastPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default InfluencerMarketPlace;
