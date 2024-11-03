import React from "react";
import { AppContent, AppFooter, AppHeader, AppSidebar } from "../../../admin";
import {
  MarketerDashboardNav,
  MarketerHeadNav,
} from "../../routes/dashboard_routes/dashboard_routes.component";
import Marketer_Routes from "../../routes/marketer_dashboard_routes/marketer_dashboard_routes_detail.component";

const MarketerDashBoardLayout = () => {
  return (
    <div>
      <AppSidebar navigationMenu={MarketerDashboardNav} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-white">
        <AppHeader AppHeadNav={MarketerHeadNav} />
        <div className="body flex-grow-1 pt-2  ">
          <AppContent routes={Marketer_Routes} />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default MarketerDashBoardLayout;
