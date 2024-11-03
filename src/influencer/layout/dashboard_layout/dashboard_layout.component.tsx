import React from "react";
import { AppContent, AppFooter, AppHeader, AppSidebar } from "../../../admin";
import {
  InfluencerDashboardNav,
  InfluencerHeadNav,
} from "../../routes/dashboard_routes/dashboard.routes";
import Influencer_Routes from "../../routes/influencer_dashboard_routes/influencer_dashboard_routes_detail.component";

const InfluencerDashBoardLayout = () => {
  return (
    <div>
      <AppSidebar navigationMenu={InfluencerDashboardNav} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-white">
        <AppHeader AppHeadNav={InfluencerHeadNav} />
        <div className="body flex-grow-1 px-3 ">
          <AppContent routes={Influencer_Routes} />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default InfluencerDashBoardLayout;
