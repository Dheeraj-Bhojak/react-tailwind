import React, { useState } from "react";
import Slider from "react-slick";
import FollowerIcon from "../../../assets/icons/followers.png";
import EngagementRateIcon from "../../../assets/icons/Engagement-Rate.png";
import { formatNumberShort } from "../../../utils/utilsMethods/formatNumberSort.utils";
import * as flags from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import img1 from "../../../assets/images/content/content-1.png";
import img2 from "../../../assets/images/content/content-2.png";
import img3 from "../../../assets/images/content/content-3.png";

import _ from "lodash";
import {
  CCard,
  CCardBody,
  CCol,
  CCardHeader,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CProgress,
} from "@coreui/react";
import { CChartBar, CChartDoughnut } from "@coreui/react-chartjs";

import { countryAbbreviations } from "../../../utils/utilsMethods/allCountries.list";
import { Link } from "react-router-dom";

interface platformDataInterface {
  id: number;
  platformName: string;
  platformContent: string[];
  reach: { engagementRate: string; followers: string };
  targetAudience: {
    gender: {
      male: number;
      female: number;
      unrecognized: number;
    };
    geoLocation: {
      id: number;
      countryName: string;
      audienceCount: number;
    }[];
    age: {
      kids: number;
      teenager: number;
      youngAdult: number;
      adult: number;
      senior: number;
    };
  };
}
interface platformDataProps {
  userPlatform: platformDataInterface;
}
type FlagsType = {
  [key: string]: any; // You can specify the type of the values if needed
};
const YoutubeTabLayout: React.FC<platformDataProps> = ({ userPlatform }) => {
  const images = [img1, img2, img3];
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const settings = {
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 3,
    speed: 500,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const { id, platformName, platformContent, reach, targetAudience } =
    userPlatform;
  const { gender, geoLocation, age } = targetAudience;
  const genderHeading = _.keys(gender);
  const genderValue = _.values(gender);
  const ageDemographicHeading = _.keys(age);
  const ageDemographicValue = _.values(age);
  return (
    <div className="w-full">
      <div className="flex">
        <div className="w-1/2  flex"></div>
        <div className="w-1/2 flex"></div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-1/3">
          <CCol>
            <CCard className="m-2">
              <CCardHeader className="font-black text-xl">Gender</CCardHeader>
              <CCardBody>
                <CChartDoughnut
                  data={{
                    labels: genderHeading,
                    datasets: [
                      {
                        backgroundColor: ["#00D8FF", "#f87979", "#fdc100"],
                        data: genderValue,
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </div>
        <div className="w-1/3">
          <CCol>
            <CCard className="m-2">
              <CCardHeader className="font-black text-xl">Reach</CCardHeader>
              <CCardBody className="mx-auto">
                <div className="flex my-auto ">
                  <img src={FollowerIcon} alt="" className="h-10" />
                  <p className="ml-3 font-bold">
                    {formatNumberShort(_.toNumber(reach.followers))}
                  </p>
                </div>
                <div className="flex">
                  <img src={EngagementRateIcon} alt="" className="h-10" />
                  <p className="ml-3 font-bold">{reach.engagementRate}%</p>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
        <div className="w-1/3 ">
          <CCol>
            <CCard className="m-2">
              <CCardHeader className="font-black text-xl">Location</CCardHeader>
              <CTable align="middle" className="mb-0 " hover responsive>
                <CTableHead className="bg-[#f7f7f7]"></CTableHead>
                <CTableBody>
                  {_.map(geoLocation, (location) => {
                    const countryAbb = _.find(
                      countryAbbreviations,
                      (item) =>
                        _.toLower(item.name) === _.toLower(location.countryName)
                    );
                    const flagIcon = `cif${_.capitalize(countryAbb?.code)}`;
                    return (
                      <CTableRow v-for="item in tableItems" key={location.id}>
                        <CTableDataCell className="text-center">
                          <div className="flex">
                            <CIcon
                              size="xxl"
                              icon={(flags as FlagsType)[flagIcon]}
                              title={_.capitalize(location.countryName)}
                            />
                            <strong className="my-auto ml-2">
                              {_.capitalize(location.countryName)}
                            </strong>
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="w-full">
                          <div className="clearfix">
                            <div className="float-start">
                              <strong>{location.audienceCount}%</strong>
                            </div>
                            <div className="float-end">
                              <small className="text-medium-emphasis">
                                {location.audienceCount}
                              </small>
                            </div>
                          </div>
                          <CProgress
                            thin
                            color="success"
                            value={location.audienceCount}
                          />
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
            </CCard>
          </CCol>
        </div>
        <div className="w-1/2 max-h-94">
          <CCol>
            <CCard className="m-2 ">
              <CCardHeader className="font-black text-xl">Age</CCardHeader>
              <CCardBody>
                <CChartBar
                  data={{
                    labels: ageDemographicHeading,
                    datasets: [
                      {
                        label: "Target Audience ",
                        backgroundColor: ["#00D8FF", "#f87979", "#fdc100"],
                        data: ageDemographicValue,
                      },
                    ],
                  }}
                />
              </CCardBody>
            </CCard>
          </CCol>
        </div>
        <div className="w-1/2  max-h-94">
          <CCol>
            <CCard className="m-2">
              <CCardHeader className="font-black text-xl">
                Content
                <Link to="/">
                  <i className="fa-regular fa-pen-to-square fa-sm float-right mt-3"></i>
                </Link>
              </CCardHeader>
              <CCardBody className="w-full  ">
                <div className="w-auto  ">
                  <Slider {...settings}>
                    {images.map((image, index) => (
                      <div key={index} className="px-2">
                        <img
                          src={image}
                          alt={`Image ${index}`}
                          className={`mx-auto rounded-lg ${
                            index === activeIndex
                              ? "scale-130"
                              : "scale-100 blur-[1px] mt-3"
                          }`}
                          style={{
                            height: index === activeIndex ? "40vh  " : "200px",
                          }}
                          onClick={() => setActiveIndex(index)}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        </div>
      </div>
    </div>
  );
};

export default YoutubeTabLayout;
