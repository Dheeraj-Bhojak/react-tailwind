import React, { useContext, useState } from "react";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";
import AppSidebarNav from "./AppSidebarNav";
import logo from "../assets/images/new/logo-quickGrow1.png";
import sideLogo from "../assets/images/new/QG-logo.png";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { NavItemObject } from "./_nav";
import { SliderBarContext } from "../utils/context/sidebar.context";

interface NavMenuProps {
  navigationMenu: NavItemObject[];
}

const AppSidebar: React.FC<NavMenuProps> = ({ navigationMenu }) => {
  const [unfoldable, setUnfoldable] = useState(true);
  const { state } = useContext(SliderBarContext);
  const dispatchToggleUnfoldable = () => {
    setUnfoldable(!unfoldable);
  };

  return (
    <CSidebar
      className=""
      position="fixed"
      unfoldable={!unfoldable}
      visible={state.isSliderBarOpen}>
      <CSidebarBrand className="d-none d-md-flex">
        <img className="sidebar-brand-full" src={logo} height={35} alt="logo" />
        <img
          className="sidebar-brand-narrow"
          src={sideLogo}
          height={35}
          alt="sideLogo"
        />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigationMenu} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={dispatchToggleUnfoldable}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
