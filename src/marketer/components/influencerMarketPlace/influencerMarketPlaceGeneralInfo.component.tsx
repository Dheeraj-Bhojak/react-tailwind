import React, { Fragment, useEffect, useState } from "react";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";
import * as flags from "@coreui/icons";
import { AgeCalculator } from "../../../utils/utilsMethods/ageCalculator";
import { socialIcons } from "../../../seeder";
import ProfileTabComponent from "../../../influencer/component/profileTab/profileTab.component";
import InfluencerMarketPlaceSocialMediaTab from "./marketPlaceSocialMediaTab.component";
import box_arrow from "../../../assets/icons/box_arrow.png";

import CIcon from "@coreui/icons-react";
import {
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableDataCell,
  CProgress,
} from "@coreui/react";
import { CChartBar, CChartLine, CChartDoughnut } from "@coreui/react-chartjs";
import VideoSlide from "../../../influencer/component/profileTab/profileYoutubeVideo/youtubeVideoDetails.component";
import { countryAbbreviations } from "../../../utils/utilsMethods/allCountries.list";
import { formatNumberShort } from "../../../utils/utilsMethods/formatNumberSort.utils";
import FollowerIcon from "../../../assets/icons/followers.png";
import EngagementRateIcon from "../../../assets/icons/Engagement-Rate.png";
import defaultUserProfile from "../../../assets/images/avatars/user.png";
import noData from "../../../assets/images/avatars/nodata.png";

export interface ResponseYoutubeVideoInterface {
  id: number;
  video_id: string;
  publish_date: string;
  youtube_channel_id: string;
  title: string;
  description: string;
  thumbnails: string;
  tags: string | null;
  category_id: string;
  default_language: string | null;
  default_audio_language: string | null;
  views: string;
  likes: string;
  favorite_count: string;
  comment_count: string;
}

export interface ResponseYoutubeDataInterface {
  id: number;
  channel_name: string;
  user_name: string;
  channel_id: string;
  channel_description: string;
  channel_publish: string;
  is_active: Boolean;
  channel_profile_url: string;
  total_views: string;
  subscriber_count: string;
  videos_uploaded: string;
  videos_details: ResponseYoutubeVideoInterface[];
}

interface ResponseInfluencerInterface {
  id: number;
  IsActive: Boolean;
  interest: string;
  niche: {
    niche_name: string;
  };
  youtube_channel_ids: ResponseYoutubeDataInterface[];
}

interface ApiResponse {
  influencer: {
    id: number;
    email: string;
    gender: string;
    dob: string;
    influencer: ResponseInfluencerInterface;
    profile_picture: [
      {
        img_name: string;
        img_url: string;
      }
    ];
    platform: string[];
    fullName: string;
  };
}

interface TotalVideos {
  views: number;
  likes: number;
  commentCount: number;
  favoriteCount: number;
}

const geoLocation = [
  {
    id: 1,
    countryName: "india",
    audienceCount: 71,
  },
  {
    id: 2,
    countryName: "bhutan",
    audienceCount: 9,
  },
  {
    id: 3,
    countryName: "bangladesh",
    audienceCount: 4,
  },
  {
    id: 4,
    countryName: "Sri Lanka",
    audienceCount: 8,
  },
  {
    id: 5,
    countryName: "Indonesia",
    audienceCount: 8,
  },
];

const InfluencerMarketPlaceGeneralInfo = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [influencerData, setInfluencerData] = useState<ApiResponse | null>(
    null
  );
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}marketers/influencer/${id}`,
          config
        );
        setInfluencerData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const convertGenderLabel = (gender: string) => {
    switch (gender) {
      case "M":
        return "Male";
      case "F":
        return "Female";
      case "O":
        return "Not Mentioned";
      default:
        return "Unknown Gender";
    }
  };

  const [activeTab, setActiveTab] = useState(0);
  const [totalVideoReach, setTotalVideoReach] = useState<TotalVideos>({
    views: 0,
    likes: 0,
    commentCount: 0,
    favoriteCount: 0,
  });

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };
  const youtubeProfileData =
    influencerData?.influencer.influencer.youtube_channel_ids.find(
      (tab) => tab.id === activeTab
    );

  const maxLength = 30;
  const [showFullText, setShowFullText] = useState(false);
  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };
  const findAvgViews = (total_views: string, total_videos: string) => {
    return parseInt(total_views, 10) / parseInt(total_videos, 10);
  };

  const findTotalReach = (videosArray: ResponseYoutubeVideoInterface[]) => {
    return videosArray.reduce(
      (accumulator, currentValue) => {
        accumulator.views += parseInt(currentValue.views, 10) || 0;
        accumulator.likes += parseInt(currentValue.likes, 10) || 0;
        accumulator.commentCount +=
          parseInt(currentValue.comment_count, 10) || 0;
        accumulator.favoriteCount +=
          parseInt(currentValue.favorite_count, 10) || 0;
        return accumulator;
      },
      { views: 0, likes: 0, commentCount: 0, favoriteCount: 0 }
    );
  };

  const findEngagementRate = (data: {
    likes: number;
    commentCount: number;
    favoriteCount: number;
    views: number;
  }): number => {
    return (
      ((data.likes + data.commentCount + data.favoriteCount) / data.views) * 100
    );
  };

  const [videosLength, setVideosLength] = useState(0);
  useEffect(() => {
    if (
      youtubeProfileData &&
      youtubeProfileData !== null &&
      youtubeProfileData.videos_details.length > 0
    ) {
      const { videos_details } = youtubeProfileData;
      setVideosLength(videos_details.length);
      setTotalVideoReach(findTotalReach(videos_details));
    }
  }, [youtubeProfileData]);

  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    setCurrent(current === videosLength - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? videosLength - 1 : current - 1);
  };

  type FlagsType = {
    [key: string]: any;
  };

  return (
    <Fragment>
      {influencerData ? (
        <div className="m-0">
          <div className="w-full border-light border-2 md:flex p-4">
            <div className=" md:w-2/12 w-full items-center px-2 my-auto ">
              <img
                className="w-36 h-36 mx-auto rounded-full object-contain border-gray-500 "
                src={
                  influencerData.influencer.profile_picture.length > 0
                    ? influencerData.influencer.profile_picture[0].img_url
                    : defaultUserProfile
                }
                alt="product designer"
              />
            </div>
            <div className="md:w-5/12 w-full p-2 border-gray-700 md:border-r-2">
              <div className="w-full flex  ">
                <p className="text-xl text-black">
                  {`${_.startCase(influencerData.influencer.fullName)} `}
                </p>
              </div>
              <div className="text-base text-gray-700">
                <p className="flex">
                  {`${_.capitalize(
                    convertGenderLabel(influencerData.influencer.gender)
                  )}${
                    influencerData.influencer.gender ? "," : ""
                  } ${AgeCalculator(influencerData.influencer.dob)}`}
                </p>
              </div>

              <div className="text-base text-gray-700">
                {influencerData.influencer.influencer.niche &&
                  influencerData.influencer.influencer.niche.niche_name && (
                    <p className="flex">{`${_.startCase(
                      influencerData.influencer.influencer.niche.niche_name
                    )}`}</p>
                  )}
              </div>
              <div className="mt-1">
                <div className="inline-flex ">
                  {_.map(
                    influencerData.influencer.platform,
                    (socialPlatform, idx) => {
                      return (
                        <img
                          src={socialIcons[socialPlatform]}
                          loading="lazy"
                          width="20"
                          height="20"
                          alt={`${socialIcons[socialPlatform]}`}
                          className=" rounded-full mr-1"
                          key={idx}
                        />
                      );
                    }
                  )}
                </div>
              </div>
              {/* <div className="text-base text-gray-700">
                <p className="flex">{`${_.startCase(location)}`}</p>
              </div> */}
            </div>
            <div className="md:w-5/12 w-full px-2 ">
              <div className="w-full border-b border-b-gray-500">
                <p className="text-xl pb-2">
                  QG Score:
                  {/* <span className="text-base ml-4">{qg_score}</span> */}
                </p>
              </div>
              <div className="w-full border-b border-b-gray-500">
                <p className="text-xl flex pb-2">
                  Tags:
                  {/* <span className="text-base ml-4">
                    {_.capitalize(_.join(qg_tags, ", "))}
                  </span> */}
                </p>
              </div>
              <div className="w-full border-b border-b-gray-500">
                <p className="text-xl pb-2">
                  Projects:
                  {/* <span className="text-base ml-4">
                    {_.capitalize(_.join(projects, ", "))}
                  </span> */}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full min-h-screen">
            {influencerData.influencer.influencer.youtube_channel_ids.length >
            0 ? (
              <div>
                <div className=" w-full pt-2 pl-3 bg-white flex border-b border-light relative tab-bar-container ">
                  <div
                    className="w-10/12   flex overflow-x-auto  scrollbar "
                    id="socialTabs">
                    {influencerData.influencer.influencer.youtube_channel_ids.map(
                      (tab) => (
                        <div
                          key={tab.id}
                          className={`text-sm cursor-pointer mr-1 min-w-[140px] p-2 px-4 tab  ${
                            activeTab === tab.id
                              ? "text-black bg-white border-x-1 border-gray-400 border-t-1  border-b-white rounded-t-lg"
                              : ""
                          }`}
                          onClick={() => handleTabClick(tab.id)}>
                          {tab.channel_name}{" "}
                          <img
                            src={socialIcons.youtube}
                            loading="lazy"
                            width="16"
                            height="16"
                            alt={`${socialIcons.youtube}`}
                            className="ml-1 inline"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>

                {youtubeProfileData ? (
                  <Fragment>
                    {" "}
                    <div className=" mx-auto p-4 mt-4 border-2">
                      <div className="flex flex-col md:flex-row items-center md:items-start">
                        <div className="md:w-1/4 md:mb-0 my-auto">
                          <img
                            src={youtubeProfileData.channel_profile_url}
                            alt="Profile Image"
                            className="w-auto h-32 rounded-full mx-auto md:mx-0"
                          />
                        </div>

                        <div className="md:w-3/4 md:text-left  xxs:text-center text-sm">
                          <div className="md:w-10/12 w-full px-12 md:px-0 relative">
                            <div className="flex items-center  absolute md:right-3 right-0 top-4 md:top-0">
                              <Link
                                to={`https://www.youtube.com/${youtubeProfileData.user_name}`}
                                target="_blank"
                                rel="noopener noreferrer">
                                <img
                                  src={box_arrow}
                                  alt="Box-Arrow for navigate"
                                  className="h-3 md:h-5 "
                                />
                              </Link>
                            </div>
                            <h3 className="text-4xl font-bold">
                              {youtubeProfileData.channel_name}
                            </h3>
                            <p> {youtubeProfileData.user_name}</p>
                            <p>
                              Join Date:{" "}
                              {youtubeProfileData.channel_publish.split("T")[0]}
                            </p>
                            <div>
                              Description:{" "}
                              <span className="text-xs flex flex-wrap">
                                {youtubeProfileData.channel_description.length >
                                  maxLength && !showFullText ? (
                                  <p>
                                    {youtubeProfileData.channel_description.slice(
                                      0,
                                      maxLength
                                    )}
                                    ...
                                    <span
                                      onClick={toggleTextVisibility}
                                      className="text-blue-500 cursor-pointer">
                                      Read more
                                    </span>
                                  </p>
                                ) : (
                                  <p>
                                    {youtubeProfileData.channel_description}
                                    {youtubeProfileData.channel_description
                                      .length > maxLength && (
                                      <span
                                        onClick={toggleTextVisibility}
                                        className="text-blue-500 cursor-pointer">
                                        Read less
                                      </span>
                                    )}
                                  </p>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:flex md:flex-wrap justify-start items-center">
                      <div className="lg:w-1/3">
                        <CCol>
                          <CCard className="m-2">
                            <CCardHeader className="font-bold text-lg">
                              Channel Reach
                            </CCardHeader>
                            <CCardBody className="mx-auto">
                              <div className="flex my-auto ">
                                <img
                                  src={FollowerIcon}
                                  alt=""
                                  className="h-8"
                                />
                                <p className="ml-3 font-bold">
                                  <span className="text-sm  text-gray-600">
                                    Subscribers
                                  </span>{" "}
                                  {youtubeProfileData.subscriber_count}
                                </p>
                              </div>
                              <div className="flex">
                                <img
                                  src={EngagementRateIcon}
                                  alt=""
                                  className="h-8"
                                />
                                <p className="ml-3 font-bold">
                                  <span className="text-sm  text-gray-600">
                                    Avg Views on videos
                                  </span>{" "}
                                  {formatNumberShort(
                                    findAvgViews(
                                      youtubeProfileData.total_views,
                                      youtubeProfileData.videos_uploaded
                                    )
                                  )}
                                </p>
                              </div>
                            </CCardBody>
                          </CCard>
                        </CCol>
                        <CCol>
                          <CCard className="m-2">
                            <CCardHeader className="font-bold text-lg">
                              Last 10 videos reach
                            </CCardHeader>
                            {youtubeProfileData.videos_details.length > 0 ? (
                              <CCardBody className="mx-auto">
                                <div className="flex my-auto ">
                                  <img
                                    src={FollowerIcon}
                                    alt=""
                                    className="h-8"
                                  />
                                  <p className="ml-3 font-bold">
                                    <span className="text-sm  text-gray-600">
                                      Total Views:
                                    </span>{" "}
                                    {formatNumberShort(totalVideoReach.views)}
                                  </p>
                                </div>
                                <div className="flex">
                                  <img
                                    src={EngagementRateIcon}
                                    alt=""
                                    className="h-10"
                                  />
                                  <p className="ml-3 font-bold">
                                    <span className="text-sm  text-gray-600">
                                      Engagement:
                                    </span>{" "}
                                    {findEngagementRate(
                                      totalVideoReach
                                    ).toFixed(2)}
                                    %
                                  </p>
                                </div>
                              </CCardBody>
                            ) : (
                              <div className="min-h-[60px] mx-auto my-auto flex flex-wrap mt-4">
                                {" "}
                                <p>No videos Found</p>
                                <i className="fa-solid fa-exclamation m-1 mx-2 fa-bounce"></i>
                              </div>
                            )}
                          </CCard>
                        </CCol>
                      </div>
                      <div className="xl:w-2/3  lg:w-8/12 w-full ">
                        <CCol>
                          <CCard className="m-2  ">
                            <CCardHeader className="font-bold text-lg">
                              Content
                            </CCardHeader>
                            <CCardBody>
                              {youtubeProfileData.videos_details.length > 0 ? (
                                <div className="min-h-[14rem]">
                                  <div className=" flex flex-col">
                                    <section className="slider flex flex-row items-center">
                                      <button
                                        onClick={prevSlide}
                                        className="mr-5">
                                        <i className="fa-solid fa-less-than"></i>
                                      </button>

                                      {youtubeProfileData.videos_details &&
                                        youtubeProfileData.videos_details.map(
                                          (videos_details, index) => (
                                            <VideoSlide
                                              key={index}
                                              video={videos_details}
                                              isCurrent={index === current}
                                            />
                                          )
                                        )}

                                      <button
                                        onClick={nextSlide}
                                        className="ml-5">
                                        <i className="fa-solid fa-greater-than"></i>
                                      </button>
                                    </section>
                                  </div>
                                </div>
                              ) : (
                                <div className="min-h-[160px] mx-auto my-auto flex flex-wrap mt-4">
                                  {" "}
                                  <p>No videos Found</p>
                                  <i className="fa-solid fa-exclamation m-1 mx-2 fa-bounce"></i>
                                </div>
                              )}
                            </CCardBody>
                          </CCard>
                        </CCol>
                      </div>

                      <div className="flex flex-wrap w-full justify-start items-center">
                        <div className="xl:w-1/3 md:w-6/12 lg:w-5/12 w-full ">
                          <CCol>
                            <CCard className="m-2 ">
                              <CCardHeader className="font-bold text-lg">
                                Age
                              </CCardHeader>
                              <CCardBody>
                                <CChartBar
                                  data={{
                                    labels: ["ageDemographicHeading"],
                                    datasets: [
                                      {
                                        label: "Target Audience ",
                                        backgroundColor: [
                                          "#00D8FF",
                                          "#f87979",
                                          "#fdc100",
                                        ],
                                        data: [100],
                                      },
                                    ],
                                  }}
                                />
                              </CCardBody>
                            </CCard>
                          </CCol>
                        </div>
                        <div className="xl:w-1/3 lg:w-6/12 md:w-6/12 w-full">
                          <CCol>
                            <CCard className="m-2">
                              <CCardHeader className="font-bold text-lg">
                                30 Days Channel Reach
                              </CCardHeader>
                              <CCardBody>
                                <CChartLine
                                  data={{
                                    labels: [
                                      "week 1",
                                      "week 2",
                                      "week 3",
                                      "week4",
                                    ],
                                    datasets: [
                                      {
                                        label: "Views",
                                        backgroundColor: "rgb(255, 0, 0)",
                                        borderColor: "rgb(255, 0, 0)",
                                        pointBackgroundColor: "rgb(255, 0, 0)",
                                        pointBorderColor: "#fff",
                                        data: [12, 6, 8, 10],
                                      },
                                      {
                                        label: "Comments",
                                        backgroundColor: "rgb(125, 80, 0)",
                                        borderColor: "rgb(125, 80, 0)",
                                        pointBackgroundColor: "rgb(125, 80, 0)",
                                        pointBorderColor: "#fff",
                                        data: [0, 0, 0, 0],
                                      },
                                      {
                                        label: "Likes",
                                        backgroundColor: "rgb(0, 255, 0)",
                                        borderColor: "rgb(0, 255, 0)",
                                        pointBackgroundColor: "rgb(0, 255, 0)",
                                        pointBorderColor: "#fff",
                                        data: [0, 0, 0, 1],
                                      },
                                      {
                                        label: "Dislikes",
                                        backgroundColor: "rgb(0, 0, 255)",
                                        borderColor: "rgb(0, 0, 255)",
                                        pointBackgroundColor: "rgb(0, 0, 255)",
                                        pointBorderColor: "#fff",
                                        data: [0, 0, 0, 0],
                                      },
                                    ],
                                  }}
                                />
                              </CCardBody>
                            </CCard>
                          </CCol>
                        </div>
                        <div className="xl:w-[22%] lg:w-1/3 md:w-1/2 sm:w-1/2 mx-auto">
                          <CCol>
                            <CCard className="m-2">
                              <CCardHeader className="font-bold text-lg">
                                Gender
                              </CCardHeader>
                              <CCardBody>
                                <CChartDoughnut
                                  data={{
                                    datasets: [
                                      {
                                        backgroundColor: [
                                          "#00D8FF",
                                          "#f87979",
                                          "#fdc100",
                                        ],
                                        data: [14, 45, 41],
                                      },
                                    ],
                                    labels: ["genderHeading", "male", "female"],
                                  }}
                                />
                              </CCardBody>
                            </CCard>
                          </CCol>
                        </div>
                        <div className="xl:w-1/3 lg:w-2/3 sm:w-1/2 w-full">
                          <CCol>
                            <CCard className="m-2">
                              <CCardHeader className="font-bold text-lg">
                                Location
                              </CCardHeader>
                              <CTable
                                align="middle"
                                className="mb-0 "
                                hover
                                responsive>
                                <CTableHead className="bg-[#f7f7f7]"></CTableHead>
                                <CTableBody>
                                  {_.map(geoLocation, (location) => {
                                    const countryAbb = _.find(
                                      countryAbbreviations,
                                      (item) =>
                                        _.toLower(item.name) ===
                                        _.toLower(location.countryName)
                                    );
                                    const flagIcon = `cif${_.capitalize(
                                      countryAbb?.code
                                    )}`;
                                    return (
                                      <CTableRow
                                        v-for="item in tableItems"
                                        key={location.id}>
                                        <CTableDataCell className="text-center">
                                          <div className="flex">
                                            <CIcon
                                              size="xxl"
                                              icon={
                                                (flags as FlagsType)[flagIcon]
                                              }
                                              title={_.capitalize(
                                                location.countryName
                                              )}
                                            />
                                            <strong className="my-auto ml-2">
                                              {_.capitalize(
                                                location.countryName
                                              )}
                                            </strong>
                                          </div>
                                        </CTableDataCell>
                                        <CTableDataCell className="w-full">
                                          <div className="clearfix">
                                            <div className="float-start">
                                              <strong>
                                                {location.audienceCount}%
                                              </strong>
                                            </div>
                                            <div className="float-end">
                                              <small className="text-medium-emphasis">
                                                {location.audienceCount}
                                              </small>
                                            </div>
                                          </div>
                                          <CProgress
                                            thin
                                            color="success"
                                            value={location.audienceCount}
                                          />
                                        </CTableDataCell>
                                      </CTableRow>
                                    );
                                  })}
                                </CTableBody>
                              </CTable>
                            </CCard>
                          </CCol>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ) : (
                  " "
                )}
              </div>
            ) : (
              <div className="items-center justify-center ">
                <img
                  src={noData}
                  alt="Error for coffee"
                  className="w-auto h-80 mx-auto "
                />{" "}
                <h3 className="text-center md:text-xl md:font-bold  text-base font-semibold">
                  {" "}
                  No Social Media Connected With This Account
                </h3>
              </div>
            )}
          </div>
        </div>
      ) : (
        " "
      )}
    </Fragment>
  );
};

export default InfluencerMarketPlaceGeneralInfo;
