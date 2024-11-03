import React from "react";
import MarketerTable from "../../components/am2/companiesTable.component";
// import InfluencerTableAM1 from "../../components/am1/influencerTable/influencerTable.component";

const Dashboard = React.lazy(() => import("../dashboard/Dashboard"));
const AdminProfile = React.lazy(() => import("../pages/profile/profile"));
const CampaignReviewTable = React.lazy(
  () => import("../../layout/campaign/campaignReviewLayout.component")
);
const InfluencerTableAM1 = React.lazy(
  () => import("../../components/am1/influencerTable/influencerTable.component")
);
const InfluencerAM_Routes = [
  { path: "/dashboard", name: "Dashboard", element: Dashboard },
  { path: "/profile", name: "profile", element: AdminProfile },
  {
    path: "/campaign-review",
    name: "Campaign_Review",
    element: CampaignReviewTable,
  },
  {
    path: "/am1/influencer-table",
    name: "Influencer",
    element: InfluencerTableAM1,
  },

  {
    path: "/influencer",
    name: "influencer table Data",
    element: MarketerTable,
  },
];

export default InfluencerAM_Routes;
