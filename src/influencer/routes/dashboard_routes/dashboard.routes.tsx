import CIcon from "@coreui/icons-react";
import {
  cilUser,
  cilSpeedometer,
  cilAt,
  cilSettings,
  cilLocationPin,
} from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";
import { CNavLinkProps } from "@coreui/react/dist/components/nav/CNavLink";
import { AppHeadNavOption } from "../../../admin/_nav";

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
  component: React.ForwardRefExoticComponent<
    CNavLinkProps & React.RefAttributes<HTMLLIElement>
  >;
  to?: string;
  name: string;
  icon?: React.ReactNode;
  badge?: NavBadge;
  items?: NavItem[];
}

export const InfluencerDashboardNav: NavItemObject[] = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Profile",
    icon: <CIcon customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "General Info",
        to: "/influencer-app/profile",
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Social Account",
        to: "/influencer-app/social-account",
        icon: <CIcon icon={cilAt} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: "Your Address",
        to: "/influencer-app/influencer_address",
        icon: <CIcon icon={cilLocationPin} customClassName="nav-icon " />,
      },
      {
        component: CNavItem,
        name: "Service Pricing",
        to: "/influencer-app/profile/influencer_pricing",
        icon: <i className="fa-solid fa-indian-rupee-sign mr-6 -ml-9"></i>,
      },
      {
        component: CNavItem,
        name: "Security",
        to: "/influencer-app/profile/security",
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavItem,
    name: "Campaign Marketplace",
    to: "campaign-marketplace",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Collabs",
    to: "collaborations",
    icon: <i className="fa-solid fa-handshake-simple mr-5 ml-2"></i>,
  },
  {
    component: CNavItem,
    name: "Earning History",
    to: "earnings",
    icon: <i className="fas fa-rupee-sign mr-5 ml-2"></i>,
  },
];

export const InfluencerHeadNav: AppHeadNavOption[] = [];

// export const InfluencerHeadNav: AppHeadNavOption[] = [
//   { id: 1, title: "dashboard", path: "dashboard" },
//   { id: 2, title: "user", path: "dashboard" },
//   { id: 3, title: "settings", path: "dashboard" },
//   { id: 4, title: "notification", path: "dashboard" },
// ];
