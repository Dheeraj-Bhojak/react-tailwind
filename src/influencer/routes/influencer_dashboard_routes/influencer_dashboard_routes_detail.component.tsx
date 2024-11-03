import React, { LazyExoticComponent, lazy } from "react";
import CampaignView from "../../pages/dashboard/campaign_view/campaignView.page";
import RedirectedPage from "../../../global/global_pages/redirectedPage/redirected.page";
import BasicInfluencerProfile from "../../component/profileComponents/basicProfileInfluencer.component";
import ChangePasswordInfluencer from "../../component/profileComponents/changePasswordInfleucner.component";
import ForgetPassword from "../../../marketer/components/profileApp/forgetPassword.component";
import CampaignCollaboration from "../../pages/collabs/campaignCollab.component";
import { element } from "prop-types";
import InfluencerPricing from "../../component/pricing/socialMediaPricing.component";
import Notifications from "../../component/notification/notification.component";
import InfluencerAddress from "../../component/profileComponents/address.component";

const EarningHistory = React.lazy(
  () => import("../../pages/earningPage/earningHistory.pages")
);
const SocialAccountProfilePage = React.lazy(
  () => import("../../pages/profilePage/socialAccountProfile.page")
);

const CampaignMarketPlace: LazyExoticComponent<any> = lazy(
  () =>
    import(
      "../../pages/dashboard/campaign_market_place.page/campaign_market_place.page"
    )
);
const CollabCampaignView = React.lazy(
  () => import("../../component/collab/collabCampaignView.component")
);

const CampaignCollabView = React.lazy(
  () => import("../../component/collab/campaignCollabView.component")
);

const ContentDeliverable = React.lazy(
  () => import("../../component/collab/sendDeliverables.component")
);
const Influencer_Routes = [
  {
    path: "/campaign-marketplace",
    name: "Campaign Marketplace",
    element: CampaignMarketPlace,
  },
  {
    path: "/campaign/:id",
    name: "Campaign view",
    element: CampaignView,
  },
  {
    path: "/collab/campaign/:id",
    name: " Collab Campaign Card",
    element: CampaignCollabView,
  },

  {
    path: "/collab_campaign/:id",
    name: " Collab Campaign Card",
    element: ContentDeliverable,
  },
  {
    path: "/collab/content-deliverable/:id",
    name: " Collab Campaign Card",
    element: CampaignCollabView,
  },
  {
    path: "/profile/youtube-auth",
    name: "redirect",
    element: RedirectedPage,
  },
  {
    path: "/profile",
    name: "Profile",
    element: BasicInfluencerProfile,
  },
  {
    path: "/influencer_address",
    name: "Address",
    element: InfluencerAddress,
  },
  {
    path: "/social-account",
    name: "Social-Account_Profile",
    element: SocialAccountProfilePage,
  },
  {
    path: "/profile/security",
    name: "Profile",
    element: ChangePasswordInfluencer,
  },
  {
    path: "/security/forgot-password",
    name: "Influencer_Security_ForgotPassword",
    element: ForgetPassword,
  },
  {
    path: "/collaborations/*",
    name: "Collaborations_details",
    element: CampaignCollaboration,
  },
  {
    path: "/profile/influencer_pricing",
    name: "influencer pricing Details",
    element: InfluencerPricing,
  },
  {
    path: "/notification",
    name: "notifictions",
    element: Notifications,
  },
  {
    path: "/earnings",
    name: "Earning History",
    element: EarningHistory,
  },
];
export default Influencer_Routes;
