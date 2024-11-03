import React, { Fragment, useEffect, useRef, useState } from "react";
import _ from "lodash";

import logo from "../../../../assets/images/new/QG-logo1.png";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../utils/selectors/user.selectors";
import axios from "axios";
import { ResponseToast } from "../../../../marketer/components/campaigns/campaignCardsView/campaignCards.component";

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

interface CollabPricingInterface {
  id: number;
  amount: number;
  content_verify_before: string;
  content_upload_date: string;
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

const AgreementForm: React.FC<AgreementFormParams> = ({
  campaign_id,
  influencer_id,
}) => {
  const [responseToast, setResponseToast] = useState<ResponseToast>({
    message: "",
    theme: "",
    showToast: false,
  });

  const [agreementFormData, setAgreementFormData] =
    useState<agreementDetailsInterface | null>(null);
  const [campaignId, setCampaignId] = useState(1);
  const [influencerId, setInfluencerId] = useState(1);

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const headers = {
    authorization: `Bearer ${access_token}`,
  };

  const fetchAgreementData = async () => {
    const agreementDetailsApi = `${process.env.REACT_APP_API_URL}influencer_campaigns/campaign_agreement/${campaignId}`;
    const config = {
      headers,
    };
    try {
      const { data } = await axios.get(agreementDetailsApi, config);
      setAgreementFormData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAgreementData();
  }, []);

  const formatDateToISO = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString();
  };
  const formateIsoToDate = (dateString: string) => {
    if (dateString) {
      return dateString.split("T")[0];
    } else {
      return;
    }
  };

  return (
    <>
      <Fragment>
        {agreementFormData ? (
          <Fragment>
            <div className="flex justify-center items-center text-xs md:text-sm lg:text-base">
              <div className="md:w-8/12 w-full border-2 p-2 rounded-md text-sm">
                <div className="full flex">
                  <div className="w-1/2">
                    <img src={logo} alt="" className="h-20 w-20 " />
                  </div>
                  <div className="1/2">
                    <h1 className="text-center text-[1.5em] font-bold my-2">
                      Campaign Agreement
                    </h1>
                  </div>
                </div>
                <p className="mb-2">
                  This Influencer Marketing Agreement (the "Agreement") is
                  entered into as of Today, by and between:
                </p>{" "}
                <h1 className="font-semibold text-lg mb-2">Parties:</h1>
                <div className="w-full px-4">
                  <div className="flex justify-between">
                    <div className="w-1/2 p-1">
                      <h1 className="font-semibold text-lg mb-3">Influencer</h1>
                      <p>
                        influencer Social media name{" "}
                        <span className="text-red-500">Pending</span>
                      </p>
                      <p>
                        {`${agreementFormData.collaboration.influencer.addresses.landmark}, ${agreementFormData.collaboration.influencer.addresses.city}, ${agreementFormData.collaboration.influencer.addresses.state}, ${agreementFormData.collaboration.influencer.addresses.pin_code}`}
                      </p>
                      <p>
                        {agreementFormData.collaboration.influencer.user.email}
                      </p>
                      <p>{`${agreementFormData.collaboration.influencer.user.first_name} ${agreementFormData.collaboration.influencer.user.last_name}`}</p>
                    </div>
                    <div className="w-1/2 text-right p-1">
                      <h1 className="font-semibold text-lg mb-3">Marketer</h1>
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
                    <span className="font-semibold">2.1</span> The purpose of
                    this Agreement is to outline the terms and conditions under
                    which the Influencer will promote the Marketer’s
                    products/services through social media channels as part of
                    an influencer marketing campaign.
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
                    {
                      agreementFormData.collaboration.agreement
                        .campaign_description
                    }
                  </p>
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
                        <th className="border px-4 py-2">Deliverable Count</th>
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
                            <th className="w-2/12 border">Deliverable Name</th>
                            <th className="w-2/12 border p-2">Media Type</th>
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
                              <tr key={index} className="text-xs sm:text-base">
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
                                  <p className="w-full">
                                    {deliverable.collab_pricing.amount}
                                  </p>
                                </td>
                                <td className="border ">
                                  <p className="text-xs mb-3">
                                    {formateIsoToDate(
                                      deliverable.collab_pricing
                                        .content_verify_before
                                    )}
                                  </p>
                                </td>
                                <td className="border">
                                  <p className="text-xs mb-3">
                                    {formateIsoToDate(
                                      deliverable.collab_pricing
                                        .content_upload_date
                                    )}
                                  </p>
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
                              {/* {
                                updatedAgreementFormData.collab_pricing[0]
                                  .amount
                              } */}
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
                  Marketer agrees to pay the Influencer
                  {amountPaymentDetails.totalAmount} for the
                  deliverables outlined in Section.`}
                    <span className="font-bold">3.2.</span> Payment will be made
                    as follows:
                  </p>
                  <p className="mb-3">
                    Payment Schedule, e.g., 50% upfront, 50% upon completion
                  </p>
                  <p>
                    <span className="font-semibold">4.2. Expenses: </span>
                    The Marketer will cover the following expenses related to
                    the campaign: [List any covered expenses, e.g., travel,
                    production costs].
                  </p>
                </div>
                <h1 className="font-semibold text-lg mb-2 ">
                  5. Content Requirement
                </h1>
                <div className="w-full px-3">
                  <p className="font-semibold">5.1 Brand Guidelines:</p>
                  <p className="mb-2">
                    {agreementFormData.collaboration.agreement.brandGuideline}
                  </p>
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
                    The Marketer has the right to review and approve the content
                    before it is posted. The Influencer agrees to provide
                    content drafts 1 to 5 days before the scheduled posting
                    date.
                  </p>
                </div>
                <div className="w-full">
                  <h1 className="font-semibold text-lg mb-2">
                    6. Intellectual Property
                  </h1>
                  <p className="font-semibold px-3">6.1 Ownership:</p>
                  <p className="px-3 mb-2">
                    The Influencer grants the Marketer a non-exclusive,
                    royalty-free license to use, reproduce, and distribute the
                    content created for this campaign for a period of
                    {/* <input
                      type="text"
                      name="ownership_duration"
                      className="border-2 border-ri-blue px-2 w-16 mx-2 rounded-md focus:outline-ri-orange text-xs text-center font-bold"
                      placeholder="Months"
                      // onChange={handleChange}
                      // value={updatedAgreementFormData.ownership_duration}
                    /> */}
                    <span className="font-bold">
                      {
                        agreementFormData.collaboration.agreement
                          .ownership_duration
                      }
                    </span>
                    <span className="font-bold">/ Months</span> from the date of
                    posting.
                  </p>
                  <p className="font-semibold px-3 mb-2">6.2 Rights:</p>
                  <p className="px-3">
                    The Influencer retains ownership of the original content but
                    agrees to grant the Marketer the right to use the content
                    for promotional purposes.
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
                    The Influencer agrees to keep confidential any non-public
                    information related to the Marketer’s products, services, or
                    business strategies disclosed during the course of this
                    Agreement.
                  </p>
                </div>
                <div className="w-full">
                  <h1 className="font-semibold text-lg mb-3">
                    8. Term and Termination
                  </h1>
                  <p className="px-3 font-semibold">8.1 Term:</p>
                  <p className="px-3 mb-2">
                    This Agreement will commence on the Effective Date and will
                    continue until{" "}
                    <span className="font-semibold">
                      {agreementFormData.collaboration.agreement.agreement_end}
                    </span>{" "}
                    , unless terminated earlier in accordance with Section 8.2.
                  </p>
                  <p className="px-3font-semibold"> 8.2 Termination:</p>
                  <p className="px-3 mb-2 ">
                    {" "}
                    Either party may terminate this Agreement with{" "}
                    <input
                      type="text"
                      name="termination_days"
                      // value={updatedAgreementFormData.termination_days}
                      // onChange={handleChange}
                      className="border-2 w-16 border-ri-blue px-2 mx-2 rounded-md focus:outline-ri-orange text-xs text-center font-bold"
                    />{" "}
                    <span className="font-bold">
                      {
                        agreementFormData.collaboration.agreement
                          .termination_days
                      }
                    </span>
                    days' written notice. In the event of termination, the
                    Marketer will pay for all completed deliverables up to the
                    termination date.
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
                    The Influencer represents and warrants that they have the
                    authority to enter into this Agreement and that the content
                    will not infringe upon the intellectual property rights of
                    any third party.
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
                    Marketer from any claims, damages, liabilities, or expenses
                    arising from the Influencer’s breach of this Agreement or
                    the content created.
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
                    <span className="font-bold">{" Rajasthan"}</span>, without
                    regard to its conflict of law principles.
                  </p>
                </div>
                <div className="w-full">
                  <h1 className="font-semibold text-lg mb-3">
                    12. Dispute Resolution
                  </h1>
                  <p className="px-3 font-semibold ">12.1 Arbitration: </p>
                  <p className="px-3 mb-2">
                    {" "}
                    Any disputes arising under this Agreement will be resolved
                    through binding arbitration in{" "}
                    <span className="font-bold">{` Bikaner, Rajasthan `}</span>,
                    in accordance with the rules of the Indian Council Of
                    Arbitration.
                  </p>
                </div>
                <div className="w-full">
                  <h1 className="font-semibold text-lg mb-3">
                    13. Miscellaneous
                  </h1>
                  <p className="px-3 font-semibold">13.1 Entire Agreement: </p>
                  <p className="px-3 mb-2">
                    This Agreement constitutes the entire agreement between the
                    parties and supersedes all prior agreements and
                    understandings.
                  </p>
                  <p className="px-3 font-semibold">13.2 Amendments:</p>
                  <p className="px-3 mb-2">
                    Any amendments or modifications to this Agreement must be
                    made in writing and signed by both parties.
                  </p>
                  <p className="px-3 font-semibold"> 13.3 Severability: </p>
                  <p className="px-3 mb-2">
                    If any provision of this Agreement is found to be invalid or
                    unenforceable, the remaining provisions will continue in
                    full force and effect.
                  </p>
                  <p className="px-3 font-semibold"> 13.4 Assignment: </p>

                  <p className="px-3 mb-2">
                    The Influencer may not assign this Agreement without the
                    Marketer’s prior written consent. The Marketer may assign
                    this Agreement to a successor in interest.
                  </p>
                </div>
                <div className="w-full">
                  <h3 className="mt-2">
                    IN WITNESS WHEREOF, the parties have executed this Agreement
                    as of the Effective Date.
                  </h3>
                  <div className="flex justify-between mt-4">
                    {" "}
                    <div className="w-1/2">
                      <h2 className="font-bold mb-3">Influencer</h2>
                      {/* <p>Signature:___________</p> */}
                      <p>
                        Name:{" "}
                        <span className="font-bold text-red-500">Pending</span>
                      </p>
                      <p>
                        Date: <span className="font-bold">19-09-2024</span>
                      </p>
                    </div>
                    <div className="w-1/2 ">
                      <h2 className="font-bold mb-3">Marketer</h2>
                      {/* <p>Signature: <span></span></p> */}
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
            <div className="justify-center items-center ">
              <button>I accept </button>
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
    </>
  );
};

export default AgreementForm;
