import React, { Fragment, useState } from "react";
import _ from "lodash";
import { formatNumberShort } from "../../../utils/utilsMethods/formatNumberSort.utils";
import {
  InfluencerInterface,
  PlatformInterface,
  ProfileInterface,
} from "../../../marketer/pages/InfluencerProfile/profieResult";
import { socialIcons } from "../../../seeder";
import india from "../../../assets/img/india.png";
import qscore from "../../../assets/img/qscore.png";
import userProfile from "../../../assets/images/avatars/user.png";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../toastNotification/ToastNotification";
interface ProfileInfluencerInterfaceProp {
  profile: ProfileInterface;
  influencer: InfluencerInterface;
  platform: PlatformInterface[] | null;
}

const ProfileSection: React.FC<ProfileInfluencerInterfaceProp> = ({
  profile,
  influencer,
  platform,
}) => {
  const [influencerContact, setInfluencerContact] = useState<{
    id: number;
    email: string;
    contact_number: string | null;
  } | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const handleProfileImgError = () => {
    setError(true);
  };

  const [showToast, setShowToast] = useState(false);
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const fetchContactDetails = async (id: number) => {
    setLoading(true);
    const InfluencerContactApi = `${process.env.REACT_APP_API_URL}marketers/influencer/contact/${id}`;
    const config = {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const { data } = await axios.get(InfluencerContactApi, config);
      setInfluencerContact(data);
    } catch (error: any) {
      const { status, data } = error.response;
      const { message, theme } = CallToast(status, data.message);
      setResponseToast({ message, theme });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

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
      <div className="items-center">
        <div className="flex-none lg:flex items-center mr-4 ml-4">
          <div className="flex justify-center md:justify-start">
            <img
              className="w-36 h-36 rounded-full object-cover"
              src={
                error
                  ? userProfile
                  : profile.profile_picture
                  ? profile.profile_picture.img_url
                  : userProfile
              }
              alt="profilePic"
              onError={handleProfileImgError}
            />
          </div>
          <div className="flex-none w-full md:w-10/12 md:flex md:ml-5 ">
            <div className="w-full">
              <div className="w-full md:border-b-2 md:p-3 flex">
                <div className="w-8/12">
                  <div>
                    <h2 className="text-center md:text-start flex-none md:flex font-medium mb-3 text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
                      {_.startCase(profile.fullName)}
                    </h2>
                  </div>
                  <div className="flex items-center justify-center md:justify-start md:items-center">
                    {profile.gender.toLowerCase() === "m" ? (
                      <i className="text-[22px] mr-4 fa-solid fa-mars text-[#50C8EF]"></i>
                    ) : profile.gender.toLowerCase() === "f" ? (
                      <i className="text-[22px] mr-4 fa-solid fa-venus text-[#FF4181]"></i>
                    ) : (
                      <i className="text-[22px] mr-4 fa-solid fa-venus-mars text-[#EF4627]"></i>
                    )}
                    <div className="h-7 w-0.5 bg-gray-400 mr-3"></div>
                    <p className="text-lg lg:text-lg xl:text-lg 2xl:text-xl mr-3">
                      {profile.age}
                    </p>
                    <div className="h-7 w-0.5 bg-gray-400 mr-3"></div>
                    <div className="flex items-center">
                      <p className="text-lg lg:text-lg xl:text-lg 2xl:text-xl mr-3">
                        {influencer && influencer.city !== null
                          ? influencer.city.location_title
                          : "-"}{" "}
                        ,{" "}
                        {influencer.city
                          ? influencer.city.location_description
                          : "-"}
                      </p>
                      <img
                        className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6"
                        src={india}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {influencerContact ? (
                  <div className="w-4/12 relative group">
                    {/* <div className="flex">
                      <p className="mr-2 md:mr-0 font-medium md:font-normal  text-sm md:text-lg 2xl:text-lg xl:text-sm text-[#909aaa]">
                        Contact Details
                      </p>
                    </div> */}
                    <div className="flex">
                      <i className="fa-solid fa-envelope text-sm text-ri-blue"></i>
                      <p className="mx-2 text-sm">{influencerContact.email}</p>
                    </div>
                    <div className="flex">
                      <i className="fa-solid fa-phone text-sm text-ri-blue"></i>
                      <p className="mx-2 text-sm">
                        {influencerContact.contact_number
                          ? influencerContact.contact_number
                          : "Not Available"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="w-4/12 relative group">
                    <div className="flex">
                      {/* <p className="mr-2 md:mr-0 font-medium md:font-normal  text-sm md:text-lg 2xl:text-lg xl:text-sm text-[#909aaa]">
                        Contact Details
                      </p> */}
                      <button
                        className=" mx-3 border-1 px-2 bg-ri-orange items-center rounded-lg text-xs"
                        onClick={() => fetchContactDetails(2)}>
                        Show
                        {/*  Contact <p className="text-[10px] ">Use 1 Coin</p> */}
                      </button>
                    </div>
                    <div className="flex">
                      <i className="fa-solid fa-envelope text-sm text-ri-blue"></i>
                      <p className="mx-2 text-sm">dh*******@g***.com</p>
                    </div>
                    <div className="flex">
                      <i className="fa-solid fa-phone text-sm text-ri-blue"></i>
                      <p className="mx-2 text-sm">+91*******3**</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="pt-1 p-3 w-full md:mt-3">
                <div className="md:flex w-full">
                  <div className="md:w-1/3">
                    <div className="w-full flex md:flex-col">
                      <div className="w-4/12 flex justify-end md:justify-start">
                        <p className="mr-2 md:mr-0 font-medium md:font-normal text-sm md:text-lg 2xl:text-lg xl:text-sm text-[#909aaa]">
                          Niche
                        </p>
                      </div>
                      <div className="w-w-8/12">
                        <p className="ml-2 md:ml-0 text-[13px] md:text-lg 2xl:text-xl xl:text-lg">
                          {influencer && influencer.niche !== null
                            ? influencer.niche.niche_name
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <div className="w-full flex md:flex-col">
                      <div className="w-4/12 flex justify-end md:justify-start">
                        <p className="mr-2 md:mr-0 font-medium md:font-normal text-sm md:text-lg 2xl:text-lg xl:text-sm text-[#909aaa]">
                          Interests
                        </p>
                      </div>
                      <div className="w-w-8/12">
                        <p className="ml-2 md:ml-0 text-[13px] md:text-lg 2xl:text-xl xl:text-lg">
                          {influencer && influencer.interest !== null
                            ? influencer.interest
                            : "-"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/4 flex md:flex-wrap justify-center md:justify-end items-center py-2">
              <div className="flex md:ml-20 items-cente mr-20 md:mr-0">
                <img
                  // className="w-10 md:w-20 h-auto xl:w-20 xl:h-auto 2xl:w-24 2xl:h-auto"
                  className="w-10 h-10 md:w-20 md:h-20"
                  src={qscore}
                  alt=""
                />
                <svg
                  className="w-10 h-10 md:w-24 md:h-24 xl:w-24 2xl:w-20"
                  viewBox="0 0 288 288"
                  xmlns="http://www.w3.org/2000/svg">
                  <polygon
                    points="150,15 258,77 258,202 150,265 42,202 42,77"
                    fill="#FF4F00"
                  />
                  <text
                    x="148"
                    y="185"
                    textAnchor="middle"
                    fill="white"
                    fontSize="90">
                    2{" "}
                  </text>
                </svg>
              </div>
              <div className="flex md:ml-7 md:pt-4 items-center ml-2">
                {platform &&
                  platform.map((item, index) => (
                    <div className="flex flex-col items-center" key={index}>
                      <img
                        className="w-4 h-4 md:w-6 md:h-6 2xl:w-7 2xl:h-7 xl:w-6 xl:h-6 mb-2"
                        src={socialIcons[item.platformName]}
                        alt=""
                      />
                      <div
                        className={`${
                          item.platformName === "instagram"
                            ? "bg-[#4267b2]"
                            : "bg-[#fdc100]"
                        } w-16 h-4 md:w-28 md:h-7`}></div>
                      <p className="md:text-lg text-xs">
                        {formatNumberShort(item.platformAudience)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileSection;
