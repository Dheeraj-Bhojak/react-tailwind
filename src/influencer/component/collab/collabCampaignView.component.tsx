import axios, { AxiosError } from "axios";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";

import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import companyLogo from "../../../assets/images/new/logo.jpg";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../global/global_component/buttons/button.component";
import _ from "lodash";
import { socialIcons } from "../../../seeder";
import YoutubeShorts from "../../../assets/icons/DelivrablesIcons/Youtube-shorts-icon.png";
import YoutubePlayButton from "../../../assets/icons/DelivrablesIcons/youtube-play-button.png";
import InstagramReelIcon from "../../../assets/icons/DelivrablesIcons/instagram-reel-icon.png";
import InstagramStoryIcon from "../../../assets/icons/DelivrablesIcons/instagram-stories-logo.png";
import InstagramVideoIcon from "../../../assets/icons/DelivrablesIcons/igtv-logo.png";
import PlatformDeliverableItem from "../../component/deliverables/Deliverables.component";
import { Target } from "react-feather";
import ProductCard from "../../component/ProductCard.component";
import MaleFemale from "../../../assets/icons/male-female-icon.png";
import { useSelector } from "react-redux";

interface YoutubeDeliverables {
  id: number;
  dedicated_video: number;
  integrated_video: number;
  shorts: number;
}

interface InstagramDeliverables {
  id: number;
  reels: number;
  story_with_link: number;
  video_post: number;
  static_post: number;
}

export interface campaignProductData {
  id: number;
  product_name: string;
  product_purchase_link: string;
  product_price: string;
  product_seeding: boolean;
  product_images: {
    id: number;
    img_name: string;
    is_active: boolean;
    img_url: string;
  }[];
}

export interface locationInterface {
  id: number;
  location_title: string;
  location_description: string;
  country: string;
  is_active: boolean;
}

export interface languageInterface {
  id: number;
  language_name: string;
  is_active: boolean;
}

interface campaignApiResponse {
  id: number;
  campaign_name: string;
  platform: string;
  compensation_type: string;
  instagram_handle: string;
  influencer_gender: string;
  campaign_product: campaignProductData;
  youtube_deliverables: YoutubeDeliverables | null;
  instagram_deliverables: InstagramDeliverables | null;
  campaign_description: string | null;
  niches_category: {
    id: number;
    niche_name: string;
    is_active: boolean;
  };
  campaign_event_dates: {
    event_id: number;
    application_start_date: string;
    approve_influencer_last_date: string;
    content_verification_date: string;
    post_on_social_media_end_day: string;
  };
  influencer_category: {
    id: number;
    category_title: string;
    category_description: string;
    is_active: boolean;
  };
  number_of_influencer: {
    id: number;
    influencer_count_title: string;
    is_active: boolean;
  };
  locations: locationInterface[];
  languages: languageInterface[];
  campaignUserAction: {
    applied: number;
    selected: number;
  };
}

const CollabCampaignView: React.FC = () => {
  const { id } = useParams();
  const campaignId = parseInt(id ?? "0", 10);
  const [campaignData, setCampaignData] = useState<campaignApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
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
          `${process.env.REACT_APP_API_URL}influencer_campaigns/campaign/${id}`,
          config
        );

        setCampaignData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleVideoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      // Check if the file is an MP4 video
      if (file.type !== "video/mp4") {
        alert("Please select an MP4 video file.");
        return;
      }

      // Check if the file size is within the limit
      const maxSizeInBytes = 20 * 1024 * 1024; // 20 MB
      if (file.size > maxSizeInBytes) {
        alert("File size exceeds the maximum limit of 20 MB.");
        return;
      }

      // Read the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const RemoveVideoUrl = () => {
    setVideoUrl(null);
  };
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const RemoveImage = () => {
    setImageUrl(null);
  };

  return (
    <>
      {campaignData && (
        <Fragment>
          <div className="w-[100%] relative h-32 mx-auto">
            <div>
              {campaignData && (
                <div
                  className="top-0 w-full absolute h-full bg-center bg-cover campaignSingleImage"
                  style={{
                    backgroundImage: `url('${
                      campaignData.campaign_product.product_images[0]
                        ?.img_url || ""
                    }')`,
                  }}></div>
              )}
              <img
                src={companyLogo}
                alt="_logo"
                className="w-32 rounded-full mt-2 border-black border-2 absolute bottom-0 left-1/2 transform top-14 z-10 -translate-x-1/2"
              />
              <div className="absolute top-2 right-5 max-w-[25ch] md:max-w-[45ch] overflow-hidden whitespace-nowrap overflow-ellipsis rounded-full">
                <Link
                  to={
                    campaignData
                      ? `https://www.instagram.com/${campaignData.instagram_handle}`
                      : "#"
                  }
                  className="text-black px-2 py-1 bg-gray-200"
                  target="_blank">
                  <i className="fa-solid fa-arrow-up-right-from-square mt-0 pr-1" />
                  <span>
                    {campaignData
                      ? `https://www.instagram.com/${campaignData.instagram_handle}`
                      : "#"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className=" flex flex-col relative min-w-0 break-words bg-gray-100 w-full mb-6 shadow-xl pt-20 ">
            <div className="sm:container mx-auto py-0 my-0 ">
              {/* New Code comes here */}
              <div className="flex justify-center items-center ">
                <div className="border-gray-500 border rounded-lg px-4 pt-4 w-full">
                  {/* Header */}
                  <div className="bg-gray-100 border-b-1 border-b-gray-300 ">
                    <div className="flex items-center justify-center">
                      <h1 className="font-medium text-4xl mb-5 ">
                        {campaignData &&
                          _.startCase(campaignData.campaign_name)}
                      </h1>
                    </div>

                    <div className="w-full lg:flex">
                      {/* Overview */}
                      <div className="lg:w-1/2 mx-2">
                        <h1 className="font-medium text-xl my-3">
                          Campaign Overview
                        </h1>
                        <div className="border flex flex-row mb-2 p-2 rounded-md">
                          <div className="flex flex-row items-center">
                            <img
                              src={require("../../../assets/icons/GlobePointer.png")}
                              className="h-6 w-auto mr-1 "
                            />
                            <p className=" ml-2 font-semibold">
                              {_.capitalize(campaignData.platform)}
                            </p>
                          </div>
                        </div>
                        <div className=" border  flex flex-row  mb-2 p-2 rounded-md">
                          <div className=" flex flex-row items-center">
                            <i className="fa-solid fa-users mr-2"></i>
                            <p className=" ml-2 font-semibold">
                              {
                                campaignData.number_of_influencer
                                  .influencer_count_title
                              }
                            </p>
                          </div>
                        </div>
                        <div className=" border  flex flex-row mb-2 p-2 rounded-md">
                          <div className="flex flex-row items-center">
                            <i className="fa-regular fa-calendar-days  mr-2"></i>
                            <p className="font-semibold ml-3 mr-1">
                              {new Date(
                                campaignData.campaign_event_dates.application_start_date
                              ).toLocaleDateString("en-GB", {
                                year: "2-digit",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>{" "}
                            -{" "}
                            <p className="font-semibold ml-1">
                              {new Date(
                                campaignData.campaign_event_dates.content_verification_date
                              ).toLocaleDateString("en-GB", {
                                year: "2-digit",
                                month: "short",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="border flex flex-row  mb-2 p-2 rounded-md">
                          <div className="flex flex-row items-center">
                            {campaignData.compensation_type === "paid" ? (
                              <i className="fas fa-rupee mr-2 ml-1"></i>
                            ) : (
                              <i className="fas fa-exchange-alt ml-1 mr-2"></i>
                            )}
                            {campaignData.compensation_type === "paid" ? (
                              <p className="font-semibold ml-3">Paid</p>
                            ) : (
                              <p className="font-semibold ml-3">Barter</p>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* Deliverables */}
                      <div className="lg:w-1/2 mx-2 ">
                        <div className=" border-b-gray-300 ">
                          <h1 className="font-medium text-xl my-3">
                            Deliverables
                          </h1>
                          {campaignData.platform === "instagram" ? (
                            <div className="w-full mb-3">
                              {campaignData.instagram_deliverables &&
                                Object.entries(
                                  campaignData.instagram_deliverables
                                ).map(
                                  ([key, count]) =>
                                    count > 0 &&
                                    key !== "id" && (
                                      <PlatformDeliverableItem
                                        key={key}
                                        icon={
                                          key === "reels"
                                            ? InstagramReelIcon
                                            : key === "story_with_link"
                                            ? InstagramStoryIcon
                                            : key === "static_post"
                                            ? socialIcons.instagram
                                            : InstagramVideoIcon
                                        }
                                        text={key
                                          .replace(/_/g, " ")
                                          .replace(/\b\w/g, (c) =>
                                            c.toUpperCase()
                                          )}
                                        count={count}
                                      />
                                    )
                                )}
                            </div>
                          ) : (
                            <div className="mb-3">
                              {campaignData.youtube_deliverables &&
                                Object.entries(
                                  campaignData.youtube_deliverables
                                ).map(
                                  ([key, count]) =>
                                    count > 0 &&
                                    key !== "id" && (
                                      <PlatformDeliverableItem
                                        key={key}
                                        icon={
                                          key === "shorts"
                                            ? YoutubeShorts
                                            : YoutubePlayButton
                                        }
                                        text={key
                                          .replace(/_/g, " ")
                                          .replace(/\b\w/g, (c) =>
                                            c.toUpperCase()
                                          )}
                                        count={count}
                                      />
                                    )
                                )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Influencer's Eligibility */}
                  <div className="lg:flex bg-gray-100 border-b-1 border-b-gray-300 ">
                    <div className="lg:w-1/2 p-2">
                      <h1 className="font-medium text-xl my-3">
                        Influencer's Eligibility
                      </h1>
                      <div className="w-full border border-gray-300 p-1 flex flex-row rounded-md my-2 h-10">
                        <div className="w-1/3 flex flex-row items-center">
                          {campaignData.influencer_gender === "female" ? (
                            <i className="fa-solid fa-person-dress fa-lg mr-2 pl-2 pr-3 border-r-1 h-5 "></i>
                          ) : campaignData.influencer_gender === "male" ? (
                            <i className="fa-solid fa-person fa-lg mr-2 pl-2 pr-3 border-r-1 h-5 "></i>
                          ) : campaignData.influencer_gender === "any" ? (
                            <img
                              src={MaleFemale}
                              alt="Your Image"
                              className="h-5 w-auto mr-2 pr-2 pl-1 border-r-1"
                            />
                          ) : (
                            " "
                          )}
                          <p>{_.capitalize(campaignData.influencer_gender)}</p>
                        </div>
                      </div>
                      <div className="w-full border border-gray-300 p-2 flex flex-row rounded-md my-2">
                        <div className=" flex flex-row items-center">
                          <i className="fa-solid fa-users mr-2 pr-2 border-r-1 h-5 "></i>

                          <p className="flex flex-row">
                            {_.capitalize(
                              campaignData.influencer_category
                                .category_description
                            )}
                            ({campaignData.influencer_category.category_title})
                          </p>
                        </div>
                      </div>
                      <div className="w-full border border-gray-300 p-2 flex flex-row rounded-md my-2">
                        <div className=" flex flex-row items-center">
                          <Target
                            className="mr-2 pr-2 border-r-1 h-5 "
                            size={30}
                          />

                          {campaignData.niches_category &&
                            campaignData.niches_category.niche_name && (
                              <p className="flex flex-row">
                                {_.capitalize(
                                  campaignData.niches_category.niche_name
                                )}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="w-full border border-gray-300 p-2 flex flex-row rounded-md my-2">
                        <div className=" flex flex-row items-center ">
                          <i className="fa-solid fa-language border-r-1 pr-2 h-5 mr-2 pt-1" />

                          {campaignData.languages &&
                            campaignData.languages.length > 0 && (
                              <p className="flex flex-row">
                                {_.capitalize(
                                  campaignData.languages[0].language_name
                                )}
                              </p>
                            )}
                        </div>
                      </div>
                      <div className="w-full border border-gray-300 p-2 flex md:flex-row rounded-md my-2">
                        <div className="w-10">
                          <i className="fa-solid fa-location-dot border-r-1 pl-1 pr-3 "></i>
                        </div>
                        <div className="flex flex-wrap items-center">
                          {campaignData.locations.map((location, index) => (
                            <div key={location.id}>
                              <p className="">
                                {_.capitalize(location.location_title)}
                                <span>({location.location_description})</span>
                                {index < campaignData.locations.length - 1 && (
                                  <span className="mr-1">,</span>
                                )}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Product */}
                    <div className="lg:w-1/2 p-2">
                      <div className="bg-gray-100">
                        <h1 className="font-medium text-xl my-3 ml-3">
                          Product
                        </h1>
                        <div>
                          {campaignData.campaign_product && (
                            <ProductCard
                              product={campaignData.campaign_product}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="deliverables my-10">
                    <h1 className="text-xl font-semibold">Deliverables</h1>

                    <div className="p-4 border-2">
                      <div className="full flex">
                        <div className="w-2/12 border-1 mx-1 p-2">
                          <p className="flex justify-center items-center h-full ">
                            Reel - 1
                          </p>
                        </div>
                        <div className="w-5/12 border-1 mx-1 p-2">
                          <div className="flex flex-col justify-center items-center h-full ">
                            <p className="font-bold">Get ready with me</p>
                            <p>hello</p>
                          </div>
                        </div>
                        <div className="w-5/12 border-1 mx-1 p-2">
                          <div className="flex justify-center items-center h-full">
                            {!videoUrl && (
                              <input
                                type="file"
                                accept="video/mp4"
                                onChange={handleVideoChange}
                              />
                            )}
                            {videoUrl && (
                              <div>
                                <div className="justify-center items-center flex">
                                  <video controls className="h-72">
                                    <source src={videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                  <button onClick={RemoveVideoUrl}>
                                    Remove Video
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="full my-2 flex">
                        <div className="w-2/12 border-1 mx-1 p-2">
                          <p className="flex justify-center items-center h-full ">
                            Post - 1
                          </p>
                        </div>
                        <div className="w-5/12 border-1 mx-1 p-2">
                          <div className="flex flex-col justify-center items-center h-full ">
                            <p className="font-bold"> OutDoor</p>
                            <p>Hello</p>
                          </div>
                        </div>
                        <div className="w-5/12 border-1 mx-1 p-2">
                          <div className="flex justify-center items-center h-full">
                            {!imageUrl && (
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className=" "
                              />
                            )}
                            {imageUrl && (
                              <div>
                                <img
                                  src={imageUrl}
                                  alt="Uploaded"
                                  className="h-72 w-72 object-contain"
                                />
                                <div className="flex">
                                  {" "}
                                  <button
                                    onClick={RemoveImage}
                                    className="bg-ri-blue">
                                    Change Image
                                  </button>
                                  <button
                                    onClick={RemoveImage}
                                    className="bg-ri-orange">
                                    Verify Image
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default CollabCampaignView;
