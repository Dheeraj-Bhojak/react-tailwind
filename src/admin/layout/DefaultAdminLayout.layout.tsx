import React from "react";

import { AppContent, AppSidebar, AppFooter, AppHeader } from "../index";
import {
  SuperAdminAppNav,
  MarketerAccountManagerAdminAppNav,
  AdminHeadNav,
  InfluencerAccountManagerAdminAppNav,
  CampaignsAccountManagerAdminAppNav,
} from "../_nav";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../utils/selectors/user.selectors";
import AdminRoutes from "../views/routes/adminRoutes";
import InfluencerAM_Routes from "../views/routes/am1Routes";
import MarketerAM_Routes from "../views/routes/am2Routes";
import CampaignRoutes from "../views/routes/am3Routes";
import "../../scss/style.scss";

const AdminLayout: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const { admin_role } = user.userData.user;

  return (
    <div>
      <AppSidebar
        navigationMenu={
          admin_role === "SUPER_ADMIN"
            ? SuperAdminAppNav
            : admin_role === "AM1"
            ? InfluencerAccountManagerAdminAppNav
            : admin_role === "AM2"
            ? MarketerAccountManagerAdminAppNav
            : admin_role === "AM3"
            ? CampaignsAccountManagerAdminAppNav
            : []
        }
      />
      <div className="wrapper d-flex flex-column min-vh-100 bg-white">
        <AppHeader AppHeadNav={AdminHeadNav} />
        <div className="body flex-grow-1">
          <AppContent
            routes={
              admin_role === "SUPER_ADMIN"
                ? AdminRoutes
                : admin_role === "AM1"
                ? InfluencerAM_Routes
                : admin_role === "AM2"
                ? MarketerAM_Routes
                : admin_role === "AM3"
                ? CampaignRoutes
                : []
            }
          />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
