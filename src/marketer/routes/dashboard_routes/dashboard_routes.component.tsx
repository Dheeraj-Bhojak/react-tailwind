import CIcon from "@coreui/icons-react";
import {
  cilUser,
  cilBuilding,
  cilLibraryAdd,
  cilSpeedometer,
  cilPeople,
  cilSettings,
  cilStorage,
  cilBookmark,
  cilCalculator,
  cilCheckCircle,
} from "@coreui/icons";

import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";
import { CNavLinkProps } from "@coreui/react/dist/components/nav/CNavLink";
import { AppHeadNavOption } from "../../../admin/_nav";
import { CNavTitleProps } from "@coreui/react/dist/components/nav/CNavTitle";
import { RefAttributes } from "react";

interface NavBadge {
  color: string;
  text: string;
}

interface NavItem {
  component: React.ForwardRefExoticComponent<
    CNavLinkProps & React.RefAttributes<HTMLLIElement>
  >;
  name: string;
  to: string;
  icon?: React.ReactNode;
  badge?: NavBadge;
  items?: NavItem[];
}

export interface NavItemObject {
  component:
    | React.ForwardRefExoticComponent<
        CNavLinkProps & React.RefAttributes<HTMLLIElement>
      >
    | React.ForwardRefExoticComponent<
        CNavTitleProps & RefAttributes<HTMLLIElement>
      >;
  to?: string;
  name: string;
  icon?: React.ReactNode;
  badge?: NavBadge;
  items?: NavItem[];
}

export const MarketerDashboardNav: NavItemObject[] = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/marketer-app/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  // {
  //   component: CNavTitle,
  //   name: "Theme",
  // },
  {
    component: CNavGroup,
    name: "Profile",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "General Info",
        to: "/marketer-app/profile",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Brand Info",
        to: "/marketer-app/profile/brand",
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Security",
        to: "/marketer-app/profile/security",
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Saved Influencer",
        to: "/marketer-app/profile/saved_influencer",
        icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: "Campaigns",
    to: "campaigns",
    icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Content verification",
    to: "/marketer-app/campaign/content_verification",
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: "Create Campaign",
    to: "/marketer-app/create-campaign",
    icon: <CIcon icon={cilLibraryAdd} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Influencer MarketPlace",
    to: "/marketer-app/influencer-marketplace",
    icon: <i className="fa-solid fa-users-viewfinder ml-2 mr-5"></i>,
  },
  {
    component: CNavTitle,
    name: "Others",
    icon: <i className="fa-solid fa-ellipsis ml-2 mr-5"></i>,
  },
  {
    component: CNavItem,
    name: "Influencer Calculator",
    to: "/marketer-app/influencer-calculator",
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
  },
  // {
  //   component: CNavItem,
  //   name: "Influencer MarketPlace",
  //   to: "influencer_marketplace",
  //   icon: <CIcon icon={cilMagnifyingGlass} customClassName="nav-icon" />,
  // },
];

export const MarketerHeadNav: AppHeadNavOption[] = [];
