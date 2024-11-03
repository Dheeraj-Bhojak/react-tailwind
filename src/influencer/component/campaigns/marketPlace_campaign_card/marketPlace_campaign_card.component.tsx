import React, { useState } from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../../global/global_component/buttons/button.component";
import { useNavigate } from "react-router-dom";
import { CampaignInterFaceForMarketplace } from "../../../pages/dashboard/campaign_market_place.page/campaign_market_place.page";

import shoppingBag from "../../../../assets/icons/shoppingBag.png";
import rupeeSign from "../../../../assets/icons/rupeesign.png";

interface MarketPlaceCampaignCardProps {
  campaignDetails: CampaignInterFaceForMarketplace;
}

const MarketerPlaceCampaignCard: React.FC<MarketPlaceCampaignCardProps> = ({
  campaignDetails,
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="mx-2 relative transition-effect mt-10 ">
        <div className="max-w-sm  mx-auto bg-white border overflow-hidden border-gray-200 rounded-lg shadow-md hover:bg-black ">
          <div>
            <div className="relative">
              {campaignDetails.campaign_product.product_images &&
              campaignDetails.campaign_product.product_images.length > 0 &&
              campaignDetails.campaign_product.product_images[0] ? (
                <img
                  className="top-0 rounded-t-lg h-96 w-full object-cover"
                  alt="product image"
                  loading="lazy"
                  src={
                    campaignDetails.campaign_product.product_images[0].img_url
                  }
                />
              ) : (
                <p className="top-0 rounded-t-lg h-96 w-full object-cover">
                  No product image available
                </p>
              )}
              <div
                className="bottom-0 absolute text-white  w-full opacity-[0.9] "
                id="grad1"></div>
              <div className="bottom-0 absolute">
                <p className="text-lg text-left text-ri-yellow px-4 mb-1">
                  {campaignDetails.niches_category && (
                    <span>{campaignDetails.niches_category.niche_name}</span>
                  )}
                </p>
                <p
                  className="text-xl left-0 text-white font-semibold px-4 mb-4"
                  style={{ WebkitTextStroke: "0.3px black" }}>
                  <span>{campaignDetails.campaign_name}</span>
                </p>
              </div>
            </div>

            <div className="z-10 text-[12px] right-0 text-ri-blue absolute top-16">
              <svg width="52" height="120" className="flex">
                <rect
                  x="0"
                  y="0"
                  rx="11"
                  ry="11"
                  width="50"
                  height="120"
                  fill="white"
                  opacity="0.4"
                />
                {campaignDetails.compensation_type === "Paid" ? (
                  <image
                    href={rupeeSign}
                    x="8"
                    y="12"
                    height="30"
                    width="34"
                    className="a-social__image "
                  />
                ) : (
                  <image
                    href={shoppingBag}
                    x="8"
                    y="12"
                    height="30"
                    width="34"
                    className="a-social__image "
                  />
                )}

                {campaignDetails.platform === "Instagram" ? (
                  <image
                    href="https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8004f256c34_a-social_y.png"
                    x="3"
                    y="70"
                    height="40"
                    width="44"
                    className="a-social__image "
                  />
                ) : (
                  <image
                    href="https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8c05b256c32_a-social_in.png"
                    x="3"
                    y="70"
                    height="40"
                    width="44"
                    className="a-social__image "
                  />
                )}
              </svg>
            </div>
          </div>
        </div>
        <div className="image-overlay absolute z-10  xl:bottom-[45px] bottom-[45px]  right-0 left-0 bg-gray-800 overflow-hidden w-full h-0  transition_ease rounded-lg">
          <div className="h-full w-full text-white">
            <div className="h-2/5 flex border-b-2">
              <div className="w-1/2 m-auto   h-full">
                <div className="w-full ">
                  <div className="w-full p-3">
                    <h1 className="text-ri-orange mb-2">Deliverables:</h1>
                    {campaignDetails.platform === "instagram" ? (
                      <div className="flex flex-col">
                        {campaignDetails.instagram_deliverables &&
                          Object.entries(campaignDetails.instagram_deliverables)
                            .filter(([key]) => key !== "id")
                            .map(
                              ([key, count]) =>
                                count > 0 && (
                                  <div className="flex items-center" key={key}>
                                    <p className="text-sm leading-tight">
                                      {key
                                        .replace(/_/g, " ")
                                        .replace(/\b\w/g, (c) =>
                                          c.toUpperCase()
                                        )}
                                    </p>
                                    <span className="mx-1">-</span>
                                    <p>{count}</p>
                                  </div>
                                )
                            )}
                      </div>
                    ) : (
                      <div className="flex flex-wrap">
                        {campaignDetails.youtube_deliverables &&
                          Object.entries(campaignDetails.youtube_deliverables)
                            .filter(([key]) => key !== "id")
                            .map(
                              ([key, count]) =>
                                count > 0 && (
                                  <div className="flex items-center" key={key}>
                                    <p className="text-sm leading-tight">
                                      {key
                                        .replace(/_/g, " ")
                                        .replace(/\b\w/g, (c) =>
                                          c.toUpperCase()
                                        )}
                                    </p>
                                    <span className="mx-1">-</span>
                                    <p>{count}</p>
                                  </div>
                                )
                            )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-1/2 m-auto border-l-2  h-full">
                <div className="w-full ">
                  <div className="w-full p-3">
                    <h1 className="  text-ri-orange mb-2">
                      last date for apply:
                    </h1>
                    <p className="leading-tight ">
                      {new Date(
                        campaignDetails.campaign_event_dates.approve_influencer_last_date
                      ).toLocaleDateString("en-GB", {
                        year: "2-digit",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-2/5 flex border-b-2">
              <div className="w-1/2 m-auto h-full">
                <div className="w-full ">
                  <div className="w-full p-3">
                    <h1 className="  text-ri-orange mb-2">Requirement:</h1>
                    <p className="mb-2  leading-tight ">
                      {
                        campaignDetails.number_of_influencer
                          .influencer_count_title
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 m-auto border-l-2  h-full">
                <div className="w-full ">
                  <div className="w-full p-3">
                    <h1 className="  text-ri-orange">Category:</h1>
                    <p className="mt-2 text-white ">
                      {campaignDetails.influencer_category.category_title}
                    </p>
                    <p className="text-gray-200 mt-1 text-xs">
                      (
                      {campaignDetails.influencer_category.category_description}
                      )
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1/5 flex ">
              <Button
                className=" rounded-2xl border-1 w-4/5  border-ri-orange  m-auto font-bold"
                buttonType={BUTTON_TYPE_CLASSES.slideLeftButtonYellow}
                onClick={() =>
                  navigate(`/influencer-app/campaign/${campaignDetails.id}`)
                }>
                View
              </Button>
            </div>
          </div>
        </div>
        <div className=" mb-4 mt-2 pl-2.5 h-9">
          <button
            className="w-full p-1 border mb-1 font-semi-bold rounded hover:bg-ri-orange"
            onClick={() =>
              navigate(`/influencer-app/campaign/${campaignDetails.id}`)
            }>
            View Campaign
          </button>
          <button className="w-full p-1 border mb-1 font-semi-bold rounded hover:bg-ri-orange">
            Not Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketerPlaceCampaignCard;
