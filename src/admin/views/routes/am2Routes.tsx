import React from "react";
import MarketerTable from "../../components/am2/companiesTable.component";

const Dashboard = React.lazy(() => import("../dashboard/Dashboard"));
const AdminProfile = React.lazy(() => import("../pages/profile/profile"));
const CampaignReviewTable = React.lazy(
  () => import("../../layout/campaign/campaignReviewLayout.component")
);
const MarketerAM_Routes = [
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "profile", element: AdminProfile },
  {
    path: "/campaign-review",
    name: "Campaign_Review",
    element: CampaignReviewTable,
  },
  {
    path: "/marketers",
    name: "Companies_Table_data",
    element: MarketerTable,
  },
];

export default MarketerAM_Routes;
