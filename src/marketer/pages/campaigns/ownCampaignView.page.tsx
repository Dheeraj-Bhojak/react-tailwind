import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import CampaignDetails from "../../../global/global_component/campaignView/campaignDetails/campaignDetails.component";
import Loader from "../../../global/global_component/loader/loader.component";

export interface Campaign {
  id: number;
  objective: string;
  campaign_name: string;
  instagram_handle: string;
  platform: string;
  engagement_rate_min: string;
  engagement_rate_max: string;
  influencer_gender: string;
  audience_gender: string;
  audience_age_min: number;
  audience_age_max: number;
  audience_Location_type: string;
  compensation_type: string;
  campaign_description: string;
  status: string;
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
  campaign_product: {
    id: number;
    product_name: string;
    product_purchase_link: string;
    product_price: string;
    product_seeding: boolean;
    product_images: {
      id: number;
      img_name: string;
      img_url: string;
      is_active: boolean;
    }[];
  };
  marketer: { id: number };
  instagram_deliverables: {
    id: number;
    reels: number;
    story_with_link: number;
    video_post: number;
    static_post: number;
  } | null;

  youtube_deliverables: {
    dedicated_video: number;
    integrated_video: number;
    short: number;
  } | null;

  ig_deliverables: {
    id: number;
    media_type: string;
    deliverable_name: string;
    deliverable_descriptions: string;
  };

  locations: {
    id: number;
    location_title: string;
    location_description: string;
    country: string;
    is_active: boolean;
  }[];
  influencer_locations: {
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
  number_of_influencer: {
    id: number;
    influencer_count_title: string;
    is_active: boolean;
  };
  influencer_category: {
    id: number;
    category_title: string;
    category_description: string;
    is_active: boolean;
  };
  tentative_budget: {
    id: number;
    budget_title: string;
    budget_description: string;
    is_active: Boolean;
  };
  collaboration: [];
}

export interface campaignView {
  id: number;
  campaign_name: string;
  platform: string;
  influencer_gender: string;
  compensation_type: string;
  campaign_description: string;
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
  campaign_product: {
    id: number;
    product_name: string;
    product_purchase_link: string;
    product_price: string;
    product_seeding: boolean;
    product_images: {
      id: number;
      img_name: string;
      img_url: string;
      is_active: boolean;
    }[];
  };
  instagram_deliverables: {
    id: number;
    reels: number;
    story_with_link: number;
    video_post: number;
    static_post: number;
  } | null;
  youtube_deliverables: {
    dedicated_video: number;
    integrated_video: number;
    short: number;
  } | null;
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
  number_of_influencer: {
    id: number;
    influencer_count_title: string;
    is_active: boolean;
  };
  influencer_category: {
    id: number;
    category_title: string;
    category_description: string;
    is_active: boolean;
  };
}

const OwnCampaignView: React.FC = () => {
  const { id } = useParams();
  const campaignId = parseInt(id ?? "0", 10);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}marketer_campaign/campaign/${campaignId}`,
          config
        );
        setCampaign(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
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
    <div>
      {loading ? (
        <Loader />
      ) : (
        <CampaignDetails
          campaign={campaign}
          campaignAccordion={ownCampaignAccordion}
        />
      )}
    </div>
  );
};

export default OwnCampaignView;
