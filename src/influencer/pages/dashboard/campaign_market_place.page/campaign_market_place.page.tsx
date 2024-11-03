import React, { useState, useEffect, Fragment } from "react";
import CampaignMarketPlaceHeader from "../../../component/campaigns/marketPlaceHeader/marketPlaceHeader.compoent";
import Pagination from "../../../../global/global_component/pagination/paginationWithNumber.component";
import MarketerPlaceCampaignCard from "../../../component/campaigns/marketPlace_campaign_card/marketPlace_campaign_card.component";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import { useLocation } from "react-router-dom";
import SimplePagination from "../../../../global/global_component/pagination/pagination.component";
import Loader from "../../../../global/global_component/loader/loader.component";
import NoFileData from "../../../component/collab/no_collabsFound.component";

interface ProductImage {
  id: number;
  img_url: string;
}

interface CampaignProduct {
  product_images: ProductImage[];
}

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

interface CampaignEventDates {
  event_id: number;
  application_start_date: string;
  approve_influencer_last_date: string;
  content_verification_date: string;
  post_on_social_media_end_day: string;
}

interface InfluencerCategory {
  id: number;
  category_title: string;
  category_description: string;
  is_active: boolean;
}

interface NumberOfInfluencer {
  id: number;
  influencer_count_title: string;
  influencer_count_description: string | null;
  is_active: boolean;
}
interface NicheCategoryInterface {
  id: number;
  niche_name: string;
}

export interface CampaignInterFaceForMarketplace {
  id: number;
  campaign_name: string;
  platform: string;
  compensation_type: string;
  is_active_at: string | null;
  campaign_product: CampaignProduct;
  youtube_deliverables: YoutubeDeliverables | null;
  instagram_deliverables: InstagramDeliverables | null;
  niches_category: NicheCategoryInterface | null;
  campaign_event_dates: CampaignEventDates;
  influencer_category: InfluencerCategory;
  number_of_influencer: NumberOfInfluencer;
}

interface Pagination {
  currentPage: number;
  lastPage: number;
}

interface ApiResponse {
  data: {
    campaigns: CampaignInterFaceForMarketplace[];
    pagination: Pagination;
  };
}
const CampaignMarketPlace: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector(selectCurrentUser);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get("page")) || 1;
  const urlSort = queryParams.get("sort") || "oldest-first";
  const urlPlatform = queryParams.get("platform");
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(page);
  const [sort, setSort] = useState(urlSort);
  const [selectFilter, setSelectFilter] = useState({
    platform: urlPlatform,
    influencer_category: "",
  });
  const { access_token } = user.userData.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        let campaignMarketplaceApiUrl = `${process.env.REACT_APP_API_URL}influencer_campaigns/campaigns?page=${currentPageNumber}&sort=${sort}`;
        if (selectFilter.platform) {
          campaignMarketplaceApiUrl += `&platform=${selectFilter.platform}`;
        }

        const response = await axios.get(campaignMarketplaceApiUrl, config);
        const filteredData = response.data.data.campaigns.filter(
          (item: any) => item !== null
        );
        setData({
          data: {
            pagination: response.data.data.pagination,
            campaigns: filteredData,
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sort, selectFilter, currentPageNumber, page]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div>
          {data ? (
            <Fragment>
              <div className="w-full">
                <div className="lg:flex mt-4 mb-4 text-center ">
                  <h1 className=" text-xl font-bold mt-2 mb-3 md:mr-5 mr-0 ">
                    Campaign Marketplace
                  </h1>

                  <div className="z-50">
                    <CampaignMarketPlaceHeader
                      sort={sort}
                      selectFilter={selectFilter}
                      setSelectFilter={setSelectFilter}
                      setSort={setSort}
                    />
                  </div>
                </div>

                <div className="border p-4">
                  <h1 className=" text-2xl font-bold mx-auto text-center mb-4 pb-2 border-b-2 ">
                    Campaigns
                  </h1>
                  <div className="flex  ">
                    <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mx-auto">
                      {data &&
                        data.data.campaigns.map((campaignDetails) => (
                          <div key={campaignDetails.id}>
                            <MarketerPlaceCampaignCard
                              campaignDetails={campaignDetails}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              <SimplePagination
                limit={data.data.pagination.lastPage}
                currentPageNumber={currentPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
              />
            </Fragment>
          ) : (
            <div>
              <NoFileData
                heading="No New Campaigns Found"
                subText="There are no new campaigns available at the moment. Please check back soon for updates. Meanwhile, feel free to explore existing campaigns or browse other areas of our platform to discover more opportunities"
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default CampaignMarketPlace;
