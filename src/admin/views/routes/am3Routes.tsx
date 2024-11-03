import React from "react";
const Dashboard = React.lazy(() => import("../dashboard/Dashboard"));
const CampaignCardView = React.lazy(
  () => import("../../components/campaign/campaign.component")
);
const AdminProfile = React.lazy(() => import("../pages/profile/profile"));
const CampaignReviewTable = React.lazy(
  () => import("../../layout/campaign/campaignReviewLayout.component")
);
const CampaignTableAM3 = React.lazy(
  () => import("../../components/am3/campaignTable/campaignTable.component")
);
const AgreementForm = React.lazy(
  () => import("../../components/am3/agreement/agreement_form.component")
);
const CampaignInfluencerTableAM3 = React.lazy(
  () =>
    import("../../components/am3/influencerTable/influencerBreakdown.component")
);
const CampaignRoutes = [
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "profile", element: AdminProfile },
  {
    path: "/campaign-review",
    name: "Campaign_Review",
    element: CampaignReviewTable,
  },
  {
    path: "/campaigns",
    name: "Campaign Table",
    element: CampaignTableAM3,
  },
  {
    path: "/campaign/view/:campaignId",
    name: "Campaign Table",
    element: CampaignCardView,
  },
  {
    path: "/campaign/collab/:id",
    name: "Campaign collab table",
    element: CampaignInfluencerTableAM3,
  },
  {
    path: "/campaign/collaboration/agreement/:id",
    name: "Campaign collab agreement form",
    element: AgreementForm,
  },
];
export default CampaignRoutes;
