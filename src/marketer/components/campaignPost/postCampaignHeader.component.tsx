import React, { useContext, useEffect, useState } from "react";
import "./postCampaignHeader.style.css";
import CampaignOverview from "./campaignPostOverview/campaignPostOverview.component";
import CampaignProductOverview from "./campaignProductOverview/campaignProduct.component";
import CampaignTimelineForm from "./campaignTImelines/campaignTImeline.component";
import CampaignBudget from "./campaignBudget/campaignBudget.component";
import CampaignAudienceDemography from "./campaignDemographyForm/campaignDemographyForm.component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContent } from "../../../admin";
import MarketerCreateCampaignRouteContent from "./marketer.campaignRouteContent";
import CampaignStepper from "./campaignStepper/campaignStepper.component";
import campaignBrief from "./campaignBrief/campaignBrief.component";

const CampaignSteps = [
  {
    id: 1,
    title: "Campaign Overview",
    status: "pending",
    route: "campaign_overview",
  },
  {
    id: 2,
    title: "Product Details",
    status: "pending",
    route: "product_details",
  },
  {
    id: 3,
    title: "Audience Demography",
    status: "pending",
    route: "audience",
  },
  { id: 4, title: "Campaign timeLine", status: "pending", route: "timeline" },
  { id: 5, title: "Campaign budget", status: "pending", route: "budget" },
  { id: 6, title: "Brief Summery", status: "pending", route: "brief" },
];

const CreateCampaignsRoutes = [
  {
    path: "/campaign_overview",
    name: "CampaignOverview",
    element: CampaignOverview,
  },
  {
    path: "/product_details",
    name: "ProductDetails",
    element: CampaignProductOverview,
  },
  {
    path: "/audience",
    name: "AudienceDemography",
    element: CampaignAudienceDemography,
  },
  {
    path: "/timeline",
    name: "CampaignTimeline",
    element: CampaignTimelineForm,
  },
  {
    path: "/budget",
    name: "CampaignBudget",
    element: CampaignBudget,
  },
  {
    path: "/brief",
    name: "CampaignBrief",
    element: campaignBrief,
  },
];

export interface CampaignPostStateType {
  campaign_overview: {
    objective: string;
    campaign_name: string;
    instagram_handle: string;
    platform: string;
    influencer_category: number;
    engagement_rate_min: number;
    engagement_rate_max: number;
    niches_category_id: number;
    influencer_languagesIds: { value: string; label: string }[];
    influencer_locationIds: { value: string; label: string }[];
    instagram_deliverables: {
      reels: number;
      story_with_link: number;
      video_post: number;
      static_post: number;
    };
    youtube_deliverables: {
      dedicated_video: number;
      integrated_video: number;
      shorts: number;
    };
    deliverable_details: {
      deliverableName: string;
      deliverableDescription: string;
      media_type: string;
    }[];
    number_of_influencer: number;
  };
  campaign_product: {
    product_name: string;
    product_price: string;
    product_purchase_link: string;
    product_images: { img_name: string; id: number; img_url: string }[];
    product_seeding: boolean;
  };
  audience_demography: {
    gender: string;
    audience_age_min: number;
    audience_age_max: number;
    languages: { value: string; label: string }[];
    locations: { value: string; label: string }[];
    location_type: string;
  };
  campaign_timeline: {
    applicationStartDate: string | null;
    lastDayToApproveInfluencer: string | null;
    contentVerification: string | null;
    LastDayOfContentPost: string | null;
  };
  campaign_budget: {
    compensation_type: string;
    tentative_budget: string;
  };

  campaign_description: string;
}

const PostCampaignHeader: React.FC = () => {
  const storedFormData = localStorage.getItem("campaignPostData");
  let initialStage;
  if (storedFormData)
    initialStage = JSON.parse(storedFormData).campaignFormObject;

  const initialCampaignState: CampaignPostStateType = {
    campaign_overview: {
      objective: "",
      campaign_name: "",
      instagram_handle: "",
      platform: "",
      influencer_category: 0,
      engagement_rate_min: 2.0,
      engagement_rate_max: 4.5,
      niches_category_id: 0,
      influencer_locationIds: [],
      influencer_languagesIds: [],
      instagram_deliverables: {
        reels: 0,
        story_with_link: 0,
        video_post: 0,
        static_post: 0,
      },
      youtube_deliverables: {
        dedicated_video: 0,
        integrated_video: 0,
        shorts: 0,
      },
      deliverable_details: [],
      number_of_influencer: 0,
    },
    campaign_product: {
      product_name: "",
      product_price: "",
      product_purchase_link: "",
      product_images: [],
      product_seeding: false,
    },
    audience_demography: {
      gender: "",
      audience_age_min: 13,
      audience_age_max: 25,
      languages: [],
      locations: [],
      location_type: "",
    },
    campaign_timeline: {
      applicationStartDate: null,
      lastDayToApproveInfluencer: null,
      contentVerification: null,
      LastDayOfContentPost: null,
    },
    campaign_budget: {
      compensation_type: "",
      tentative_budget: "",
    },
    campaign_description: "",
  };

  // const [campaignPagesSteps, setCampaignPagesSteps] = useState(CampaignSteps);
  const currentPageLocation = useParams();

  const navigate = useNavigate();
  const nextPage = () => {
    const currentStep = CampaignSteps.find(
      (step) => step.route === `${currentPageLocation["*"]}`
    );
    if (currentStep) {
      const nextPageId = currentStep.id + 1;
      const nextPage = CampaignSteps.find((step) => step.id === nextPageId);
      if (nextPage) navigate(nextPage.route);
    }
  };
  const prevPage = () => {
    const currentStep = CampaignSteps.find(
      (step) => step.route === `${currentPageLocation["*"]}`
    );
    if (currentStep) {
      const prevPageId = currentStep.id - 1;
      const prevPage = CampaignSteps.find((step) => step.id === prevPageId);
      if (prevPage) navigate(prevPage.route);
    }
  };
  const campaignPostLocalData = localStorage.getItem("campaignPostData");
  let CampaignPostLocalJson = campaignPostLocalData
    ? JSON.parse(campaignPostLocalData)
    : null;

  const [campaignFormObject, setCampaignFormObject] =
    useState<CampaignPostStateType>(
      CampaignPostLocalJson && CampaignPostLocalJson.campaignFormObject !== null
        ? CampaignPostLocalJson.campaignFormObject
        : initialCampaignState
    );

  const campaignPostState = {
    campaignFormObject,
    setCampaignFormObject,
  };
  useEffect(() => {
    localStorage.setItem(
      "campaignPostData",
      JSON.stringify({ campaignFormObject })
    );
  }, [campaignFormObject, setCampaignFormObject]);

  return (
    <div className="">
      <div className="relative">
        <CampaignStepper steps={CampaignSteps} />
        <MarketerCreateCampaignRouteContent
          routes={CreateCampaignsRoutes}
          campaignPostState={campaignPostState}
        />
      </div>
      <div className=" fixed w-full bg-white border-t-1 p-3 text-black  bottom-0 left-0 right-0 flex justify-between items-center sm:items-end z-50">
        <div className=" flex md:ml-64 ml:20 items-center">
          <button
            className="bg-white text-ri-blue font-bold px-4 py-2 rounded mr-2"
            onClick={prevPage}>
            Back
          </button>
        </div>
        <div className="text-center sm:text-right">
          {currentPageLocation["*"] === "brief" ? (
            <button
              onClick={nextPage}
              className="bg-ri-blue hover:bg-ri-orange text-white px-4 py-1 rounded">
              Save
            </button>
          ) : (
            <button
              onClick={nextPage}
              className="bg-ri-blue text-white px-4 py-1 rounded">
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCampaignHeader;
