import React, { useState } from "react";
import bgImage from "../../../../assets/images/discussing-work.jpg";
import companyLogo from "../../../../assets/images/new/logo.jpg";
import companyLogo2 from "../../../../assets/images/content/content-2.png";
import logoQikGro from "../../../../assets/images/new/logo-quickGrow2.png";
import shoppingBag from "../../../../assets/icons/shoppingBag.png";
import "./campaignCard.style.css";

import { Link } from "react-router-dom";

import { cilLinkAlt, cilTrash, cilPencil } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../../../global/global_component/buttons/button.component";
import Pagination from "../../../../global/global_component/pagination/paginationWithNumber.component";

const CampaignCard = () => {
  return (
    <div>
      <div className="mx-2 relative transition-effect ">
        <div className="max-w-sm  mx-auto bg-white border overflow-hidden border-gray-200 rounded-lg shadow-md hover:bg-black ">
          <div>
            <div className="relative">
              <img
                className="top-0 rounded-t-lg h-96 w-full object-cover"
                src={companyLogo}
                alt="product image"
                loading="lazy"
              />
              <div
                className=" bottom-0 absolute text-white  w-full opacity-[0.9] "
                id="grad1"></div>
              <div className="bottom-0 absolute">
                <p className="text-lg text-left text-ri-yellow px-4 mb-1">
                  Niche
                </p>
                <p
                  className="text-xl left-0 text-white font-semibold px-4 mb-4"
                  style={{ WebkitTextStroke: "0.3px black" }}>
                  Winter Collection
                </p>
              </div>
            </div>
            <img
              className=" pointer-events-none top-6 border-1 border-black -left-8 h-20 w-20 absolute rounded-full company-logo "
              src={companyLogo}
              alt="product image"
              loading="lazy"
            />
            <div className="z-10 text-[12px] right-0 text-ri-blue absolute top-16">
              <svg width="52" height="120" className="flex">
                <rect
                  x="0"
                  y="0"
                  rx="11"
                  ry="11"
                  width="50"
                  height="120"
                  fill="white"
                  opacity="0.4"
                />
                <image
                  href={shoppingBag}
                  x="8"
                  y="12"
                  height="30"
                  width="34"
                  className="a-social__image "
                />
                <image
                  href="https://assets-global.website-files.com/6096c30cbe3be47082faee28/62f92c6b0825c8c05b256c32_a-social_in.png"
                  x="3"
                  y="70"
                  height="40"
                  width="44"
                  className="a-social__image "
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="  image-overlay absolute z-10  xl:bottom-[45px] bottom-[45px]  right-0 left-0 bg-gray-800 overflow-hidden w-full h-0  transition_ease rounded-lg">
          <div className="h-full w-full text-white">
            <div className="h-2/5 flex border-b-2">
              <div className="w-1/2 m-auto   h-full">
                <div className="w-full ">
                  <div className="w-full p-3">
                    <h1 className="  text-ri-orange mb-2">Deliverables:</h1>
                    <p className="mt-2 text-sm leading-tight ">
                      Carousel-Post | Reels | Video
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 m-auto border-l-2  h-full">
                <div className="w-full ">
                  <div className="w-full p-3">
                    <h1 className="  text-ri-orange mb-2">
                      last date for apply:
                    </h1>
                    <p className="leading-tight ">11 Nov 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-2/5 flex border-b-2">
              <div className="w-1/2 m-auto h-full">
                <div className="w-full ">
                  <div className="w-full p-3">
                    <h1 className="  text-ri-orange mb-2">Requirement:</h1>
                    <p className="mb-2  leading-tight ">11 - 20 Influencer</p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 m-auto border-l-2  h-full">
                <div className="w-full ">
                  <div className="w-full p-3">
                    <h1 className="  text-ri-orange">Category:</h1>
                    <p className="mt-2 text-white ">Micro </p>
                    <p className="text-gray-200 mt-1 text-xs">
                      (10k - 100k Followers)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-1/5 flex ">
              <Button
                className=" rounded-2xl border-1 w-4/5  border-ri-orange  m-auto font-bold"
                buttonType={BUTTON_TYPE_CLASSES.slideLeftButtonYellow}>
                Apply
              </Button>
            </div>
          </div>
        </div>
        <div className="flex mb-4 mt-2 pl-2.5 h-">
          <Link
            to={""}
            className="flex mr-4 bg-gray-200 hover:bg-ri-orange focus:ring-1 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center">
            <i className="fa-regular fa-eye"></i>
          </Link>
          <Link
            to={""}
            className="flex mr-4 bg-gray-200 hover:bg-ri-orange focus:ring-1 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center">
            <CIcon icon={cilPencil} className="text-xl" />
          </Link>
          <Link
            to={""}
            className="flex mr-4 bg-gray-200 hover:bg-ri-orange focus:ring-1 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center">
            <CIcon icon={cilLinkAlt} className="text-xl" />
          </Link>
          <Link
            to={""}
            className="flex mr-4 bg-gray-200 hover:bg-red-600 hover:text-gray-900 focus:ring-1 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center">
            <CIcon icon={cilTrash} className="text-xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
