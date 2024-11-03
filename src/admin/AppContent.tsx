import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import Page404NotFound from "../global/global_pages/pages/page404.component";
import Loader from "../global/global_component/loader/loader.component";

interface routeProps {
  routes: {
    path: string;
    name: string;
    element: React.ComponentType<any>;
  }[];
}

const AppContent: React.FC<routeProps> = ({ routes }) => {
  return (
    <Suspense fallback={<Loader />}>
      <div>
        <Routes>
          {routes.map((route, idx) => {
            return (
              route.element && (
                <Route
                  key={idx}
                  path={route.path}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="dashboard" />} />
          <Route path="/*" Component={Page404NotFound} />
        </Routes>
      </div>
    </Suspense>
  );
};

export default React.memo(AppContent);
