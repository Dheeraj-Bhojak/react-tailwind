import React, { Fragment, useEffect, useState } from "react";
import _ from "lodash";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import SimplePagination from "../../../global/global_component/pagination/pagination.component";
import InfluencerCollaborationCampaignCard from "./collabCampaignCard.component";
import NoFileData from "./no_collabsFound.component";

export interface CollabInterface {
  id: number;
  status: string;
  campaign: {
    id: number;
    campaign_name: string;
    platform: string;
    compensation_type: string;
    campaign_product: {
      product_images: {
        id: number;
        img_url: string;
      }[];
    };
  };
}

interface navCampaignCollaborationStatusCodeInterface {
  all: number;
  applied: number;
  selected: number;
  hired: number;
  completed: number;
  rejected: number;
}
interface paginationInterface {
  currentPage: number;
  lastPage: number;
}

interface ApiResponse {
  data: {
    collabs: CollabInterface[];
    navCampaignCollaborationStatusCode: navCampaignCollaborationStatusCodeInterface;
    pagination: paginationInterface;
  };
}

const CampaignCollaborationCardView: React.FC = () => {
  const navigate = useNavigate();

  const HandleCLick = (route: string) => {
    navigate(`/influencer-app/collaborations/${route}`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (paramName) {
          const config = {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          };
          const response = await axios.get<ApiResponse>(
            `${process.env.REACT_APP_API_URL}influencer_campaigns/my-collaborations/${paramName}?page=${currentPageNumber}`,
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
    fetchData();
  }, [paramName, currentPageNumber]);

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedValue: string = event.target.value;
    HandleCLick(selectedValue);
  };

  const NavList = Object.entries(
    data?.data.navCampaignCollaborationStatusCode ?? {}
  ).map(([name, campaign_counts], index) => ({
    id: index + 1,
    name,
    campaign_counts,
  }));
  const campaignLength = data?.data.collabs.length || 0;
  return (
    <Fragment>
      <div className="header">
        <div className="hidden md:flex">
          {NavList.map((nav, indx) => {
            return (
              <>
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
              </>
            );
          })}
        </div>
        <div className="md:hidden w-56">
          <select
            id="collabMenu"
            onChange={handleSelectChange}
            className="bg-gray-50 border border-gray-300 w-full font-bold text-sm rounded-lg p-1">
            {NavList.map((nav, indx) => (
              <option key={indx} value={nav.name}>
                {`${_.toUpper(nav.name)}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-[70vh] ">
          <i className="fa-solid fa-spinner fa-spin text-ri-blue text-8xl"></i>
        </div>
      ) : (
        <div>
          <div className="flex">
            <h1 className="mx-auto mb-4 text-3xl font-bold mt-4">{`${_.capitalize(
              currentCampaignPageLocation["*"]
            )} Collaboration`}</h1>
          </div>
          {campaignLength < 1 ? (
            <NoFileData
              heading={"NO Collaboration"}
              subText="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid,
            laborum dignissimos iusto error amet omnis laboriosam molestias
            praesentium facere odit non nam. Odit, recusandae distinctio?"
            />
          ) : (
            data?.data.collabs && (
              <div>
                <div className="flex border p-4">
                  <div className="grid grid-cols-1  lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 mx-auto ">
                    {data?.data.collabs.map((collab) => (
                      <InfluencerCollaborationCampaignCard
                        key={collab.id}
                        collab={collab}
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
            )
          )}
        </div>
      )}
    </Fragment>
  );
};

export default CampaignCollaborationCardView;
