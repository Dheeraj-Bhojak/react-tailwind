import React, { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import box_arrow from "../../../../assets/icons/box_arrow.png";
import { Link } from "react-router-dom";
import { campaignPostFormState } from "../campaignPostOverview/campaignPostOverview.component";

export interface CampaignPostStateType {
  campaign_overview: {
    objective: string;
    campaign_name: string;
    instagram_handle: string;
    platform: string;
    influencer_category: string;
    engagement_rate_min: number;
    engagement_rate_max: number;
    instagram_deliverables: {
      reels: number;
      story_with_link: number;
      video_post: number;
      static_post: number;
    };
    youtube_deliverables: {
      dedicated_video: number;
      integrated_video: number;
      reels: number;
    };
    number_of_influencer: string;
  };
  campaign_product: {
    product_name: string;
    product_price: string;
    product_purchase_link: string;
    product_images: { file: File; id: number }[];
    product_seeding: boolean;
  };
  audience_demography: {
    gender: string;
    languages: { value: string; label: string }[];
    locations: { value: string; label: string }[];
    location_type: string;
  };
  campaign_timeline: {
    applicationStartDate: Date | null;
    lastDayToApproveInfluencer: Date | null;
    contentVerification: Date | null;
    LastDayOfContentPost: Date | null;
  };
  campaign_budget: {
    compensation_type: string;
    tentative_budget: string;
  };
}
const CampaignBrief: React.FC<campaignPostFormState> = ({
  campaignPostState,
}) => {
  const [editMode, setEditMode] = useState(false);
  const { campaignFormObject, setCampaignFormObject } = campaignPostState;
  const {
    campaign_overview,
    campaign_budget,
    campaign_product,
    campaign_timeline,
    audience_demography,
    campaign_description,
  } = campaignFormObject;

  let PostCampaignData = {
    ...campaign_overview,
    ...campaign_budget,
    ...campaign_product,
    ...campaign_timeline,
    ...audience_demography,
    campaign_description,
  };

  const InitialDescription = `welcome to gemexi.india. Natural Gemstone Jewelry campaign aims to solidify  gemexi.india's presure in the Fashion and Beauty industry, creating a buzz around our product. Influencer are encouraged to bring their unique style to the content, aligning with gemexi.india's aesthetic.`;
  const [modifiedDescription, setModifiedDescription] =
    useState(InitialDescription);
  const handleEditClick = () => {
    setEditMode(true);
  };
  const handleSaveClick = () => {
    setEditMode(false);
    PostCampaignData = {
      ...PostCampaignData,
      campaign_description: modifiedDescription,
    };
  };
  return (
    <Fragment>
      {" "}
      <div className="">
        <div className="bg-white">
          <div className="p-3">
            <div className="w-full  ">
              <div className="2xl:w-3/4 w-full mx-auto  rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md p-5 ">
                <h1 className=" text-3xl font-bold mt-3 mb-4 mx-auto ">
                  Campaign Brief
                </h1>

                <div className="w-full">
                  <div className="flex flex-wrap">
                    {PostCampaignData.product_images.map((image, index) => (
                      <div key={index} className=" mb-4 sm:w-1/2 md:w-1/3  ">
                        <img
                          src={image.img_url}
                          alt={`Image ${image.id}`}
                          className="h-24 w-24 sm:h-32 sm:w-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 object-cover border-1 mx-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full mt-8 mb-2">
                  <div className="full">
                    <h1 className="font-semibold text-lg mb-4">
                      Campaign Overview
                    </h1>
                    <span className="float-right text-lg mx-3 flex ">
                      <img
                        src="https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8c05b256c32_a-social_in.png"
                        alt=""
                      />
                      <Link
                        to={`https://www.instagram.com/${PostCampaignData.instagram_handle}/`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <span className="border bg-gray-100 rounded-2xl px-2 mx-2 flex truncate max-w-[35ch]">
                          <img
                            src={box_arrow}
                            alt="Box-Arrow for navigate"
                            className="h-4 mt-2 mx-2 "
                          />{" "}
                          {`https://www.instagram.com/${PostCampaignData.instagram_handle}/`}
                        </span>
                      </Link>
                    </span>
                  </div>
                  <div className="w-full lg:flex mt-20">
                    <div className="border m-2 lg:w-full">
                      <p className="font-bold px-4 bg-gray-200 text-gray-600 border-b">
                        Campaign Description
                      </p>
                      <div className="">
                        {editMode ? (
                          <button
                            className="mt-2 bg-blue-500 text-white px-4 py-2"
                            onClick={handleSaveClick}>
                            Save
                          </button>
                        ) : (
                          <button
                            className="mt-2 bg-ri-blue text-white px-2 py-1"
                            onClick={handleEditClick}>
                            <i className="fa-regular fa-pen-to-square"></i> Edit
                          </button>
                        )}
                        <div className="w-11/12 border mx-auto">
                          {editMode ? (
                            <textarea
                              rows={20}
                              className="w-full p-2 border"
                              value={modifiedDescription}
                              onChange={(e) =>
                                setModifiedDescription(e.target.value)
                              }
                            />
                          ) : (
                            <span className="font-bold text-lg px-4 break-words">
                              {PostCampaignData.campaign_description}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full lg:flex">
                    <div className="border  m-2 lg:w-1/2">
                      <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                        Campaign Name
                      </p>
                      <div className="p-2">
                        <span className="font-bold text-lg px-4">
                          {_.toUpper(PostCampaignData.campaign_name)}
                        </span>
                      </div>
                    </div>
                    <div className="border  m-2 lg:w-1/2">
                      <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                        Platform
                      </p>
                      <div className="p-2">
                        <span className="font-bold text-lg px-4">
                          {PostCampaignData.platform}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:flex">
                    <div className="border  m-2 lg:w-1/2">
                      <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                        Objective
                      </p>
                      <div className="p-2">
                        <span className="font-bold text-lg px-4">
                          {PostCampaignData.objective}
                        </span>
                        {/* <p className="mt-2 ml-4 text-sm px-2 ">
                          {PostCampaignData.objective.description}
                        </p> */}
                      </div>
                    </div>
                    <div className="border  m-2 lg:w-1/2">
                      <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                        Influencer Category
                      </p>
                      <div className="p-2">
                        <span className="font-bold text-lg px-4">
                          {PostCampaignData.influencer_category}
                        </span>
                        {/* <p className="mt-2 ml-4 text-sm px-2 ">
                          {
                            PostCampaignData.influencer_category
                              .category_description
                          }
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className=" w-full lg:flex">
                    <div className="border  m-2 lg:w-1/2">
                      <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                        Influencer Engagement Rate
                      </p>
                      <div className="p-2">
                        <span className="font-bold text-lg px-4">
                          {PostCampaignData.engagement_rate_min}
                          {"%"} - {PostCampaignData.engagement_rate_max}
                          {"%"}
                        </span>
                      </div>
                    </div>
                    <div className="border  m-2 lg:w-1/2">
                      <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                        Number Of Influencer
                      </p>
                      <div className="p-2">
                        <span className="font-bold text-lg px-4">
                          {PostCampaignData.number_of_influencer}
                        </span>
                        {/* <p className="mt-2 ml-4 text-sm px-2 ">
                          {
                            PostCampaignData.number_of_influencer
                              .influencer_count_description
                          }
                        </p> */}
                      </div>
                    </div>
                  </div>
                  <div className="full">
                    <h1 className="font-semibold text-lg my-4">
                      Product Details
                    </h1>
                    <div className=" w-full lg:flex">
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                          Product Name
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {PostCampaignData.product_name}
                          </span>
                        </div>
                      </div>
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                          Product Price
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {PostCampaignData.product_price}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" w-full lg:flex">
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b ">
                          Product Purchase Link
                        </p>
                        <div className="p-2">
                          <p className="font-bold text-lg px-4 truncate max-w-[45ch]">
                            {PostCampaignData.product_purchase_link}
                          </p>
                        </div>
                      </div>
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b ">
                          Product Seeding
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {PostCampaignData.product_seeding === true
                              ? "Yes"
                              : "No"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="full">
                    <h1 className="font-semibold text-lg my-4">
                      Campaign TimeLine
                    </h1>
                    <div className=" w-full lg:flex">
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                          Application Start Date
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {new Date(
                              PostCampaignData.applicationStartDate
                            ).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                          Last date to approve influencer
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {new Date(
                              PostCampaignData.lastDayToApproveInfluencer
                            ).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" w-full lg:flex">
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b ">
                          Content verification Day period
                        </p>
                        <div className="p-2">
                          <p className="font-bold text-lg px-4 truncate max-w-[45ch]">
                            {new Date(
                              PostCampaignData.contentVerification
                            ).toLocaleDateString("en-GB", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b ">
                          End day post
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {new Date(
                              PostCampaignData.lastDayOfContentPost
                            ).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="full">
                    <h1 className="font-semibold text-lg my-4">
                      Campaign Budget
                    </h1>
                    <div className=" w-full lg:flex">
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b ">
                          Compensation type
                        </p>
                        <div className="p-2">
                          <p className="font-bold text-lg px-4 truncate max-w-[45ch]">
                            {PostCampaignData.compensation_type}
                          </p>
                        </div>
                      </div>
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b ">
                          Tentative budget
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {PostCampaignData.tentative_budget}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="full">
                    <h1 className="font-semibold text-lg my-4">
                      Audience Demography
                    </h1>
                    <div className=" w-full lg:flex">
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                          Audience Gender
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {PostCampaignData.gender}
                          </span>
                        </div>
                      </div>
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b">
                          Audience Age
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg px-4">
                            {PostCampaignData.audience_age_min}-{" "}
                            {PostCampaignData.audience_age_max}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" w-full lg:flex">
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b ">
                          Audience Language
                        </p>
                        <div className="p-2">
                          <p className="font-bold text-lg px-4 truncate max-w-[45ch]">
                            {PostCampaignData.languages
                              .map((language) => language.label)
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                      <div className="border  m-2 lg:w-1/2">
                        <p className="font-bold px-4 bg-gray-200 text-gray-600  border-b ">
                          Audience Locations
                        </p>
                        <div className="p-2">
                          <span className="font-bold text-lg">
                            {PostCampaignData.location_type === "manually" && (
                              <div className="">
                                {PostCampaignData.locations.map(
                                  (location) => `${location.label} , `
                                )}
                              </div>
                            )}
                          </span>
                        </div>
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
  );
};

export default CampaignBrief;
