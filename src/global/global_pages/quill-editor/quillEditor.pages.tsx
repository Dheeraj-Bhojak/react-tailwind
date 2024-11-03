import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CustomEditor: React.FC = () => {
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

  const [content, setContent] = useState(`
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

`);

  console.log(content);
  // Define your 10 variables
  const variables = {
    var1: "John",
    var2: "Doe",
    var3: "Product",
    var4: "Price",
    var5: "Discount",
    var6: "City",
    var7: "State",
    var8: "Country",
    var9: "OrderNumber",
    var10: "Date",
  };

  // Function to insert variables into the editor
  const insertVariable = (varName: string) => {
    const quill = document.querySelector(".ql-editor");
    const currentContent = content || "";
    setContent(currentContent + `{{${varName}}}`);
  };

  return (
    <div>
      <div>
        {/* Buttons to insert variables */}
        {Object.keys(variables).map((key) => (
          <button key={key} onClick={() => insertVariable(key)}>
            Insert {key}
          </button>
        ))}
      </div>

      {/* React Quill Editor */}
      <ReactQuill
        value={content}
        onChange={setContent}
        theme="snow"
        className="h-[100vh]"
      />
    </div>
  );
};

export default CustomEditor;
