import React, { Fragment, useEffect, useState } from "react";
import _ from "lodash";

import Pagination from "../../../../global/global_component/pagination/paginationWithNumber.component";
import CampaignCard from "../campaignCard/campaignCard.component";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import MarketerCampaignCard from "../campaignCard/marketerCampaignCard.component";
import NoCampaigns from "../../../pages/campaigns/noCampaigns.page";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import SimplePagination from "../../../../global/global_component/pagination/pagination.component";
import ToastNotification from "../../../../global/global_component/toastNotification/ToastNotification";

export interface CampaignInterface {
  id: number;
  campaign_name: string;
  platform: string;
  compensation_type: string;
  campaign_product: {
    id: number;
    product_images: {
      id: number;
      img_url: string;
    }[];
  };
  niches_category: {
    niche_name: string;
  };
}

interface navCampaignStatusCountInterface {
  all: number;
  archive: number;
  draft: number;
  under_review: number;
  active: number;
  completed: number;
}
interface paginationInterface {
  currentPage: number;
  lastPage: number;
}

export interface ResponseToast {
  message: string;
  theme: string;
  showToast: boolean;
}

interface ApiResponse {
  data: {
    campaigns: CampaignInterface[];
    navCampaignStatusCount: navCampaignStatusCountInterface;
    pagination: paginationInterface;
  };
}
const NavList = [
  {
    id: 1,
    name: "all",
    campaign_counts: 1,
  },
  {
    id: 2,
    name: "active",
    campaign_counts: 0,
  },

  {
    id: 3,
    name: "under_review",
    campaign_counts: 0,
  },
  {
    id: 4,
    name: "draft",
    campaign_counts: 0,
  },
  {
    id: 5,
    name: "closed",
    campaign_counts: 0,
  },
  {
    id: 6,
    name: "archive",
    campaign_counts: 0,
  },
];

const CampaignCardView = () => {
  const navigate = useNavigate();

  const HandleCLick = (name: string) => {
    navigate(`/marketer-app/campaigns/${name}`);
  };
  const currentCampaignPageLocation = useParams();
  const [data, setData] = useState<ApiResponse | null>(null);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get("page")) || 1;
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(page);
  const paramName = currentCampaignPageLocation["*"];
  const [loading, setLoading] = useState(true);
  const [responseToast, setResponseToast] = useState<ResponseToast>({
    message: "",
    theme: "",
    showToast: false,
  });

  const fetchData = async () => {
    try {
      if (paramName) {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        const response = await axios.get<ApiResponse>(
          `${process.env.REACT_APP_API_URL}marketer_campaign/my-campaign/${paramName}?page=${currentPageNumber}`,
          config
        );
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [paramName, currentPageNumber]);

  const handleChildAction = () => {
    fetchData();
  };

  const NavList = Object.entries(data?.data.navCampaignStatusCount ?? {}).map(
    ([name, campaign_counts], index) => ({
      id: index + 1,
      name,
      campaign_counts,
    })
  );
  const campaignLength = data?.data.campaigns.length || 0;
  return (
    <Fragment>
      {responseToast.showToast ? (
        <ToastNotification
          message={responseToast.message}
          theme={responseToast.theme}
        />
      ) : (
        ""
      )}
      <div className="header">
        <div className="flex">
          {NavList.map((nav, indx) => {
            return (
              <div
                className="cursor-pointer"
                key={indx}
                onClick={() => HandleCLick(nav.name)}>
                <p
                  className={` text-[10px] text-center px-2  md:text-lg font-semibold ${
                    currentCampaignPageLocation["*"] === nav.name
                      ? "xs:border-b-4 border-ri-blue text-ri-blue border-b-2 "
                      : ""
                  } `}
                  key={indx}>
                  {`${_.toUpper(nav.name)} `}
                  <span className="rounded-full text-[12px] text-white bg-ri-blue px-1">
                    {nav.campaign_counts}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex">
            <h1 className="mx-auto mb-4 text-3xl font-bold mt-4">{`${_.capitalize(
              currentCampaignPageLocation["*"]
            )} Campaigns`}</h1>
          </div>

          {campaignLength < 1 ? (
            <NoCampaigns />
          ) : (
            <div>
              <div className="flex border p-4">
                <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mx-auto">
                  {data?.data.campaigns.map((campaign) => (
                    <MarketerCampaignCard
                      key={campaign.id}
                      campaign={campaign}
                      onAction={handleChildAction}
                      toastShowHandle={setResponseToast}
                    />
                  ))}
                </div>
              </div>
              {data && (
                <SimplePagination
                  limit={data.data.pagination.lastPage}
                  currentPageNumber={currentPageNumber}
                  setCurrentPageNumber={setCurrentPageNumber}
                />
              )}
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default CampaignCardView;
