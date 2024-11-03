import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import Page404NotFound from "../../../global/global_pages/pages/page404.component";
import CampaignCollaborationCardView from "../../component/collab/campaignCollabCardView.component";
import Loader from "../../../global/global_component/loader/loader.component";

interface routeProps {
  routes: {
    path: string;
    name: string;
  }[];
}

const InfluencerCollaborationRoute: React.FC<routeProps> = ({ routes }) => {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Routes>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                element={<CampaignCollaborationCardView />}
              />
            );
          })}
          <Route path="/" element={<Navigate to="all" />} />
          <Route path="/*" Component={Page404NotFound} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default React.memo(InfluencerCollaborationRoute);
