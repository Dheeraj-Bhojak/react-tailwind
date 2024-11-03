import React, { useState } from "react";
import shoppingBag from "../../../assets/icons/shoppingBag.png";
import rupeesign from "../../../assets/icons/rupeesign.png";

import { useNavigate } from "react-router-dom";
import qikgroLogo from "../../../assets/images/new/QG-logo1.png";
import { CollabInterface } from "./campaignCollabCardView.component";

interface InfluencerCollaborationCampaignCardProps {
  collab: CollabInterface;
}

const InfluencerCollaborationCampaignCard: React.FC<
  InfluencerCollaborationCampaignCardProps
> = ({ collab }) => {
  const navigate = useNavigate();
  const HandleNavigate = (id: number) => {
    navigate(`/influencer-app/collab/campaign/${id}`);
  };
  const handleDelete = (index: number) => {};
  const [imageError, setImageError] = useState(false);

  const imageHandleErrorOnLoad = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    (e.target as HTMLImageElement).src = qikgroLogo;
    // setImageError(true);
  };
  console.log("collab", collab.campaign.campaign_product.product_images)
  return (
    <>
      {collab && (
        <div
          className="cursor-pointer"
          onClick={() => HandleNavigate(collab.campaign.id)}>
          <div className="mx-2 relative transition-effect ">
            <div className="max-w-sm w-72 mx-auto bg-white border overflow-hidden border-gray-200 rounded-lg shadow-md hover:bg-black ">
              <div>
                <div className="relative">
                  <img
                    className={`top-0 rounded-t-lg h-96 w-full  ${
                      imageError ? "object-contain" : "object-cover"
                    }`}
                    src={
                      collab.campaign.campaign_product &&
                      collab.campaign.campaign_product.product_images &&
                      collab.campaign.campaign_product.product_images.length > 0
                        ? collab.campaign.campaign_product.product_images[0]
                            .img_url
                        : ""
                    }
                    onError={imageHandleErrorOnLoad}
                    alt="product image"
                    loading="lazy"
                  />
                  <div
                    className=" bottom-0 absolute text-white  w-full opacity-[0.9] "
                    id="grad1"></div>
                  <div className="bottom-0 absolute">
                    <p className="text-lg text-left text-ri-yellow px-4 mb-1">
                      Niche
                    </p>
                    <p
                      className="text-xl left-0 text-white font-semibold px-4 mb-4"
                      style={{ WebkitTextStroke: "0.3px black" }}>
                      {collab.campaign.campaign_name}
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
                    {collab.campaign.compensation_type === "paid" ? (
                      <image
                        href={rupeesign}
                        x="8"
                        y="12"
                        height="32"
                        width="36"
                        className="a-social__image "
                      />
                    ) : (
                      <image
                        href={shoppingBag}
                        x="8"
                        y="12"
                        height="28"
                        width="30"
                        className="a-social__image "
                      />
                    )}
                    {collab.campaign.platform.toLocaleLowerCase() ===
                    "instagram" ? (
                      <image
                        href="https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8c05b256c32_a-social_in.png"
                        x="3"
                        y="70"
                        height="28"
                        width="36"
                        className="a-social__image "
                      />
                    ) : collab.campaign.platform.toLocaleLowerCase() ===
                      "youtube" ? (
                      <image
                        href="https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8004f256c34_a-social_y.png"
                        x="3"
                        y="70"
                        height="40"
                        width="44"
                        className="a-social__image "
                      />
                    ) : null}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InfluencerCollaborationCampaignCard;
