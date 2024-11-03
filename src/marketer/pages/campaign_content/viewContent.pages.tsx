import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import Loader from "../../../global/global_component/loader/loader.component";
import noData from "../../../assets/images/avatars/nodata.png";
import instagramIcon from "../../../assets/img/instagram_circle.png";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";
import _ from "lodash";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
export interface instagramInterface {
  id: number;
  followers: number;
  profile_picture_url: string;
  instagram_name: string;
  username: string;
}

export interface ContentDetailsInterface {
  id: number;
  status: string;
  deliverable_note: string;
  deliverable: {
    id: number;
    deliverable_name: string;
    deliverable_descriptions: string;
  };
  content: {
    id: number;
    img_name: string;
    img_url: string;
  };
  collabDetail: {
    id: number;
    influencer: {
      id: number;
      qikgro_score: number;
      instagram: instagramInterface[];
    };
    campaign: {
      id: number;
      campaign_name: string;
      platform: string;
      campaign_description: string;
    };
  };
}

const ContentView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [contentDetails, setContentDetails] =
    useState<ContentDetailsInterface | null>(null);
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
    showToast: false,
  });
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const headers = {
    authorization: `Bearer ${access_token}`,
  };
  const fetchSingleContentDetails = async (id: number) => {
    const contentDetailsApi = `${process.env.REACT_APP_API_URL}marketer_campaign/content/view/${id}`;
    const config = {
      headers,
    };
    try {
      setLoading(true);
      const { data } = await axios.get(contentDetailsApi, config);
      setContentDetails(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleContentDetails(5);
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [contentReview, setContentReview] = useState<{
    status: string;
    deliverable_note: string;
  }>({
    status: "",
    deliverable_note: "",
  });
  const [textLength, setTextLength] = useState(0);

  const handleCancel = () => {
    setModalIsOpen(false);
  };
  const handleOpenModal = (value: string) => {
    setContentReview((prev) => ({
      ...prev,
      status: value,
    }));
    setModalIsOpen(true);
  };
  const maximumTextLength = 499;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const value = e.target.value;
    if (value.length <= maximumTextLength) {
      setContentReview((prev) => ({
        ...prev,
        deliverable_note: value,
      }));
      setTextLength(value.length);
    }
  };
  const [errorMessage, setErrorMessage] = useState<string>("");
  const uploadContentStatus = async (id: number) => {
    const uploadContentStatusApi = `${process.env.REACT_APP_API_URL}marketer_campaign/content/verhjify-update/${id}`;
    try {
      setUploadLoading(true);
      if (contentReview.deliverable_note !== "") {
        setErrorMessage("");
        const config = {
          headers,
        };
        const { data, status } = await axios.post(
          uploadContentStatusApi,
          contentReview,
          config
        );
        console.log("uploaded Data,", data);
        if (status === 200) {
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
      } else {
        setErrorMessage("Please Add Deliverable note! It cannot be empty");
      }
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
    } finally {
      setModalIsOpen(false);
      setUploadLoading(false);
    }
  };

  const [campaignCollapsed, setCampaignCollapsed] = useState<boolean>(true);
  const toggleCollapse = () => {
    setCampaignCollapsed((prev) => !prev);
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
        <div className="bg-[#EBEBEB]">
          {contentDetails ? (
            <Fragment>
              <div className="container p-2 mx-auto mt-0  ">
                <div className="items-center">
                  <div className="w-full">
                    <h1 className="w-full text-center text-3xl font-bold mb-2">
                      Content Verification
                    </h1>
                  </div>
                  <div className="bg-[#EBEBEB]  border-2 mx-2">
                    <div className="bg-white p-3 rounded-md">
                      <div className="flex items-center justify-between px-3">
                        <p className="text-sm 2xl:text-base text-gray-color font-medium text-ri-blue">
                          Campaign Details
                        </p>{" "}
                        <i
                          className={`fa-solid ${
                            campaignCollapsed
                              ? "fa-circle-plus"
                              : "fa-circle-minus"
                          } text-[#4267B2] cursor-pointer`}
                          onClick={toggleCollapse}></i>
                      </div>
                      {!campaignCollapsed && (
                        <div className="w-full flex py-2">
                          <div className="w-2/12 justify-center items-center flex m-auto">
                            <img
                              src={noData}
                              alt=""
                              className="h-16 w-16 rounded-full border-2"
                            />
                          </div>
                          <div className="w-10/12">
                            <div className="flex">
                              <p className="text-sm font-semibold">
                                {
                                  contentDetails.collabDetail.campaign
                                    .campaign_name
                                }
                              </p>
                              <img
                                src={instagramIcon}
                                alt="instagramIcon"
                                className="h-5 w-5 mx-2"
                              />
                            </div>
                            <p className="text-sm my-2 w-8/12">
                              {
                                contentDetails.collabDetail.campaign
                                  .campaign_description
                              }
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="w-full flex bg-white py-2 rounded-lg  mt-3">
                    <div className="w-5/12  ">
                      <div className="w-full ">
                        <div className="flex bg-slate-200 mt-2 p-2 rounded-md mx-2">
                          <div className="w-4/12 flex justify-center items-center">
                            <img
                              src={
                                contentDetails.collabDetail.influencer
                                  .instagram[0].profile_picture_url
                              }
                              alt="user"
                              className="w-10 h-10 rounded-full border"
                            />
                          </div>
                          <div className="w-8/12">
                            <div className="flex">
                              <p className="text-sm lg:text-base font-semibold ">
                                <span className="text-ri-orange">@</span>
                                {
                                  contentDetails.collabDetail.influencer
                                    .instagram[0].username
                                }
                              </p>
                            </div>
                            <p className="text-sm lg:text-base font-semibold">
                              Followers:{" "}
                              {
                                contentDetails.collabDetail.influencer
                                  .instagram[0].followers
                              }
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 bg-slate-200 p-3 rounded-md mx-2">
                          <h1 className="text-sm lg:text-base font-semibold">
                            {contentDetails.deliverable.deliverable_name}
                          </h1>
                          <p className="text-sm">
                            {
                              contentDetails.deliverable
                                .deliverable_descriptions
                            }
                          </p>
                          <p
                            className={`mt-2 border p-2 w-32 text-center rounded-lg text-white ${
                              contentDetails.status.toLowerCase() === "approved"
                                ? "bg-green-500"
                                : "bg-ri-orange"
                            }`}>
                            {contentDetails.status}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-7/12  p-2 mx-2">
                      <img
                        src={contentDetails.content.img_url}
                        alt={contentDetails.content.img_name}
                        className="p-4 h-auto w-[80%] shadow "
                      />
                    </div>
                  </div>
                  <div className="w-full p-4">
                    <div className="flex justify-center space-x-4">
                      <button
                        disabled={
                          contentDetails.status.toLowerCase() === "approved"
                        }
                        className="bg-ri-blue text-white py-2 px-4 rounded"
                        onClick={() => handleOpenModal("Approved")}>
                        Accept
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-4 rounded"
                        onClick={() => handleOpenModal("Rejected")}>
                        Reject
                      </button>
                    </div>
                  </div>
                  <CModal
                    visible={modalIsOpen}
                    onClose={() => setModalIsOpen(false)}
                    size="lg">
                    <CModalHeader closeButton>
                      <CModalTitle>
                        {_.toUpper(contentReview.status)} CONTENT
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <label className="font-semibold text-ri-blue">
                        Content Deliverable Note Review
                      </label>
                      <div className="flex justify-center items-center">
                        <textarea
                          value={contentReview.deliverable_note}
                          onChange={handleChange}
                          rows={4}
                          className={`w-3/4 text-base border-2 focus:outline-none focus:border-ri-orange p-3 rounded-lg resize-none ${
                            errorMessage ? "border-red-500" : "border-ri-blue"
                          }`}></textarea>
                      </div>
                      {errorMessage ? (
                        <p className="text-red-500 text-xs mt-0">
                          {errorMessage}
                        </p>
                      ) : (
                        ""
                      )}
                      <div className="w-3/4 mx-auto flex">
                        <div className="w-1/2">
                          <p className="text-xs">
                            Lorem ipsum dolor sit amet consectetur adipisicing.*
                          </p>
                        </div>
                        <div className="w-1/2 text-right text-xs">
                          <p className="">
                            {textLength}/{maximumTextLength}
                          </p>
                        </div>
                      </div>
                    </CModalBody>
                    <CModalFooter>
                      <button
                        className="bg-ri-blue border-0 hover:bg-ri-blue text-white py-2 px-4 rounded-lg"
                        onClick={handleCancel}>
                        Cancel
                      </button>
                      <button
                        className="bg-ri-orange hover:bg-ri-orange border-0 text-white py-2 px-4 rounded-lg"
                        onClick={() => uploadContentStatus(contentDetails.id)}>
                        Submit
                      </button>
                    </CModalFooter>
                  </CModal>
                </div>
              </div>
            </Fragment>
          ) : (
            <div className="items-center justify-center ">
              <img
                src={noData}
                alt="Error for coffee"
                className="w-auto h-full mx-auto"
              />
              <h3 className="text-center md:text-xl md:font-bold  text-base font-semibold">
                Content not available for review
              </h3>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default ContentView;
