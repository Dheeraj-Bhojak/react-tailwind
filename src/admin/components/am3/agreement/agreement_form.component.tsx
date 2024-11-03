import React, { Fragment, useEffect, useRef, useState } from "react";
import _ from "lodash";

import logo from "../../../../assets/images/new/QG-logo1.png";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import axios from "axios";
import CallToast from "../../../../utils/utilsMethods/callToast.utils";
import { ResponseToast } from "../../../../marketer/components/campaigns/campaignCardsView/campaignCards.component";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../global/global_component/loader/loader.component";
import ToastNotification from "../../../../global/global_component/toastNotification/ToastNotification";

interface AgreementFormParams {
  campaign_id: number;
  influencer_id: number;
}

interface campaignEventDatesInterface {
  event_id: number;
  application_start_date: string;
  approve_influencer_last_date: string;
  content_verification_date: string;
  post_on_social_media_end_day: string;
}

interface MarketerInterface {
  id: number;
  brand_name: string;
  marketer_designation: string;
  marketer_name: string;
  marketer_email: string;
  marketer_address: string;
}

interface InfluencerInterface {
  id: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  addresses: {
    landmark: string;
    city: string;
    state: string;
    pin_code: string;
  };
}

interface CollabPricingInterface {
  id: number;
  amount: number;
  content_verify_before: string;
  content_upload_date: string;
}

interface CollaborationInterface {
  id: number;
  status: string;
  influencer: InfluencerInterface;
}

interface agreementInterface {
  id: number;
  brandGuideline: string;
  ownership_duration: number;
  campaign_description: string;
  agreement_start: string;
  agreement_end: null;
  termination_days: number;
  agreement_accepted_at: string;
  influencerAcceptAgreement: boolean;
}

interface IgDeliverableInterface {
  id: number;
  media_type: string;
  deliverable_name: string;
  deliverable_descriptions: string;
  collab_pricing: CollabPricingInterface;
}

interface agreementDetailsInterface {
  campaign_id: number;
  campaign_name: string;
  campaign_platform: string;
  campaign_status: string;
  campaign_description: string;
  campaign_event_dates: campaignEventDatesInterface;
  instagram_deliverables: {
    reels: number;
    story_with_link: number;
    video_post: number;
    static_post: number;
  };
  marketer: MarketerInterface;
  collaboration: {
    id: number;
    status: string;
    influencer: {
      id: number;
      user: {
        id: number;
        first_name: string;
        last_name: string;
        email: string;
      };
      addresses: {
        landmark: string;
        city: string;
        state: string;
        pin_code: string;
      };
    };

    agreement: agreementInterface;
  };
  ig_deliverables: IgDeliverableInterface[];
}

interface UpdatedCollabPricingInterface {
  id: number;
  deliverable_id: number;
  amount: number;
  content_verify_before: string;
  content_upload_date: string;
}

interface UpdatedAgreementDetailsInterface {
  id: number | null;
  brandGuideline: string;
  ownership_duration: number;
  campaign_description: string;
  agreement_start: string;
  agreement_end: string;
  termination_days: number;
  agreement_accepted_at: string;
  influencerAcceptAgreement: boolean;
  collab_pricing: UpdatedCollabPricingInterface[];
}

interface AgreementErrors {
  errorMessage: string;
  errorStatus: number;
}

const AgreementForm: React.FC = () => {
  const { id } = useParams();
  const collabId = parseInt(id ?? "0", 10);

  const [loading, setLoading] = useState(false);
  const agreementData: UpdatedAgreementDetailsInterface = {
    id: null,
    brandGuideline: "",
    ownership_duration: 18,
    campaign_description: "",
    agreement_start: "",
    agreement_end: "",
    termination_days: 10,
    agreement_accepted_at: "",
    influencerAcceptAgreement: false,
    collab_pricing: [],
  };

  const [responseToast, setResponseToast] = useState<ResponseToast>({
    message: "",
    theme: "",
    showToast: false,
  });

  const [agreementFormData, setAgreementFormData] =
    useState<agreementDetailsInterface | null>(null);

  const [updatedAgreementFormData, setUpdatedAgreementFormData] =
    useState<UpdatedAgreementDetailsInterface>(agreementData);

  const [amountPaymentDetails, setAmountPaymentDetails] = useState({
    totalAmount: 3200,
  });

  const [agreementDate, setAgreementDate] = useState({});

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const headers = {
    authorization: `Bearer ${access_token}`,
  };

  const fetchAgreementData = async (collab_id: number) => {
    setLoading(true);
    const agreementDetailsApi = `${process.env.REACT_APP_API_URL}admin/am3/campaign_agreement_details/${collab_id}`;
    const config = {
      headers,
    };
    try {
      const { data } = await axios.get(agreementDetailsApi, config);
      setAgreementFormData(data);
      const { influencer, agreement } = data.collaboration;
      const {
        id,
        brandGuideline,
        ownership_duration,
        campaign_description,
        agreement_start,
        agreement_end,
        termination_days,
        agreement_accepted_at,
        influencerAcceptAgreement,
      } = agreement;
      setUpdatedAgreementFormData((prev) => ({
        ...prev,
        id,
        brandGuideline,
        ownership_duration,
        campaign_description,
        agreement_start,
        agreement_end,
        termination_days,
        agreement_accepted_at,
        influencerAcceptAgreement,
        collab_pricing: data.ig_deliverables.map(
          (deliverable: {
            collab_pricing: {
              id: number;
              amount: number;
              content_verify_before: string | null;
              content_upload_date: string | null;
            };
            id: number;
          }) => ({
            ...deliverable.collab_pricing,
            deliverable_id: deliverable.id,
          })
        ),
      }));
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgreementData(collabId);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === "brandGuideline") {
      setUpdatedAgreementFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else if (name === "agreement_end") {
      setUpdatedAgreementFormData((prev) => ({
        ...prev,
        agreement_end: value,
      }));
    } else {
      if (/^\d*$/.test(value)) {
        setUpdatedAgreementFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  const handleChangeTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setUpdatedAgreementFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeDeliverablePrice = (value: number, index: number) => {
    const updatedFormData = { ...updatedAgreementFormData };
    updatedFormData.collab_pricing[index].amount = value;
    setUpdatedAgreementFormData(updatedFormData);
  };

  const handleChangeDeliverableDeliverableDate = (
    name: string,
    value: string,
    index: number
  ) => {
    const updatedFormData = { ...updatedAgreementFormData };

    if (name === "content_verify_before") {
      updatedFormData.collab_pricing[index].content_verify_before = value;
      setUpdatedAgreementFormData(updatedFormData);
    } else {
      updatedFormData.collab_pricing[index].content_upload_date = value;
      setUpdatedAgreementFormData(updatedFormData);
    }
  };

  // const formatDateToISO = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   return date.toISOString();
  // };
  const formateIsoToDate = (dateString: string) => {
    if (dateString) {
      return dateString.split("T")[0];
    } else {
      return;
    }
  };

  const dateInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({
    content_verify_before: null,
    content_upload_date: null,
  });

  const handleOpenCalender = (key: string) => {
    if (dateInputRefs.current[key]) {
      dateInputRefs.current[key]?.click();
    }
  };
  const [dateActiveInput, setdateActiveInput] = useState<string | null>(null);
  const handleFocusDates = (key: string) => {
    setdateActiveInput(key);
  };
  const handleBlurDates = () => {
    setdateActiveInput(null);
  };
  const [errors, setErrors] = useState<AgreementErrors>({
    errorMessage: "",
    errorStatus: 400,
  });
  const navigate = useNavigate();

  const uploadFormAgreementData = async (event: any) => {
    event.preventDefault();

    const errors = { errorMessage: "", errorStatus: false };

    // Check for empty or invalid fields
    if (!updatedAgreementFormData.brandGuideline?.trim()) {
      errors.errorMessage += "BrandGuideline cannot be empty.\n";
      errors.errorStatus = true;
    }

    if (!updatedAgreementFormData.campaign_description?.trim()) {
      errors.errorMessage += "Campaign description cannot be empty.\n";
      errors.errorStatus = true;
    }

    if (!updatedAgreementFormData.agreement_start?.trim()) {
      errors.errorMessage += "Agreement start date cannot be empty.\n";
      errors.errorStatus = true;
    }

    if (!updatedAgreementFormData.agreement_end?.trim()) {
      errors.errorMessage += "Agreement end date cannot be empty.\n";
      errors.errorStatus = true;
    }

    // Check ownership duration and termination days
    if (
      updatedAgreementFormData.ownership_duration < 6 ||
      updatedAgreementFormData.ownership_duration > 48
    ) {
      errors.errorMessage +=
        "Ownership duration must be between 6 and 48 months.\n";
      errors.errorStatus = true;
    }

    if (
      updatedAgreementFormData.termination_days < 2 ||
      updatedAgreementFormData.termination_days > 30
    ) {
      errors.errorMessage += "Termination days must be between 2 and 30.\n";
      errors.errorStatus = true;
    }

    if (updatedAgreementFormData.collab_pricing.length === 0) {
      errors.errorMessage += "Deliverable Pricing cannot be empty.\n";
      errors.errorStatus = true;
    } else {
      updatedAgreementFormData.collab_pricing.forEach((pricing, index) => {
        if (!pricing.content_upload_date?.trim()) {
          errors.errorMessage += `Content upload date for pricing item ${
            index + 1
          } cannot be empty.\n`;
          errors.errorStatus = true;
        }
        if (!pricing.content_verify_before?.trim()) {
          errors.errorMessage += `Content verify date for pricing item ${
            index + 1
          } cannot be empty.\n`;
          errors.errorStatus = true;
        }
        if (!pricing.amount) {
          errors.errorMessage += `Content pricing for item ${
            index + 1
          } cannot be empty.\n`;
          errors.errorStatus = true;
        }
      });
    }

    if (errors.errorStatus) {
      setErrors((prev) => ({
        ...prev,
        errorMessage: errors.errorMessage?.trim(),
      }));
      console.log(400, errors.errorMessage);
      const { message, theme } = CallToast(400, errors.errorMessage);
      setResponseToast({
        message,
        theme,
        showToast: true,
      });
      setTimeout(() => {
        setResponseToast((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
      return;
    }
    const createAgreementApi = `${process.env.REACT_APP_API_URL}admin/am3/campaign_agreement/new`;
    const config = {
      headers,
    };

    try {
      const { data } = await axios.post(
        createAgreementApi,
        updatedAgreementFormData,
        config
      );
      navigate(-1);
    } catch (error: any) {
      const { status, data } = error.response;
      const { message, theme } = CallToast(status, data.message);

      setResponseToast({
        message,
        theme,
        showToast: true,
      });

      setTimeout(() => {
        setResponseToast((prev) => ({
          ...prev,
          showToast: false,
        }));
      }, 5000);
    }
  };

  return (
    <>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            {agreementFormData ? (
              <Fragment>
                {responseToast.showToast ? (
                  <ToastNotification
                    message={responseToast.message}
                    theme={responseToast.theme}
                  />
                ) : (
                  ""
                )}
                <div className="flex justify-center items-center text-xs md:text-sm lg:text-base  ">
                  <div className="md:w-8/12 w-full border-2 p-2 rounded-md text-sm">
                    <div className="full flex">
                      <div className="w-1/2">
                        <img src={logo} alt="" className="h-20 w-20 " />
                      </div>
                      <div className="w-1/2">
                        <h1 className="text-center text-[1.5em] font-bold my-2">
                          Campaign Agreement
                        </h1>
                      </div>
                    </div>
                    <p className="mb-2">
                      This Influencer Marketing Agreement (the "Agreement") is
                      entered into as of Today, by and between:
                    </p>
                    <h1 className="font-semibold text-lg mb-2">Parties:</h1>
                    <div className="w-full px-4">
                      <div className="flex justify-between">
                        <div className="w-1/2 p-1">
                          <h1 className="font-semibold text-lg mb-3">
                            Influencer
                          </h1>
                          <p>
                            influencer Social media name{" "}
                            <span className="text-red-500">Pending</span>
                          </p>
                          <p>
                            {`${agreementFormData.collaboration.influencer.addresses.landmark}, ${agreementFormData.collaboration.influencer.addresses.city}, ${agreementFormData.collaboration.influencer.addresses.state}, ${agreementFormData.collaboration.influencer.addresses.pin_code}`}
                          </p>
                          <p>
                            {
                              agreementFormData.collaboration.influencer.user
                                .email
                            }
                          </p>
                          <p>{`${agreementFormData.collaboration.influencer.user.first_name} ${agreementFormData.collaboration.influencer.user.last_name}`}</p>
                        </div>
                        <div className="w-1/2 text-right p-1">
                          <h1 className="font-semibold text-lg mb-3">
                            Marketer
                          </h1>
                          <p>{agreementFormData.marketer.brand_name}</p>
                          <p>{agreementFormData.marketer.marketer_address}</p>
                          <p> {agreementFormData.marketer.marketer_email}</p>
                          <p> {agreementFormData.marketer.marketer_name}</p>
                        </div>
                      </div>
                    </div>
                    <h1 className="font-semibold text-lg mb-2">2. Purpose</h1>
                    <div className="w-full px-3 mb-3">
                      <p>
                        <span className="font-semibold">2.1</span> The purpose
                        of this Agreement is to outline the terms and conditions
                        under which the Influencer will promote the Marketer’s
                        products/services through social media channels as part
                        of an influencer marketing campaign.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-3">
                        3. Campaign Details
                      </h1>
                      <p className="w-full px-3 mb-3">
                        <span className="font-semibold pr-1">
                          3.1 Campaign Description:
                        </span>
                        {agreementFormData.campaign_description}
                      </p>
                      <p className="w-full px-3">
                        Add Specific Description for Influencer
                      </p>
                      <textarea
                        rows={3}
                        name="campaign_description"
                        onChange={handleChangeTextArea}
                        className="w-full border-2 border-ri-blue p-2  rounded-md focus:outline-ri-orange mb-3 resize-none"
                        value={updatedAgreementFormData.campaign_description}
                      />

                      <p className="w-full px-3 mb-3">
                        <span className="font-semibold pr-1">
                          3.2 Deliverables:{" "}
                        </span>
                        The Influencer agrees to create and post the following
                        content:
                      </p>
                      <table className="table-auto w-full text-center border-collapse mb-3">
                        <thead>
                          <tr>
                            <th className="border px-4 py-2">Deliverable</th>
                            <th className="border px-4 py-2">
                              Deliverable Count
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(
                            agreementFormData.instagram_deliverables
                          ).map(([key, value]) => {
                            const formattedKey = _.startCase(key);
                            return (
                              <tr key={key}>
                                <td className="border px-4 py-2 font-semibold">
                                  {formattedKey}
                                </td>
                                <td className="border px-4 py-2">{value}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>

                      <div>
                        <h1 className="font-semibold text-base mb-1">
                          Instagram Deliverables
                        </h1>
                        <div className="w-full">
                          <table className="table-auto text-center md:text-base text-xs border mb-3">
                            <thead>
                              <tr className="text-sm w-full">
                                <th className="w-2/12 border">
                                  Deliverable Name
                                </th>
                                <th className="w-2/12 border p-2">
                                  Media Type
                                </th>
                                <th className="w-5/12 border p-2">
                                  Deliverable Descriptions
                                </th>
                                <th className="w-1/12 border p-2">Amount</th>
                                <th className="w-1/12 border p-2">
                                  Content verify date
                                </th>
                                <th className="w-1/12 border p-2">
                                  content upload date
                                </th>
                              </tr>
                            </thead>
                            <tbody className="">
                              {agreementFormData.ig_deliverables.map(
                                (deliverable, index) => (
                                  <tr
                                    key={index}
                                    className="text-xs sm:text-base">
                                    <td className="border p-2">
                                      {deliverable.deliverable_name}
                                    </td>
                                    <td className="border p-2">
                                      {deliverable.media_type}
                                    </td>
                                    <td className="border p-2">
                                      {deliverable.deliverable_descriptions}
                                    </td>
                                    <td className="border">
                                      <input
                                        type="text"
                                        placeholder="price"
                                        name=""
                                        onChange={(e) => {
                                          const inputValue = e.target.value;
                                          if (/^\d*\.?\d*$/.test(inputValue)) {
                                            const numericValue =
                                              parseFloat(inputValue) || 0;
                                            handleChangeDeliverablePrice(
                                              numericValue,
                                              index
                                            );
                                          }
                                        }}
                                        className="w-full border-2  border-ri-blue p-2 rounded-md focus:outline-ri-orange mb-3"
                                        value={
                                          updatedAgreementFormData
                                            .collab_pricing[index].amount
                                        }
                                      />
                                    </td>
                                    <td className="border ">
                                      <p className="text-xs mb-3">
                                        {formateIsoToDate(
                                          updatedAgreementFormData
                                            .collab_pricing[index]
                                            .content_verify_before
                                        )}
                                      </p>
                                      <div className="relative">
                                        <input
                                          ref={(el) =>
                                            (dateInputRefs.current.content_verify_before =
                                              el)
                                          }
                                          type="date"
                                          placeholder="content_verify_before"
                                          name="content_verify_before"
                                          onFocus={() =>
                                            handleFocusDates(
                                              "content_verify_before"
                                            )
                                          }
                                          onBlur={handleBlurDates}
                                          onChange={(e) => {
                                            const { name, value } = e.target;
                                            handleChangeDeliverableDeliverableDate(
                                              name,
                                              value,
                                              index
                                            );
                                          }}
                                          className="w-10  absolute inset-0 opacity-0  cursor-pointer"
                                          value={formateIsoToDate(
                                            updatedAgreementFormData
                                              .collab_pricing[index]
                                              .content_verify_before
                                          )}
                                        />
                                        <div
                                          className={`flex items-center justify-center cursor-pointer border-2 rounded-lg mx-2 border-ri-blue ${
                                            dateActiveInput ===
                                            "content_verify_before"
                                              ? " border-ri-orange"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            handleOpenCalender(
                                              "content_verify_before"
                                            )
                                          }>
                                          <i className="fa-solid fa-calendar-days cursor-pointer py-2"></i>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="border">
                                      <p className="text-xs mb-3">
                                        {formateIsoToDate(
                                          updatedAgreementFormData
                                            .collab_pricing[index]
                                            .content_upload_date
                                        )}
                                      </p>
                                      <div className="relative">
                                        <input
                                          ref={(el) =>
                                            (dateInputRefs.current.content_upload_date =
                                              el)
                                          }
                                          type="date"
                                          placeholder="content_upload_date"
                                          name="content_upload_date"
                                          onFocus={() =>
                                            handleFocusDates(
                                              "content_upload_date"
                                            )
                                          }
                                          onBlur={handleBlurDates}
                                          onChange={(e) => {
                                            const { name, value } = e.target;
                                            handleChangeDeliverableDeliverableDate(
                                              name,
                                              value,
                                              index
                                            );
                                          }}
                                          className="w-10 absolute inset-0 opacity-0  cursor-pointer"
                                          value={formateIsoToDate(
                                            updatedAgreementFormData
                                              .collab_pricing[index]
                                              .content_upload_date
                                          )}
                                        />
                                        <div
                                          className={`flex items-center justify-center cursor-pointer border-2 rounded-lg mx-2 border-ri-blue ${
                                            dateActiveInput ===
                                            "content_upload_date"
                                              ? " border-ri-orange"
                                              : ""
                                          }`}
                                          onClick={() =>
                                            handleOpenCalender(
                                              "content_upload_date"
                                            )
                                          }>
                                          <i className="fa-solid fa-calendar-days cursor-pointer py-2"></i>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}

                              <tr className="border-2 p-2">
                                <td className="font-bold p-2" colSpan={3}>
                                  Total:
                                </td>
                                <td className="p-2 border">
                                  <p className="font-bold">₹</p>
                                  {
                                    updatedAgreementFormData.collab_pricing[0]
                                      .amount
                                  }
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <h1 className="font-semibold text-lg mb-3">4. Payment</h1>
                    <div className="w-full px-3 mb-3">
                      <p className="mb-2">
                        <span className="font-semibold">4.1 Payment:</span>{" "}
                        {`The
                  Marketer agrees to pay the Influencer ${amountPaymentDetails.totalAmount} for the
                  deliverables outlined in Section.`}
                        <span className="font-bold">3.2.</span> Payment will be
                        made as follows:
                      </p>
                      <p className="mb-3">
                        Payment Schedule, e.g., 50% upfront, 50% upon completion
                      </p>
                      <p>
                        <span className="font-semibold">4.2. Expenses: </span>
                        The Marketer will cover the following expenses related
                        to the campaign: [List any covered expenses, e.g.,
                        travel, production costs].
                      </p>
                    </div>
                    <h1 className="font-semibold text-lg mb-2 ">
                      5. Content Requirement
                    </h1>
                    <div className="w-full px-3">
                      <p className="font-semibold">5.1 Brand Guidelines:</p>
                      <div className="h-32">
                        <textarea
                          rows={4}
                          name="brandGuideline"
                          onChange={handleChangeTextArea}
                          className="w-full border-2 border-ri-blue p-2  rounded-md focus:outline-ri-orange mb-3 resize-none"
                          value={updatedAgreementFormData.brandGuideline}
                        />
                      </div>
                      <p className=" font-semibold">5.2 Disclosure:</p>
                      <p className="mb-2">
                        The Influencer agrees to disclose the partnership in
                        accordance with The Indian Partnership Act, 1932 by
                        including [e.g., “Paid Partnership” or “Sponsored by{" "}
                        <span className="font-bold">
                          {agreementFormData.marketer.brand_name}{" "}
                        </span>
                        ”] in each post.
                      </p>
                      <p className="font-semibold">5.3 Approval:</p>
                      <p className="mb-2">
                        The Marketer has the right to review and approve the
                        content before it is posted. The Influencer agrees to
                        provide content drafts [Number of days] days before the
                        scheduled posting date.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-2">
                        6. Intellectual Property
                      </h1>
                      <p className="font-semibold px-3">6.1 Ownership:</p>
                      <p className="px-3 mb-2">
                        {" "}
                        The Influencer grants the Marketer a non-exclusive,
                        royalty-free license to use, reproduce, and distribute
                        the content created for this campaign for a period of
                        <input
                          type="text"
                          name="ownership_duration"
                          className="border-2 border-ri-blue px-2 w-16 mx-2 rounded-md focus:outline-ri-orange text-xs text-center font-bold"
                          placeholder="Months"
                          onChange={handleChange}
                          value={updatedAgreementFormData.ownership_duration}
                        />
                        <span className="font-bold">/ Months</span> from the
                        date of posting.
                      </p>
                      <p className="font-semibold px-3 mb-2">6.2 Rights:</p>
                      <p className="px-3">
                        The Influencer retains ownership of the original content
                        but agrees to grant the Marketer the right to use the
                        content for promotional purposes.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-2">
                        7. Confidentiality
                      </h1>
                      <p className="px-3 font-semibold">
                        7.1 Confidential Information:
                      </p>
                      <p className="px-3">
                        The Influencer agrees to keep confidential any
                        non-public information related to the Marketer’s
                        products, services, or business strategies disclosed
                        during the course of this Agreement.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-3">
                        8. Term and Termination
                      </h1>
                      <p className="px-3 font-semibold">8.1 Term:</p>
                      <p className="px-3 mb-2">
                        This Agreement will commence on the Effective Date and
                        will continue until{" "}
                        <input
                          type="date"
                          name="agreement_end"
                          onChange={handleChange}
                          className="border-2 border-ri-blue px-2 mx-1 rounded-md focus:outline-ri-orange text-xs text-center font-bold"
                          value={formateIsoToDate(
                            updatedAgreementFormData.agreement_end
                          )}
                        />
                        , unless terminated earlier in accordance with Section
                        8.2.
                      </p>
                      <p className="px-3font-semibold"> 8.2 Termination:</p>
                      <p className="px-3 mb-2 ">
                        {" "}
                        Either party may terminate this Agreement with{" "}
                        <input
                          type="text"
                          name="termination_days"
                          value={updatedAgreementFormData.termination_days}
                          onChange={handleChange}
                          className="border-2 w-16 border-ri-blue px-2 mx-2 rounded-md focus:outline-ri-orange text-xs text-center font-bold"
                        />{" "}
                        days' written notice. In the event of termination, the
                        Marketer will pay for all completed deliverables up to
                        the termination date.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-3">
                        9. Representations and Warranties
                      </h1>
                      <p className="font-semibold px-3 ">
                        9.1 Influencer Representations:
                      </p>
                      <p className="px-3 mb-2">
                        The Influencer represents and warrants that they have
                        the authority to enter into this Agreement and that the
                        content will not infringe upon the intellectual property
                        rights of any third party.
                      </p>

                      <p className="px-3 font-semibold">
                        9.2 Marketer Representations:
                      </p>
                      <p className="px-3 mb-2">
                        The Marketer represents and warrants that they have the
                        authority to enter into this Agreement and that all
                        information provided to the Influencer is accurate and
                        complete.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-3">
                        10. Indemnification
                      </h1>
                      <p className="px-3 font-semibold">
                        10.1 Indemnification by Influencer:{" "}
                      </p>
                      <p className="px-3 mb-2">
                        {" "}
                        The Influencer agrees to indemnify and hold harmless the
                        Marketer from any claims, damages, liabilities, or
                        expenses arising from the Influencer’s breach of this
                        Agreement or the content created.
                      </p>
                      <p className="px-3 font-semibold">
                        10.2 Indemnification by Marketer:
                      </p>
                      <p className="px-3 mb-2">
                        The Marketer agrees to indemnify and hold harmless the
                        Influencer from any claims, damages, liabilities, or
                        expenses arising from the Marketer’s breach of this
                        Agreement.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-3">
                        11. Governing Law
                      </h1>
                      <p className="px-3 font-semibold"> 11.1 Jurisdiction: </p>
                      <p className="px-3 mb-2">
                        This Agreement will be governed by and construed in
                        accordance with the laws of the State of
                        <span className="font-bold">{" Rajasthan"}</span>,
                        without regard to its conflict of law principles.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-3">
                        12. Dispute Resolution
                      </h1>
                      <p className="px-3 font-semibold ">12.1 Arbitration: </p>
                      <p className="px-3 mb-2">
                        {" "}
                        Any disputes arising under this Agreement will be
                        resolved through binding arbitration in{" "}
                        <span className="font-bold">{` Bikaner, Rajasthan `}</span>
                        , in accordance with the rules of the Indian Council Of
                        Arbitration.
                      </p>
                    </div>
                    <div className="w-full">
                      <h1 className="font-semibold text-lg mb-3">
                        13. Miscellaneous
                      </h1>
                      <p className="px-3 font-semibold">
                        13.1 Entire Agreement:{" "}
                      </p>
                      <p className="px-3 mb-2">
                        This Agreement constitutes the entire agreement between
                        the parties and supersedes all prior agreements and
                        understandings.
                      </p>
                      <p className="px-3 font-semibold">13.2 Amendments:</p>
                      <p className="px-3 mb-2">
                        Any amendments or modifications to this Agreement must
                        be made in writing and signed by both parties.
                      </p>
                      <p className="px-3 font-semibold"> 13.3 Severability: </p>
                      <p className="px-3 mb-2">
                        If any provision of this Agreement is found to be
                        invalid or unenforceable, the remaining provisions will
                        continue in full force and effect.
                      </p>
                      <p className="px-3 font-semibold"> 13.4 Assignment: </p>

                      <p className="px-3 mb-2">
                        The Influencer may not assign this Agreement without the
                        Marketer’s prior written consent. The Marketer may
                        assign this Agreement to a successor in interest.
                      </p>
                    </div>
                    <div className="w-full">
                      <h3 className="mt-2">
                        IN WITNESS WHEREOF, the parties have executed this
                        Agreement as of the Effective Date.
                      </h3>
                      <div className="flex justify-between mt-4">
                        {" "}
                        <div className="w-1/2">
                          <h2 className="font-bold mb-3">Influencer</h2>

                          <p>
                            Name:{" "}
                            <span className="font-bold text-red-500">
                              Pending
                            </span>
                          </p>
                          <p>
                            Date: <span className="font-bold">19-09-2024</span>
                          </p>
                        </div>
                        <div className="w-1/2 ">
                          <h2 className="font-bold mb-3">Marketer</h2>

                          <p>
                            Name:{" "}
                            <span className="font-bold">
                              {agreementFormData.marketer.brand_name}
                            </span>
                          </p>
                          <p>
                            Designation:{" "}
                            <span className="font-bold">
                              {agreementFormData.marketer.marketer_designation}
                            </span>
                          </p>
                          <p>
                            Date:<span className="font-bold">19-09-2024</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="justify-center items-center flex my-3">
                  <button
                    onClick={uploadFormAgreementData}
                    className="border-1 px-3 py-2 bg-ri-blue text-ri-white uppercase rounded-md">
                    create Agreement and send
                  </button>
                </div>
              </Fragment>
            ) : (
              <>
                <div className="flex items-center justify-center h-[80vh] font-semibold text-xl">
                  <i className="fa-solid fa-link-slash fa-beat-fade mx-3 text-3xl"></i>
                  <h1 className="text-center">Something Went Wrong !</h1>
                </div>
              </>
            )}
          </Fragment>
        )}
      </Fragment>
    </>
  );
};

export default AgreementForm;
