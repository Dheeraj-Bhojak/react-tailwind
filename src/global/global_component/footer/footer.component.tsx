import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "@coreui/icons/css/all.min.css"; // Import CoreUI icons CSS
import Button from "../buttons/button.component";
import { BUTTON_TYPE_CLASSES } from "../buttons/button.component";
import footerLogo from "../../../assets/images/new/QG-logo.png";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  const navigateToPage = (path: string) => {
    navigate(`/${path}`);
  };
  const [newsLatterEmail, setNewsLatterEmail] = useState("");
  const [error, setError] = useState("");
  const emailAddress = "support@qikgro.com";

  const FooterData = {
    address: "6-D-1 , JNV Colony , Bikaner, Rajasthan (334001)",
    email: "contact@example.com",
    socialAccounts: [
      {
        id: 1,
        name: "twitter",
        srcLink: "https://twitter.com",
        icon: Twitter,
      },
      {
        id: 2,
        name: "facebook",
        srcLink: "https://facebook.com",
        icon: Facebook,
      },
      {
        id: 3,
        name: "instagram",
        srcLink: "https://instagram.com",
        icon: Instagram,
      },
      {
        id: 4,
        name: "youtube",
        srcLink: "https://youtube.com",
        icon: YouTube,
      },
    ],
    footerDescription:
      "2023 QikGro All rights reserved <br /> Privacy Policy |Terms of use | <br / Refund and cancellation",

    forBusiness: {
      title: "For Business",
      forBusinessLinks: [
        {
          id: 1,
          title: "About Us",
          link: "#",
        },
        {
          id: 2,
          title: "Services",
          link: "#",
        },
        {
          id: 3,
          title: "Contact",
          link: "#",
        },
      ],
    },
    forInfluencer: {
      title: "For Influencer",
      forInfluencerLinks: [],
    },
    useFullLinks: {
      title: "UseFull Links",
      useFullLinksList: [
        {
          id: 1,
          title: "E-books",
          link: "#",
        },
        {
          id: 2,
          title: "blogs",
          link: "/blogs",
        },
        {
          id: 3,
          title: "news-letters",
          link: "#",
        },
        {
          id: 4,
          title: "careers",
          link: "#",
        },
        {
          id: 5,
          title: "Templates",
          link: "#",
        },
      ],
    },
  };

  const handleChange = (e: any) => {
    setNewsLatterEmail(e.target.value);
  };

  const handleSubmit = async (event: any) => {
    const isValidEmail =
      /^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/.test(
        newsLatterEmail
      );

    if (!isValidEmail) {
      setError("Invalid email format.");
    } else {
      //  handle send news letter API
    }
  };
  return (
    <footer>
      <div className=" mx-auto py-10 flex flex-wrap bg-ri-blue text-white">
        <div className="w-full lg:w-1/4 p-4 border-ri-white border-r-1">
          <div className="">
            <img src={footerLogo} alt="" className="h-24 mx-auto -mt-9" />
          </div>
          <h3 className="text-3xl mb-3 text-ri-orange font-semibold">
            Stay in the loop
          </h3>

          <div>
            <input
              name="footerNewsLatter"
              className=" h-12 outline-none rounded-md text-gray-900 px-3 w-full"
              type="text"
              placeholder="Your Email Address"
              value={newsLatterEmail}
              onChange={handleChange}
            />
            {error && <span className="text-red-500 text-8p">{error}</span>}
            <h2 className="text-[12px] text-ri-orange pt-1">
              We’ll send you a helpful letter once a week. No spam.
            </h2>

            <div className="mt-2">
              <Button
                buttonType={BUTTON_TYPE_CLASSES.slideLeftButtonYellow}
                className="w-1/2 mt-4 z-[1] rounded-sm border-1 border-ri-orange"
                onClick={handleSubmit}>
                {" "}
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/4 p-4">
          <h3 className="text-3xl mb-3 text-ri-orange font-normal">
            For Business
          </h3>
          <ul>
            <li className="hover:text-gray-300 hover:cursor-pointer">
              About Us
            </li>
            <li className="hover:text-gray-300 hover:cursor-pointer">
              Services
            </li>
            <li className="hover:text-gray-300 hover:cursor-pointer">
              Contact
            </li>
          </ul>
          <h3 className="text-3xl mt-3 text-ri-orange font-normal ">
            For Influencers
          </h3>
        </div>
        <div className="w-full lg:w-1/4 p-4">
          <h3 className="text-3xl mb-3 text-ri-orange font-normal">
            Useful Links
          </h3>
          <ul>
            <li
              className="hover:text-gray-300 hover:cursor-pointer"
              onClick={() => navigateToPage("ebooks")}>
              E-books
            </li>
            <li
              className="hover:text-gray-300 hover:cursor-pointer"
              onClick={() => navigateToPage("blogs")}>
              Blogs
            </li>
            <li
              className="hover:text-gray-300 hover:cursor-pointer"
              onClick={() => navigateToPage("newsletter")}>
              Newsletter
            </li>
            <li className="hover:text-gray-300 hover:cursor-pointer">
              Careers
            </li>
            <li className="hover:text-gray-300 hover:cursor-pointer">
              Templates
            </li>
          </ul>
        </div>
        <div className="w-full lg:w-1/4 p-4 ">
          <h3 className="text-3xl mb-3 text-ri-orange font-semibold">
            Reach Us At
          </h3>
          <div className="flex flex-row gap-4">
            <Address />
            <p>{FooterData.address}</p>
          </div>

          <div className="flex flex-row gap-4 mt-2">
            {" "}
            <div className="text-ri-orange">
              {" "}
              <i className="fa fa-envelope"></i>
            </div>
            <Link
              className="hover:text-ri-orange"
              to={`mailto:${emailAddress}`}>
              {emailAddress}
            </Link>
          </div>
          <div className="">
            <div className="flex mt-4 space-x-5 text-gray-400 dark:text-ri-orange ">
              <Link
                to="https://twitter.com"
                target="_blank"
                rel="twitter"
                className="hover:text-ri-white">
                <span className="sr-only ">Twitter</span>
                <Twitter />
              </Link>
              <Link
                to="https://facebook.com"
                target="_blank"
                rel="facebook"
                className="hover:text-ri-white">
                <span className="sr-only">Facebook</span>
                <Facebook />
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                rel="instagram"
                className="hover:text-ri-white">
                <span className="sr-only">Instagram</span>
                <Instagram />
              </Link>
              <Link
                to="https://youtube.com/"
                target="_blank"
                rel="youtube"
                className="hover:text-ri-white">
                <span className="sr-only">youtube</span>
                <YouTube />
              </Link>
            </div>
          </div>
          <div className="mt-4">
            <p>
              2023 QikGro All rights reserved <br />
              <Link to={"/privacy-policy"} className="hover:text-ri-orange">
                {" "}
                Privacy Policy
              </Link>{" "}
              |{" "}
              <Link to={"/terms-of-services"} className="hover:text-ri-orange">
                Terms of use
              </Link>
              | <br />
              <Link to={"/refund-policy"} className="hover:text-ri-orange">
                {" "}
                Refund and cancellation
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Address = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    color="#fdc100"
    className="feather feather-map-pin">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);
const Twitter = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor">
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor">
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
);
const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor">
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);

const YouTube = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentColor"
    className="bi bi-youtube"
    viewBox="0 0 16 16">
    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />{" "}
  </svg>
);

export default Footer;
