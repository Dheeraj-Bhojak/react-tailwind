import { cibInstagram, cilBullhorn, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useState, useContext, useEffect, Fragment } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { CampaignPostStateType } from "../postCampaignHeader.component";
import _, { toUpper, upperFirst } from "lodash";
import Select from "react-select";
import { Languages, niches_categories } from "../../../../seeder";
import { customStyles } from "../campaignDemographyForm/campaignDemographyForm.component";
import axios from "axios";

export interface campaignPostFormState {
  campaignPostState: {
    campaignFormObject: CampaignPostStateType;
    setCampaignFormObject: React.Dispatch<
      React.SetStateAction<CampaignPostStateType>
    >;
  };
}

interface DeliverableDetail {
  deliverableName: string;
  deliverableDescription: string;
  media_type: string;
}

interface locationAPiResponse {
  id: number;
  location_title: string;
  location_description: string;
  country: string;
}

const CampaignObjective = [
  {
    id: 1,
    title: "Views_or_Reach",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quibusdam. ",
  },
  {
    id: 2,
    title: "Traffic",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quibusdam. ",
  },
  {
    id: 3,
    title: "Conversions",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Non, quibusdam. ",
  },
];

const CampaignInfluencerCategory = [
  {
    id: 1,
    title: "Nano",
    description: "Below 10k Followers/ Subscribers",
  },
  {
    id: 2,
    title: "Micro",
    description: "10k to 100k Followers/ Subscribers ",
  },
  {
    id: 3,
    title: "Macro",
    description: "100k and above Followers/ Subscribers",
  },
];

const CampaignNumberOfInfluencer = [
  {
    id: 1,
    title: "1-10 Influencer",
  },
  {
    id: 2,
    title: "11-20 Influencer",
  },
  {
    id: 3,
    title: "21-50 Influencer",
  },
  {
    id: 4,
    title: "50+ influencer",
  },
];

type CampaignOverviewObject = {
  objective: string;
  campaign_name: string;
  instagram_handle: string;
  platform: string;
  influencer_category: number | null;
  niches_category_id: number | null;
  influencer_languagesIds: { value: string; label: string }[];
  influencer_locationIds: { value: string; label: string }[];
  engagement_rate_min: number;
  engagement_rate_max: number;
  youtube_deliverables: YoutubeDeliverables;
  instagram_deliverables: InstagramDeliverables;
  number_of_influencer: Number;
};

export type InstagramDeliverables = {
  reels: number;
  story_with_link: number;
  video_post: number;
  static_post: number;
};

export type YoutubeDeliverables = {
  dedicated_video: number;
  integrated_video: number;
  shorts: number;
};

const CampaignOverviewComponent: React.FC<campaignPostFormState> = ({
  campaignPostState,
}) => {
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(7);

  const { campaignFormObject, setCampaignFormObject } = campaignPostState;
  const campaignOverview = campaignFormObject.campaign_overview;

  const handleChangeCampaignOverview = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    if (name === "number_of_influencer" || name === "influencer_category") {
      const numericValue = parseInt(value, 10);
      setCampaignFormObject((prev) => ({
        ...prev,
        campaign_overview: {
          ...prev.campaign_overview,
          [name]: numericValue,
        },
      }));
    } else {
      setCampaignFormObject((prev) => ({
        ...prev,
        campaign_overview: {
          ...prev.campaign_overview,
          [name]: value,
        },
      }));
    }
  };

  const handleChangeLanguage = (selectedValues: any) => {
    if (selectedValues.length <= 2) {
      setCampaignFormObject((prevState) => ({
        ...prevState,
        campaign_overview: {
          ...prevState.campaign_overview,
          influencer_languagesIds: selectedValues,
        },
      }));
    }
  };

  const handleNicheChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedValue: string = event.target.value;
    const nicheId: number = parseInt(selectedValue, 10);
    setCampaignFormObject((prevState) => ({
      ...prevState,
      campaign_overview: {
        ...prevState.campaign_overview,
        niches_category: nicheId,
      },
    }));
  };

  const LanguagesArray = Languages.map((language) => ({
    value: language.id.toString(),
    label: language.language_name,
  }));

  const handleEngagementRateChange = (e: any) => {
    setCampaignFormObject((prevCampaign) => ({
      ...prevCampaign,
      campaign_overview: {
        ...prevCampaign.campaign_overview,
        engagement_rate_min: e.minValue,
        engagement_rate_max: e.maxValue,
      },
    }));
  };

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

  const handleInfluencerChangeLocation = (selectedValues: any) => {
    if (selectedValues.length <= 5) {
      setCampaignFormObject((prevState) => ({
        ...prevState,
        campaign_overview: {
          ...prevState.campaign_overview,
          influencer_locationIds: selectedValues,
        },
      }));
    }
  };

  // TO DO

  const [deliverablesObject, setDeliverablesObject] = useState<{
    deliverableName: string;
    deliverableDescription: string;
    media_type: string;
  }>({
    deliverableName: "",
    deliverableDescription: "",
    media_type: "",
  });

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDeliverablesObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeDeliverable = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliverablesObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setCampaignFormObject((prev) => ({
      ...prev,
      campaign_overview: {
        ...prev.campaign_overview,
        deliverable_details: [
          ...prev.campaign_overview.deliverable_details,
          deliverablesObject,
        ],
      },
    }));
    setDeliverablesObject(() => ({
      deliverableName: "",
      deliverableDescription: "",
      media_type: "",
    }));
  };

  const removeDeliverable = (index: number) => {
    if (
      index > -1 &&
      index < campaignFormObject.campaign_overview.deliverable_details.length
    ) {
      setCampaignFormObject((prev) => {
        const newDeliverableDetails = [
          ...prev.campaign_overview.deliverable_details,
        ];
        newDeliverableDetails.splice(index, 1);
        return {
          ...prev,
          campaign_overview: {
            ...prev.campaign_overview,
            deliverable_details: newDeliverableDetails,
          },
        };
      });
    } else {
      console.log("Index out of bounds");
    }
  };

  // const countDeliverablesByName = () => {
  //   return deliverablesObject.reduce((acc, deliverable) => {
  //     if (acc[deliverable.deliverableName]) {
  //       acc[deliverable.deliverableName]++;
  //     } else {
  //       acc[deliverable.deliverableName] = 1;
  //     }
  //     return acc;
  //   }, {});
  // };
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const countYoutubeDeliverables = (data: DeliverableDetail[]) => {
    return data.reduce(
      (acc: YoutubeDeliverables, item: DeliverableDetail) => {
        if (item.media_type in acc) {
          acc[item.media_type as keyof YoutubeDeliverables]++;
        }
        return acc;
      },
      {
        dedicated_video: 0,
        integrated_video: 0,
        shorts: 0,
      }
    );
  };
  const countInstagramDeliverables = (data: DeliverableDetail[]) => {
    return data.reduce(
      (acc: InstagramDeliverables, item: DeliverableDetail) => {
        if (item.media_type in acc) {
          acc[item.media_type as keyof InstagramDeliverables]++;
        }
        return acc;
      },
      {
        reels: 0,
        story_with_link: 0,
        video_post: 0,
        static_post: 0,
      }
    );
  };
  useEffect(() => {
    const filterData = (): DeliverableDetail[] => {
      let deliverables: string[] = [];
      if (campaignFormObject.campaign_overview.platform === "instagram") {
        deliverables = Object.keys(
          campaignFormObject.campaign_overview.instagram_deliverables
        );
      } else if (campaignFormObject.campaign_overview.platform === "youtube") {
        deliverables = Object.keys(
          campaignFormObject.campaign_overview.youtube_deliverables
        );
      } else {
        return [];
      }
      return campaignFormObject.campaign_overview.deliverable_details.filter(
        (item) => deliverables.includes(item.media_type)
      );
    };
    const filteredData = filterData();
    setCampaignFormObject((prev) => ({
      ...prev,
      campaign_overview: {
        ...prev.campaign_overview,
        deliverable_details: filteredData,
      },
    }));
  }, [campaignFormObject.campaign_overview.platform]);

  useEffect(() => {
    if (
      campaignFormObject &&
      campaignFormObject.campaign_overview &&
      campaignFormObject.campaign_overview.deliverable_details &&
      campaignFormObject.campaign_overview.platform === "instagram"
    ) {
      const instagramDeliverables = countInstagramDeliverables(
        campaignFormObject.campaign_overview.deliverable_details
      );
      setCampaignFormObject((prev) => ({
        ...prev,
        campaign_overview: {
          ...prev.campaign_overview,
          instagram_deliverables: instagramDeliverables,
        },
      }));
    } else if (
      campaignFormObject &&
      campaignFormObject.campaign_overview &&
      campaignFormObject.campaign_overview.platform === "youtube"
    ) {
      const youtubeDeliverables = countYoutubeDeliverables(
        campaignFormObject.campaign_overview.deliverable_details
      );
      setCampaignFormObject((prev) => ({
        ...prev,
        campaign_overview: {
          ...prev.campaign_overview,
          youtube_deliverables: youtubeDeliverables,
        },
      }));
    }
  }, [campaignFormObject.campaign_overview.deliverable_details]);

  return (
    <div className="" id="marketerBrandForm ">
      <div className="bg-white">
        <div className="md:p-3">
          <div className="w-full  ">
            <div className="2xl:w-3/4 w-full mx-auto  rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md p-5 ">
              <h1 className=" text-3xl font-bold mb-2 ">
                What is your objective ?
              </h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae architecto, dolore quo maiores optio veniam?
              </span>
              <div className="mt-6 w-full lg:flex">
                {CampaignObjective.map((objective, indx) => (
                  <div
                    className={`mx-3 justify-between select-none rounded-md border-3 ${
                      campaignOverview.objective === objective.title
                        ? " border-ri-orange rounded-md"
                        : " "
                    }`}
                    key={indx}>
                    <label className="block cursor-pointer p-3">
                      <input
                        type="radio"
                        name="objective"
                        className="hidden "
                        value={objective.title}
                        checked={campaignOverview.objective === objective.title}
                        onChange={handleChangeCampaignOverview}
                      />
                      <span className="font-bold text-lg px-2">
                        {_.replace(objective.title, /_/g, " ")}
                      </span>
                      <p className="mt-1 ml-3 text-xs text-gray-600 font-thin">
                        {objective.description}
                      </p>
                    </label>
                  </div>
                ))}
              </div>
              <h1 className="text-3xl font-bold mt-5 mb- ">Campaign Name</h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae architecto, dolore quo maiores optio veniam?
              </span>
              <div className="flex mt-10">
                <div className="w-10 z-10 text-center pointer-events-none flex items-center justify-center">
                  <CIcon icon={cilBullhorn} className="text-black m-2" />
                </div>
                <input
                  name="campaign_name"
                  required
                  type="text"
                  placeholder="Winter Collection"
                  className="w-full -ml-10 pl-10 pr-3 py-4 border-b-4 border-ri-blue outline-none focus:border-ri-orange"
                  value={campaignOverview.campaign_name}
                  onChange={handleChangeCampaignOverview}
                />
              </div>
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Instagram Handle
              </h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiandae architecto, dolore quo maiores optio veniam?
              </span>
              <div className="flex mt-6">
                <div className="w-10 z-10 text-center pointer-events-none flex items-center justify-center">
                  <CIcon icon={cibInstagram} className="text-black m-2" />
                </div>
                <input
                  name="instagram_handle"
                  required
                  type="text"
                  placeholder="@handler"
                  className="w-full -ml-10 pl-10 pr-3 py-4 border-b-4 border-ri-blue outline-none focus:border-ri-orange"
                  value={campaignOverview.instagram_handle}
                  onChange={handleChangeCampaignOverview}
                />
              </div>
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Choose Platform
              </h1>
              <span className="text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repudiate archipenko, dolor quo maigres optic veniam?
              </span>
              <div className={`flex flex-wrap `}>
                <label
                  className={`p-2 m-3 cursor-pointer min-w-[40px] flex justify-center items-center `}>
                  <input
                    type="radio"
                    name="platform"
                    value="instagram"
                    className="hidden"
                    onChange={handleChangeCampaignOverview}
                  />
                  <i
                    className={`fa-brands fa-instagram fa-3x  ${
                      campaignOverview.platform === "instagram"
                        ? " bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-red-400 to-indigo-700"
                        : ""
                    }`}></i>
                </label>

                <label
                  className={`p-2 m-3 cursor-pointer min-w-[40px] flex justify-center items-center`}>
                  <input
                    type="radio"
                    name="platform"
                    value="youtube"
                    className="hidden"
                    onChange={handleChangeCampaignOverview}
                  />
                  <i
                    className={`fa-brands fa-youtube fa-3x   ${
                      campaignOverview.platform === "youtube"
                        ? " text-[#ff0000]"
                        : ""
                    }`}></i>
                </label>
              </div>
              {campaignOverview.platform ? (
                <div>
                  <h1 className=" text-3xl font-bold mt-3 mb-2 ">
                    Deliverables
                  </h1>
                  {campaignOverview.platform === "instagram" ? (
                    <ul>
                      {Object.entries(
                        campaignOverview.instagram_deliverables
                      ).map(([item, value], indx) => (
                        <li className="flex" key={indx}>
                          <p className="px-4 font-bold">{value}</p>
                          {_.startCase(_.toLower(item))}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                  {campaignOverview.platform === "youtube" ? (
                    <ul>
                      {Object.entries(
                        campaignOverview.youtube_deliverables
                      ).map(([item, value], indx) => (
                        <li className="flex" key={indx}>
                          <p className="px-4 font-bold">{value}</p>
                          {_.startCase(_.toLower(item))}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}

              {campaignOverview.platform ? (
                <div className="mb-2">
                  {" "}
                  <h1 className=" text-3xl font-bold mt-2 mb-2 ">
                    Deliverable
                  </h1>
                  <div className="mx-auto w-full ">
                    <form
                      onSubmit={handleSubmit}
                      className="max-w-full mx-auto mt-2 md:flex">
                      <div className="w-full md:w-5/12 flex">
                        <div className="mb-4 md:w-5/12 w-1/2">
                          <label
                            htmlFor="priority"
                            className="block mb-2 font-bold">
                            Priority
                          </label>
                          <select
                            id="priority"
                            value={deliverablesObject.media_type}
                            name={"media_type"}
                            onChange={handlePriorityChange}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            required>
                            {campaignOverview.platform === "instagram" ? (
                              <Fragment>
                                <option value={""} disabled>
                                  Select A Deliverable
                                </option>
                                {Object.entries(
                                  campaignOverview.instagram_deliverables
                                ).map(([item, value], index) => (
                                  <option
                                    key={index}
                                    className="text-sm"
                                    value={item}>
                                    {_.startCase(_.toLower(item))}
                                  </option>
                                ))}
                              </Fragment>
                            ) : (
                              <Fragment>
                                <option value={""} disabled>
                                  Select A Deliverable
                                </option>
                                {Object.entries(
                                  campaignOverview.youtube_deliverables
                                ).map(([item, value], index) => (
                                  <option
                                    key={index}
                                    className="text-sm"
                                    value={item}>
                                    {upperFirst(item)}
                                  </option>
                                ))}
                              </Fragment>
                            )}
                          </select>
                        </div>
                        <div className="mb-4 md:w-7/12 w-1/2 md:mx-2 ml-2 md:mr-1 ">
                          <label
                            htmlFor="taskName"
                            className="block mb-2 font-bold">
                            Deliverable Name
                          </label>
                          <input
                            type="text"
                            placeholder="Get Ready with me..."
                            name="deliverableName"
                            value={deliverablesObject.deliverableName}
                            onChange={handleChangeDeliverable}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-ri-orange"
                            required
                          />
                        </div>
                      </div>
                      <div className="mb-4 md:w-6/12 w-full ml-1 mr-2 ">
                        <label
                          htmlFor="description"
                          className="block mb-2 font-bold">
                          Deliverable Description
                        </label>
                        <input
                          id="description"
                          placeholder="Creators record themselves getting ready for the day or a special event"
                          type="text"
                          name="deliverableDescription"
                          value={deliverablesObject.deliverableDescription}
                          onChange={handleChangeDeliverable}
                          className="w-full px-3 py-2 border rounded-lg focus:outline-ri-orange"
                          required
                        />
                      </div>
                      <div className="my-auto">
                        <button className="border h-11 mt-2 px-2 bg-ri-blue text-white text-sm rounded-md ">
                          <i className="fa-solid fa-plus"></i> Add Deliverable
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                ""
              )}

              {campaignFormObject.campaign_overview.deliverable_details &&
              campaignFormObject.campaign_overview.deliverable_details.length >
                0
                ? campaignFormObject.campaign_overview.deliverable_details.map(
                    (deliverable, index) => {
                      return (
                        <div className="w-full mx-auto border mb-2  text-gray-700 ">
                          <div className="w-full flex">
                            <div
                              className="w-10/12 flex cursor-pointer"
                              onClick={() => handleToggle(index)}>
                              <div className="w-1/2">
                                <p className="font-bold p-2">
                                  {_.startCase(
                                    _.toLower(deliverable.media_type)
                                  )}
                                </p>
                              </div>
                              <div className="w-1/2">
                                <p className=" font-semibold p-2 overflow-hidden">
                                  {upperFirst(deliverable.deliverableName)}
                                </p>
                              </div>
                            </div>
                            <div className="w-2/12 flex justify-center ">
                              <button
                                onClick={() => removeDeliverable(index)}
                                className="text-center cursor-pointer rounded-lg bg-gray-200 p-1 m-1">
                                <CIcon
                                  icon={cilTrash}
                                  className="text-xl text-red-500"
                                />
                              </button>
                            </div>
                          </div>
                          {activeIndex === index && (
                            <div className="p-2  border-t">
                              <p className="mb-2">
                                {deliverable.deliverableName}
                              </p>
                              <p className="text-xs md:px-4">
                                {deliverable.deliverableDescription}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )
                : ""}
              <h1 className=" text-3xl font-bold mt-4 mb-2 ">
                Influencer Category
              </h1>
              <div className="mt-2 w-full lg:flex">
                {CampaignInfluencerCategory.map((objective, indx) => {
                  return (
                    <div
                      className={`m-2 justify-between select-none lg:w-1/3 w-full ${
                        campaignOverview.influencer_category === objective.id
                          ? "border-3 border-ri-orange rounded-md"
                          : "border-3 rounded-md"
                      }`}
                      key={indx}>
                      <label className="block cursor-pointer p-3">
                        <input
                          type="radio"
                          name="influencer_category"
                          className="hidden"
                          value={objective.id}
                          checked={
                            campaignOverview.influencer_category ===
                            objective.id
                          }
                          onChange={handleChangeCampaignOverview}
                        />
                        <p className="font-bold text-lg mx-auto ">
                          {objective.title}
                        </p>
                        <p className="mt-2 text-xs text-gray-600">
                          {objective.description}
                        </p>
                      </label>
                    </div>
                  );
                })}
              </div>
              <h1 className=" text-3xl font-bold mt-4 mb-2 ">
                Engagement Rate
              </h1>
              <div className="multi-range-slider-container w-full lg:w-1/2 mt-10">
                <MultiRangeSlider
                  className="text-gray-500"
                  style={{
                    border: "none",
                    boxShadow: "none",
                    padding: "15px 10px",
                  }}
                  min={0.5}
                  max={20}
                  step={0.1}
                  minValue={campaignOverview.engagement_rate_min}
                  maxValue={campaignOverview.engagement_rate_max}
                  barInnerColor="#999"
                  barLeftColor="#fff"
                  barRightColor="#fff"
                  ruler={false}
                  onChange={handleEngagementRateChange}
                  onInput={(e: ChangeResult) => {
                    setMinValue(e.minValue);
                    setMaxValue(e.maxValue);
                  }}></MultiRangeSlider>
                <div className="mt-3">
                  <h1>
                    Engagement Rate:{" "}
                    <span className="p-1 border-1 m-1 bg-gray-100 rounded-lg text-sm font-semibold   ">
                      {campaignOverview.engagement_rate_min}
                    </span>
                    <span className="p-1 border-1 m-1 bg-gray-100 rounded-lg text-sm font-semibold   ">
                      {campaignOverview.engagement_rate_max}
                    </span>
                  </h1>
                </div>
              </div>
              <div>
                <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                  Influencer Details
                </h1>
                <div className="w-full lg:flex  ">
                  <div className="lg:w-1/2 m-1">
                    <h1 className=" text-xl font-bold mt-2 mb-2 ">
                      Influencer Content Language
                    </h1>
                    <div className="w-full">
                      <Select
                        options={LanguagesArray}
                        isMulti
                        value={campaignOverview.influencer_languagesIds}
                        onChange={handleChangeLanguage}
                        className=""
                        styles={customStyles}
                      />
                    </div>
                  </div>

                  <div className="lg:w-1/2 m-1">
                    <h1 className=" text-xl font-bold mt-2 mb-2 ">
                      Influencer Niche
                    </h1>
                    <div className="w-full">
                      <select
                        id="influencer_nicheOptions"
                        onChange={handleNicheChange}
                        value={campaignOverview.niches_category_id}
                        className="bg-gray-50 border-2 p-2 border-gray-500 w-full font-bold text-sm rounded-md appearance-none relative  ">
                        <option value={0} disabled>
                          Select A Niche
                        </option>
                        {niches_categories.map((niche, indx) => (
                          <option key={indx} value={niche.id}>
                            {`${_.toUpper(niche.niche_name)} `}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full m-1">
                <h1 className=" text-xl font-bold mt-3 mb-2 rounded-t-md">
                  Campaign location
                  <span className="text-[10px] text-gray-600">
                    (You can select maximum 5 locations*)
                  </span>
                </h1>
                <div className="w-full">
                  <Select
                    options={locationArrayForForm}
                    isMulti
                    value={campaignOverview.influencer_locationIds}
                    onChange={handleInfluencerChangeLocation}
                    className="focus:border-ri-orange"
                    styles={customStyles}
                  />
                </div>
              </div>
              <h1 className=" text-3xl font-bold mt-5 mb-2 ">
                Number of Influencer
              </h1>
              <div className="mt-6 w-full flex flex-wrap">
                {CampaignNumberOfInfluencer.map((objective, indx) => {
                  return (
                    <div
                      className="w-full lg:w-1/2  2xl:w-1/4 p-2 select-none flex "
                      key={indx}>
                      <div
                        className={`w-full cursor-pointer rounded-md ${
                          campaignOverview.number_of_influencer === objective.id
                            ? "border-3 border-ri-orange"
                            : "border-3"
                        }`}>
                        <label className="block cursor-pointer text-center p-3">
                          <input
                            type="radio"
                            name="number_of_influencer"
                            className="hidden "
                            value={objective.id}
                            checked={
                              campaignOverview.number_of_influencer ===
                              objective.id
                            }
                            onChange={handleChangeCampaignOverview}
                          />

                          <span className="font-bold text-lg px-4">
                            {objective.title}
                          </span>
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignOverviewComponent;
