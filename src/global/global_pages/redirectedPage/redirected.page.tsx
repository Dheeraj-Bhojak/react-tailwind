import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";

const RedirectedPage = () => {
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const [youtubeTokenStatus, setYoutubeTokenStatus] = useState(0);
  const urlParams = new URLSearchParams(window.location.search);
  const queryParams = Object.fromEntries(urlParams.entries());
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/influencer-app/profile");
  }, [youtubeTokenStatus]);

  useEffect(() => {
    if (queryParams && queryParams.code) {
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}google-auth/youtube-auth/authorization_code`,
          queryParams,
          config
        )
        .then((response) => {
          setYoutubeTokenStatus(response.status);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  return (
    <>
      <div className="text-center">Redirecting...</div>
    </>
  );
};

export default RedirectedPage;
