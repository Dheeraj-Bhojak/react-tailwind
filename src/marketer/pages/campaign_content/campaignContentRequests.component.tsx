import React, { Fragment, useEffect, useState } from "react";
import { SortConfigInterface } from "./campaignContent.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import noData from "../../../assets/images/avatars/nodata.png";
import { useNavigate, useParams } from "react-router-dom";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import Loader from "../../../global/global_component/loader/loader.component";

export interface contentDetailsInterface {
  id: number;
  status: string;
  deliverable: {
    id: number;
    media_type: string;
    deliverable_name: string;
    deliverable_descriptions: string;
  };
  content: {
    img_name: string;
    img_url: string;
    is_active: true;
  };
  collabDetail: {
    id: number;
    influencer: {
      id: number;
      user: {
        first_name: string;
        last_name: string;
      };
    };
    campaign: {
      id: number;
      campaign_name: string;
      platform: string;
    };
  };
}

const CampaignContentRequest: React.FC = () => {
  const { id } = useParams();
  const collabId = parseInt(id ?? "0", 10);

  const [loading, setLoading] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState(1);
  const [contentDetails, setContentDetails] = useState<
    contentDetailsInterface[] | null
  >(null);
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });
  const [sortConfig, setSortConfig] = useState<SortConfigInterface>({
    key: "id",
    orderBy: "DESC",
  });

  const handleSortChange = (sortKey: string) => {
    setSortConfig((prev) => ({
      ...prev,
      key: sortKey,
      orderBy: prev.orderBy === "ASC" ? "DESC" : "ASC",
    }));
  };
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const fetchContentDetails = async (id: number) => {
    const headers = {
      authorization: `Bearer ${access_token}`,
    };
    const campaignContentDetailsApi = `${process.env.REACT_APP_API_URL}marketer_campaign/content/request/${id}`;
    const config = {
      headers,
    };
    try {
      setLoading(true);
      const { data } = await axios.get(campaignContentDetailsApi, config);
      console.log(data);
      setContentDetails(data.content);
      setLastPage(data.pagination.lastPage);
    } catch (error: any) {
      console.log("data", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchContentDetails(collabId);
    console.log("collab Id ", collabId);
  }, [collabId]);

  const navigate = useNavigate();
  const openInNewTab = (id: number) => {
    window.open(`/marketer-app/campaign/${id}`, "_blank");
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
      )}

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            {contentDetails ? (
              <div className="bg-[#EBEBEB]  p-3">
                <div className="bg-white rounded-md  py-2">
                  <div className="text-center overflow-x-scroll w-full min-h-[70vh]">
                    <table className="w-full">
                      <thead>
                        <tr className="table-row-border">
                          <th
                            className="px-14 table-heading text-xs 3xl:text-sm"
                            rowSpan={2}>
                            Id
                          </th>
                          <th
                            className="px-14 table-heading text-xs 3xl:text-sm"
                            rowSpan={2}>
                            <button
                              onClick={() => handleSortChange("first_name")}
                              className="items-center">
                              Deliverable Name
                              {sortConfig.key === "first_name" &&
                              sortConfig.orderBy === "ASC" ? (
                                <i className="fa-solid fa-caret-down ml-1"></i>
                              ) : (
                                <i className="fa-solid fa-caret-up ml-1"></i>
                              )}
                            </button>
                          </th>
                          <th
                            className="px-14 table-heading text-xs 3xl:text-sm"
                            rowSpan={2}>
                            Platform
                          </th>
                          <th
                            className="px-14 table-heading text-xs 3xl:text-sm"
                            rowSpan={2}>
                            Content
                          </th>
                          <th
                            className="px-14 table-heading text-xs 3xl:text-sm"
                            rowSpan={2}>
                            Status
                          </th>
                          <th className=" table-heading text-xs 3xl:text-sm">
                            Influencer Name
                          </th>
                          <th
                            className="px-14 table-heading text-xs 3xl:text-sm"
                            rowSpan={2}>
                            Campaign Name
                          </th>
                          <th
                            className="px-14 table-heading text-xs 3xl:text-sm`"
                            rowSpan={2}>
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {contentDetails &&
                          contentDetails.map((tableData, index) => (
                            <tr className="w-full border-b-1" key={index}>
                              <td className="whitespace-nowrap py-3">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  {tableData.id}.
                                </p>
                              </td>

                              <td className="whitespace-nowrap py-3">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  {tableData.deliverable.deliverable_name}
                                </p>
                              </td>
                              <td className="whitespace-nowrap py-3">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  {tableData.collabDetail.campaign.platform}
                                </p>
                              </td>
                              <td className="whitespace-nowrap py-3 flex">
                                {tableData.content ? (
                                  tableData.content.img_url && (
                                    <div className="relative">
                                      <img
                                        src={tableData.content.img_url}
                                        alt={tableData.content.img_name}
                                        className="h-8 w-8 rounded-full border border-white"
                                      />
                                    </div>
                                  )
                                ) : (
                                  <>
                                    <i className="fa-solid fa-minus text-xs"></i>
                                  </>
                                )}
                              </td>

                              <td className="whitespace-nowrap py-3">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  {tableData.status}
                                </p>
                              </td>
                              <td className="whitespace-nowrap py-3">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  {
                                    tableData.collabDetail.campaign
                                      .campaign_name
                                  }
                                </p>
                              </td>
                              <td className="whitespace-nowrap py-3">
                                <p className="text-xs 3xl:text-sm font-medium">
                                  {`${tableData.collabDetail.influencer.user.first_name} ${tableData.collabDetail.influencer.user.last_name}`}
                                </p>
                              </td>
                              <CDropdown>
                                <CDropdownToggle className="bg-[#4267B2] border-0 text-white py-1 px-2 rounded-sm text-sm hover:bg-[#4267B2]">
                                  Take Action
                                </CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem
                                    className="select-none active:bg-[#4267b2]"
                                    onClick={() =>
                                      openInNewTab(
                                        tableData.collabDetail.campaign.id
                                      )
                                    }>
                                    <p className="text-xs 3xl:text-sm font-medium">
                                      View Campaign
                                    </p>
                                  </CDropdownItem>
                                  <CDropdownItem
                                    className="select-none active:bg-[#4267b2]"
                                    onClick={() =>
                                      navigate(
                                        `/marketer-app/content/view/${tableData.id}`
                                      )
                                    }>
                                    <p className="text-xs 3xl:text-sm font-medium">
                                      View Content
                                    </p>
                                  </CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <div className="items-center justify-center ">
                <img
                  src={noData}
                  alt="Error for coffee"
                  className="w-auto h-full mx-auto"
                />
                <h3 className="text-center md:text-xl md:font-bold  text-base font-semibold">
                  No Any Any Content Request
                </h3>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CampaignContentRequest;
