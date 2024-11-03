import {
  cilUser,
  cilBuilding,
  cibInstagram,
  cilBriefcase,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { Globe } from "react-feather";
import axios, { AxiosError } from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { niches_categories } from "../../../seeder";
import { ResponseToast } from "../campaigns/campaignCardsView/campaignCards.component";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import { debounce } from "lodash";

interface ApiResponse {
  BrandDetails: {
    id: number;
    brand_details: {
      id: number;
      brand_name: string;
      brand_website: string;
      instagram_handle: string;
      designation: string;
      niche_category: {
        id: number;
        niche_name: string;
        is_active: boolean;
      };
    };
    company_logo: {
      img_name: string;
      img_url: string;
    };
  };
  message: string;
}

interface updateBrandDetailInterface {
  brand_name: string;
  brand_website: string;
  instagram_handle: string;
  designation: string;
  niche_category: number;
}

const BrandMarketerProfile = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [BrandDetails, setBrandDetails] = useState<ApiResponse | null>(null);

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [responseToast, setResponseToast] = useState<ResponseToast>({
    message: "",
    theme: "",
    showToast: false,
  });
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileUrl(URL.createObjectURL(file));
    }
  };

  const [brandData, setBrandData] = useState<updateBrandDetailInterface>({
    brand_name: "",
    brand_website: "",
    niche_category: 0,
    instagram_handle: "",
    designation: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    };
    const apiUrl = `${process.env.REACT_APP_API_URL}marketers/brand`;
    const response = await axios.get(apiUrl, config);
    setBrandDetails(response.data);
    console.log(response.data);

    if (
      response.data &&
      response.data.BrandDetails &&
      response.data.BrandDetails.brand_details
    ) {
      setBrandData({
        brand_name: response.data.BrandDetails.brand_details.brand_name,
        brand_website: response.data.BrandDetails.brand_details.brand_website,
        niche_category:
          response.data.BrandDetails.brand_details.niche_category?.id,
        instagram_handle:
          response.data.BrandDetails.brand_details.instagram_handle,
        designation: response.data.BrandDetails.brand_details.designation,
      });
      if (
        response.data.BrandDetails.company_logo &&
        response.data.BrandDetails.company_logo.img_url
      ) {
        setSelectedFileUrl(response.data.BrandDetails.company_logo.img_url);
      }
    }
  };

  const handleBrandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}marketers/brand-update`;
      const config = {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      };
      const response = await axios.post(apiUrl, brandData, config);
      const { status, data } = response;
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
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "niche_category") {
      setBrandData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    } else {
      setBrandData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUploadBrandLogoPicture = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const headers = {
          Authorization: `Bearer ${user.userData.token.access_token}`,
        };
        const data = await axios.post(
          `${process.env.REACT_APP_API_URL}images/company-logo-upload`,
          formData,
          { headers }
        );
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
      }
    } else {
      const { message, theme } = CallToast(400, "No file selected for upload");
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
      <div className="" id="marketerBrandForm">
        <div className="relative bg-white">
          <div className="p-3">
            <div className="w-full 2xl:flex ">
              <div className="xl:w-full w-full  border-1 rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md p-2 xl:min-h-[60vh] sm:min-h-[600px] min-h-[790px] xl:mx-2 xl:">
                <div className="mt-2 ml-2 text-neutral-400 text-base font-semibold mb-4">
                  BRAND DETAILS
                </div>
                <div className="w-full ">
                  <div className="lg:w-4/12 w-full sm:border-l-4 sm:border-b-0 border-b-1 float-right lg:min-h-[440px]  ">
                    <div className="mt-2 ml-2   font-semibold  mb-4 ">
                      Brand logo*
                    </div>
                    <div className=" flex justify-center">
                      {" "}
                      <label htmlFor="fileToUpload">
                        <div
                          className={`relative profile-pic sm:h-36  h-36 min-w-[200px] mb-4 bg-contain bg-no-repeat bg-center cursor-pointer hover:opacity-60 mx-auto ${
                            selectedFile ? "" : "border-1"
                          } `}
                          style={{
                            backgroundImage: `url(${selectedFileUrl || ""})`,
                          }}>
                          <div className="hover:opacity-100  text-transparent hover:text-black  h-full flex items-center justify-center ">
                            <i className="fa-solid fa-camera font-black text-4xl "></i>
                          </div>
                          <input
                            type="file"
                            name="fileToUpload"
                            accept="image/*"
                            id="fileToUpload"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </div>
                      </label>
                    </div>
                    <div className="mt-2 flex items-center text-center p-2">
                      <button
                        onClick={handleUploadBrandLogoPicture}
                        className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black mx-1  font-['Open Sans']">
                        save
                      </button>
                      <Link
                        to={""}
                        className=" rounded hover:border-1 px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black  mx-1  font-['Open Sans'] ">
                        cancel
                      </Link>
                    </div>
                  </div>
                  <div className="lg:w-7/12 ">
                    <div className="w-full mx-3 mb-3">
                      <label className=" font-semibold px-1 mt-10  text-ri-blue">
                        Brand Name<span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <CIcon icon={cilBuilding} className="text-black" />
                        </div>
                        <input
                          name="brand_name"
                          required
                          type="text"
                          placeholder="Brand Name"
                          value={brandData.brand_name}
                          onChange={handleInputChange}
                          className="sm:w-full w-11/12 -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="w-full mx-3 mb-3">
                      <label className=" font-semibold px-1  text-ri-blue">
                        Brand Website<span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <Globe color="black" size={18} />
                        </div>
                        <input
                          name="brand_website"
                          required
                          type="url"
                          placeholder="https://qikgro.com"
                          value={brandData.brand_website}
                          onChange={handleInputChange}
                          className="sm:w-full w-11/12 -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                        />
                      </div>
                    </div>

                    <div className="w-full m-3 ">
                      <label className="font-semibold  text-ri-blue">
                        Brand Category<span className="text-black">*</span>
                      </label>
                      <select
                        id="brand_category"
                        name="niche_category"
                        required
                        value={brandData.niche_category}
                        onChange={handleInputChange}
                        className="sm:w-full w-11/12 px-3  py-2 border border-ri-orange rounded shadow-sm ">
                        <option className="font-bold" value={0}>
                          Select a category
                        </option>
                        {niches_categories.map(({ id, niche_name }, index) => (
                          <option key={index} value={id}>
                            {niche_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="w-full mx-3 mb-3">
                      <label className=" font-semibold px-1 text-ri-blue">
                        Brand Instagram Handle URL
                        <span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <CIcon icon={cibInstagram} className="text-black" />
                        </div>
                        <input
                          name="instagram_handle"
                          required
                          type="url"
                          value={brandData.instagram_handle}
                          onChange={handleInputChange}
                          placeholder="@qikgro"
                          className="sm:w-full w-11/12 -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="w-full mx-3 mb-3 ">
                      <div className="flex">
                        <label className=" font-semibold px-1  text-ri-blue">
                          Your Designation
                          <span className="text-black">*</span>
                        </label>
                      </div>

                      <div className="flex mb-10">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <CIcon icon={cilBriefcase} className="text-black" />
                        </div>
                        <input
                          name="designation"
                          required
                          type="text"
                          value={brandData.designation}
                          onChange={handleInputChange}
                          placeholder="CMO / PR / Brand Manager / Brand Executive"
                          className="sm:w-full w-11/12 -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-center mt-3 p-2  ">
                  <button
                    onClick={handleBrandSubmit}
                    className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black mx-1  ">
                    save
                  </button>
                  <button
                    onClick={fetchData}
                    className=" rounded hover:border-1 px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black  mx-1  ">
                    cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BrandMarketerProfile;
