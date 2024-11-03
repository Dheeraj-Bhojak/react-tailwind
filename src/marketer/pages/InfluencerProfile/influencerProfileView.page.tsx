import { Fragment, useEffect, useState } from "react";
import ProfileSection from "../../../global/global_component/influencerProfileView/ProfileSection.component";
import SocialNavbar from "../../../global/global_component/influencerProfileView/socialNavbar.component";
import Navbar from "../../../global/global_component/influencerProfileView/profileNavbar.component";
import Overview from "../../../global/global_component/influencerProfileView/overview.component";
import Audience from "../../../global/global_component/influencerProfileView/audience.component";
import Content from "../../../global/global_component/influencerProfileView/content.component";
import Engagement from "../../../global/global_component/influencerProfileView/engagement.component";
import IndustryComparison from "../../../global/global_component/influencerProfileView/industryComparison.component";

import {
  InfluencerInterface,
  OverViewInterface,
  ProfileData,
  profileData,
  ProfileInterface,
} from "./profieResult";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../../../global/global_component/loader/loader.component";
import OverviewGrowth from "../../../global/global_component/influencerProfileView/overviewGrowth.component";
import LimitReach from "../../../global/global_pages/limitReach/limitReact.pages";

export interface cardVisibleInterface {
  followersGrowth: boolean;
  followingGrowth: boolean;
  ageAndGender: boolean;
  age: boolean;
  gender: boolean;
  city: boolean;
  state: boolean;
  country: boolean;
  likeComment: boolean;
  hashtags: boolean;
  engagementRate: boolean;
  industryComparison: boolean;
}

interface InfluencerBasicProfile {
  profile: ProfileInterface;
  influencer: InfluencerInterface;
  platformData: {
    overview: OverViewInterface;
  }[];
}

const ProfileView: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<number>(0);

  const { platformData } = profileData;

  const [platform, setPlatform] = useState([
    {
      platformName: "instagram",
      platformAudience: 112,
    },
    {
      platformName: "youtube",
      platformAudience: 0,
    },
  ]);

  const [error, setError] = useState<{
    showError: Boolean;
    errorMessage: string;
  }>({
    showError: false,
    errorMessage: "",
  });

  const { id } = useParams();
  const userId = parseInt(id ?? "0", 10);
  const user = useSelector(selectCurrentUser);
  const [loading, setLoading] = useState(true);
  const { access_token } = user.userData.token;

  const [influencerDetails, setInfluencerDetails] =
    useState<InfluencerBasicProfile | null>(null);
  useEffect(() => {
    const fetchUserProfileData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        const influencerProfileApiUrl = `${process.env.REACT_APP_API_URL}marketers/influencer-profile/${userId}`;
        const { data } = await axios.get(influencerProfileApiUrl, config);
        console.log("data :", data);
        setInfluencerDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfileData();
  }, []);

  const [cardVisible, setCardVisible] = useState<cardVisibleInterface>({
    followersGrowth: false,
    followingGrowth: false,
    ageAndGender: false,
    age: false,
    gender: false,
    city: false,
    state: false,
    country: false,
    likeComment: false,
    hashtags: false,
    engagementRate: false,
    industryComparison: false,
  });

  const handleShowCards = (cardName: keyof typeof cardVisible) => {
    setCardVisible((prev) => {
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key as keyof typeof cardVisible] = false;
        return acc;
      }, {} as typeof cardVisible);
      newState[cardName] = true;
      return newState;
    });
  };
  const [influencerFullReport, setInfluencerFullReport] =
    useState<ProfileData | null>(null);
  const [showFullReport, SetShowFullReport] = useState<boolean>(false);
  const handleViewFullReport = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };
      const influencerProfileApiUrl = `${process.env.REACT_APP_API_URL}marketers/influencer/${userId}`;
      const { data } = await axios.get(influencerProfileApiUrl, config);
      console.log("data :", data);
      setInfluencerFullReport(data);
      SetShowFullReport(true);
      setCardVisible({
        followersGrowth: true,
        followingGrowth: true,
        ageAndGender: true,
        age: true,
        gender: true,
        city: true,
        state: true,
        country: true,
        likeComment: true,
        hashtags: true,
        engagementRate: true,
        industryComparison: true,
      });
    } catch (error: any) {
      console.log(error.response.data.message);
      setError(() => ({
        showError: true,
        errorMessage: error.response.data.message,
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:container pt-3 sm:-mt-1 mx-auto ">
      {error.showError ? (
        <LimitReach message={error.errorMessage} />
      ) : (
        <>
          {showFullReport === false ? (
            <Fragment>
              {loading ? (
                <Loader />
              ) : (
                <Fragment>
                  {influencerDetails ? (
                    <Fragment>
                      <ProfileSection
                        profile={influencerDetails.profile}
                        influencer={influencerDetails.influencer}
                        platform={platform}
                      />
                      <SocialNavbar
                        platformData={influencerDetails.platformData}
                        selectedPlatform={selectedPlatform}
                        setSelectedPlatform={setSelectedPlatform}
                      />
                      <Navbar />
                      <Overview
                        overview={
                          influencerDetails.platformData[selectedPlatform]
                            .overview
                        }
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <OverviewGrowth
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <Audience
                        audience={platformData[selectedPlatform].audience[0]}
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <Content
                        content={platformData[selectedPlatform].content}
                      />
                      <Engagement
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <IndustryComparison
                        industryComparison={
                          platformData[selectedPlatform].industryComparison[0]
                        }
                        similarAccount={
                          platformData[selectedPlatform].similarAccount
                        }
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <div className="flex justify-center items-center">
                        <div className="fixed bottom-8 md:w-1/2 sm:w-2/3 z-10 bg-ri-blue text-white shadow-lg py-2 px-4 rounded-xl flex">
                          <p className="text-sm py-2 px-4">
                            Get full Instagram account report
                          </p>
                          <button
                            onClick={handleViewFullReport}
                            className="bg-ri-orange text-white px-3 py-1 rounded-full ml-auto">
                            Unlock Report
                          </button>
                        </div>
                      </div>
                    </Fragment>
                  ) : (
                    <>
                      <p>no data found</p>
                    </>
                  )}
                </Fragment>
              )}
            </Fragment>
          ) : (
            <>
              {loading ? (
                <Loader />
              ) : (
                <Fragment>
                  {influencerFullReport ? (
                    <Fragment>
                      <ProfileSection
                        profile={influencerFullReport.profile}
                        influencer={influencerFullReport.influencer}
                        platform={platform}
                      />
                      <SocialNavbar
                        platformData={influencerFullReport.platformData}
                        selectedPlatform={selectedPlatform}
                        setSelectedPlatform={setSelectedPlatform}
                      />
                      <Navbar />
                      <Overview
                        overview={
                          influencerFullReport.platformData[selectedPlatform]
                            .overview
                        }
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <OverviewGrowth
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <Audience
                        audience={
                          influencerFullReport.platformData[selectedPlatform]
                            .audience[0]
                        }
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <Content
                        content={
                          influencerFullReport.platformData[selectedPlatform]
                            .content
                        }
                      />
                      <Engagement
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                      <IndustryComparison
                        industryComparison={
                          influencerFullReport.platformData[selectedPlatform]
                            .industryComparison[0]
                        }
                        similarAccount={
                          influencerFullReport.platformData[selectedPlatform]
                            .similarAccount
                        }
                        handleShowCards={handleShowCards}
                        cardVisible={cardVisible}
                      />
                    </Fragment>
                  ) : (
                    <>
                      <p>no data found</p>
                    </>
                  )}
                </Fragment>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default ProfileView;
