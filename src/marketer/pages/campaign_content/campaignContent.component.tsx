import React, { Fragment, useEffect, useState } from "react";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import noData from "../../../assets/images/avatars/nodata.png";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { useNavigate } from "react-router-dom";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import PaymentButton from "../../../global/global_component/razorPayButton/razorPayButton.component";

export interface SortConfigInterface {
  key: string;
  orderBy: "ASC" | "DESC";
}

export interface imagesInterface {
  id: number;
  img_name: string;
  img_url: string;
}

export interface campaignContentDetailsInterface {
  id: number;
  campaign_name: string;
  platform: string;
  status: string;
  marketer: {
    id: number;
    user: {
      id: number;
      first_name: string;
      last_name: string;
    };
  };
  igDeliverablesCount: number;
  collabStatusCount: {
    applied: number;
    hired: number;
    selected: number;
  };
  contentReviewStatusCount: {
    Approved: number;
    Pending: number;
  };
  product_images: imagesInterface[];
  installment: {
    id: number;
    total_payable_amount: number;
  } | null;
}

export interface installmentDetailsInterface {
  id: number;
  total_payable_amount: number;
  total_amount: number;
  tds: string;
  gst: string;
  sgst: string;
  first_instalment: number;
  second_instalment: number;
  first_instalment_date: string;
  second_instalment_date: string;
  is_first_instalment_paid: false;
  is_second_instalment_paid: false;
}

const CampaignContentTable: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState(1);
  const [campaignContentDetails, setCampaignContentDetails] = useState<
    campaignContentDetailsInterface[] | null
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
  const headers = {
    authorization: `Bearer ${access_token}`,
  };
  const fetchCampaignContentDetails = async () => {
    const campaignContentDetailsApi = `${process.env.REACT_APP_API_URL}marketer_campaign/campaign_content/all`;
    const config = {
      headers,
    };
    try {
      setLoading(true);
      const { data } = await axios.get(campaignContentDetailsApi, config);
      setCampaignContentDetails(data.campaignContentDetails);
      setLastPage(data.pagination.lastPage);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaignContentDetails();
  }, []);

  const navigate = useNavigate();

  const openInNewTab = (id: number) => {
    window.open(`/marketer-app/campaign/${id}`, "_blank");
  };

  // payment module
  const [showModal, setShowModal] = useState(false);
  const [installmentPaymentData, setInstallmentPaymentData] =
    useState<installmentDetailsInterface | null>(null);
  const [installmentLoading, setInstallmentLoading] = useState<boolean>(false);
  const handleOpenPaymentModal = (id: number) => {
    setShowModal(true);
    fetchInstallmentDetails(id);
  };
  const handleClosePaymentModal = () => {
    setShowModal(false);
  };

  const fetchInstallmentDetails = async (installmentId: number) => {
    const installmentDetailsApi = `${process.env.REACT_APP_API_URL}marketer_campaign/campaign/payment_installment/${installmentId}`;
    const config = {
      headers,
    };
    try {
      setInstallmentLoading(true);
      const { data } = await axios.get(installmentDetailsApi, config);
      setInstallmentPaymentData(data);
    } catch (error: any) {
      const { status, data } = error.response;
      const { message, theme } = CallToast(status, data.message);
      setResponseToast({ message, theme, showToast: true });
      setTimeout(() => {
        setResponseToast((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
    } finally {
      setInstallmentLoading(false);
    }
  };

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
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
      {campaignContentDetails ? (
        <div className="bg-[#EBEBEB] mt-0  p-3">
          <div className="bg-white rounded-md">
            <div className="text-center overflow-x-scroll w-full min-h-[70vh]">
              <table className="w-full ">
                <thead>
                  <tr className="table-row-border">
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      rowSpan={2}>
                      Id
                    </th>
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      rowSpan={2}>
                      <button
                        onClick={() => handleSortChange("first_name")}
                        className="items-center">
                        Campaign Name
                        {sortConfig.key === "first_name" &&
                        sortConfig.orderBy === "ASC" ? (
                          <i className="fa-solid fa-caret-down ml-1"></i>
                        ) : (
                          <i className="fa-solid fa-caret-up ml-1"></i>
                        )}
                      </button>
                    </th>
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      rowSpan={2}>
                      Platform
                    </th>
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      rowSpan={2}>
                      Status
                    </th>
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      rowSpan={2}>
                      Campaign Deliverables Count
                    </th>
                    <th
                      className=" table-heading text-xs 3xl:text-sm border"
                      colSpan={3}>
                      Influencer Count
                    </th>
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      rowSpan={2}>
                      Product
                    </th>
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      colSpan={2}>
                      Content Request Count
                    </th>
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      rowSpan={2}>
                      Payment Installment
                    </th>
                    <th
                      className="px-3 table-heading text-xs 3xl:text-sm border"
                      rowSpan={2}>
                      Action
                    </th>
                  </tr>
                  <tr className="border-b-1">
                    <th className="px-4 table-heading text-xs 3xl:text-sm border-l">
                      Applied
                    </th>
                    <th className="px-4 table-heading text-xs 3xl:text-sm border">
                      Selected
                    </th>
                    <th className="px-4 table-heading text-xs 3xl:text-sm border-l">
                      Hired
                    </th>
                    <th className="px-3 table-heading text-xs 3xl:text-sm border">
                      Pending
                    </th>
                    <th className="px-3 table-heading text-xs 3xl:text-sm border">
                      Approved
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {campaignContentDetails &&
                    campaignContentDetails.map((tableData, index) => (
                      <tr key={index} className="w-full border-b-1">
                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.id}.
                          </p>
                        </td>
                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.campaign_name}
                          </p>
                        </td>

                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.platform}
                          </p>
                        </td>
                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.status}
                          </p>
                        </td>
                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.igDeliverablesCount}
                          </p>
                        </td>
                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.collabStatusCount.applied > 0 ? (
                              tableData.collabStatusCount.applied
                            ) : (
                              <i className="fa-solid fa-minus text-xs"></i>
                            )}
                          </p>
                        </td>
                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.collabStatusCount.selected > 0 ? (
                              tableData.collabStatusCount.selected
                            ) : (
                              <i className="fa-solid fa-minus text-xs"></i>
                            )}
                          </p>
                        </td>
                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.collabStatusCount.hired > 0 ? (
                              tableData.collabStatusCount.hired
                            ) : (
                              <i className="fa-solid fa-minus text-xs"></i>
                            )}
                          </p>
                        </td>
                        <td className="whitespace-nowrap w-40 py-3 border-x flex justify-center items-center ">
                          {tableData.product_images.length > 0 ? (
                            tableData.product_images?.map((img, index) => (
                              <div
                                key={index}
                                className="relative "
                                style={{
                                  marginLeft: index === 0 ? "0px" : "10%",
                                  zIndex:
                                    tableData.product_images.length - index,
                                }}>
                                <img
                                  src={img.img_url}
                                  alt={img.img_name}
                                  className="h-8 w-8 rounded-full border border-white "
                                />
                              </div>
                            ))
                          ) : (
                            <i className="fa-solid fa-minus text-xs"></i>
                          )}
                        </td>

                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.contentReviewStatusCount.Pending > 0 ? (
                              tableData.contentReviewStatusCount.Pending
                            ) : (
                              <i className="fa-solid fa-minus text-xs"></i>
                            )}
                          </p>
                        </td>
                        <td className="whitespace-nowrap py-3 border-x">
                          <p className="text-xs 3xl:text-sm font-medium">
                            {tableData.contentReviewStatusCount.Approved > 0 ? (
                              tableData.contentReviewStatusCount.Approved
                            ) : (
                              <i className="fa-solid fa-minus text-xs"></i>
                            )}
                          </p>
                        </td>
                        <td className="whitespace-nowrap py-1 border-x">
                          {tableData.installment && tableData.installment.id ? (
                            <button
                              className="bg-ri-orange px-3 text-xs rounded-md text-white py-1"
                              onClick={() =>
                                handleOpenPaymentModal(
                                  tableData.installment
                                    ? tableData.installment.id
                                    : 0
                                )
                              }>
                              Pay
                            </button>
                          ) : (
                            <button
                              className="bg-gray-400 px-3 text-xs rounded-md text-white py-1 cursor-not-allowed"
                              disabled>
                              Pay
                            </button>
                          )}
                        </td>
                        <td className="px-3">
                          <CDropdown>
                            <CDropdownToggle className="bg-[#4267B2] border-0 text-white py-1 px-2 rounded-sm text-sm hover:bg-[#4267B2]">
                              Take Action
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem
                                className="select-none active:bg-[#4267b2]"
                                onClick={() => openInNewTab(tableData.id)}>
                                <p className="text-xs 3xl:text-sm font-medium">
                                  View Campaign
                                </p>
                              </CDropdownItem>
                              <CDropdownItem
                                className="select-none active:bg-[#4267b2]"
                                onClick={() =>
                                  navigate(
                                    `/marketer-app/campaign/content_request/${tableData.id}`
                                  )
                                }>
                                <p className="text-xs 3xl:text-sm font-medium">
                                  View Content Requests
                                </p>
                              </CDropdownItem>
                              <CDropdownItem
                                className="select-none active:bg-[#4267b2]"
                                onClick={() => navigate("/")}>
                                <p className="text-xs 3xl:text-sm font-medium">
                                  View Collaborators
                                </p>
                              </CDropdownItem>
                            </CDropdownMenu>
                          </CDropdown>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 overflow-y-scroll">
                  <div className="bg-white p-5 rounded-md 3xl:mt-0 w-7/12 3xl:w-6/12 max-h-[70vh] overflow-y-scroll">
                    <div className="flex justify-between">
                      <div className="text-lg font-semibold">Payment</div>
                      <button onClick={handleClosePaymentModal}>
                        <i className="fa-solid fa-circle-xmark  text-gray-600"></i>
                      </button>
                    </div>
                    {installmentPaymentData ? (
                      <div>
                        <div className="border-b py-2 mb-2">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-gray-800 font-medium">
                                  Bill Amount:
                                </p>
                                <p className="text-gray-800">
                                  TDS (
                                  {parseFloat(installmentPaymentData.tds) * 100}
                                  %):
                                </p>
                                <p className="text-gray-800">
                                  GST (
                                  {parseFloat(installmentPaymentData.gst) * 100}
                                  %):
                                </p>
                                <p className="text-gray-800">
                                  SGST (
                                  {parseFloat(installmentPaymentData.sgst) *
                                    100}
                                  %):
                                </p>
                              </div>
                              <div className="space-y-2 text-right">
                                <p className="text-gray-800 font-medium">
                                  ₹{installmentPaymentData.total_amount}
                                </p>
                                <p className="text-gray-800">
                                  ₹
                                  {(
                                    installmentPaymentData.total_amount *
                                    parseFloat(installmentPaymentData.tds)
                                  ).toFixed(2)}
                                </p>
                                <p className="text-gray-800">
                                  ₹
                                  {(
                                    installmentPaymentData.total_amount *
                                    parseFloat(installmentPaymentData.gst)
                                  ).toFixed(2)}
                                </p>
                                <p className="text-gray-800">
                                  ₹
                                  {(
                                    installmentPaymentData.total_amount *
                                    parseFloat(installmentPaymentData.sgst)
                                  ).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 text-center  font-semibold text-blue-600">
                            Total Payable Amount: ₹
                            {installmentPaymentData.total_payable_amount}
                          </div>
                        </div>
                        <div className=" space-y-5">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className=" font-semibold">
                                First Installment: ₹
                                {installmentPaymentData.first_instalment}
                              </p>
                              <p className="text-gray-600">
                                Pay before:{" "}
                                {formatDate(
                                  installmentPaymentData.first_instalment_date
                                )}
                              </p>
                            </div>
                            <div>
                              {!installmentPaymentData.is_first_instalment_paid ? (
                                <button
                                  className={`px-4 py-2 w-40 rounded-md bg-ri-blue text-white hover:bg-ri-blue-dark`}>
                                  <PaymentButton />₹
                                  {installmentPaymentData.first_instalment}
                                </button>
                              ) : (
                                <button
                                  className={`px-4 py-2 w-40 rounded-md bg-gray-400 text-gray-700 cursor-not-allowed`}
                                  disabled>
                                  Paid
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div>
                              <p className=" font-semibold">
                                Second Installment: ₹
                                {installmentPaymentData.second_instalment}
                              </p>
                              <p className="text-gray-600">
                                Pay before:{" "}
                                {formatDate(
                                  installmentPaymentData.second_instalment_date
                                )}
                              </p>
                            </div>
                            <div>
                              {!installmentPaymentData.is_second_instalment_paid ? (
                                <button
                                  className={`px-4 py-2 w-40 rounded-md bg-ri-blue text-white hover:bg-ri-blue-dark`}>
                                  <PaymentButton />₹
                                  {installmentPaymentData.first_instalment}
                                </button>
                              ) : (
                                <button
                                  className={`px-4 py-2 w-40 rounded-md bg-gray-400 text-gray-700 cursor-not-allowed`}
                                  disabled>
                                  Paid
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <h1>no data</h1>
                    )}
                  </div>
                </div>
              )}
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
            No Any Live Campaign or Content review
          </h3>
        </div>
      )}
    </Fragment>
  );
};

export default CampaignContentTable;
