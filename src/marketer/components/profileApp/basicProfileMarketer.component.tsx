import { cilUser, cilCamera, cilEnvelopeClosed } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import "./profileMarketer.styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import SingleImageCropper from "../../../global/global_component/imageCropper/imageCropperSingle";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import { bindActionCreators } from "redux";
import { GetProfileDataAction } from "../../../utils";

enum Gender {
  Male = "M",
  Female = "F",
  Others = "O",
}

interface basicUserDetails {
  first_name: string;
  last_name: string;
  gender: Gender | null;
  dob: string | null;
}

const BasicMarketerProfile = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const user = useSelector(selectCurrentUser);
  const { first_name, last_name } = user.userData.user;
  const [generalInfo, setGeneralInfo] = useState<basicUserDetails>({
    first_name,
    last_name,
    gender: null,
    dob: null,
  });
  const [editGeneralInfo, setEditGeneralInfo] = useState<basicUserDetails>({
    ...generalInfo,
  });

  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const [showToast, setShowToast] = useState(false);
  const [value, setValue] = useState("");
  const handlePhoneNumberChange = (newPhoneNumber: string) => {
    setValue(newPhoneNumber);
  };
  const dispatch = useDispatch();
  const { GetProfileData } = bindActionCreators(GetProfileDataAction, dispatch);
  const handleBasicInfoChange = (e: any) => {
    const { name, value } = e.target;
    setEditGeneralInfo({
      ...editGeneralInfo,
      [name]: value,
    });
  };
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}users/profile-update`;
      const headers = {
        authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };

      const requestBody = {
        first_name: editGeneralInfo.first_name,
        last_name: editGeneralInfo.last_name,
        gender: editGeneralInfo.gender,
        dob: editGeneralInfo.dob,
      };

      const response = await axios.put(apiUrl, requestBody, { headers });

      if (response.status === 200) {
        const { status, data } = response;

        const { message, theme } = CallToast(status, data.message);

        setShowToast(true);
        setResponseToast({ message, theme });

        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } else {
        console.error("Failed to update profile");
      }
    } catch (error: any) {
      const errorCode = error.statusCode || 401;
      const errorMessage = "Failed to upload Profile";
      const { message, theme } = CallToast(errorCode, errorMessage);
      setResponseToast({ message, theme });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };
  const { access_token } = user.userData.token;
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const apiUrl = `${process.env.REACT_APP_API_URL}images/profile-upload`;
      const headers = {
        authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      };
      try {
        const response = await axios.post(apiUrl, formData, { headers });
        if (response.status === 200) {
          const { status, data } = response;
          const { message, theme } = CallToast(status, data.message);
          setResponseToast({ message, theme });
          setShowToast(true);
          setTimeout(() => {
            GetProfileData(access_token);
            setShowToast(false);
          }, 5000);
        } else {
          console.error("File upload failed.");
        }
      } catch (error: any) {
        const errorCode = error.statusCode || 401;
        const errorMessage = "Failed to upload Profile Image";
        const { message, theme } = CallToast(errorCode, errorMessage);
        setResponseToast({ message, theme });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    } else {
      console.error("No file selected.");
    }
  };

  const handleCancelUploadImage = () => {
    setImage(null);
  };

  return (
    <div className="relative bg-white">
      <div>
        {showToast ? (
          <ToastNotification
            message={responseToast.message}
            theme={responseToast.theme}
          />
        ) : (
          ""
        )}
      </div>
      <div className="p-3">
        <div className="w-full xl:flex ">
          <div className="xl:w-2/12  w-full">
            <div className=" border border-black rounded shadow-md relative min-h-[266px]">
              <form>
                <div className="mt-2 ml-2 text-neutral-400  font-semibold font-['Open Sans'] mb-4 ">
                  PROFILE IMAGE
                </div>
                <div className="flex justify-center">
                  <SingleImageCropper
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                    fileInputRef={fileInputRef}
                    image={image}
                    setImage={setImage}
                  />
                </div>
                <div className="mt-2 flex items-center text-center p-2">
                  <button
                    type="button"
                    onClick={handleUpload}
                    className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black mx-1  font-['Open Sans']">
                    save
                  </button>
                  <button
                    type="button"
                    className=" rounded hover:border-1 px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black  mx-1  font-['Open Sans'] "
                    onClick={handleCancelUploadImage}>
                    cancel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* General info */}

          <div className="xl:w-10/12 w-full border-1 rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md xl:min-h-[260px] sm:min-h-[280px] min-h-[360px] xl:mx-2 xl:">
            <div className="mt-2 ml-2 text-neutral-400 text-base font-semibold font-['Open Sans'] mb-4">
              GENERAL INFO
            </div>
            <div className="w-full sm:flex">
              <div className="sm:w-1/2 w-11/12 mx-3 mb-3  text-ri-blue">
                <label className=" font-semibold px-1">
                  First Name<span className="text-black">*</span>
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <CIcon icon={cilUser} className="text-black" />
                  </div>
                  <input
                    name="first_name"
                    required
                    type="text"
                    placeholder="Jone"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                    value={editGeneralInfo.first_name}
                    onChange={handleBasicInfoChange}
                  />
                </div>
              </div>
              <div className="sm:w-1/2 w-11/12 mx-3 mb-3">
                <label className=" font-semibold px-1  text-ri-blue">
                  Last Name<span className="text-black">*</span>
                </label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                    <CIcon icon={cilUser} className="text-black" />
                  </div>
                  <input
                    name="last_name"
                    required
                    type="text"
                    placeholder="Doe"
                    className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                    value={editGeneralInfo.last_name}
                    onChange={handleBasicInfoChange}
                  />
                </div>
              </div>
            </div>
            <div className="w-full sm:1/3 p-2 md:flex ">
              {/* Gender Dropdown (33.33%) */}
              <div className="md:w-1/2 xl:w-1/3 w-11/12  pl-2 ">
                <label className="font-semibold  text-ri-blue">
                  Gender<span className="text-black">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="w-full px-3  py-2 border border-ri-orange rounded shadow-sm "
                  value={
                    editGeneralInfo.gender === null
                      ? " "
                      : editGeneralInfo.gender
                  }
                  onChange={handleBasicInfoChange}>
                  <option value=" " disabled>
                    Select Gender
                  </option>

                  <option value="M">Male</option>
                  <option value="F">Female</option>
                  <option value="O">Other</option>
                </select>
              </div>
              <div className="md:w-1/2 xl:w-1/3 w-11/12 pl-2">
                <label className="font-semibold text-ri-blue">
                  Date of Birth<span className="text-black">*</span>
                </label>
                <div className="text-right m-auto ">
                  <div
                    className="relative"
                    data-te-datepicker-init
                    data-te-input-wrapper-init>
                    <input
                      type="date"
                      name="dob"
                      // value={generalInfo.dob}
                      className="peer  border-1 shadow-sm block min-h-[auto] w-full rounded  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                      placeholder="Select a date"
                      max={getCurrentDate()}
                      onChange={handleBasicInfoChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center text-center p-2 float-right">
              <button
                onClick={handleUpdateProfile}
                className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black mx-1  font-['Open Sans']">
                save
              </button>
              <Link
                to={""}
                className=" rounded hover:border-1 px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black  mx-1  font-['Open Sans']">
                cancel
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full xl:flex">
          <div className="xl:w-1/3  w-full border-1 rounded border-gray-200 shadow-md  mt-4 min-h-[180px]">
            <div className="mt-2 ml-2 text-neutral-400 text-base font-semibold font-['Open Sans'] mb-4">
              CONTACT NUMBER
            </div>
            <label className="font-semibold mx-4 mb-2  text-ri-blue">
              Mobile No.<span className="text-black">*</span>
            </label>
            <div className="flex justify-center pl-4 w-96">
              <PhoneInput
                country="in"
                containerClass="large-flag large-input"
                inputClass="form-control"
                preferredCountries={["in"]}
                placeholder="Enter phone number"
                value={value}
                onChange={handlePhoneNumberChange}
              />
            </div>
            <div className="flex items-center text-center p-2 float-right">
              <Link
                to={""}
                className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black mx-1  font-['Open Sans']">
                save
              </Link>
              <Link
                to={""}
                className=" rounded hover:border-1 px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black  mx-1  font-['Open Sans'] ">
                cancel
              </Link>
            </div>
          </div>
          <div className="lg:w-2/3 w-full border-1 rounded border-gray-200 shadow-md  lg:mx-2 mt-4 min-h-[180px]">
            <div className="mt-2 ml-2 text-neutral-400 text-base font-semibold font-['Open Sans'] mb-4">
              EMAIL ADDRESS
            </div>
            <div className="w-11/12 mx-3 mb-3">
              <label className=" font-semibold px-1 text-ri-blue">
                Email<span className="text-black">*</span>
              </label>
              <div className="flex">
                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                  <CIcon icon={cilEnvelopeClosed} className="text-black" />
                </div>
                <input
                  name="first_name"
                  required
                  type="text"
                  placeholder="company@domain.com"
                  className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicMarketerProfile;
