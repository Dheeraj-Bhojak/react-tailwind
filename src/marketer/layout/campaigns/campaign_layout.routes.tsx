import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import CampaignCardView from "../../components/campaigns/campaignCardsView/campaignCards.component";
import Page404NotFound from "../../../global/global_pages/pages/page404.component";
import Loader from "../../../global/global_component/loader/loader.component";

interface routeProps {
  routes: {
    path: string;
    name: string;
  }[];
}

const MarketerCampaignRouteContent: React.FC<routeProps> = ({ routes }) => {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Routes>
          {routes.map((route, idx) => {
            return (
              <Route
                key={idx}
                path={route.path}
                element={<CampaignCardView />}
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

export default React.memo(MarketerCampaignRouteContent);
