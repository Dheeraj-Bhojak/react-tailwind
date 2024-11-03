import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { CBadge } from "@coreui/react";

interface NavItem {
  component: React.ElementType;
  name: string;
  to?: string;
  icon?: React.ReactNode;
  badge?: {
    color: string;
    text: string;
  };
  items?: NavItem[];
}

interface AppSidebarNavProps {
  items: NavItem[];
}

const AppSidebarNav: React.FC<AppSidebarNavProps> = ({ items }) => {
  const location = useLocation();

  const navLink = (
    name: string,
    icon: React.ReactNode,
    badge: NavItem["badge"]
  ) => (
    <>
      {icon && icon}
      {name && name}
      {badge && (
        <CBadge color={badge.color} className="ms-auto">
          {badge.text}
        </CBadge>
      )}
    </>
  );

  const navItem = (item: NavItem, index: number) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component as React.ElementType;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
            to: rest.to,
          })}
        key={index}
        {...rest}>
        {navLink(name, icon, badge)}
      </Component>
    );
  };

  const navGroup = (item: NavItem, index: number) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component as React.ElementType;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon, undefined)}
        visible={location.pathname.startsWith(to || "")}
        {...rest}>
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </React.Fragment>
  );
};

export default AppSidebarNav;
