import React, { useState } from "react";
import _ from "lodash";
import followersLogo from "../../../assets/icons/Subscribers.png";
import { formatNumberShort } from "../../../utils/utilsMethods/formatNumberSort.utils";
import { socialIcons } from "../../../seeder";
import { useNavigate } from "react-router-dom";
import { Bookmark } from "react-feather";
import { InfluencerInterFaceForMarketplace } from "../../pages/marketPlace/influencerMarketPlace.component";
import { CTooltip } from "@coreui/react";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";

interface InfluencerObj {
  data: InfluencerInterFaceForMarketplace;
}

const InfluencerMarketplaceCard: React.FC<InfluencerObj> = ({ data }) => {
  const navigate = useNavigate();
  const navigateToInfluencerInfo = () => {
    navigate(`/marketer-app/influencer-marketplace/${data.id}`);
  };
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const [showToast, setShowToast] = useState(false);
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const addInfluencerFromList = async (id: number) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}marketers/save-influencer/${id}`,
        { remove: false },
        config
      );
      const { status, data } = response;
      const { message, theme } = CallToast(status, data.message);
      setResponseToast({ message, theme });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
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
  return (
    <>
      {showToast ? (
        <ToastNotification
          message={responseToast.message}
          theme={responseToast.theme}
        />
      ) : (
        ""
      )}
      {data && (
        <div className=" flex-shrink-0">
          <div
            className="w-64 bg-gray-800 rounded-2xl overflow-hidden relative mx-auto hover:cursor-pointer"
            onClick={navigateToInfluencerInfo}>
            <div
              className="h-80 w-full bg-cover bg-center relative"
              style={{
                backgroundImage: `url(${
                  data.profile_picture && data.profile_picture.length > 0
                    ? data.profile_picture[0].img_url
                    : ""
                })`,
              }}>
              <div
                className="absolute bottom-0 text-white w-full opacity-[0.9] "
                id="grad1"></div>
              <div className="bottom-0 absolute">
                <div className="flex">
                  <p className="text-base text-left text-ri-yellow pl-4 pr-3">
                    {data.influencer.niche && data.influencer.niche.niche_name}
                  </p>
                  <div className="flex">
                    {_.map(data.platform, (socialPlatform, idx) => {
                      return (
                        <img
                          src={socialIcons[socialPlatform]}
                          loading="lazy"
                          width="22"
                          height="20"
                          alt={`${socialIcons[socialPlatform]}`}
                          className=" rounded-full mr-1"
                          key={idx}
                        />
                      );
                    })}
                  </div>
                </div>

                <p
                  className="text-xl left-0 text-white font-semibold px-4 mb-4"
                  style={{ WebkitTextStroke: "0.3px black" }}>
                  {data.fullName}
                </p>
              </div>

              {data.influencer.youtube_channel_ids && (
                <div className=" text-[12px] right-0 text-ri-blue absolute top-16">
                  <svg width="50" height="80">
                    <rect
                      x="0"
                      y="0"
                      rx="20"
                      width="50"
                      height="80"
                      fill="white"
                      opacity="0.6"
                    />
                    <image
                      href={followersLogo}
                      x="3"
                      y="10"
                      height="40"
                      width="44"
                    />
                    <text
                      x="25"
                      y="63"
                      textAnchor="middle"
                      fill="black"
                      fontSize="12">
                      {data.influencer.youtube_channel_ids &&
                        data.influencer.youtube_channel_ids.length > 0 &&
                        formatNumberShort(
                          parseInt(
                            data.influencer.youtube_channel_ids[0]
                              .subscriber_count
                          )
                        )}
                    </text>
                  </svg>
                </div>
              )}

              <div className="absolute top-8 right-2 transform -translate-y-1/2">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg">
                  <polygon
                    points="20,5 31.17,9.35 35,20 31.17,30.65 20,35 8.83,30.65 5,20 8.83,9.35"
                    fill="#FF4F00"
                  />
                  <text
                    x="20"
                    y="24"
                    textAnchor="middle"
                    fill="white"
                    fontSize="14">
                    {_.random(0, 100) / 10}
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="rounded-lg">
            <div className="flex justify-end  ">
              <CTooltip content="Save Influencer" placement="right">
                <Bookmark
                  className="rounded-full  hover:cursor-pointer w-10 h-12 px-2"
                  onClick={() => addInfluencerFromList(data.influencer.id)}
                />
              </CTooltip>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default InfluencerMarketplaceCard;
