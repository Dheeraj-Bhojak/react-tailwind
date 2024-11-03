import React from "react";
import InfluencerCollaborationRoute_layoutComponent from "../../layout/collaboration_layout/InfluencerCollaborationRoute_layout.component";

const NavList = [
  {
    id: 1,
    name: "all",
    campaign_counts: 0,
  },
  {
    id: 2,
    name: "applied",
    campaign_counts: 0,
  },

  {
    id: 3,
    name: "selected",
    campaign_counts: 0,
  },
  {
    id: 4,
    name: "hired",
    campaign_counts: 0,
  },
  {
    id: 5,
    name: "completed",
    campaign_counts: 0,
  },
  {
    id: 6,
    name: "rejected",
    campaign_counts: 0,
  },
];

const campaignLayoutRoutes = NavList.map((obj, indx) => ({
  id: obj.id,
  name: obj.name.charAt(0).toUpperCase() + obj.name.slice(1),
  path: obj.name,
}));
const CampaignCollaboration: React.FC = () => {
  return (
    <InfluencerCollaborationRoute_layoutComponent
      routes={campaignLayoutRoutes}
    />
  );
};

export default CampaignCollaboration;
