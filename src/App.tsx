import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "./admin/layout/DefaultAdminLayout.layout";
import MarketerLayout from "./marketer/layout/default_layout.component";
import Influencerlayout from "./influencer/layout/Influencer_layout.component";
import RegistrationForm from "./global/global_pages/register/sign-up.pages";
import LoginForm from "./global/global_pages/login/login.pages";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./utils/selectors/user.selectors";
import InfluencerDashBoardLayout from "./influencer/layout/dashboard_layout/dashboard_layout.component";
import MarketerDashBoardLayout from "./marketer/layout/dashboard_layout/dashboard_layout.component";
import Page404NotFound from "./global/global_pages/pages/page404.component";
import { CSpinner } from "@coreui/react";
import Loader from "./global/global_component/loader/loader.component";
/**
 * App
 * @returns
 */
const App = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <>
      <Suspense
        fallback={
          <div className="m-auto">
            <Loader />
          </div>
        }>
        <Routes>
          <Route path="/*" element={<MarketerLayout />} />
          <Route path="/admin-app/*" element={<AdminLayout />} />
          {/* 
          {user.role === "influencer" && (
            <Route path="/influencer/*" element={<Influencerlayout />} />
          )} */}
          <Route path="/influencer/*" element={<Influencerlayout />} />
          {/* {user.userData !== null &&
            user.userData.user.role === "Influencer" && ( */}
          <Route
            path="/influencer-app/*"
            element={<InfluencerDashBoardLayout />}
          />
          {/* )} */}
          {/* {user.userData !== null && user.userData.user.role === "Marketer" && ( */}
          <Route path="/marketer-app/*" element={<MarketerDashBoardLayout />} />
          {/* )} */}
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="login" element={<LoginForm />} />

          <Route element={<Page404NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
