import React from "react";
import HeadingHeader from "../../global_component/headingHeader/headingHeader.componet";
const Privacy: React.FC = () => {
  const heading = {
    title: "Privacy Policy",
    timeStamp: "Last updated: Jul 28, 2020",
  };
  return (
    <div className="w-full bg-slate-100 pb-20 min-h-screen">
      <HeadingHeader Heading={heading} />
      <div className="w-6/12 flex flex-col justify-center items-center m-auto">
        <p className=" mt-20 text-lg text-gray-600">
          QikGro, Inc., along with any current or future affiliated or
          associated entities ("QikGro" or "we"), acknowledges the significance
          of safeguarding your privacy. This privacy policy outlines the details
          of the personal information we collect, how we utilize it, and the
          measures you can exercise over it. QikGro reserves the right to modify
          this privacy policy at its discretion, as elaborated in section 8
          below. By registering for an account with us ("Account") or by
          accessing and using any QikGro website, application, product,
          software, tool, data feed, and/or service (collectively referred to as
          the "Service"), you acknowledge and consent to the terms outlined in
          this policy. We strongly encourage you to carefully review this
          policy.
        </p>
        <ol className="text-2xl   mx-auto mt-10 list-decimal">
          <li className="font-bold">
            What Information Do We Collect?
            <ol className="text-xl  mx-auto mt-3 list-[lower-alpha]">
              <li className="font-bold">
                Personally-Identifiable Information:
              </li>
              <p className="text-lg mt-1 font-normal text-gray-600 mx-auto">
                We may gather personally identifiable information, which refers
                to information that can directly or indirectly identify an
                individual, when you voluntarily provide it to us. For instance,
                when you register or request a demo and provide personal details
                such as your email address, name, phone number, year of birth,
                or similar information. When applicable, personally identifiable
                information encompasses terms like "personal data," "personal
                information," and/or "sensitive personal information," as
                defined by relevant laws. We kindly request that you refrain
                from transmitting or disclosing any sensitive personal data
                (e.g., social security numbers, details related to racial or
                ethnic background, political beliefs, religion, health
                information, biometric data, criminal history, or membership in
                a trade union) through our Services or otherwise. Should you
                choose to send or disclose any sensitive personal data to us,
                you consent to our processing and utilization of such sensitive
                personal data in accordance with this policy.
              </p>
              <p className="text-lg mt-4 font-normal text-gray-600">
                This policy does not extend to the privacy practices of third
                parties that are beyond our ownership or control, including, but
                not limited to, third-party websites, services, applications, or
                online resources that may be accessible through or linked to the
                Service (collectively referred to as "Third Party Services" or
                "TPS"). For example, the Service integrates with the YouTube API
                Services as a TPS, and your use of YouTube content and services
                through the Service implies your agreement to be bound by the
                YouTube Terms of Service, Privacy Policy, and API Services Terms
                of Service. Additionally, our use of information obtained from
                Gmail APIs will comply with Google's Limited Use Requirements.
                We do not assume responsibility for the content or privacy
                practices of any TPS. We recommend that you carefully review the
                privacy policies of any TPS you access.
              </p>
              <p className="text-lg mt-4 font-normal text-gray-600">
                You may have the option to register an Account with us using a
                TPS, and you may link your Account to a TPS like Instagram,
                Facebook, Twitter, or YouTube. By granting us permission to
                access your TPS account, you allow us to retrieve specific
                information from your TPS account, which may include your name,
                email address, birthday, work history, education history,
                current city, shared media, and the names, profile pictures,
                relationship status, and current cities of your TPS contacts. We
                only access information from your TPS account for which you
                explicitly grant us permission. Our use of information obtained
                through Google Restricted Scopes, such as from Gmail APIs, will
                adhere to Google's Limited Use Requirements.
              </p>
              <p className="text-lg mt-4 font-normal text-gray-600">
                QikGro does not categorize personally identifiable information
                as including anonymized information that prevents third parties
                from identifying a specific individual or household. We collect
                and utilize your personally identifiable information to: deliver
                the Services; manage and enhance our Service; provide customer
                support; conduct research and analysis aimed at improving our
                products, Service, and technology; and display customized
                content that aligns with your preferences and interests.
              </p>

              <p className="text-lg mt-4 font-normal text-gray-600">
                You always have the option to decline providing personally
                identifiable information. However, if you choose to do so,
                certain portions of the Service may not be accessible to you. By
                registering an Account with us, you have consented to providing
                your personally identifiable information to access the Services.
                This consent serves as the legal basis required under applicable
                laws for us to process your data. You retain the right to
                withdraw this consent at any time. If you do not agree with our
                use of your personal data as outlined in this Policy, please
                refrain from using our Services.
              </p>
              <li className="font-bold mt-4">
                Non-Personally-Identifiable Information:
              </li>
              <p className="text-lg font-normal text-gray-600">
                We may gather and consolidate non-personally identifiable
                information, which refers to data that, on its own or when
                combined with other information accessible to third parties,
                cannot identify you. This data may encompass details such as the
                website that directed you to us, the types of hardware you use,
                your geographical location, log data, and the duration and times
                of your access. Additionally, we may collect navigational data,
                which includes information about the Service content or pages
                you peruse, the links you select, and other interactions related
                to the Service. We utilize this information to assess usage
                patterns and contribute to enhancements in the Service.
              </p>
              <li className="font-bold mt-4">
                Cookies, Pixels and Local Storage:
              </li>
              <p className="text-lg font-normal text-gray-600">
                {" "}
                We might obtain data through "cookies," which are tiny data
                files stored on your computer's or mobile device's hard drive by
                a website. We employ both session cookies (that expire when you
                close your web browser) and persistent cookies (that remain on
                your computer or mobile device until you remove them) to enhance
                your experience and make it more personalized and interactive
                while using the Services.
              </p>
              <ol className=" list-[lower-roman]">
                <li className="font-bold mt-4">Cookies we use</li>
                <p className="text-lg font-normal text-gray-600">
                  We use two primary categories of cookies:
                </p>
                <p className="text-lg font-normal mx-4 text-gray-600">
                  {" "}
                  First-party cookies: These are directly delivered by us to
                  your computer or mobile device and are exclusively used by us
                  to identify your computer or mobile device when it returns to
                  any site or application affiliated with the Services.
                </p>
                <p className="text-lg font-normal mx-4 text-gray-600">
                  {" "}
                  Third-party cookies: These are provided by service providers
                  on websites or applications and can be utilized by these
                  service providers to identify your computer or mobile device
                  when it accesses other websites.
                </p>
                <p className="text-lg font-bold mx-4 text-gray-600">
                  {" "}
                  Essential Cookies{" "}
                </p>
                <p className="text-lg font-normal mx-4 text-gray-600">
                  {" "}
                  These cookies play a crucial role in delivering services
                  accessible through the Services and facilitating the
                  utilization of certain features. For instance, they enable you
                  to access secure sections of the sites or applications and
                  enhance the loading speed of requested page content. Devoid of
                  these cookies, the requested services cannot be delivered, and
                  we exclusively employ them to furnish you with these services.
                </p>
                <p className="text-lg font-bold mx-4 text-gray-600">
                  {" "}
                  Functionality Cookies{" "}
                </p>
                <p className="text-lg font-normal mx-4 text-gray-600">
                  {" "}
                  These cookies enable the Services to retain your selections
                  when using a site or application. This includes remembering
                  your language preferences, login credentials, and adjustments
                  made to various aspects of your Account or preferences. The
                  intent behind these cookies is to offer you a more
                  personalized experience and eliminate the need for you to
                  repeatedly input your preferences each time you access the
                  Services.
                </p>
                <p className="text-lg font-bold mx-4 text-gray-600">
                  {" "}
                  Analytics and Performance Cookies{" "}
                </p>
                <p className="text-lg font-normal mx-4 text-gray-600">
                  {" "}
                  These cookies are employed to gather data regarding the
                  traffic on the Services and how users interact with them. The
                  information collected does not identify individual users; it
                  is instead aggregated and anonymized. This data includes the
                  number of users, referring websites, visited pages, visit
                  times, repeat visits, and similar details. We utilize this
                  information to enhance the efficiency of the Services, acquire
                  general demographic insights, and monitor activity levels on
                  our platform. Google Analytics is utilized for this purpose,
                  and it utilizes its own cookies. The sole purpose is to
                  enhance the functionality of the Services. You can learn more
                  about Google Analytics cookies here{" "}
                </p>
                <p className="text-lg font-normal mx-4 text-gray-600">
                  (https://developers.google.com/analytics/resources/concepts/gaConceptsCookies).
                  Additionally, you can review Google's data protection
                  practices here (www.google.com/analytics/learn/privacy.html).
                  If you wish to prevent Google Analytics from tracking your
                  usage of the Services, you can do so by downloading and
                  installing the browser plugin available through this link
                  (http://tools.google.com/dlpage/gaoptout?hl=en-GB).
                </p>
                <p className="text-lg font-bold mx-4 text-gray-600">
                  {" "}
                  Social Media Cookies{" "}
                </p>
                <p className="text-lg font-normal mx-4 text-gray-600">
                  {" "}
                  These cookies come into play when you share information by
                  using social media sharing buttons or "like" buttons on any
                  site or application affiliated with the Services. They are
                  also active when you link your Account or interact with our
                  content on social networking platforms like Facebook, Twitter,
                  or Google+. In such cases, the social network will log your
                  actions.
                </p>
                <li className="font-bold mt-4">Disabling cookies</li>
                <p className="text-lg font-normal text-gray-600">
                  You can usually delete or decline cookies by adjusting your
                  browser preferences. To do so, refer to the guidance offered
                  by your browser, which is typically found in the "settings,"
                  "help," "tools," or "edit" section. Most browsers are
                  initially configured to accept cookies unless you modify these
                  settings. If you choose not to accept our cookies, it may
                  result in certain inconveniences when using the Services. For
                  instance, we might be unable to identify your computer or
                  mobile device, necessitating you to log in each time you
                  access the Services.
                </p>
                <li className="font-bold mt-4">Pixel Tags</li>
                <p className="text-lg font-normal text-gray-600">
                  We might also employ pixel tags, alternatively referred to as
                  web beacons and clear GIFs, on the Services to monitor user
                  interactions with our websites and applications. In contrast
                  to cookies, which are stored on your computer or mobile
                  device's hard drive by a website, pixel tags are discreetly
                  embedded within webpages and remain invisible. These pixel
                  tags are utilized to gauge the effectiveness of our marketing
                  efforts and generate statistics regarding the usage of the
                  Services, facilitating more efficient content management. It's
                  important to note that the information collected via pixel
                  tags is not associated with the personal data of our users.
                </p>
                <li className="font-bold mt-4"> Do Not Track Signals</li>
                <p className="text-lg font-normal text-gray-600">
                  Certain internet browsers can be set up to transmit "Do Not
                  Track" signals to the online services you access. Presently,
                  we do not acknowledge or act upon these "Do Not Track"
                  signals. For additional information regarding "Do Not Track,"
                  please refer to http://www.allaboutdnt.com
                </p>
              </ol>
            </ol>
          </li>
          <li className="font-bold">
            What Do We Do With The Information That We Collect?
            <ol className="text-xl  mr-auto mt-3 list-[lower-alpha]">
              <li className="font-bold text-gray-600">
                QikGro will utilize the personally identifiable information
                provided by you exclusively for the purposes you have provided
                it, which may include:
              </li>
              <ul className="text-lg font-normal mx-4 list-disc text-gray-600">
                <li>Operating, enhancing, and maintaining the Services.</li>
                <li>
                  {" "}
                  Managing your Account, including communication regarding your
                  Account.
                </li>
                <li>
                  {" "}
                  Administering promotions on any site or application that you
                  partake in.
                </li>
                <li>
                  {" "}
                  Addressing your queries and delivering customer support.
                </li>
                <li>
                  {" "}
                  Sending you information, such as technical notifications,
                  updates, security alerts, and support and administrative
                  messages.
                </li>
                <li>
                  {" "}
                  With your consent, sending marketing emails about our products
                  and services. You can opt-out of receiving such emails at any
                  time; instructions for opting out are provided in marketing
                  emails. Please note that even if you opt out of marketing
                  emails, we may still send you non-marketing emails, including
                  those related to your Account and our business interactions.
                </li>
                <li>
                  {" "}
                  With your consent, sending you text messages about our
                  products and services. If you prefer not to receive marketing
                  texts, you can adjust your "Personal Information Preferences"
                  as described below or follow the "unsubscribe" or "stop"
                  instructions included in each text communication.
                </li>
                <li> Processing payments made via the Services.</li>
                <li>
                  {" "}
                  Taking actions we consider necessary or appropriate, including
                  but not limited to: (a) Complying with applicable laws. (b)
                  Responding to lawful requests and legal processes, including
                  requests from public and government authorities. (c) Enforcing
                  this Policy, our Terms, agreements, or resolving disputes
                  among users. (d) Safeguarding our rights, privacy, safety, or
                  property, as well as yours or that of others.
                </li>
                <p className="font-bold mt-3 mr-0 text-gray-600">
                  We may share this information with service providers who
                  perform various services on our behalf, ensuring they access
                  only the necessary personal information, maintain its
                  confidentiality, and refrain from using it for other purposes.
                </p>
                <p className="font-bold mt-3 text-gray-600">
                  We will retain your personally identifiable information for a
                  reasonable duration necessary to provide you with the
                  Services, unless a longer retention period is mandated or
                  allowed by law (e.g., for regulatory purposes). Data collected
                  via the YouTube API will be retained for a maximum of 30 days,
                  unless a longer retention period is mandated by law to provide
                  you with the Services.
                </p>
                <p className="font-bold mt-3 text-gray-600">
                  You can contact us at any time to opt-out of: (i) Receiving
                  direct marketing communications. (ii) Our collection of
                  sensitive personal data. (iii) Any new processing of your
                  personal data that exceeds the original purpose.
                </p>
                <p className="font-bold mt-3 text-gray-600">
                  Please be aware that opting out may impact the effectiveness
                  of some of the Services you use.
                </p>
                <li className="font-bold text-gray-600"> Disclosure</li>
                <p className="text-lg font-normal text-gray-600">
                  As a general practice, QikGro will not disclose any of your
                  personally identifiable information unless one of the
                  following situations applies:
                </p>
                <li>
                  {" "}
                  We have obtained your explicit permission, including the
                  consent granted through your acceptance of this policy.
                </li>
                <li>
                  {" "}
                  In good faith, we believe that it is legally mandated to
                  disclose the information based on relevant statutes,
                  regulations, ordinances, rules, administrative or court
                  orders, decrees, or subpoenas.
                </li>
                <li>
                  {" "}
                  The information needs to be revealed to rectify what we deem
                  as false or misleading information or to address activities we
                  suspect to be manipulative, deceptive, or in violation of the
                  law.
                </li>
                <li>
                  {" "}
                  You are informed of the data disclosure at the time it is
                  collected.
                </li>
                <li>
                  {" "}
                  It is necessary to share your information to provide the
                  product or service you have requested.
                </li>
                <li>
                  {" "}
                  Such disclosure is conducted under confidentiality constraints
                  related to a sale, merger, transfer, exchange, or other
                  disposition (whether involving assets, stock, or otherwise) of
                  all or a portion of QikGro's business.
                </li>
                <p className="text-lg font-normal text-gray-600">
                  QikGro may share non-personally identifiable information it
                  collects, but only in aggregate form, with advertisers and
                  other partners.
                </p>
              </ul>
            </ol>
          </li>
          <li className="font-bold">Your Rights</li>
          <p className="text-lg font-normal text-gray-600">
            In accordance with applicable law, you have the right to exercise
            any of the rights outlined in this section. For information on
            making personal data rights requests and how to submit such
            requests, please refer to this resource.
          </p>
          <ol className="text-xl mx-6 mt-3 list-[lower-alpha]">
            <li className="font-bold text-gray-600">
              Managing Your Information:
            </li>
            <p className="text-lg font-normal text-gray-600">
              If you possess an Account, you can access and modify some of your
              information within your Account settings. In case you have linked
              your Account to a third-party service (TPS), you have the option
              to adjust your settings and revoke permissions for the TPS
              application through your Account settings. You are responsible for
              ensuring the accuracy and currency of your personal information.
            </p>
            <li className="font-bold text-gray-600">
              Rectification of Inaccurate or Incomplete Information:
            </li>
            <p className="text-lg font-normal text-gray-600">
              You are entitled to request corrections to any inaccurate or
              incomplete personal information about you that cannot be updated
              directly within your Account, if applicable.
            </p>
            <li className="font-bold text-gray-600">
              Data Access and Portability:
            </li>
            <p className="text-lg font-normal text-gray-600">
              In select jurisdictions, applicable laws may grant you the right
              to request copies of specific personal information held by us.
              Additionally, you may have the right to request copies of personal
              information you have provided to us in a structured, commonly
              used, and machine-readable format, and request us to transmit this
              information to another service provider where technically
              feasible.
            </p>
            <li className="font-bold text-gray-600">
              Data Retention and Erasure:
            </li>
            <p className="text-lg font-normal text-gray-600">
              Typically, we retain your personal information for the duration
              necessary to fulfill the contract between you and us and to comply
              with our legal obligations. However, in certain jurisdictions, you
              may request the complete erasure of all your personal information.
              Please be aware that if you request the erasure of your personal
              information:
            </p>
            <ul className="text-lg font-normal mx-4 list-disc text-gray-600">
              <li>
                We may retain some of your personal information as required for
                our legitimate business interests, such as fraud prevention and
                enhancing safety. For instance, if we suspend an Account due to
                fraud or safety concerns, we may retain specific information
                from that Account to prevent the user from creating a new
                Account in the future.
              </li>
              <li>
                We may continue to use and store your personal information to
                fulfill our legal obligations, including tax, legal reporting,
                and auditing requirements.
              </li>
              <li>
                Information that you have shared with others (e.g., reviews,
                forum posts) may remain publicly accessible on or through the
                Service even after your Account is deactivated. Additionally,
                certain copies of your information (e.g., log records) may
                persist in our database but will no longer be associated with
                personal identifiers.
              </li>
              <li>
                Due to our backup systems and the need to protect against
                accidental or malicious data loss and destruction, residual
                copies of your personal information may not be immediately
                removed from our backup systems.
              </li>
            </ul>
            <p className="text-lg font-normal text-gray-600">
              Please note that we may require you to verify your identity and
              request before taking action on your request.
            </p>
            <li className="font-bold text-gray-600">
              {" "}
              Withdrawing Consent and Restriction of Processing.
            </li>
            <p className="text-lg font-normal text-gray-600">
              If we are processing your personal information based on your
              consent, you have the option to withdraw your consent at any time.
              You can do this by either adjusting your Account settings or by
              communicating your withdrawal of consent to us, specifying the
              particular consent you are revoking. It&#39;s important to note
              that withdrawing your consent does not affect the legality of any
              processing activities that were conducted based on your consent
              before its withdrawal.
            </p>
            <p className="text-lg font-normal mt-4 text-gray-600">
              Moreover, in some jurisdictions, applicable laws may grant you the
              right to limit how we use your personal information, especially in
              situations where: (i) You dispute the accuracy of your personal
              information. (ii) The processing is unlawful, and you oppose the
              erasure of your personal information. (iii) Your personal
              information is no longer needed for processing purposes, but you
              require it for legal claims, defense, or other lawful reasons.
              (iv) You have raised an objection to the processing, pending
              verification of whether our legitimate interests outweigh your
              own.
            </p>
            <li className="font-bold text-gray-600">
              Objection to Processing:
            </li>
            <p className="text-lg font-normal text-gray-600">
              In certain jurisdictions, applicable laws may entitle you to
              request that we cease processing your personal information for
              specific purposes, particularly when such processing is based on
              legitimate interests. If you object to such processing, we will
              discontinue processing your personal information for these
              purposes, unless we can demonstrate compelling legitimate reasons
              for continuing such processing or if it is necessary for legal
              claims, defense, or other legal purposes.
            </p>
            <p className="text-lg font-normal mt-4 text-gray-600">
              In cases where your personal information is processed for direct
              marketing purposes, you have the right to request us to stop
              processing your data for these direct marketing purposes at any
              time. You can do so by sending an email to support@QikGro.com.
            </p>
            <li className="font-bold text-gray-600">Lodging Complaints:</li>
            <p className="text-lg font-normal text-gray-600">
              You have the right to file complaints about our data processing
              practices. You can submit a complaint to us through the
              &quot;Contact Us&quot; section below or directly with a
              supervisory authority.
            </p>
          </ol>
          <li className="font-bold">Children’s Policy:</li>
          <p className="text-lg font-normal text-gray-600">
            Our Terms of Service clearly state that users must be either (i) 18
            years of age or older or (ii) 13 years of age or older if they are
            an emancipated minor or have obtained legal parental or guardian
            consent. QikGro does not knowingly collect personally identifiable
            information from users under the age of 13. In the event that we
            become aware of any personal information collected from a user under
            the age of 13, we will make efforts to identify and delete that
            information from our database.
          </p>
          <li className="font-bold">International Usage:</li>
          <p className="text-lg font-normal text-gray-600">
            QikGro owns the Service, which can be accessed in India and
            internationally. For data protection purposes, QikGro is the
            controller and, unless stated otherwise, is also the data processor.
            The information collected may be retained, stored, processed,
            accessed, and used in jurisdictions with privacy laws that may
            differ from and provide less protection than those in your home
            jurisdiction. If you are located outside of India, please be aware
            that the information you provide to us may be transferred to India.
            By using the Service, application, and/or website, you consent to
            such data transfer. We will take reasonable measures to ensure that
            your data is handled securely and in compliance with this Policy.
          </p>
          <li className="font-bold">Security and Encryption</li>
          <p className="text-lg font-normal text-gray-600">
            We adhere to widely accepted industry standards to safeguard your
            personal information. However, it&#39;s essential to note that no
            method of transmitting data over the internet, mobile technology, or
            electronic storage can be entirely foolproof. While we make diligent
            efforts to maintain physical, electronic, and procedural safeguards
            to ensure the confidentiality of the data we collect online, we
            cannot guarantee absolute security.
          </p>
          <p className="text-lg mt-4 font-normal text-gray-600">
            {" "}
            Our Service incorporates security measures aimed at protecting
            against loss, misuse, and unauthorized alterations of the
            information we manage. These measures include the utilization of
            standard Secure Socket Layer (SSL) encryption for secure data
            transmission. Furthermore, all Service information is securely
            stored on protected servers. Access to stored data is safeguarded
            through a multifaceted security framework, encompassing firewalls,
            role-based access controls, and password protection. It is your
            responsibility to maintain the security of your password. If you
            suspect that the security of your interactions with us has been
            compromised, such as a potential breach of your Account, please
            promptly notify us of the issue by contacting us at
            support@QikGro.com.
          </p>
          <p className="text-lg mt-3 mx-6 font-normal text-gray-600">
            Changes to This Policy: We retain the right to modify the terms of
            this privacy policy at any time. When alterations are made, we will
            update the &quot;last updated&quot; date at the top of the policy.
            If substantial changes are implemented to this statement or in the
            manner we handle your personal information, we will notify you
            prominently by posting a notice of these changes here on our home
            page or by sending you an email. We encourage you to review this
            policy each time you visit one of our websites or applications.
            Contact Us: For general inquiries or to file a complaint, you can
            reach us at support@QikGro.com or by sending mail to QikGro
            Inquiries, 6-D-1, JNV Colony, Bikaner, Rajasthan 334001.
          </p>
          <p className="text-lg mt-4 font-normal text-gray-600">
            To opt out of the use of your data for direct marketing purposes,
            please send an email to support@QikGro.com.
          </p>
          <p className="text-lg mt-4 font-normal text-gray-600">
            To deactivate your Account, navigate to your Account, click on
            Settings, and select &quot;Deactivate my Account.&quot; Please be
            aware that deactivating your Account and requesting an Account
            deletion are distinct processes. When you deactivate your Account,
            you have the option to reactivate it at a later time. However, with
            an Account deletion, deleted information cannot be recovered. You
            can request permanent deletion of your personal data and the closure
            of your Account at any time by submitting a deletion request to
            support@QikGro.com. We may require identity verification before
            processing your request. Kindly include &quot;Personal Data Right
            Request – Deletion Request&quot; in the subject line, along with
            your country of residence.
          </p>
          <p className="text-lg mt-4 font-normal text-gray-600">
            To access your data, you can visit your Account&#39;s Dashboard. If
            you wish to obtain a copy of some or all of your personal data in
            accordance with applicable law, you can send us an email at
            support@QikGro.com. Please note that we may request identity
            verification before proceeding with your request. Please include
            &quot;Personal Data Right Request – Access Request&quot; in the
            subject line, provide your country of residence, and furnish as much
            information as possible regarding the data you wish to obtain.
          </p>
          <p className="text-lg mt-4 font-normal text-gray-600">
            To exercise your right to data portability as per applicable law,
            please email us at support@QikGro.com, including the subject line
            &quot;Personal Data Right Request – Portability Request&quot; and
            your country of residence.
          </p>
          <p className="text-lg mt-4 font-normal text-gray-600">
            If you wish to object to our processing of certain aspects of your
            personal data as permitted by the laws of your jurisdiction, you may
            request that we cease processing your personal information for
            specific purposes, especially when such processing relies on
            legitimate interests. Should you choose to object to such
            processing, we will discontinue processing your personal information
            for these specified purposes, unless we can provide compelling
            legitimate reasons for continuing the processing or it is essential
            for legal claims, defense, or other lawful purposes. You can
            exercise your right to object to processing by sending an email to
            support@QikGro.com. Please include &quot;Personal Data Right Request
            – Processing Objection&quot; in the subject line, along with your
            country of residence.
          </p>
          <p className="text-lg mt-4 font-normal text-gray-600">
            © 2023 QikGro, Inc. All rights reserved.
          </p>
        </ol>
      </div>
    </div>
  );
};
export default Privacy;
