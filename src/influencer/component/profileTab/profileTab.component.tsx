import React, { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import { socialIcons } from "../../../seeder";
import "./profileTab.styles.css";
import * as flags from "@coreui/icons";
import FollowerIcon from "../../../assets/icons/followers.png";
import EngagementRateIcon from "../../../assets/icons/Engagement-Rate.png";
import {
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CProgress,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableRow,
} from "@coreui/react";
import { CChartBar, CChartDoughnut, CChartLine } from "@coreui/react-chartjs";
import { Link } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { countryAbbreviations } from "../../../utils/utilsMethods/allCountries.list";
import { formatNumberShort } from "../../../utils/utilsMethods/formatNumberSort.utils";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import VideoSlide from "./profileYoutubeVideo/youtubeVideoDetails.component";
import box_arrow from "../../../assets/icons/box_arrow.png";

export interface UserProfileDetails {
  id: number;
  platformName: string;
  platformContent: string[];
}

interface youtubeVideosData {
  id: number;
  video_id: string;
  publish_date: string;
  youtube_channel_id: string;
  title: string;
  description: string;
  thumbnails: string;
  tags: string;
  category_id: string;
  default_language: string;
  default_audio_language: string;
  views: string;
  likes: string;
  favorite_count: string;
  comment_count: string;
}
interface YoutubeProfileApiResponse {
  channel_details: {
    id: number;
    channel_name: string;
    user_name: string;
    channel_id: string;
    channel_description: string;
    channel_publish: string;
    channel_profile_url: string;
    total_views: string;
    subscriber_count: string;
    videos_uploaded: string;
  };
  videos: youtubeVideosData[];
}
interface UserProfileDetailsProps {
  userProfile: UserProfileDetails[];
}
interface TotalVideos {
  views: number;
  likes: number;
  commentCount: number;
  favoriteCount: number;
}
const ProfilePlatformTabComponent: React.FC<UserProfileDetailsProps> = ({
  userProfile,
}) => {
  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  const testData = [
    {
      id: 85,
      platformName: "youtube",
      channel_details: {
        id: 1,
        channel_name: "Dheeraj Bhojak2015",
        user_name: "@dheeraj-s-bhojak",
        channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
        channel_description: "",
        channel_publish: "2023-07-21T10:40:44.520251Z",
        channel_profile_url:
          "https://yt3.ggpht.com/ytc/AIf8zZR2GqllHEipb3uLAoTezcg4Yx7xA9Z132aea4FD9xiWMn9gynR_vzWvcH13N_Mz=s240-c-k-c0x00ffffff-no-rj",
        total_views: "1851",
        subscriber_count: "25",
        videos_uploaded: "4",
      },
      videos: [
        {
          id: 1,
          video_id: "hQwDVdmayT0",
          publish_date: "2023-09-29T11:25:18Z",
          youtube_channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
          title: "Brain Test 3 | Gundolf Puzzle |  Level 11",
          description:
            "@CarryisLive @fukrainsaanlive4744  #braintest3trickyquests  #braintest  #level11 #gundolfPuzzle",
          thumbnails: "https://i.ytimg.com/vi/hQwDVdmayT0/hqdefault.jpg",
          tags: null,
          category_id: "22",
          default_language: null,
          default_audio_language: null,
          views: "60",
          likes: "20",
          favorite_count: "01",
          comment_count: "05",
        },
        {
          id: 2,
          video_id: "qUkWPf5CT9A",
          publish_date: "2023-09-29T11:20:32Z",
          youtube_channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
          title: "Free Fire Max | Gameplay | (MY First Video Gameplay)",
          description:
            "My First freefire max gameplay video, #freefire #gaming #gameplay #india #bgmi #pubgmobile #fashion #viral",
          thumbnails: "https://i.ytimg.com/vi/qUkWPf5CT9A/hqdefault.jpg",
          tags: null,
          category_id: "22",
          default_language: null,
          default_audio_language: null,
          views: "120",
          likes: "114",
          favorite_count: "01",
          comment_count: "51",
        },
      ],
    },
    {
      id: 84,
      platformName: "youtube",
      channel_details: {
        id: 45,
        channel_name: "Dheeraj Bhojak",
        user_name: "@dheeraj-s-bhojak",
        channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
        channel_description: "",
        channel_publish: "2023-07-21T10:40:44.520251Z",
        channel_profile_url:
          "https://yt3.ggpht.com/ytc/AIf8zZR2GqllHEipb3uLAoTezcg4Yx7xA9Z132aea4FD9xiWMn9gynR_vzWvcH13N_Mz=s240-c-k-c0x00ffffff-no-rj",
        total_views: "18",
        subscriber_count: "2",
        videos_uploaded: "2",
      },
      videos: [
        {
          id: 12,
          video_id: "hQwDVdmayT0",
          publish_date: "2023-09-29T11:25:18Z",
          youtube_channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
          title: "Brain Test 3 | Gundolf Puzzle |  Level 11",
          description:
            "@CarryisLive @fukrainsaanlive4744  #braintest3trickyquests  #braintest  #level11 #gundolfPuzzle",
          thumbnails: "https://i.ytimg.com/vi/hQwDVdmayT0/hqdefault.jpg",
          tags: null,
          category_id: "22",
          default_language: null,
          default_audio_language: null,
          views: "64",
          likes: "2",
          favorite_count: "0",
          comment_count: "0",
        },
        {
          id: 22,
          video_id: "qUkWPf5CT9A",
          publish_date: "2023-09-29T11:20:32Z",
          youtube_channel_id: "UCbH2ei8mZAbwbB16GsIYetA",
          title: "Free Fire Max | Gameplay | (MY First Video Gameplay)",
          description:
            "My First freefire max gameplay video, #freefire #gaming #gameplay #india #bgmi #pubgmobile #fashion #viral",
          thumbnails: "https://i.ytimg.com/vi/qUkWPf5CT9A/hqdefault.jpg",
          tags: null,
          category_id: "22",
          default_language: null,
          default_audio_language: null,
          views: "12",
          likes: "1",
          favorite_count: "0",
          comment_count: "1",
        },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState(testData[0].id);
  const [youtubeProfileData, setYoutubeProfileData] =
    useState<YoutubeProfileApiResponse | null>(null);
  const [totalVideoReach, setTotalVideoReach] = useState<TotalVideos>({
    views: 0,
    likes: 0,
    commentCount: 0,
    favoriteCount: 0,
  });
  const [error, setError] = useState(null);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  useEffect(() => {
    const fetchYoutubeProfileData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        const response = await axios.get<YoutubeProfileApiResponse>(
          `${process.env.REACT_APP_API_URL}social-profiles/youtube`,
          config
        );
        setYoutubeProfileData(response.data);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching user information"
        );
      }
    };

    fetchYoutubeProfileData();
  }, []);
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
  type FlagsType = {
    [key: string]: any; // You can specify the type of the values if needed
  };

  const findAvgViews = (total_views: string, total_videos: string) => {
    return parseInt(total_views, 10) / parseInt(total_videos, 10);
  };
  // const channelAllTimeAvgViews =
  //   _.toNumber(youtubeProfileData.channel_details.total_views) /
  //   _.toNumber(youtubeProfileData.channel_details.subscriber_count);

  const findTotalReach = (videosArray: youtubeVideosData[]) => {
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

  const [videosLength, setVideosLength] = useState(0);
  useEffect(() => {
    if (youtubeProfileData !== null && youtubeProfileData.videos.length > 0) {
      const { videos } = youtubeProfileData;
      setVideosLength(videos.length);
      setTotalVideoReach(findTotalReach(videos));
    }
  }, [youtubeProfileData]);

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

  const [showFullText, setShowFullText] = useState(false);

  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };
  const maxLength = 30;

  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    setCurrent(current === videosLength - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? videosLength - 1 : current - 1);
  };
  const youtubeProfileData2 = testData.find((tab) => tab.id === activeTab);

  return (
    <Fragment>
      {youtubeProfileData !== null ? (
        <div>
          <div className=" w-full pt-2 pl-3 bg-white flex  border-light relative tab-bar-container ">
            <div
              className="w-10/12   flex overflow-x-auto border-b scrollbar "
              id="socialTabs">
              {testData.map((tab) => (
                <div
                  key={tab.id}
                  className={`text-sm cursor-pointer mr-1 min-w-[140px] p-2 px-4 tab  ${
                    activeTab === tab.id
                      ? "pb-0.5 text-black bg-white border-x-1 border-gray-400 border-t-1  border-b-white rounded-t-lg"
                      : ""
                  }`}
                  onClick={() => handleTabClick(tab.id)}>
                  {_.capitalize(tab.platformName)}{" "}
                  <img
                    src={socialIcons[tab.platformName]}
                    loading="lazy"
                    width="16"
                    height="16"
                    alt={`${socialIcons[tab.platformName]}`}
                    className="ml-1 inline"
                  />
                </div>
              ))}
            </div>
            <div className=" w-2-12 ">
              <Link className="text-ri-orange my-auto flex" to={"/"}>
                <p className="text-xs my-auto mr-3"> Add more platforms</p>{" "}
                <span>
                  <i className="fa-solid fa-plus font-black text-lg"></i>
                </span>
              </Link>
            </div>
          </div>

          {youtubeProfileData2 ? (
            <Fragment>
              {" "}
              <div className=" mx-auto p-4 border-2">
                <div className="flex flex-col md:flex-row items-center md:items-start">
                  <div className="md:w-1/4 md:mb-0 my-auto">
                    <img
                      src={
                        youtubeProfileData.channel_details.channel_profile_url
                      }
                      alt="Profile Image"
                      className="w-auto h-32 rounded-full mx-auto md:mx-0"
                    />
                  </div>

                  <div className="md:w-3/4 md:text-left  xxs:text-center text-sm">
                    <div className="md:w-10/12 w-full px-12 md:px-0 relative">
                      <div className="flex items-center  absolute md:right-3 right-0 top-4 md:top-0">
                        <Link
                          to={`https://www.youtube.com/${youtubeProfileData.channel_details.user_name}`}
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
                        {youtubeProfileData2.channel_details.channel_name}
                      </h3>
                      <p> {youtubeProfileData.channel_details.user_name}</p>
                      <p>
                        Join Date:{" "}
                        {
                          youtubeProfileData.channel_details.channel_publish.split(
                            "T"
                          )[0]
                        }
                      </p>
                      <div>
                        Description:{" "}
                        <span className="text-xs flex flex-wrap">
                          {youtubeProfileData.channel_details
                            .channel_description.length > maxLength &&
                          !showFullText ? (
                            <p>
                              {youtubeProfileData.channel_details.channel_description.slice(
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
                              {
                                youtubeProfileData.channel_details
                                  .channel_description
                              }
                              {youtubeProfileData.channel_details
                                .channel_description.length > maxLength && (
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
                          <img src={FollowerIcon} alt="" className="h-8" />
                          <p className="ml-3 font-bold">
                            <span className="text-sm  text-gray-600">
                              Subscribers
                            </span>{" "}
                            {
                              youtubeProfileData.channel_details
                                .subscriber_count
                            }
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
                                youtubeProfileData.channel_details.total_views,
                                youtubeProfileData.channel_details
                                  .videos_uploaded
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
                      {youtubeProfileData.videos.length > 0 ? (
                        <CCardBody className="mx-auto">
                          <div className="flex my-auto ">
                            <img src={FollowerIcon} alt="" className="h-8" />
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
                              {findEngagementRate(totalVideoReach).toFixed(2)}%
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
                        {youtubeProfileData.videos.length > 0 ? (
                          <div className="min-h-[14rem]">
                            <div className=" flex flex-col">
                              <section className="slider flex flex-row items-center">
                                <button onClick={prevSlide} className="mr-5">
                                  <i className="fa-solid fa-less-than"></i>
                                </button>

                                {youtubeProfileData.videos.map(
                                  (video, index) => (
                                    <VideoSlide
                                      key={index}
                                      video={video}
                                      isCurrent={index === current}
                                    />
                                  )
                                )}

                                <button onClick={nextSlide} className="ml-5">
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
                              labels: ["week 1", "week 2", "week 3", "week4"],
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
                                        icon={(flags as FlagsType)[flagIcon]}
                                        title={_.capitalize(
                                          location.countryName
                                        )}
                                      />
                                      <strong className="my-auto ml-2">
                                        {_.capitalize(location.countryName)}
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

          {/* <div className="tab-content border-x-2 border-light">
        {userProfile.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane ${activeTab === tab.id ? "active" : ""}`}>
            <Component userPlatform={tab} />
          </div>
        ))}
      </div> */}
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default ProfilePlatformTabComponent;
