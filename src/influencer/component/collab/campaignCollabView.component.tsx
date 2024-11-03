import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import CampaignDetails from "../../../global/global_component/campaignView/campaignDetails/campaignDetails.component";
import Loader from "../../../global/global_component/loader/loader.component";
import { campaignView } from "../../../marketer/pages/campaigns/ownCampaignView.page";
import Page404NotFound from "../../../global/global_pages/pages/page404.component";
import _ from "lodash";
import NoFileData from "./no_collabsFound.component";
interface YoutubeDeliverables {
  id: number;
  dedicated_video: number;
  integrated_video: number;
  shorts: number;
}

interface InstagramDeliverables {
  id: number;
  reels: number;
  story_with_link: number;
  video_post: number;
  static_post: number;
}

interface campaignProductData {
  id: number;
  product_name: string;
  product_purchase_link: string;
  product_price: string;
  product_seeding: boolean;
  product_images: {
    id: number;
    img_name: string;
    is_active: boolean;
    img_url: string;
  }[];
}

interface niches_categoryInterface {
  id: number;
  niche_name: string;
  is_active: boolean;
}
interface campaign_event_datesInterface {
  event_id: number;
  application_start_date: string;
  approve_influencer_last_date: string;
  content_verification_date: string;
  post_on_social_media_end_day: string;
}
interface influencer_categoryInterface {
  id: number;
  category_title: string;
  category_description: string;
  is_active: boolean;
}
interface number_of_influencerInterface {
  id: number;
  influencer_count_title: string;
  is_active: boolean;
}

interface locationInterface {
  id: number;
  location_title: string;
  location_description: string;
  country: string;
  is_active: boolean;
}

interface languagesInterface {
  id: number;
  language_name: string;
  is_active: boolean;
}

interface ig_deliverablesInterface {
  id: number;
  media_type: string;
  deliverable_name: string;
  deliverable_descriptions: string;
}

interface collaborationInterface {
  id: 10;
  status: string;
}
interface campaignCollabApiResponse {
  campaign: {
    id: number;
    campaign_name: string;
    platform: string;
    influencer_gender: string;
    compensation_type: string;
    campaign_description: string;
    niches_category: niches_categoryInterface;
    campaign_event_dates: campaign_event_datesInterface;
    campaign_product: campaignProductData;
    instagram_deliverables: InstagramDeliverables | null;
    youtube_deliverables: YoutubeDeliverables | null;
    locations: locationInterface[];
    languages: languagesInterface[];
    influencer_category: influencer_categoryInterface;
    number_of_influencer: number_of_influencerInterface;
    ig_deliverables: ig_deliverablesInterface[];
    collaboration: collaborationInterface[];
  };
}
const CampaignCollabView: React.FC = () => {
  const { id } = useParams();
  const campaignId = parseInt(id ?? "0", 10);
  const [campaignData, setCampaignData] = useState<campaignView | null>(null);
  const [collabCampaignData, setCollabCampaignData] =
    useState<campaignCollabApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}influencer_campaigns/collab/${campaignId}`,
          config
        );
        setCollabCampaignData(data);
        setCampaignData(data.campaign);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const campaignCollabAccordion: {
    campaignDetailsSection: boolean;
    descriptionSection: boolean;
    productSection: boolean;
  } = {
    campaignDetailsSection: false,
    descriptionSection: true,
    productSection: true,
  };

  const navigate = useNavigate();

  const navigateUploadDeliverable = (id: number) => {
    navigate(`/influencer-app/collab_campaign/${id}`);
  };

  console.log("collabCampaignData", collabCampaignData);
  return (
    <Fragment>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {collabCampaignData && collabCampaignData.campaign ? (
              <Fragment>
                <CampaignDetails
                  campaign={campaignData}
                  campaignAccordion={campaignCollabAccordion}
                />
                {collabCampaignData.campaign &&
                collabCampaignData.campaign.collaboration &&
                collabCampaignData.campaign.collaboration[0].status.toLowerCase() ===
                  "hired" ? (
                  <div className="bg-[#EBEBEB] p-3">
                    <div className="w-full bg-white rounded-lg p-3 ">
                      <h1 className="mx-2 font-medium">Deliverables </h1>

                      {collabCampaignData.campaign.ig_deliverables &&
                        collabCampaignData.campaign.ig_deliverables.map(
                          (campaign, index) => {
                            return (
                              <div className="mt-2">
                                <div className="full flex ">
                                  <div className="w-2/12 border-1 mx-1 rounded-lg bg-white">
                                    <p className="flex justify-center items-center h-full ">
                                      {_.toUpper(campaign.media_type)}
                                    </p>
                                  </div>
                                  <div className="w-6/12 border-1 mx-1 rounded-lg p-2 bg-white">
                                    <div className="flex flex-col justify-center items-center h-full ">
                                      <p className="font-bold">
                                        {campaign.deliverable_name}
                                      </p>
                                      <p>{campaign.deliverable_descriptions}</p>
                                    </div>
                                  </div>
                                  <div className="w-4/12 border-1 mx-1 rounded-lg p-2 bg-white">
                                    <div className="flex justify-center items-center h-full">
                                      <button
                                        className="bg-ri-blue text-white p-2 rounded-xl shadow-md hover:bg-ri-orange"
                                        onClick={() =>
                                          navigateUploadDeliverable(campaign.id)
                                        }>
                                        Upload Deliverable
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </Fragment>
            ) : (
              // <Page404NotFound />
              <NoFileData
                heading={"NO Collaboration"}
                subText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            laborum dignissimos iusto error amet omnis laboriosam molestias
            praesentium facere odit non nam. Odit, recusandae distinctio?"
              />
            )}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default CampaignCollabView;
