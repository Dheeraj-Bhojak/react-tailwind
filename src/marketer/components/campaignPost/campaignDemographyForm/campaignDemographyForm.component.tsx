import React, { Fragment, useEffect, useState } from "react";
import Select, { OptionProps } from "react-select";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import axios from "axios";
import { campaignPostFormState } from "../campaignPostOverview/campaignPostOverview.component";

const CampaignGender = [
  {
    id: 3,
    title: "Any",
  },
  {
    id: 1,
    title: "Male",
  },
  {
    id: 2,
    title: "Female",
  },
];
const campaignLocation = [
  {
    id: 1,
    icon: "",
    title: "Choose location manually",
  },
  {
    id: 2,
    icon: "",
    title: "Global",
  },
];
export const customStyles = {
  option: (provided: any) => ({
    ...provided,
    padding: "16px 24px 24px 16px",
  }),
  control: (provided: any, state: any) => ({
    ...provided,

    border: "2px solid gray",
    boxShadow: state.isFocused ? "0px 0px 1px #fdc100" : "none",
    "&:hover": {
      border: "1px solid #gray",
    },
  }),

  multiValue: (provided: any) => ({
    ...provided,
    padding: "1px 10px 1px 10px ",
    font: "16px",
    borderRadius: "9999px",
  }),

  multiValueRemove: (provided: any, state: any) => ({
    ...provided,

    "&:hover": {
      backgroundColor: "#fdc100",
      color: "#4267B2",
    },
  }),
};

const Languages = [
  { value: "Hindi", label: "Hindi" },
  { value: "English", label: "English" },
  { value: "Bengali", label: "Bengali" },
  { value: "Telugu", label: "Telugu" },
  { value: "Marathi", label: "Marathi" },
  { value: "Tamil", label: "Tamil" },
  { value: "Urdu", label: "Urdu" },
  { value: "Gujarati", label: "Gujarati" },
  { value: "Kannada", label: "Kannada" },
  { value: "Odia", label: "Odia" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Assamese", label: "Assamese" },
  { value: "Sindhi", label: "Sindhi" },
  { value: "Nepali", label: "Nepali" },
  { value: "Konkani", label: "Konkani" },
  { value: "Manipuri", label: "Manipuri" },
  { value: "Kashmiri", label: "Kashmiri" },
  { value: "Santhali", label: "Santhali" },
  { value: "Maithili", label: "Maithili" },
  { value: "Haryanvi", label: "Haryanvi" },
  { value: "Garhwali", label: "Garhwali" },
];

interface locationAPiResponse {
  id: number;
  location_title: string;
  location_description: string;
  country: string;
}

interface City {
  value: string;
  label: string;
}

const CampaignAudienceDemography: React.FC<campaignPostFormState> = ({
  campaignPostState,
}) => {
  const { campaignFormObject, setCampaignFormObject } = campaignPostState;
  const audienceDemography = campaignFormObject.audience_demography;

  const [locationsData, setLocationsData] = useState<
    locationAPiResponse[] | null
  >(null);
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}marketer_campaign/locations`
        );
        setLocationsData(response.data.locationData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocations();
  }, []);

  const locationArrayForForm = Array.isArray(locationsData)
    ? locationsData.map((item) => ({
        label: `${item.location_title}, ${item.location_description}, ${item.country}`,
        value: item.id.toString(),
      }))
    : [];

  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(7);

  const handleChangeCampaignDemography = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setCampaignFormObject((prevState) => ({
      ...prevState,
      audience_demography: {
        ...prevState.audience_demography,
        [name]: value,
      },
    }));
  };

  const handleChangeLanguage = (selectedValues: any) => {
    if (selectedValues.length <= 2) {
      setCampaignFormObject((prevState) => ({
        ...prevState,
        audience_demography: {
          ...prevState.audience_demography,
          languages: selectedValues,
        },
      }));
    }
  };

  const handleChangeLocation = (selectedValues: any) => {
    if (selectedValues.length <= 3) {
      setCampaignFormObject((prevState) => ({
        ...prevState,
        audience_demography: {
          ...prevState.audience_demography,
          locations: selectedValues,
        },
      }));
    }
  };

  const handleEngagementRateChange = (e: any) => {
    setCampaignFormObject((prevAudienceDemography) => ({
      ...prevAudienceDemography,
      audience_demography: {
        ...prevAudienceDemography.audience_demography,
        audience_age_min: e.minValue,
        audience_age_max: e.maxValue,
      },
    }));
  };

  return (
    <div className="" id="marketerBrandForm">
      <div className="bg-white">
        <div className="p-3">
          <div className="w-full  ">
            <div className="2xl:w-3/4 w-full mx-auto  rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md p-5 ">
              <h1 className=" text-3xl font-bold  mb-2 ">
                Audience Demography
              </h1>
              <h1 className=" text-xl font-bold mt-3 mb-2 ">Audience Gender</h1>
              <div className="mt-3 w-full  lg:flex">
                {CampaignGender.map((objective, indx) => {
                  return (
                    <div
                      className={` w-full m-2 justify-between select-none rounded-md ${
                        audienceDemography.gender === objective.title
                          ? "border-3 border-ri-orange"
                          : "border-3"
                      }`}
                      key={indx}>
                      <label className=" cursor-pointer flex p-3">
                        <input
                          type="radio"
                          name="gender"
                          className="hidden "
                          value={objective.title}
                          checked={
                            audienceDemography.gender === objective.title
                          }
                          onChange={handleChangeCampaignDemography}
                        />
                        <p className="font-bold text-lg mx-auto ">
                          {objective.title}
                        </p>
                      </label>
                    </div>
                  );
                })}
              </div>

              <h1 className=" text-3xl font-bold mt-3 mb-2 ">Audience Age</h1>
              <div className="mt-2 flex">
                <span className="font-semibold my-auto">
                  Audience Age Range:
                </span>
                <div className="px-4 py-2 border-gray-200 rounded-lg ml-6 border-1">
                  <span>{audienceDemography.audience_age_min}</span>
                  {" - "}
                  <span>{audienceDemography.audience_age_max}</span>
                </div>
              </div>
              <div className="multi-range-slider-container w-full lg:w-10/12 mt-6">
                <MultiRangeSlider
                  className="text-gray-500"
                  style={{
                    border: "none",
                    boxShadow: "none",
                    padding: "15px 10px",
                  }}
                  min={12}
                  max={100}
                  step={6}
                  stepOnly={true}
                  minValue={audienceDemography.audience_age_min}
                  maxValue={audienceDemography.audience_age_max}
                  barInnerColor="#444"
                  barLeftColor="#fff"
                  barRightColor="#fff"
                  thumbLeftColor="#fdcd33"
                  thumbRightColor="#fdcd33"
                  preventWheel={true}
                  ruler={false}
                  onChange={handleEngagementRateChange}
                  onInput={(e: ChangeResult) => {
                    setMinValue(e.minValue);
                    setMaxValue(e.maxValue);
                  }}></MultiRangeSlider>
              </div>

              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Audience Language{" "}
                <span className="text-[10px] text-gray-600">
                  (You can select maximum 2 languages*)
                </span>
              </h1>
              <div className="w-full">
                <Select
                  options={Languages}
                  isMulti
                  value={audienceDemography.languages}
                  onChange={handleChangeLanguage}
                  className=""
                  styles={customStyles}
                />
              </div>
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Audience Locations{" "}
              </h1>
              <div className="mt-10 w-full  lg:flex">
                {campaignLocation.map((objective, indx) => {
                  return (
                    <div
                      className={` w-full m-3 justify-between select-none ${
                        audienceDemography.location_type === objective.title
                          ? "border-4 border-ri-orange"
                          : "border-1"
                      }`}
                      key={indx}>
                      <label className=" cursor-pointer flex p-2">
                        <input
                          type="radio"
                          name="location_type"
                          className="hidden "
                          value={objective.title}
                          checked={
                            audienceDemography.location_type === objective.title
                          }
                          onChange={handleChangeCampaignDemography}
                        />
                        <p className="font-bold text-lg mx-auto ">
                          {objective.title}
                        </p>
                      </label>
                    </div>
                  );
                })}
              </div>
              {audienceDemography.location_type ===
              campaignLocation[0].title ? (
                <Fragment>
                  <h1 className=" text-3xl font-bold mt-5 mb-2 rounded-t-md">
                    Audience location{" "}
                    <span className="text-[10px] text-gray-600">
                      (You can select maximum 3 locations*)
                    </span>
                  </h1>
                  <div className="w-full">
                    <Select
                      options={locationArrayForForm}
                      isMulti
                      value={audienceDemography.locations}
                      onChange={handleChangeLocation}
                      className="mb-72"
                      styles={customStyles}
                    />
                  </div>
                </Fragment>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAudienceDemography;
