import React from "react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../global_component/buttons/button.component";
import companyLogo from "../../../assets/images/new/logo.jpg";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

interface Deliverables {
  platform: string;
  instagram_deliverables: Record<string, number>;
  youtube_deliverables: Record<string, number>;
}
const campaign = {
  id: 1,
  objective: {
    objective: "Views and Reach",
    campaign_name: "Times Watches",
    instagram_handle: "@jonedoepower",
    platform: "Instagram",
    influencer_category: "Micro",
    engagement_rate_min: 1.1,
    engagement_rate_max: 3.5,
    instagram_deliverables: {
      reels: 1,
      story_with_link: 2,
      video_post: 0,
      static_post: 4,
    },
    youtube_deliverables: {
      dedicated_video: 65,
      integrated_video: 0,
      reels: 0,
    },
    number_of_influencer: "1-10 Influencer",
  },
  product: {
    product_name: "Cozmo power black watch 49325",
    product_price: "299",
    product_purchase_link: "https://www.google.com/",
    product_images: [
      {
        id: 1,
        img_name:
          "https://rukminim2.flixcart.com/image/832/832/kv450280/watch/i/d/n/1-whiteled01-ph-watches-men-women-original-imag82zzghqwykzg.jpeg?q=70",
      },
      {
        id: 2,
        img_name:
          "https://rukminim2.flixcart.com/image/832/832/xif0q/watch/b/l/f/1-silver-watch-omenterprisehub-boys-girls-original-imaghgu6gxwgmbhu.jpeg?q=70",
      },
      {
        id: 3,
        img_name:
          "https://rukminim2.flixcart.com/image/832/832/l3rmzrk0/watch/d/d/y/1-silverleddigital-omenterprisehub-boys-girls-original-imagetcnwfduhfub.jpeg?q=70",
      },
    ],
    product_seeding: true,
  },
  audience: {
    gender: "female",
    age: {
      startAge: "13",
      endAge: "60",
    },
    languages: ["hindi", "english"],
    locations: ["dehli", "jaipur", "noida", "mumbai", "surat"],
  },
  timeline: {
    applicationStartDate: "Fri Nov 10 2023 ",
    contentVerification: "Wed Nov 22 2023 ",
    lastDayToApproveInfluencer: "Thu Nov 16 2023 ",
    LastDayOfContentPost: "Sat Nov 25 2023",
  },
  campaign_budget: {
    compensation_type: "Paid",
    tentative_budget: "< 1 lakh INR",
  },
};

const CampaignDetailedView = () => {
  const calculateTotalDeliverables = (deliverables: Deliverables) => {
    const { platform, ...platformDeliverables } = deliverables;

    let total = 0;

    if (_.toLower(platform) === "instagram") {
      for (const key in platformDeliverables.instagram_deliverables) {
        total += platformDeliverables.instagram_deliverables[key];
      }
    } else if (_.toLower(platform) === "youtube") {
      for (const key in platformDeliverables.youtube_deliverables) {
        total += platformDeliverables.youtube_deliverables[key];
      }
    }
    return total;
  };

  return (
    <div className="container p-0 mt-0">
      <div className="w-full flex border-b-1 p-2 pb-4">
        <h1>{campaign.objective.campaign_name}</h1>
        <div className="ml-auto">
          <button className=" font-semibold uppercase mx-2 p-2 rounded-md bg-ri-orange shadow-sm">
            apply
          </button>
          <button className=" font-semibold uppercase mx-2 p-2 rounded-md shadow-sm bg-gray-200">
            not interested
          </button>
        </div>
      </div>
      <div className="w-full flex mb-2">
        <div className="w-1/3 mt-2">
          <img
            src={companyLogo}
            alt="Marketer Company Logo"
            height={120}
            width={120}
            className="rounded-full mx-auto"
          />
        </div>

        <div className="w-1/3 m-auto ">
          <p className="font-extrabold text-md">
            {campaign.objective.instagram_handle}
          </p>
          <a
            className="text-gray-700 border-1 bg-gray-200 cursor-pointer rounded-2xl"
            href={`https://www.instagram.com/${campaign.objective.instagram_handle.replace(
              /[@\s]/g,
              ""
            )}`}
            target="_blank">
            {`https://www.instagram.com/${campaign.objective.instagram_handle.replace(
              /[@\s]/g,
              ""
            )}`}
          </a>
        </div>
        <div className="w-1/3 mt-2 flex">
          <p className="font-bold flex">Application Start Date:</p>
          <p className="ml-2">{campaign.timeline.applicationStartDate}</p>
        </div>
      </div>
      <hr />
      <div className="w-full flex mt-3 p-5 justify-center items-cent">
        {campaign.product.product_images.map((image, indx) => {
          return (
            <div className="w-1/3" key={indx}>
              <img
                key={indx}
                className="mx-auto object-fill"
                src={image.img_name}
                height={140}
                width={180}
                alt={`Image ${indx + 1}`}
              />
            </div>
          );
        })}
      </div>
      <h1 className="text-lg">Overview</h1>

      <div className="mb-2 border-b-1">
        {" "}
        <div className="flex">
          <div className="w-1/3 flex">
            <p className="font-bold mr-4">Objective:</p>
            <p>{campaign.objective.objective}</p>
          </div>
          <div className="w-1/3 flex">
            <p className="font-bold mr-4">Platform:</p>
            <p>{campaign.objective.platform}</p>
          </div>
          <div className="w-1/3 flex">
            <p className="font-bold mr-4">Compensation Type:</p>
            <p>{campaign.campaign_budget.compensation_type}</p>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 flex">
            <p className="font-bold mr-4">Influencer Category :</p>
            <p>{campaign.objective.influencer_category}</p>{" "}
          </div>
          <div className="w-1/2 flex">
            <p className="font-bold mr-4">Influencer Engagement Rate Range :</p>
            <p>{`${campaign.objective.engagement_rate_min} - ${campaign.objective.engagement_rate_max}`}</p>{" "}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 flex">
            <p className="font-bold mr-4">Instagram total Deliverables :</p>
            <p>{calculateTotalDeliverables(campaign.objective)}</p>{" "}
          </div>
          <div className="w-1/2 flex">
            {_.map(campaign.objective.instagram_deliverables, (value, key) => (
              <div key={key}>
                <div className="mr-3 ">
                  <span className="font-bold ">{`${key} :`}</span> {value}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 flex">
            <p className="font-bold mr-4">Influencer Category :</p>
            <p>{campaign.objective.number_of_influencer}</p>{" "}
          </div>
        </div>
      </div>
      <h1 className="font-bold text-lg"> Product</h1>
      <div className="mb-2 border-b-1">
        {" "}
        <div className="flex">
          <div className="w-1/2 flex">
            <p className="font-bold mr-4">Product Name:</p>
            <p>{campaign.product.product_name}</p>
          </div>
          <div className="w-1/2 flex">
            <p className="font-bold mr-4">Product Price:</p>
            <p>{campaign.product.product_price}</p>
          </div>
        </div>
        <div className="flex mb-2">
          <p className="font-extrabold text-md">Get The Product:</p>
          <a
            className="text-gray-700 ml-2 border-1 bg-gray-200 cursor-pointer rounded-2xl"
            href="https://amzn.eu/d/9yvEpjd"
            target="_blank">
            https://amzn.eu/d/9yvEpjd
          </a>
        </div>
      </div>
      <h1 className="text-lg font-bold">Influencer Audience</h1>
      <div className="flex">
        <div className="w-1/3 flex">
          <p className="font-extrabold text-md mr-2">Gender:</p>
          <p className="">{campaign.audience.gender}</p>
        </div>
        <div className="w-1/3 flex">
          {" "}
          <p className="font-extrabold text-md mr-2">Audience Age:</p>
          <p className="">{`${campaign.audience.age.startAge} - ${campaign.audience.age.endAge} `}</p>
        </div>
        <div className="w-1/3 flex mr-2">
          <p className="font-extrabold text-md mr-2">Audience Languages:</p>

          {campaign.audience.languages.map((language, indx) => {
            return (
              <p className="ml-2" key={indx}>
                {language}
              </p>
            );
          })}
        </div>
      </div>
      <div className="w-full flex">
        <p className="font-extrabold text-md mr-2">Audience Locations:</p>

        {campaign.audience.locations.map((location, indx) => {
          return (
            <p className="ml-2" key={indx}>
              {` ${location},`}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default CampaignDetailedView;
