import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { campaignApiResponse } from "../../../influencer/pages/dashboard/campaign_view/campaignView.page";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import Loader from "../../../global/global_component/loader/loader.component";
import CampaignDetails from "../../../global/global_component/campaignView/campaignDetails/campaignDetails.component";

const CampaignCard = () => {
  const { campaignId } = useParams();
  console.log("campaign Id: ", campaignId);
  const id = parseInt(campaignId ?? "0", 10);
  const [campaignData, setCampaignData] = useState<campaignApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const fetchData = async () => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}admin/view_campaign/${campaignId}`,
        config
      );
      setCampaignData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const ownCampaignAccordion: {
    campaignDetailsSection: boolean;
    descriptionSection: boolean;
    productSection: boolean;
  } = {
    campaignDetailsSection: false,
    descriptionSection: false,
    productSection: false,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : campaignData ? (
        <div>
          <CampaignDetails
            campaign={campaignData}
            campaignAccordion={ownCampaignAccordion}
          />
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default CampaignCard;
