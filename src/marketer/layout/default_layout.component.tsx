import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";

import Footer from "../../global/global_component/footer/footer.component";
import AppRoutes from "../../app.routes";
import NavBar from "../../global/global_component/navBar/navBar.component";
import Page404NotFound from "../../global/global_pages/pages/page404.component";
import Loader from "../../global/global_component/loader/loader.component";

/**
 * MarketerLayout
 * @returns
 */
const MarketerLayout: React.FC = () => {
  const navigationMenus = [
    {
      id: 1,
      title: "For Influencers",
      to: "influencer",
      active: false,
    },
    {
      id: 2,
      title: "Pricing",
      to: "pricing",
      active: false,
    },
  ];
  return (
    <>
      <Suspense fallback={<Loader />}>
        <NavBar navigationMenus={navigationMenus} />
        <Routes>
          {AppRoutes.map((route, idx) => {
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
          <Route path="/*" element={<Page404NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
};

export default MarketerLayout;
