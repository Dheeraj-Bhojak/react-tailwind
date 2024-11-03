import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../../global/global_component/buttons/button.component";
import _ from "lodash";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import Loader from "../../../../global/global_component/loader/loader.component";
import CampaignDetails from "../../../../global/global_component/campaignView/campaignDetails/campaignDetails.component";
import ToastNotification from "../../../../global/global_component/toastNotification/ToastNotification";
import CallToast from "../../../../utils/utilsMethods/callToast.utils";

interface YoutubeDeliverables {
  id: number;
  dedicated_video: number;
  integrated_video: number;
  short: number;
}

interface InstagramDeliverables {
  id: number;
  reels: number;
  story_with_link: number;
  video_post: number;
  static_post: number;
}

export interface campaignProductData {
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

export interface campaignApiResponse {
  id: number;
  campaign_name: string;
  platform: string;
  compensation_type: string;
  instagram_handle: string;
  campaign_product: campaignProductData;
  youtube_deliverables: YoutubeDeliverables | null;
  instagram_deliverables: InstagramDeliverables | null;
  campaign_description: string;
  influencer_gender: string;
  niches_category: {
    id: number;
    niche_name: string;
    is_active: boolean;
  };
  campaign_event_dates: {
    event_id: number;
    application_start_date: string;
    approve_influencer_last_date: string;
    content_verification_date: string;
    post_on_social_media_end_day: string;
  };
  locations: {
    id: number;
    location_title: string;
    location_description: string;
    country: string;
    is_active: boolean;
  }[];
  languages: {
    id: number;
    language_name: string;
    is_active: boolean;
  }[];
  influencer_category: {
    id: number;
    category_title: string;
    category_description: string;
    is_active: boolean;
  };
  number_of_influencer: {
    id: number;
    influencer_count_title: string;
    is_active: boolean;
  };
  campaignUserAction: {
    applied: number;
    selected: number;
  };
}

const CampaignView: React.FC = () => {
  const { id } = useParams();
  const campaignId = parseInt(id ?? "0", 10);
  const [campaignData, setCampaignData] = useState<campaignApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}influencer_campaigns/campaign/${id}`,
          config
        );
        setCampaignData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const applyCampaignHandler = async (id: number) => {
    try {
      const headers = {
        authorization: `Bearer ${access_token}`,
      };

      const { data, status } = await axios.post(
        `${process.env.REACT_APP_API_URL}influencer_campaigns/apply_campaign/${id}`,
        {},
        { headers }
      );
      const { message, theme } = CallToast(status, data.message);
      setResponseToast(() => ({
        message,
        theme,
        showToast: true,
      }));
      setTimeout(() => {
        setResponseToast((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
    } catch (error: any) {
      const { status, data } = error.response;
      const { message, theme } = CallToast(status, data.message);
      setResponseToast(() => ({
        message,
        theme,
        showToast: true,
      }));
      setTimeout(() => {
        setResponseToast((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
    }
  };

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
      {responseToast.showToast ? (
        <ToastNotification
          message={responseToast.message}
          theme={responseToast.theme}
        />
      ) : (
        ""
      )}{" "}
      <div>
        {loading ? (
          <Loader />
        ) : campaignData ? (
          <div>
            <CampaignDetails
              campaign={campaignData}
              campaignAccordion={ownCampaignAccordion}
            />
            <div className="mx-auto rounded">
              <h1 className="font-medium text-xl my-3"></h1>
              <div className="w-full p-2">
                <p className="mb-8">
                  In case of any queries,
                  <Link
                    to="/contact-us"
                    className="font-bold text-ri-blue underline"
                    target="blank">
                    Contact us
                  </Link>
                  or refer to
                  <Link
                    to="/faqs"
                    className="font-bold text-ri-orange underline"
                    target="blank">
                    FAQs
                  </Link>
                </p>
              </div>
            </div>
            <div className="applyButtons mt-8 w-full lg:flex justify-center items-center ">
              <div className="halfT lg:w-4/12 w-full">
                <div className="">
                  <Button
                    className="rounded-full text-black sm:text-xs  md:text-sm lg:text-base font-bold border-1 w-full border-ri-blue z-[1] "
                    buttonType={BUTTON_TYPE_CLASSES.sideLeftBounceBlue}>
                    Not Interested
                  </Button>
                </div>
              </div>
              <div className="lg:w-7/12  w-full">
                <div className="lg:ml-5">
                  <Button
                    buttonType={BUTTON_TYPE_CLASSES.slideLeftButtonYellow}
                    className="rounded-full text-black sm:text-xs md:text-sm lg:text-base font-bold border-1 w-full border-ri-orange z-[1]"
                    onClick={() => applyCampaignHandler(campaignData.id)}>
                    Apply for Campaign
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </Fragment>
  );
};

export default CampaignView;
