import React, { useState } from "react";
import { socialIcons } from "../../../../seeder";
import { campaignView } from "../../../../marketer/pages/campaigns/ownCampaignView.page";
import QikgroLogo from "../../../../assets/images/new/QG-logo1.png";
import { upperFirst } from "lodash";
import CIcon from "@coreui/icons-react";
import { cilUserFemale, cilUser, cilWc } from "@coreui/icons";
import { Link } from "react-router-dom";
import { Crosshair } from "react-feather";

// const productImages = [product2, product3, product5, product6];

interface campaignProps {
  campaign: campaignView | null;
  campaignAccordion: {
    campaignDetailsSection: boolean;
    descriptionSection: boolean;
    productSection: boolean;
  };
}

const CampaignDetails: React.FC<campaignProps> = ({
  campaign,
  campaignAccordion,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [collapedSection, setCollapsedSection] = useState<{
    campaignDetailsSection: boolean;
    descriptionSection: boolean;
    productSection: boolean;
  }>(campaignAccordion);

  const toggleCollapse = (section: keyof typeof collapedSection) => {
    setCollapsedSection((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleButtonClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const imageHandleErrorOnLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    (e.target as HTMLImageElement).src = QikgroLogo;
  };

  const convertDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div>
      {campaign ? (
        <div>
          <div className="3xl:container 3xl:mx-auto">
            <div className="flex items-center">
              <div className="w-5/12 py-3 px-10 flex ">
                <div className="w-full flex">
                  <img
                    src={
                      campaign.campaign_product &&
                      campaign.campaign_product.product_images.length > 0
                        ? campaign.campaign_product.product_images[0].img_url
                        : QikgroLogo
                    }
                    alt=""
                    className="rounded-full w-24 h-24 3xl:w-36 3xl:h-36"
                    onError={imageHandleErrorOnLoad}
                  />

                  <div className="ml-2">
                    <p className="font-medium text-lg 3xl:text-2xl">
                      {campaign.campaign_name}
                    </p>
                    <div className="flex items-center mt-2 ml-5 3xl:mt-3">
                      <img
                        src={socialIcons.instagram}
                        alt=""
                        className="w-4 h-4 3xl:w-5 3xl:h-5"
                      />
                      <div className="border-l border-gray-400 h-5 mx-3"></div>
                      <p className="text-sm 3xl:text-base">
                        {campaign.number_of_influencer.influencer_count_title}
                      </p>
                      <div className="border-l border-gray-400 h-5 mx-3"></div>
                      {campaign.compensation_type.toLowerCase() === "paid" ? (
                        <i className="fa-solid fa-indian-rupee-sign text-ri-blue"></i>
                      ) : (
                        <i className="fa-solid fa-arrow-right-arrow-left text-ri-blue"></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-l border-gray-400 h-24 3xl:h-36 mx-3"></div>
              <div className="w-4/12 py-3 px-10 flex flex-col justify-center">
                <p className="font-medium text-lg 3xl:text-2xl">
                  Campaign Duration
                </p>
                <div className="flex items-center mt-2 3xl:mt-3">
                  <i className="fa-solid fa-calendar-days text-[#4267B2] text-sm 3xl:text-base mr-2"></i>
                  <p className="text-sm 3xl:text-base">
                    {convertDate(
                      campaign.campaign_event_dates.application_start_date
                    )}
                  </p>
                  <p className="mx-2">-</p>
                  <p className="text-sm 3xl:text-base">
                    {convertDate(
                      campaign.campaign_event_dates.approve_influencer_last_date
                    )}
                  </p>
                </div>
              </div>
              <div className="border-l border-gray-400 h-24 3xl:h-36 mx-3"></div>
              <div className="w-3/12 py-3 px-10 flex flex-col justify-center">
                <p className="font-medium text-lg 3xl:text-2xl">
                  Campaign Location
                </p>
                <div className="items-start mt-2 3xl:mt-3 flex">
                  <i className="fa-solid fa-location-dot text-[#4267B2] text-sm 3xl:text-base mr-2"></i>
                  <p className="text-sm 3xl:text-base">
                    {campaign.locations
                      .map((location) => location.location_title)
                      .join(", ")}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#EBEBEB] p-3">
              <div className="bg-white p-3 rounded-md">
                <div className="flex items-center justify-between px-3">
                  <p className="text-sm 2xl:text-base text-gray-color font-medium">
                    Campaign Details
                  </p>
                  <i
                    className={`fa-solid ${
                      collapedSection.campaignDetailsSection
                        ? "fa-circle-plus"
                        : "fa-circle-minus"
                    } text-[#4267B2] cursor-pointer`}
                    onClick={() =>
                      toggleCollapse("campaignDetailsSection")
                    }></i>
                </div>
                {!collapedSection.campaignDetailsSection && (
                  <div className="flex mt-2">
                    <div className="w-4/12 px-3">
                      <p className="text-sm 2xl:text-base text-gray-color font-medium select-none">
                        Overview
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center p-2 rounded-md border-1 mb-2">
                          <div className="w-[10%] 3xl:w-[5%]">
                            <i
                              className={`fa-brands fa-${campaign.platform.toLowerCase()} text-[#4267B2] mr-3`}></i>
                          </div>
                          <div className="w-[90%] 3xl:w-[95%]">
                            <p className="text-xs 3xl:text-sm select-none">
                              {upperFirst(campaign.platform)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center p-2 rounded-md border-1 mb-2">
                          <div className="w-[10%] 3xl:w-[5%]">
                            <i className="fa-solid fa-users text-[#4267B2] mr-3"></i>
                          </div>
                          <div className="w-[90%] 3xl:w-[95%]">
                            <p className="text-xs 3xl:text-sm select-none">
                              {
                                campaign.number_of_influencer
                                  .influencer_count_title
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center p-2 rounded-md border-1 mb-2">
                          <div className="w-[10%] 3xl:w-[5%]">
                            <i className="fa-solid fa-calendar-days text-[#4267B2] mr-3"></i>
                          </div>
                          <div className="w-[90%] 3xl:w-[95%]">
                            <p className="text-xs 3xl:text-sm select-none">
                              {convertDate(
                                campaign.campaign_event_dates
                                  .application_start_date
                              )}
                              -{" "}
                              {convertDate(
                                campaign.campaign_event_dates
                                  .approve_influencer_last_date
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center p-2 rounded-md border-1 mb-2">
                          <div className="w-[10%] 3xl:w-[5%]">
                            {campaign.compensation_type.toLowerCase() ===
                            "paid" ? (
                              <i className="fa-solid fa-indian-rupee-sign text-ri-blue mr-3"></i>
                            ) : (
                              <i className="fa-solid fa-arrow-right-arrow-left text-ri-blue mr-3"></i>
                            )}
                          </div>
                          <div className="w-[90%] 3xl:w-[95%]">
                            <p className="text-xs 3xl:text-sm select-none">
                              {upperFirst(campaign.compensation_type)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-4/12 px-3">
                      <p className="text-sm 2xl:text-base text-gray-color font-medium select-none">
                        Deliverable
                      </p>
                      <div className="mt-2">
                        {campaign.platform.toLowerCase() === "instagram"
                          ? campaign.instagram_deliverables &&
                            Object.entries(campaign.instagram_deliverables)
                              .filter(([key]) => key !== "id")
                              .map(([key, value]) => (
                                <div
                                  key={key}
                                  className="flex items-center p-2 rounded-md border-1 mb-2">
                                  <div className="flex w-full items-center">
                                    <div className="w-[10%] 3xl:w-[5%]">
                                      <i className="fa-brands fa-instagram text-[#4267B2] mr-3"></i>
                                    </div>
                                    <div className="w-[90%] 3xl:w-[95%]">
                                      <p className="text-xs 3xl:text-sm select-none">
                                        {key.charAt(0).toUpperCase() +
                                          key.slice(1)}
                                        {/* Capitalize the first letter */}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs 3xl:text-sm text-gray-500 mr-3 select-none">
                                      {value}
                                    </p>
                                  </div>
                                </div>
                              ))
                          : campaign.platform.toLowerCase() === "youtube"
                          ? campaign.youtube_deliverables &&
                            Object.entries(campaign.youtube_deliverables)
                              .filter(([key]) => key !== "id")
                              .map(([key, value]) => (
                                <div
                                  key={key}
                                  className="flex items-center p-2 rounded-md border-1 mb-2">
                                  <div className="flex w-full items-center">
                                    <div className="w-[10%] 3xl:w-[5%]">
                                      <i className="fa-brands fa-instagram text-[#4267B2] mr-3"></i>
                                    </div>
                                    <div className="w-[90%] 3xl:w-[95%]">
                                      <p className="text-xs 3xl:text-sm select-none">
                                        {key.charAt(0).toUpperCase() +
                                          key.slice(1)}{" "}
                                        {/* Capitalize the first letter */}
                                      </p>
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-xs 3xl:text-sm text-gray-500 mr-3 select-none">
                                      {value}
                                    </p>
                                  </div>
                                </div>
                              ))
                          : ""}
                      </div>
                    </div>

                    <div className="w-4/12 px-3">
                      <p className="text-sm 2xl:text-base text-gray-color font-medium select-none">
                        Influencer Eligibility
                      </p>
                      <div className="mt-2">
                        <div className="flex items-center p-2 rounded-md border-1 mb-2">
                          <div className="w-[10%] 3xl:w-[5%]">
                            {campaign.influencer_gender.toLowerCase() ===
                            "male" ? (
                              <CIcon
                                color="#4267B2"
                                icon={cilUser}
                                customClassName="nav-icon"
                                height={18}
                              />
                            ) : campaign.influencer_gender.toLowerCase() ===
                              "female" ? (
                              <CIcon
                                color="#4267B2"
                                icon={cilUserFemale}
                                customClassName="nav-icon"
                                height={18}
                              />
                            ) : campaign.influencer_gender.toLowerCase() ===
                              "any" ? (
                              <CIcon
                                color="#4267B2"
                                icon={cilWc}
                                customClassName="nav-icon"
                                height={18}
                              />
                            ) : (
                              ""
                            )}
                          </div>

                          <div className="w-[90%] 3xl:w-[95%]">
                            <p className="text-xs 3xl:text-sm select-none">
                              {campaign.influencer_gender}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center p-2 rounded-md border-1 mb-2">
                          <div className="w-[10%] 3xl:w-[5%]">
                            <i className="fa-solid fa-users text-[#4267B2] mr-3"></i>
                          </div>
                          <div className="w-[90%] 3xl:w-[95%]">
                            <p className="text-xs 3xl:text-sm select-none">
                              <span className="font-bold ">
                                ({campaign.influencer_category.category_title}){" "}
                              </span>
                              {
                                campaign.influencer_category
                                  .category_description
                              }
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center p-2 rounded-md border-1 mb-2">
                          <div className="w-[10%] 3xl:w-[5%]">
                            <Crosshair
                              size={16}
                              className="text-ri-blue mr-3"
                            />
                            {/* <i className="fa-solid fa-calendar-days text-[#4267B2] mr-3"></i> */}
                          </div>
                          <div className="w-[90%] 3xl:w-[95%]">
                            <p className="text-xs 3xl:text-sm select-none">
                              {campaign.niches_category.niche_name}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center p-2 rounded-md border-1 mb-2">
                          <div className="w-[10%] 3xl:w-[5%]">
                            <i className="fa-solid fa-language text-[#4267B2] mr-3"></i>
                          </div>
                          <div className="w-[90%] 3xl:w-[95%]">
                            <p className="text-xs 3xl:text-sm select-none">
                              {campaign.languages
                                .map((language) => language.language_name)
                                .join(", ")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="bg-[#EBEBEB] px-3 pb-3 flex">
              <div className="bg-white p-3 rounded-md w-full">
                <div className="px-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm 2xl:text-base text-gray-color font-medium">
                      Description
                    </p>
                    <i
                      className={`fa-solid ${
                        collapedSection.descriptionSection
                          ? "fa-circle-plus"
                          : "fa-circle-minus"
                      } text-[#4267B2] cursor-pointer`}
                      onClick={() => toggleCollapse("descriptionSection")}></i>
                  </div>
                  {!collapedSection.descriptionSection && (
                    <div className="mt-2">
                      <p className="select-none">
                        {campaign.campaign_description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-[#EBEBEB] px-3 pb-3">
              <div className="bg-white p-3 rounded-md">
                <div className="px-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm 2xl:text-base text-gray-color font-medium select-none">
                      Products
                    </p>
                    <i
                      className={`fa-solid ${
                        collapedSection.productSection
                          ? "fa-circle-plus"
                          : "fa-circle-minus"
                      } text-[#4267B2] cursor-pointer`}
                      onClick={() => toggleCollapse("productSection")}></i>
                  </div>
                  {!collapedSection.productSection && (
                    <div className="flex gap-3 mt-2">
                      <div className="flex w-6/12 border-1 p-2 rounded-md">
                        <div className="flex w-10/12">
                          <img
                            src={
                              campaign.campaign_product &&
                              campaign.campaign_product.product_images.length >
                                0
                                ? campaign.campaign_product.product_images[0]
                                    .img_url
                                : QikgroLogo
                            }
                            alt=""
                            className="w-28 h-28 3xl:w-36 3xl:h-36 rounded-md select-none"
                          />
                          <div className="ml-3 flex flex-col gap-2">
                            <p className="text-[#4267B2] font-medium select-none">
                              {campaign.campaign_product.product_name}
                            </p>
                            <p className="text-[#B1B1B1] font-medium select-none">
                              ₹ {campaign.campaign_product.product_price}
                            </p>
                            <p className="text-[#B1B1B1] font-medium select-none">
                              Free Product:{" "}
                              <span className="text-black font-medium select-none ">
                                {campaign.campaign_product.product_seeding
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="w-2/12 flex justify-end">
                          <Link
                            className="bg-[#4267B2] w-6 h-6 3xl:w-8 3xl:h-8 rounded-[4px] flex items-center justify-center"
                            target="_blank"
                            to={
                              campaign.campaign_product.product_purchase_link
                            }>
                            <i className="fa-solid fa-arrow-up-right-from-square text-white text-[12px] 3xl:text-base"></i>
                          </Link>
                        </div>
                      </div>
                      {/* this is when AWS is Live and some picture it have */}

                      {/* <div className="w-6/12 overflow-x-scroll gap-3 flex items-center rounded-md">
                        {campaign.campaign_product.product_images.length > 0
                          ? campaign.campaign_product.product_images.map(
                              (imageSrc, index) => (
                                <img
                                  src={imageSrc.img_url}
                                  alt={`Product ${index + 1}`}
                                  className="w-32 h-32 3xl:w-40 3xl:h-40 rounded-md select-none"
                                   loading="lazy"
                                  onClick={() =>
                                    handleButtonClick(imageSrc.img_url)
                                  }
                                />
                              )
                            )
                          : ""}
                      </div> */}

                      {campaign.campaign_product &&
                      campaign.campaign_product.product_images.length > 0 ? (
                        <div className="w-6/12 overflow-x-scroll gap-3 flex items-center rounded-md">
                          {campaign.campaign_product.product_images.map(
                            (imageSrc, index) => (
                              <img
                                key={index}
                                src={imageSrc.img_url}
                                alt={`Product ${index + 1}`}
                                className={`w-32 h-32 3xl:w-40 3xl:h-40 rounded-md select-none ${
                                  imageLoaded === true
                                    ? `opacity-100`
                                    : "opacity-0"
                                } `}
                                onClick={() =>
                                  handleButtonClick(imageSrc.img_url)
                                }
                                loading="lazy"
                                onError={imageHandleErrorOnLoad}
                                onLoad={() => {
                                  setImageLoaded(true);
                                }}
                              />
                            )
                          )}
                        </div>
                      ) : (
                        <div className="w-6/12 overflow-x-scroll gap-3 flex items-center rounded-md">
                          {campaign.campaign_product.product_images.map(
                            (imageSrc, index) => (
                              <img
                                key={index}
                                src={imageSrc ? imageSrc.img_url : ""}
                                alt={`Product ${index + 1}`}
                                className={`w-32 h-32 3xl:w-40 3xl:h-40 rounded-md select-none ${
                                  imageLoaded === true
                                    ? `opacity-100`
                                    : "opacity-0"
                                } `}
                                onClick={() =>
                                  handleButtonClick(imageSrc.img_url)
                                }
                                loading="lazy"
                                onError={imageHandleErrorOnLoad}
                                onLoad={() => {
                                  setImageLoaded(true);
                                }}
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-3 rounded-md relative">
                  <div className="relative">
                    <img
                      src={selectedImage === null ? "" : selectedImage}
                      alt="Selected Product"
                      className="w-96 h-96 3xl:w-full 3xl:h-auto max-w-screen-sm max-h-screen-sm select-none rounded-md"
                    />
                    <button
                      onClick={closeModal}
                      className="absolute top-0 right-0 mt-2 mr-2 w-8 h-8 bg-white text-[#4267B2] rounded-full flex items-center justify-center">
                      <i className="fa-solid fa-xmark text-xl"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CampaignDetails;
