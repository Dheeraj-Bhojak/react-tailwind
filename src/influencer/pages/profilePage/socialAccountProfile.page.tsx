import React, { Fragment, useEffect, useState } from "react";
import ProfileTabComponent from "../../component/profileTab/profileTab.component";
import { socialIcons } from "../../../seeder";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";

interface youtubeVideosData {
  id: number;
  video_id: string;
  publish_date: string;
  youtube_channel_id: string;
  title: string;
  description: string;
  thumbnails: string;
  tags: string;
  category_id: string;
  default_language: string;
  default_audio_language: string;
  views: string;
  likes: string;
  favorite_count: string;
  comment_count: string;
}
interface YoutubeProfileApiResponse {
  channel_details: {
    id: number;
    channel_name: string;
    user_name: string;
    channel_id: string;
    channel_description: string;
    channel_publish: string;
    channel_profile_url: string;
    total_views: string;
    subscriber_count: string;
    videos_uploaded: string;
  };
  videos: youtubeVideosData[];
}
const SocialAccountProfilePage: React.FC = () => {
  const userProfile = [
    {
      id: 1,
      platformName: "youtube",
      platformContent: ["content-1.png", "content-2.png", "content-3.png"],
    },
    {
      id: 1,
      platformName: "instagram",
      platformContent: ["content-1.png", "content-2.png", "content-3.png"],
    },
  ];
  const [youtubeProfileData, setYoutubeProfileData] =
    useState<YoutubeProfileApiResponse | null>(null);
  const [error, setError] = useState(null);

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const config = {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  };
  useEffect(() => {
    const fetchYoutubeProfileData = async () => {
      try {
        const response = await axios.get<YoutubeProfileApiResponse>(
          `${process.env.REACT_APP_API_URL}social-profiles/youtube`,
          config
        );
        setYoutubeProfileData(response.data);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while fetching user information"
        );
      }
    };

    fetchYoutubeProfileData();
  }, []);

  const handleGoogleSignUpFOrYOutube = () => {
    const youtubeGoogleSignUpUrl = `${process.env.REACT_APP_API_URL}google-auth/add-youtube/auth`;
    window.open(youtubeGoogleSignUpUrl, "_blank");
  };

  const handleFacebookSignUpForInstagram = () => {
    const influencerInstagramSignUpUrl = `${process.env.REACT_APP_API_URL}instagram-basic-auth/facebook`;
    window.open(influencerInstagramSignUpUrl, "_blank");
  };
  return (
    <Fragment>
      <div className="m-0 ">
        {youtubeProfileData ? (
          <ProfileTabComponent userProfile={userProfile} />
        ) : (
          <div className="w-full">
            <section className="min-h-[256px] border flex justify-center item-center">
              <div className="m-auto">
                <div className="flex justify-center items-center">
                  <img src={socialIcons.youtube} className="mx-2 " alt="" />
                  <p className="underline "> To Link Your Youtube Account </p>
                </div>
                <div className="flex space-x-4 mt-3">
                  <button
                    onClick={handleGoogleSignUpFOrYOutube}
                    className="flex items-center mx-auto py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-ri-blue border border-transparent hover:border-transparent hover:text-ri-blue shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
                      <path
                        fill="#fbc02d"
                        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                      />
                      <path
                        fill="#e53935"
                        d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                      />
                      <path
                        fill="#4caf50"
                        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                      />
                      <path
                        fill="#1565c0"
                        d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </div>
              </div>
            </section>
            <section className="min-h-[256px] border flex justify-center item-center">
              <div className="m-auto ">
                <div className="flex justify-center items-center">
                  <img src={socialIcons.instagram} className="mx-2 " alt="" />
                  <p className="underline">To Link Your Instagram Account </p>
                </div>
                <div className="flex  space-x-4 mt-3">
                  <button
                    onClick={handleFacebookSignUpForInstagram}
                    className="flex items-center mx-auto py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-ri-blue border border-transparent hover:border-transparent hover:text-ri-blue shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                    <svg viewBox="0 0 16 16" className="w-6 h-6 mr-3">
                      <path
                        fill="#3b5998"
                        fillRule="evenodd"
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                    </svg>
                    Continue with Facebook
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default SocialAccountProfilePage;
