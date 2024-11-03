import React from "react";

const ProfileView = React.lazy(
  () => import("../../pages/InfluencerProfile/influencerProfileView.page")
);
const SimplePagination = React.lazy(
  () =>
    import("../../../global/global_component/pagination/pagination.component")
);
const CampaignLayout = React.lazy(
  () => import("../../pages/campaigns/campaign_layout.page")
);
const InfluencerMarketPlace = React.lazy(
  () => import("../../pages/marketPlace/influencerMarketPlace.component")
);
const OwnCampaignView = React.lazy(
  () => import("../../pages/campaigns/ownCampaignView.page")
);
const CampaignContentTable = React.lazy(
  () => import("../../pages/campaign_content/campaignContent.component")
);
const BrandMarketerProfile = React.lazy(
  () => import("../../components/profileApp/brandMarketerProfile")
);
const ForgetPassword = React.lazy(
  () => import("../../components/profileApp/forgetPassword.component")
);
const PostCampaignHeader = React.lazy(
  () => import("../../components/campaignPost/postCampaignHeader.component")
);
const ChangePasswordMarketer = React.lazy(
  () => import("../../components/profileApp/changePasswordMarketer.component")
);
const CampaignCardView = React.lazy(
  () =>
    import(
      "../../components/campaigns/campaignCardsView/campaignCards.component"
    )
);
const SavedInfluencerTable = React.lazy(
  () => import("../../components/savedInfluencer/userTable.component")
);
const CampaignReport = React.lazy(
  () => import("../../pages/campaignReport/campaignReport.component")
);
const InfluencerPriceCalculator = React.lazy(
  () => import("../../pages/influencerCalculator/influencerCalculator.pages")
);
const MarketerProfile = React.lazy(
  () => import("../../components/profileApp/basicProfileMarketer.component")
);
const ContentView = React.lazy(
  () => import("../../pages/campaign_content/viewContent.pages")
);
const CampaignContentRequest = React.lazy(
  () => import("../../pages/campaign_content/campaignContentRequests.component")
);

const Marketer_Routes = [
  { path: "/profile", name: "profile", element: MarketerProfile },
  {
    path: "/profile/brand",
    name: "BrandProfile",
    element: BrandMarketerProfile,
  },
  {
    path: "/profile/security",
    name: "MarketerSecurity",
    element: ChangePasswordMarketer,
  },
  {
    path: "/security/forgot-password",
    name: "MarketerSecurity_ForgotPassword",
    element: ForgetPassword,
  },
  {
    path: "/create-campaign/*",
    name: "Create Campaign",
    element: PostCampaignHeader,
  },
  {
    path: "/influencer_marketplace",
    name: "test",
    element: CampaignCardView,
  },
  {
    path: "/campaigns/*",
    name: "Campaigns",
    element: CampaignLayout,
  },
  {
    path: "/influencer-marketplace/:id",
    name: "Influencer-marketplace",
    element: ProfileView,
  },
  {
    path: "/profile/saved_influencer",
    name: "Saved Influencer",
    element: SavedInfluencerTable,
  },
  {
    path: "/reporting/:campaignId",
    name: "campaign reporting",
    element: CampaignReport,
  },
  {
    path: "/influencer-marketplace",
    name: "Influencer MarketPlace",
    element: InfluencerMarketPlace,
  },
  {
    path: "/pagination",
    name: "pagination",
    element: SimplePagination,
  },
  {
    path: "/campaign/:id",
    name: "campaign",
    element: OwnCampaignView,
  },
  {
    path: "/influencer-calculator",
    name: "Influencer Price Calculator",
    element: InfluencerPriceCalculator,
  },
  {
    path: "/campaign/content_verification",
    name: "Influencer content Verification",
    element: CampaignContentTable,
  },
  {
    path: "/campaign/content_request/:id",
    name: "Influencer content Request",
    element: CampaignContentRequest,
  },
  {
    path: "/content/view/:id",
    name: "Influencer content view",
    element: ContentView,
  },
];
export default Marketer_Routes;
