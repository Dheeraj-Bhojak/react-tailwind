import React from "react";
import AdminCampaignTable from "../../components/superAdmin/AdminCampaignTable";

const Dashboard = React.lazy(() => import("../dashboard/Dashboard"));
const AdminProfile = React.lazy(() => import("../pages/profile/profile"));
const CampaignReviewTable = React.lazy(
  () => import("../../layout/campaign/campaignReviewLayout.component")
);
const AdminInfluencerTable = React.lazy(
  () => import("../../components/superAdmin/AdminInfluencerTable")
);
const AdminCompanyTable = React.lazy(
  () => import("../../components/superAdmin/AdminCompanyTable")
);

const BroadcastNotification = React.lazy(
  () => import("../../components/superAdmin/broadcast/broadcast.component")
);

const AdminRoutes = [
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "profile", element: AdminProfile },
  {
    path: "/campaign-review",
    name: "Campaign_Review",
    element: CampaignReviewTable,
  },
  {
    path: "/influencer-table",
    name: "Campaign_Review",
    element: AdminInfluencerTable,
  },
  {
    path: "/campaign-table",
    name: "Campaign_table",
    element: AdminCampaignTable,
  },
  {
    path: "/marketer-table",
    name: "Company_table",
    element: AdminCompanyTable,
  },
  {
    path: "/broadcast",
    name: "Broadcast_Notification",
    element: BroadcastNotification,
  },
];

export default AdminRoutes;
