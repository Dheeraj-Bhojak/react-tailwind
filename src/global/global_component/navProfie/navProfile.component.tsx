import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilAccountLogout, cilSettings, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import _ from "lodash";

import avatar8 from "../../../assets/images/avatars/8.jpg";
import { Link, useNavigate } from "react-router-dom";

interface NavProfileProps {
  role: string;
  LogOut: () => void; // Define the function signature in the prop type
  profile_picture: string;
}
const NavProfileDropDown: React.FC<NavProfileProps> = ({
  LogOut,
  role,
  profile_picture,
}) => {
  const navigate = useNavigate();
  const navigateToProfile = () => {
    navigate(`/${_.lowerCase(role)}-app`);
  };
  return (
    <>
      <CDropdown variant="nav-item" className="mr-2">
        <CDropdownToggle className="py-0" caret={false}>
          {/* <CAvatar
            className="border-2 object-fill h-10 w-10"
            src={profile_picture}
          /> */}
          <img
            src={profile_picture}
            className="h-11 w-11 object-cover border-1 border-white rounded-full"
            alt=""
          />
        </CDropdownToggle>
        <CDropdownMenu className="pt-0">
          <CDropdownHeader className="bg-light fw-semibold py-2">
            Account
          </CDropdownHeader>

          <CDropdownItem
            className="hover:bg-ri-gray cursor-pointer"
            onClick={navigateToProfile}>
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </CDropdownItem>

          <CDropdownHeader className="bg-light fw-semibold py-2 ">
            Settings
          </CDropdownHeader>

          <CDropdownItem>
            <CIcon icon={cilSettings} className="me-2 cursor-pointer" />
            Settings
          </CDropdownItem>
          <CDropdownDivider />
          <CDropdownItem onClick={LogOut} className=" cursor-pointer">
            <CIcon icon={cilAccountLogout} className="me-2" />
            LogOut
          </CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </>
  );
};
export default NavProfileDropDown;
