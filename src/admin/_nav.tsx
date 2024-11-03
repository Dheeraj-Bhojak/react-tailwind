import CIcon from "@coreui/icons-react";
import {
  cilUser,
  cilBullhorn,
  cilSpreadsheet,
  cilSpeedometer,
  cilBuilding,
  cilGroup,
} from "@coreui/icons";
import { CNavGroup, CNavItem } from "@coreui/react";
import { CNavLinkProps } from "@coreui/react/dist/components/nav/CNavLink";
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

export const SuperAdminAppNav: NavItemObject[] = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/admin-app/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
  {
    component: CNavGroup,
    name: "Campaign",
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,

    items: [
      {
        component: CNavItem,
        name: "Review Request",
        to: "campaign-review/",
        badge: {
          color: "warning",
          text: "10+",
        },
      },
      {
        component: CNavItem,
        name: "Companies",
        to: "/admin-app/",
      },
    ],
  },

  {
    component: CNavItem,
    name: "Profile",
    to: "profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: "Table",
    to: "/admin-app/",
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Influencer",
        to: "/admin-app/influencer-table",
      },
      {
        component: CNavItem,
        name: "Campaigns",
        to: "/admin-app/campaign-table",
      },
      {
        component: CNavItem,
        name: "Companies",
        to: "/admin-app/marketer-table",
      },
    ],
  },
  {
    component: CNavItem,
    name: "Broadcast Notification",
    to: "broadcast",
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
  },
];

export interface AppHeadNavOption {
  id: number;
  title: string;
  path: string;
}

export const AdminHeadNav: AppHeadNavOption[] = [
  { id: 1, title: "dashboard", path: "/admin-app/dashboard" },
  { id: 2, title: "user", path: "/admin-app/dashboard" },
  { id: 3, title: "settings", path: "/admin-app/dashboard" },
  { id: 4, title: "notification", path: "/admin-app/dashboard" },
];

export const MarketerAccountManagerAdminAppNav: NavItemObject[] = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/admin-app/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Marketer table",
    to: "marketers",
    icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
  },
];

export const InfluencerAccountManagerAdminAppNav: NavItemObject[] = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/admin-app/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Influencer Table",
    to: "/admin-app/am1/influencer-table",
    icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
  },
];

export const CampaignsAccountManagerAdminAppNav: NavItemObject[] = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/admin-app/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "warning",
      text: "NEW",
    },
  },
  {
    component: CNavItem,
    name: "Profile",
    to: "profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "campaign table",
    to: "campaigns",
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
  },
];
