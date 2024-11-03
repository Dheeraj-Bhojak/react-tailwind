import _ from "lodash";
import React, { Fragment, useState } from "react";
import logo from "../../../assets/images/new/QG-logo1.png";

const InfluencerAgreement = () => {
  const instagramDeliverables = {
    reels: 0,
    story_with_link: 0,
    video_post: 0,
    static_post: 1,
  };

  const ig_deliverables = [
    {
      id: 24,
      media_type: "post",
      deliverable_name: "Post a Image",
      deliverable_descriptions:
        "create A Post and upload on instagram with caption 'Kalyan Bhav' and use HashTag #KALYANJWELLERS",
      price: {
        amount: 3200,
      },
    },
  ];

  const influencer = {
    influencer_name: "Dheeraj Bhojak",
    influencer_address: "OutSide Of beniser bari nath sagar",
    influencer_email: "dev@dev.com",
    influencer_socialMedia: "BKN_JB",
    marketer_name: "Rajesh Bhojak",
    marketer_address: "Jaipur, rajasthan 334002",
    marketer_email: "dev@marketer.com",
    marketer_company_name: "Dark bears",
  };
  const vadd = `
  <h1>INFLUENCER MARKETING AGREEMENT</h1>
  
  <p>This Influencer Marketing Agreement (the "Agreement") is entered into as of [Date] (the "Effective Date"), by and between:</p>
  
  <h2>1. Parties</h2>
  <p><strong>1.1 Influencer:</strong> ${influencer.influencer_name}<br>
  Address: ${influencer.influencer_address}<br>
  Email: ${influencer.influencer_email}<br>
  Social Media Handles: ${influencer.influencer_socialMedia}</p>
  
  <p><strong>1.2 Marketer:</strong> ${influencer.marketer_name}<br>
  Address: ${influencer.marketer_address}<br>
  Email: ${influencer.marketer_email}<br>
  Contact Person: ${influencer.marketer_company_name}</p>
  
  <h2>2. Purpose</h2>
  <p>The purpose of this Agreement is to outline the terms and conditions under which the Influencer will promote the Marketer’s products/services through social media channels as part of an influencer marketing campaign.</p>
  
  <h2>3. Campaign Details</h2>
  <p><strong>3.1 Campaign Description:</strong> The campaign involves [Brief Description of the Campaign, e.g., promoting a new product launch].</p>
  <p><strong>3.2 Deliverables:</strong> The Influencer agrees to create and post the following content:<br>
  - [Number] of Instagram posts<br>
  - [Number] of Instagram Stories<br>
  - [Number] of YouTube videos<br>
  - [Number] of blog posts<br>
  Any other content specified [Describe any additional deliverables].</p>
  
  <p><strong>3.3 Content Schedule:</strong> The Influencer agrees to post content according to the following schedule:<br>
  [Date and Time for Each Post/Story/Video/Blog Post].</p>
  
  <h2>4. Compensation</h2>
  <p><strong>4.1 Payment:</strong> The Marketer agrees to pay the Influencer [Total Amount] for the deliverables outlined in Section 3.2. Payment will be made as follows:<br>
  [Payment Schedule, e.g., 50% upfront, 50% upon completion].</p>
  
  <p><strong>4.2 Expenses:</strong> The Marketer will cover the following expenses related to the campaign: [List any covered expenses, e.g., travel, production costs].</p>
  
  <h2>5. Content Requirements</h2>
  <p><strong>5.1 Brand Guidelines:</strong> The Influencer agrees to adhere to the brand guidelines provided by the Marketer, which include [List any specific guidelines, e.g., use of hashtags, logos, specific messaging].</p>
  <p><strong>5.2 Disclosure:</strong> The Influencer agrees to disclose the partnership in accordance with The Indian Partnership Act, 1932 by including [e.g., “Paid Partnership” or “Sponsored by [Marketer’s Company Name]”] in each post.</p>
  <p><strong>5.3 Approval:</strong> The Marketer has the right to review and approve the content before it is posted. The Influencer agrees to provide content drafts [Number of days] days before the scheduled posting date.</p>
  
  <h2>6. Intellectual Property</h2>
  <p><strong>6.1 Ownership:</strong> The Influencer grants the Marketer a non-exclusive, royalty-free license to use, reproduce, and distribute the content created for this campaign for a period of [Number of months/years] from the date of posting.</p>
  <p><strong>6.2 Rights:</strong> The Influencer retains ownership of the original content but agrees to grant the Marketer the right to use the content for promotional purposes.</p>
  
  <h2>7. Confidentiality</h2>
  <p><strong>7.1 Confidential Information:</strong> The Influencer agrees to keep confidential any non-public information related to the Marketer’s products, services, or business strategies disclosed during the course of this Agreement.</p>
  
  <h2>8. Term and Termination</h2>
  <p><strong>8.1 Term:</strong> This Agreement will commence on the Effective Date and will continue until [End Date], unless terminated earlier in accordance with Section 8.2.</p>
  <p><strong>8.2 Termination:</strong> Either party may terminate this Agreement with [Number of days] days' written notice. In the event of termination, the Marketer will pay for all completed deliverables up to the termination date.</p>
  
  <h2>9. Representations and Warranties</h2>
  <p><strong>9.1 Influencer Representations:</strong> The Influencer represents and warrants that they have the authority to enter into this Agreement and that the content will not infringe upon the intellectual property rights of any third party.</p>
  <p><strong>9.2 Marketer Representations:</strong> The Marketer represents and warrants that they have the authority to enter into this Agreement and that all information provided to the Influencer is accurate and complete.</p>
  
  <h2>10. Indemnification</h2>
  <p><strong>10.1 Indemnification by Influencer:</strong> The Influencer agrees to indemnify and hold harmless the Marketer from any claims, damages, liabilities, or expenses arising from the Influencer’s breach of this Agreement or the content created.</p>
  <p><strong>10.2 Indemnification by Marketer:</strong> The Marketer agrees to indemnify and hold harmless the Influencer from any claims, damages, liabilities, or expenses arising from the Marketer’s breach of this Agreement.</p>
  
  <h2>11. Governing Law</h2>
  <p><strong>11.1 Jurisdiction:</strong> This Agreement will be governed by and construed in accordance with the laws of the State of [State], without regard to its conflict of law principles.</p>
  
  <h2>12. Dispute Resolution</h2>
  <p><strong>12.1 Arbitration:</strong> Any disputes arising under this Agreement will be resolved through binding arbitration in [City, State], in accordance with the rules of the Indian Council Of Arbitration.</p>
  
  <h2>13. Miscellaneous</h2>
  <p><strong>13.1 Entire Agreement:</strong> This Agreement constitutes the entire agreement between the parties and supersedes all prior agreements and understandings.</p>
  <p><strong>13.2 Amendments:</strong> Any amendments or modifications to this Agreement must be made in writing and agreed by both parties.</p>
  <p><strong>13.3 Severability:</strong> If any provision of this Agreement is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.</p>
  <p><strong>13.4 Assignment:</strong> The Influencer may not assign this Agreement without the Marketer’s prior written consent. The Marketer may assign this Agreement to a successor in interest.</p>
  
  <p><strong>IN WITNESS WHEREOF</strong>, the parties have executed this Agreement as of the Effective Date.</p>
  
  <p><strong>Influencer</strong><br>
  Signature: _________<br>
  Name: [Influencer’s Full Name]<br>
  Date: _________</p>
  
  <p><strong>Marketer</strong><br>
  Signature: _________<br>
  Name: [Marketer’s Authorized Representative]<br>
  Title: [Title]<br>
  Date: _________</p>

`;
  return (
    <Fragment>
      <div className="flex justify-center items-center text-xs md:text-sm lg:text-base">
        <div className="w-1/2 ">
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
            This Influencer Marketing Agreement (the "Agreement") is entered
            into as of Today, by and between:
          </p>{" "}
          <h1 className="font-semibold text-lg mb-2">Parties:</h1>
          <div className="w-full px-4">
            <div className="flex justify-between ">
              <div className="w-1/2 ">
                <h1 className="font-semibold">Influencer</h1>
                <p>influencer Social media name</p>
                <p>influencer address</p>
                <p>influencer email</p>
                <p>influencer name</p>
              </div>
              <div className="w-1/2 text-right">
                <h1 className="font-semibold text-lg mb-3">Marketer</h1>
                <p>Company name</p>
                <p> marketer Address</p>
                <p> marketer Email</p>
                <p> marketer contact person</p>
              </div>
            </div>
          </div>
          <h1 className="font-semibold text-lg mb-2">2. Purpose</h1>
          <div className="w-full px-3 mb-3">
            <p>
              <span className="font-semibold">2.1</span> The purpose of this
              Agreement is to outline the terms and conditions under which the
              Influencer will promote the Marketer’s products/services through
              social media channels as part of an influencer marketing campaign.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-3">3. Campaign Details</h1>
            <p className="w-full px-3 mb-3">
              <span className="font-semibold pr-1">
                3.1 Campaign Description:
              </span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos,
              laborum adipisci. Laborum maiores magni iusto veniam recusandae
              consequuntur, quibusdam cupiditate repellendus ipsam? Iure, illo
              quidem?
            </p>

            <p className="w-full px-3 mb-3">
              <span className="font-semibold pr-1">3.2 Deliverables: </span>The
              Influencer agrees to create and post the following content:
            </p>
            <table className="table-auto w-full text-center border-collapse mb-3">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Deliverable</th>
                  <th className="border px-4 py-2">Deliverable Count</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(instagramDeliverables).map(([key, value]) => {
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
              <table className="table-auto w-full text-center border mb-3">
                <thead>
                  <tr className="text-sm sm:text-base">
                    <th className="w-3/12 border p-2">Deliverable Name</th>
                    <th className="w-2/12 border p-2">Media Type</th>
                    <th className="w-5/12 border p-2">
                      Deliverable Descriptions
                    </th>
                    <th className="w-2/12 border p-2">Amount</th>
                  </tr>
                </thead>
                <tbody className="">
                  {ig_deliverables.map((deliverable, index) => (
                    <tr key={index} className="text-xs sm:text-base">
                      <td className="border p-2">
                        {deliverable.deliverable_name}
                      </td>
                      <td className="border p-2">{deliverable.media_type}</td>
                      <td className="border p-2">
                        {deliverable.deliverable_descriptions}
                      </td>
                      <td className="border">
                        <input
                          type="text"
                          placeholder="price"
                          className="w-full p-2 border-1"
                          value={deliverable.price.amount}
                        />
                      </td>
                    </tr>
                  ))}

                  <tr className="border-2 p-2">
                    <td className="font-bold p-2" colSpan={3}>
                      Total:
                    </td>
                    <td className="p-2 border">₹ 3200</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>{" "}
          <h1 className="font-semibold text-lg mb-3">4. Payment</h1>
          <div className="w-full px-3 mb-3">
            <p className="mb-2">
              {" "}
              <span className="font-semibold">4.1 Payment:</span> The Marketer
              agrees to pay the Influencer [Total Amount] for the deliverables
              outlined in Section <span className="font-bold">3.2.</span>{" "}
              Payment will be made as follows:
            </p>
            <p className="mb-3">
              Payment Schedule, e.g., 50% upfront, 50% upon completion
            </p>
            <p>
              <span className="font-semibold">4.2. Expenses: </span>
              The Marketer will cover the following expenses related to the
              campaign: [List any covered expenses, e.g., travel, production
              costs].
            </p>
          </div>
          <h1 className="font-semibold text-lg mb-2 ">
            5. Content Requirement
          </h1>
          <div className="w-full px-3">
            <p className="mb-2">
              {" "}
              <span className="font-semibold">5.1 Brand Guidelines:</span>
              The Influencer agrees to adhere to the brand guidelines provided
              by the Marketer, which include [List any specific guidelines,
              e.g., use of hashtags, logos, specific messaging].
            </p>

            <p className="mb-2">
              <span className="font-semibold">5.2 Disclosure: </span>
              The Influencer agrees to disclose the partnership in accordance
              with The Indian Partnership Act, 1932 by including [e.g., “Paid
              Partnership” or “Sponsored by [Marketer’s Company Name]”] in each
              post.
            </p>

            <p className="mb-2">
              {" "}
              <span className="font-semibold">5.3 Approval:</span>
              The Marketer has the right to review and approve the content
              before it is posted. The Influencer agrees to provide content
              drafts [Number of days] days before the scheduled posting date.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-2">
              6. Intellectual Property
            </h1>
            <p className="px-3 mb-2">
              <span className="font-semibold">6.1 Ownership:</span>
              The Influencer grants the Marketer a non-exclusive, royalty-free
              license to use, reproduce, and distribute the content created for
              this campaign for a period of [Number of months/years] from the
              date of posting.
            </p>
            <p className="px-3 mb-2">
              <span className="font-semibold">6.2 Rights:</span>The Influencer
              retains ownership of the original content but agrees to grant the
              Marketer the right to use the content for promotional purposes.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-2">7. Confidentiality</h1>
            <p className="px-3 mb-2">
              <span className="font-semibold">
                7.1 Confidential Information:
              </span>
              The Influencer agrees to keep confidential any non-public
              information related to the Marketer’s products, services, or
              business strategies disclosed during the course of this Agreement.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-3">
              8. Term and Termination
            </h1>
            <p className="px-3 mb-2">
              <span className="font-semibold">8.1 Term:</span> This Agreement
              will commence on the Effective Date and will continue until [End
              Date], unless terminated earlier in accordance with Section 8.2.
            </p>
            <p className="px-3 mb-2">
              <span className="font-semibold">8.2 Termination:</span> Either
              party may terminate this Agreement with [Number of days] days'
              written notice. In the event of termination, the Marketer will pay
              for all completed deliverables up to the termination date.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-3">
              9. Representations and Warranties
            </h1>
            <p className="px-4 mb-2">
              <span className="font-semibold">
                9.1 Influencer Representations:
              </span>
              The Influencer represents and warrants that they have the
              authority to enter into this Agreement and that the content will
              not infringe upon the intellectual property rights of any third
              party.
            </p>
            <p className="px-4 mb-2">
              <span className="font-semibold">
                9.2 Marketer Representations:
              </span>{" "}
              The Marketer represents and warrants that they have the authority
              to enter into this Agreement and that all information provided to
              the Influencer is accurate and complete.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-3">10. Indemnification</h1>
            <p className="px-4 mb-2">
              <span className="font-semibold">
                10.1 Indemnification by Influencer:
              </span>
              The Influencer agrees to indemnify and hold harmless the Marketer
              from any claims, damages, liabilities, or expenses arising from
              the Influencer’s breach of this Agreement or the content created.
            </p>
            <p className="px-4 mb-2">
              <span className="font-semibold">
                10.2 Indemnification by Marketer:
              </span>
              The Marketer agrees to indemnify and hold harmless the Influencer
              from any claims, damages, liabilities, or expenses arising from
              the Marketer’s breach of this Agreement.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-3">11. Governing Law</h1>
            <p className="px-4 mb-2">
              <span className="font-semibold">11.1 Jurisdiction: </span>This
              Agreement will be governed by and construed in accordance with the
              laws of the State of [State], without regard to its conflict of
              law principles.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-3">
              12. Dispute Resolution
            </h1>
            <p className="px-4 mb-2">
              <span className="font-semibold">12.1 Arbitration:</span>Any
              disputes arising under this Agreement will be resolved through
              binding arbitration in [City, State], in accordance with the rules
              of the Indian Council Of Arbitration.
            </p>
          </div>
          <div className="w-full">
            <h1 className="font-semibold text-lg mb-3">13. Miscellaneous</h1>
            <p className="px-4 mb-2">
              <span className="font-semibold">13.1 Entire Agreement: </span>This
              Agreement constitutes the entire agreement between the parties and
              supersedes all prior agreements and understandings.
            </p>
            <p className="px-4 mb-2">
              <span className="font-semibold">13.2 Amendments:</span> Any
              amendments or modifications to this Agreement must be made in
              writing and signed by both parties.
            </p>
            <p className="px-4 mb-2">
              <span className="font-semibold">13.3 Severability:</span> If any
              provision of this Agreement is found to be invalid or
              unenforceable, the remaining provisions will continue in full
              force and effect.
            </p>
            <p className="px-4 mb-2">
              <span className="font-semibold">13.4 Assignment: </span>The
              Influencer may not assign this Agreement without the Marketer’s
              prior written consent. The Marketer may assign this Agreement to a
              successor in interest.
            </p>
          </div>
          <div className="w-full">
            <h3 className="mt-2">
              IN WITNESS WHEREOF, the parties have executed this Agreement as of
              the Effective Date.
            </h3>
            <div className="flex justify-between mt-4">
              {" "}
              <div className="w-1/2">
                <h2 className="font-bold mb-3">Influencer</h2>
                {/* <p>Signature:___________</p> */}
                <p>
                  Name: <span className="font-bold">CarryMinati</span>
                </p>
                <p>
                  Date: <span className="font-bold">10-09-2024</span>
                </p>
              </div>
              <div className="w-1/2 ">
                <h2 className="font-bold mb-3">Marketer</h2>
                {/* <p>Signature: <span></span></p> */}
                <p>
                  Name: <span className="font-bold"> Bikaji</span>
                </p>
                <p>
                  Designation: <span className="font-bold">CMO</span>
                </p>
                <p>
                  Date:<span className="font-bold">10-09-2024</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    // <Fragment>
    //   <div dangerouslySetInnerHTML={{ __html: vadd }}></div>
    // </Fragment>
  );
};
// div.w - full > h1 + p * 2 > span.font - semibold;
export default InfluencerAgreement;
