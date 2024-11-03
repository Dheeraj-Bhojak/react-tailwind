import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import {
  CAvatar,
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import noData from "../../../assets/images/avatars/nodata.png";

import userProfile from "../../../assets/images/avatars/user.png";
import CIcon from "@coreui/icons-react";
import { cilOptions, cilUser, cilX } from "@coreui/icons";
import { Link, useNavigate } from "react-router-dom";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";

interface SavedInfluencerApiResponse {
  id: number;
  niche: {
    niche_name: string;
  };
  user: {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    profile_picture: {
      id: number;
      img_name: string;
      img_url: string;
      is_active: true;
    }[];
  };
}

const SavedInfluencerTable = () => {
  const [loading, setLoading] = useState(true);
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const [showToast, setShowToast] = useState(false);

  const [influencerData, setInfluencerData] = useState<
    SavedInfluencerApiResponse[] | null
  >(null);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const [menuStates, setMenuStates] = useState<boolean[]>(
    Array(influencerData?.length).fill(false)
  );

  const [bool, setBool] = useState(true);
  const handleMenuClick = (index: number) => {
    const updatedMenuStates = [...menuStates];
    updatedMenuStates[index] = !updatedMenuStates[index];
    setMenuStates(updatedMenuStates);
  };
  const handleMenuItemClick = (menuItem: string, index: number) => {
    if (menuItem === "Remove Influencer") {
      const influencer = influencerData && influencerData[index];
      if (influencer) {
        removeInfluencerFromList(influencer.id);
      }
    } else if (menuItem === "View Influencer") {
      const influencer = influencerData && influencerData[index];
      if (influencer) {
        navigateToInfluencerProfile(influencer.user.id);
      }
    }
    const updatedMenuStates = [...menuStates];
    updatedMenuStates[index] = false;
    setMenuStates(updatedMenuStates);
  };

  const navigate = useNavigate();
  const navigateToInfluencerProfile = (id: number) => {
    navigate(`/marketer-app/influencer-marketplace/${id}`);
  };

  const removeInfluencerFromList = async (id: number) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}marketers/save-influencer/${id}`,
        { remove: true },
        config
      );
      const { status, data } = response;
      const { message, theme } = CallToast(status, data.message);
      setResponseToast({ message, theme });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      setBool((prev) => !prev);
    } catch (error: any) {
      const { status, data } = error.response;
      const { message, theme } = CallToast(status, data.message);
      setResponseToast({ message, theme });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}marketers/saved-influencer`,
          config
        );
        setInfluencerData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bool]);
  return (
    <Fragment>
      {showToast ? (
        <ToastNotification
          message={responseToast.message}
          theme={responseToast.theme}
        />
      ) : (
        ""
      )}
      {influencerData && influencerData.length > 0 ? (
        <div className="overflow-scroll min-h-[50vh]">
          <CTable striped>
            <CTableHead>
              <CTableRow className="text-center">
                <CTableHeaderCell scope="col">Profile</CTableHeaderCell>
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                <CTableHeaderCell scope="col">Niches</CTableHeaderCell>
                <CTableHeaderCell scope="col">Platform</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Total Engagement
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {influencerData.map((influencer, index) => (
                <CTableRow
                  className="justify-center items-center text-center"
                  key={index}>
                  <CTableDataCell>
                    <img
                      src={
                        influencer.user.profile_picture[0]
                          ? influencer.user.profile_picture[0].img_url
                          : userProfile
                      }
                      className="rounded-full flex mx-auto h-8"
                      alt="img"
                    />
                  </CTableDataCell>
                  <CTableDataCell>{`${influencer.user.first_name} ${influencer.user.last_name}`}</CTableDataCell>
                  <CTableDataCell>
                    {influencer.user.gender ? influencer.user.gender : " - "}
                  </CTableDataCell>
                  <CTableDataCell>
                    {influencer.niche ? influencer.niche.niche_name : " - "}
                  </CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>@mdo</CTableDataCell>
                  <CTableDataCell>
                    <CDropdown variant="dropdown" className="">
                      <CDropdownToggle
                        className="py-0 bg-transparent  border-0 text-black "
                        caret={false}>
                        <CIcon
                          icon={cilOptions}
                          onClick={() => handleMenuClick(index)}
                        />
                      </CDropdownToggle>
                      <CDropdownMenu className="">
                        <CDropdownItem
                          onClick={() =>
                            handleMenuItemClick("View Influencer", index)
                          }>
                          <CIcon icon={cilUser} className="me-2" />
                          View Influencer
                        </CDropdownItem>
                        <CDropdownItem
                          className="active:bg-red-800 hover:bg-red-500 hover:text-white"
                          onClick={() =>
                            handleMenuItemClick("Remove Influencer", index)
                          }>
                          <CIcon icon={cilX} className="me-2" />
                          Remove Influencer
                        </CDropdownItem>
                      </CDropdownMenu>
                    </CDropdown>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </div>
      ) : (
        <div className="items-center justify-center ">
          <img
            src={noData}
            alt="Error for coffee"
            className="w-auto h-80 mx-auto "
          />{" "}
          <h3 className="text-center md:text-xl md:font-bold  text-base font-semibold">
            {" "}
            No Any Save Influencer!! Find Influencer At{" "}
            <Link
              className="text-ri-blue underline hover:text-ri-orange"
              to="/marketer-app/influencer-marketplace">
              Influencer-Marketplace
            </Link>
          </h3>
        </div>
      )}
    </Fragment>
  );
};

export default SavedInfluencerTable;
