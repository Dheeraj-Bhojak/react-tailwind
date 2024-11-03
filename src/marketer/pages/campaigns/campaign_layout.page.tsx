import React from "react";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import MarketerCampaignRouteContent from "../../layout/campaigns/campaign_layout.routes";
const NavList = [
  {
    id: 1,
    name: "all",
    campaign_counts: 0,
  },
  {
    id: 2,
    name: "active",
    campaign_counts: 0,
  },

  {
    id: 3,
    name: "under_review",
    campaign_counts: 0,
  },
  {
    id: 4,
    name: "draft",
    campaign_counts: 0,
  },
  {
    id: 5,
    name: "completed",
    campaign_counts: 0,
  },
  {
    id: 6,
    name: "archive",
    campaign_counts: 0,
  },
];

const campaignLayoutRoutes = NavList.map((obj, indx) => ({
  id: obj.id,
  name: obj.name.charAt(0).toUpperCase() + obj.name.slice(1),
  path: obj.name,
}));
const CampaignLayout = () => {
  return <MarketerCampaignRouteContent routes={campaignLayoutRoutes} />;
};

export default CampaignLayout;
