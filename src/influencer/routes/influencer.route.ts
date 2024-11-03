import { lazy, LazyExoticComponent } from "react";

const HomeInfluencer: LazyExoticComponent<any> = lazy(
  () => import("../pages/home_influencer.component")
);
const InfluencerCard: LazyExoticComponent<any> = lazy(
  () => import("../component/influencerCard/influencerCard.component")
);

const InfluencerAppRoutes: {
  path: string;
  name: string;
  element: LazyExoticComponent<any>;
}[] = [
  { path: "/", name: "Home", element: HomeInfluencer },
  { path: "/user", name: "User", element: InfluencerCard },
];

export default InfluencerAppRoutes;
