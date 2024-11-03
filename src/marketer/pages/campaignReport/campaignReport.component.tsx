import React, { useState } from "react";
import ReportingNavbar from "../../components/campaignReport/ReportingNavbar.component";
import Kpi from "../../components/campaignReport/kpi.component";
import InfluencerLeaderBoards from "../../components/campaignReport/leaderBoard.component";
import ContentBreakdown from "../../components/campaignReport/ContentBreakdown.component";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";

export interface InfluencerBreakDownInterface {
  spend: string;
  view: string;
  engagement: string;
  likes: string;
  influencer: string;
  impression: string;
  name: string;
}
const InfluencerBreakDownData: InfluencerBreakDownInterface[] = [
  {
    spend: "₹7000",
    view: "300K",
    engagement: "380K (10.9%)",
    likes: "324.5K",
    influencer:
      "https://play-lh.googleusercontent.com/C9CAt9tZr8SSi4zKCxhQc9v4I6AOTqRmnLchsu1wVDQL0gsQ3fmbCVgQmOVM1zPru8UH=w240-h480-rw",
    impression: "324.5K",
    name: "Carryminati",
  },
  {
    spend: "₹6600",
    view: "300K",
    engagement: "380K (10.9%)",
    likes: "324.5K",
    influencer:
      "https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/e76d4296-43f3-493b-9d50-f8e5c142d06c/2117667014/boys-profile-picture-screenshot.png",
    impression: "324.5K",
    name: "JoneDoe",
  },
  {
    spend: "₹6900",
    view: "300K",
    engagement: "380K (10.9%)",
    likes: "324.5K",
    influencer:
      "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8zNl9hX3Bob3RvX29mX2FfcG9ydHJhaXRfb2ZfYV9mYXNoaW9uYWJsZV9zbWlsaV8xYmRlMDQwNy01YTE4LTQ4MTItYmNjOS1lZjBhYWVmMTE3NmZfMS5qcGc.jpg",
    impression: "324.5K",
    name: "pitunia",
  },
  {
    spend: "₹8900",
    view: "300K",
    engagement: "380K (10.9%)",
    likes: "324.5K",
    influencer:
      "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp",
    impression: "324.5K",
    name: "frenk",
  },
  {
    spend: "₹8100",
    view: "300K",
    engagement: "380K (10.9%)",
    likes: "324.5K",
    influencer:
      "https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg",
    impression: "324.5K",
    name: "Angelina",
  },
];

const CampaignReport: React.FC = () => {
  const { campaignId } = useParams();
  const id = parseInt(campaignId ?? "0", 10);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const [deliverableIds, setDeliverablesIds] = useState<number[]>([24]);

  return (
    <div className="md:container pt-3 sm:-mt-1 mx-auto">
      <ReportingNavbar />
      <Kpi campaignId={id} access_token={access_token} />
      <InfluencerLeaderBoards campaignId={id} access_token={access_token} />
      {deliverableIds.map((deliverableId) => (
        <ContentBreakdown
          key={deliverableId}
          deliverableId={deliverableId}
          campaignId={id}
          access_token={access_token}
        />
      ))}
    </div>
  );
};

export default CampaignReport;

const data = {
  id: 1,
  campaign_name: "Natural Gemstone Jewelry",
  ig_deliverables: [
    {
      id: 24,
      media_type: "post",
      deliverable_name: "Post a Image",
      collabs: [
        {
          id: 1,
          status: "hired",
          post_media_insights: {
            id: 1,
            impressions: 12546,
            total_interactions: 492,
            reach: 8994,
            saved: 5,
            shares: 7,
            comments: 45,
            likes: 435,
            profile_visits: 28,
            profile_activity: 16,
            follows: 12,
            created_at: "2024-10-14T12:14:41.047Z",
            updated_at: "2024-10-14T12:14:41.047Z",
            delete_at: null,
          },
          contentStatus: [
            {
              id: 1,
              status: "Approved",
              content: {
                id: 43,
                img_name: "1-2dfee1c1-9c05-4e51-b698-cfe43741c992.webp",
                img_url:
                  "https://i.postimg.cc/W346Yg2S/1-2dfee1c1-9c05-4e51-b698-cfe43741c992.webp",
              },
            },
          ],
          influencer: {
            id: 1,
            user: {
              id: 2,
              first_name: "Bellatrix",
              last_name: "Lestrange",
              profile_picture: [
                {
                  id: 17,
                  img_name: "b27cc965-6eeb-4384-b008-73b4eb188187campaign2.png",
                  img_url:
                    "https://media.licdn.com/dms/image/v2/C4D03AQEeEyYzNtDq7g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1524234561685?e=2147483647&v=beta&t=uHzeaBv3V2z6Tp6wvhzGABlTs9HR-SP-tEX1UbYNn4Q",
                },
              ],
            },
          },
        },
        {
          id: 8,
          status: "hired",
          post_media_insights: {
            id: 2,
            impressions: 25406,
            total_interactions: 3032,
            reach: 18994,
            saved: 95,
            shares: 57,
            comments: 445,
            likes: 2435,
            profile_visits: 928,
            profile_activity: 116,
            follows: 62,
            created_at: "2024-10-14T12:17:19.011Z",
            updated_at: "2024-10-14T12:17:19.011Z",
            delete_at: null,
          },
          contentStatus: [
            {
              id: 9,
              status: "Approved",
              content: {
                id: 49,
                img_name: "influencers",
                img_url:
                  "https://famesters.com/wp-content/uploads/2024/02/Fashion-influencer-marketing-A-guide.png",
              },
            },
          ],
          influencer: {
            id: 2,
            user: {
              id: 4,
              first_name: "Rodolphus",
              last_name: "Lestrange",
              profile_picture: [
                {
                  id: 15,
                  img_name: "b27cc965-6eeb-4384-b008-73b4eb188187campaign2.png",
                  img_url:
                    "https://afluencer.com/wp-content/uploads/esha-vixenesha-fashion-beauty-female-influencer.webp",
                },
              ],
            },
          },
        },
      ],
    },
  ],
  marketer: {
    id: 1,
    user: {
      id: 1,
      first_name: "Jay",
      last_name: "viru",
    },
  },
};

