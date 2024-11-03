import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";
import _ from "lodash";
import { AppHeaderDropdown } from "./header/index.header";
import logo from "../assets/images/new/logo-quickGrow3.png";
import { SliderBarContext } from "../utils/context/sidebar.context";
import { AppHeadNavOption } from "./_nav";
import { selectCurrentUser } from "../utils/selectors/user.selectors";

interface AppNavProps {
  AppHeadNav: AppHeadNavOption[];
}

const AppHeader: React.FC<AppNavProps> = ({ AppHeadNav }) => {
  const { toggleSliderBar } = useContext(SliderBarContext);
  const user = useSelector(selectCurrentUser);
  return (
    <CHeader position="sticky" className="">
      <CContainer fluid>
        <CHeaderToggler className="ps-1" onClick={toggleSliderBar}>
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto  ">
          <img src={logo} alt="qikgro-Logo" className="md:h-12 h-8" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          {AppHeadNav.map((navOption) => (
            <CNavItem key={navOption.id}>
              <CNavLink to={navOption.path} component={NavLink}>
                {_.startCase(navOption.title)}
              </CNavLink>
            </CNavItem>
          ))}
        </CHeaderNav>
        Hii, {user.userData.user.first_name}
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown userProfile={user.userData.user.profile_picture} />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
