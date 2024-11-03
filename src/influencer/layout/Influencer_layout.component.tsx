import React, { Suspense } from "react";

import { Route, Routes } from "react-router-dom";

import { CSpinner } from "@coreui/react";

import Footer from "../../global/global_component/footer/footer.component";
import NavBar from "../../global/global_component/navBar/navBar.component";

import InfluencerAppRoutes from "../routes/influencer.route";
import Loader from "../../global/global_component/loader/loader.component";

const InfluencerNavBarOption = [
  {
    id: 1,
    title: "DashBoard",
    to: "dashboard",
    active: true,
  },
  {
    id: 2,
    title: "About",
    to: "about",
    active: false,
  },
  {
    id: 3,
    title: "Services",
    to: "services",
    active: false,
  },
  {
    id: 4,
    title: "Pricing",
    to: "pricing",
    active: false,
  },
];

const Influencerlayout: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        {/* <div className="container"> */}
        <NavBar navigationMenus={InfluencerNavBarOption} />
        <Routes>
          {InfluencerAppRoutes.map((route, idx) => {
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
        </Routes>
        <Footer />
        {/* </div> */}
      </Suspense>
    </>
  );
};
export default Influencerlayout;
