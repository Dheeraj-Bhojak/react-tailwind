import React, { useState } from "react";
import shoppingBag from "../../../../assets/icons/shoppingBag.png";
import QG_LogoForCampaign from "../../../../assets/images/new/QG-logo1.png";
import "./campaignCard.style.css";
import { Link, useNavigate } from "react-router-dom";
import { cilLinkAlt, cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import ConfirmationDialog from "../../../../global/global_component/deleteConformationDialogBox/deleteConformationDialog";
import {
  CampaignInterface,
  ResponseToast,
} from "../campaignCardsView/campaignCards.component";
import axios from "axios";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import CallToast from "../../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../../global/global_component/toastNotification/ToastNotification";

interface MarketerCampaignCardProps {
  campaign: CampaignInterface; // Assuming CampaignInterface is your campaign type
  onAction: () => void;
  toastShowHandle: React.Dispatch<React.SetStateAction<ResponseToast>>;
}

const MarketerCampaignCard: React.FC<MarketerCampaignCardProps> = ({
  campaign,
  onAction,
  toastShowHandle,
}) => {
  const navigate = useNavigate();
  const navigateViewCampaign = (id: number) => {
    navigate(`/marketer-app/campaign/${id}`);
  };
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const copyLinkForShare = (id: Number) => {
    const link = `http://localhost:3000/influencer-app/campaign/${id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setSuccessMessage("Link copied to clipboard!");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => console.error(error));
  };

  const deleteCampaignHandler = async (id: number) => {
    const deleteCampaignUrl = `${process.env.REACT_APP_API_URL}marketer_campaign/delete_campaign/${id}`;
    try {
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };
      const response = await axios.delete(deleteCampaignUrl, config);
      const { status, data } = response;
      const { message, theme } = CallToast(status, data.message);
      toastShowHandle(() => ({
        message,
        theme,
        showToast: true,
      }));
      onAction();
      setTimeout(() => {
        toastShowHandle((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
    } catch (error: any) {
      const { status, data } = error.response;
      const { message, theme } = CallToast(status, data.message);
      toastShowHandle(() => ({
        message,
        theme,
        showToast: true,
      }));
      setTimeout(() => {
        toastShowHandle((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
    }
  };

  return (
    <div>
      <div className="mx-2 relative transition-effect ">
        <div className="max-w-sm  mx-auto bg-white border overflow-hidden border-gray-200 rounded-lg shadow-md hover:bg-black ">
          <div>
            <div className="relative">
              <img
                className="top-0 rounded-t-lg  h-72 w-full object-cover"
                src={
                  campaign.campaign_product.product_images.length > 0
                    ? campaign.campaign_product.product_images[0]?.img_url
                    : QG_LogoForCampaign
                }
                alt="product image"
                loading="lazy"
              />
              <div
                className=" bottom-0 absolute text-white  w-full opacity-[0.9] "
                id="grad1"></div>
              <div className="bottom-0 absolute">
                <p className="text-left text-ri-yellow px-4">
                  {campaign.niches_category &&
                    campaign.niches_category.niche_name}
                </p>
                <p
                  className="text-lg left-0 text-white font-semibold px-4 mb-4"
                  style={{ WebkitTextStroke: "0.3px black" }}>
                  {campaign.campaign_name}
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
                <image
                  href={shoppingBag}
                  x="8"
                  y="12"
                  height="30"
                  width="34"
                  className="a-social__image "
                />
                {campaign.platform === "instagram" ? (
                  <image
                    href="https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8c05b256c32_a-social_in.png"
                    x="3"
                    y="70"
                    height="40"
                    width="44"
                    className="a-social__image "
                  />
                ) : campaign.platform === "youtube" ? (
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
        <div className="flex mb-4 mt-2 pl-2.5 h-">
          <button
            onClick={() => navigateViewCampaign(campaign.id)}
            className="flex mr-4 bg-gray-200 hover:bg-ri-orange focus:ring-1 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center">
            <i className="fa-regular fa-eye"></i>
          </button>
          <Link
            to={""}
            className="flex mr-4 bg-gray-200 hover:bg-ri-orange focus:ring-1 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center">
            <CIcon icon={cilPencil} className="text-xl" />
          </Link>
          <button
            onClick={() => copyLinkForShare(campaign.id)}
            className="flex mr-4 bg-gray-200 hover:bg-ri-orange focus:ring-1 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center">
            <CIcon icon={cilLinkAlt} className="text-xl" />
          </button>

          <ConfirmationDialog
            onDelete={() => deleteCampaignHandler(campaign.id)}
            itemText={campaign.campaign_name}
          />
        </div>
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default MarketerCampaignCard;
