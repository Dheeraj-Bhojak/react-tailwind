import React from "react";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import {
  cilEnvelopeOpen,
  cilAccountLogout,
  cilSettings,
  cilUser,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { userLogOutActions } from "../../utils";
import { useNavigate } from "react-router-dom";
import userProfileDefault from "../../assets/images/avatars/user.png";

/**
 * AppHeaderDropdown
 * this react component is responsible to return admin header menubar
 *
 */
interface AppHeaderProfilePicture {
  userProfile: string;
}
const AppHeaderDropdown: React.FC<AppHeaderProfilePicture> = ({
  userProfile,
}) => {
  const dispatch = useDispatch();
  const { userLogOut } = bindActionCreators(userLogOutActions, dispatch);

  const navigate = useNavigate();
  const handleLogOut = () => {
    userLogOut();
    navigate("/");
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        <CAvatar src={userProfile && userProfileDefault} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" >
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Account
        </CDropdownHeader>

        <CDropdownItem className="cursor-pointer">
          <CIcon icon={cilEnvelopeOpen} className="me-2" />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem className="cursor-pointer">
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>

        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem className="cursor-pointer">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem className="cursor-pointer" onClick={handleLogOut}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
