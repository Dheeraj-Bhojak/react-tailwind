import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import { CampaignPostStateType } from "./postCampaignHeader.component";
import Loader from "../../../global/global_component/loader/loader.component";

interface routeProps {
  routes: {
    path: string;
    name: string;
    element: React.ComponentType<any>;
  }[];
  campaignPostState: {
    campaignFormObject: CampaignPostStateType;
    setCampaignFormObject: React.Dispatch<
      React.SetStateAction<CampaignPostStateType>
    >;
  };
}

const MarketerCreateCampaignRouteContent: React.FC<routeProps> = ({
  routes,
  campaignPostState,
}) => {
  return (
    <Suspense fallback={<Loader />}>
      <div className="">
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={
                    <route.element campaignPostState={campaignPostState} />
                  }
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="campaign_overview" />} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default React.memo(MarketerCreateCampaignRouteContent);
