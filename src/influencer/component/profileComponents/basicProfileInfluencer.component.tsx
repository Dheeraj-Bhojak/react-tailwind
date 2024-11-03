import { cilUser, cilEnvelopeClosed } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import Select from "react-select";
import { FormDataContext } from "../../../utils/context/formData/formData.context";
import ProfilePictureUploader from "../profilePictureUploader/profilePictureUploader.component";

interface basicUserDetails {
  first_name: string | null;
  last_name: string | null;
  gender: string | null;
  dob: string | null;
}

interface LocationOption {
  value: string;
  label: string;
}
interface personalDetailsInterface {
  interest: string | "";
  location: LocationOption | null;
  niche: number;
  language: number;
}

interface userResponseApi {
  id: 1;
  interest: string | null;
  user: {
    id: 2;
    first_name: string;
    last_name: string | null;
    email: string;
    contact_number: string | null;
    gender: string | null;
    dob: string | null;
    profile_picture: {
      img_name: string;
      img_url: string;
    } | null;
  };
  language: { id: number } | null;
  niche: { id: number } | null;
  city: { id: number } | null;
}

const customStyles = {
  option: (provided: any) => ({
    ...provided,
    padding: "16px 24px 24px 16px",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    height: "2.5rem",
    border: "1px solid #gray",
    boxShadow: state.isFocused ? "0px 0px 1px #fdc100" : "none",
    "&:hover": {
      border: "1px solid #black ",
    },
  }),

  multiValue: (provided: any) => ({
    ...provided,
    padding: " 1px 1px ",
    font: "20px",
    borderRadius: "9999px",
  }),

  multiValueRemove: (provided: any, state: any) => ({
    ...provided,

    "&:hover": {
      backgroundColor: "#fdc100",
      color: "#4267B2",
    },
  }),
};

const BasicInfluencerProfile: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const { state } = useContext(FormDataContext);
  const { niche, locationData, languageData } = state;

  const [userProfileDetail, setUserProfileDetail] =
    useState<userResponseApi | null>(null);
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const [locationArrayForForm, setLocationArrayForForm] = useState<
    LocationOption[]
  >([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}influencer/personal_details`,
          config
        );
        setLocationArrayForForm(
          locationData.map((item) => ({
            label: `${item.location_title}, ${item.location_description}, ${item.country}`,
            value: item.id.toString(),
          }))
        );
        setUserProfileDetail(data);
      } catch (error) {}
    };
    fetchUserProfile();
  }, []);
  const [showToast, setShowToast] = useState(false);

  const [generalInfo, setGeneralInfo] = useState<basicUserDetails>({
    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
  });
  const [personalInfo, setPersonalInfo] = useState<personalDetailsInterface>({
    interest: "",
    location: null,
    niche: 0,
    language: 0,
  });

  const FindLocationById = (
    id: number
  ): { label: string; value: string } | null => {
    const parsedId = id.toString();
    const location = locationArrayForForm.find(
      (location) => location.value === parsedId
    );
    return location || null;
  };

  useEffect(() => {
    if (userProfileDetail) {
      setGeneralInfo({
        first_name: userProfileDetail.user.first_name,
        last_name: userProfileDetail.user.last_name,
        gender: userProfileDetail.user.gender,
        dob: userProfileDetail.user.dob,
      });
      setPersonalInfo({
        interest: userProfileDetail.interest ? userProfileDetail.interest : "",
        location: userProfileDetail.city?.id
          ? FindLocationById(userProfileDetail.city?.id)
          : null,
        niche: userProfileDetail.niche ? userProfileDetail.niche.id : 0,
        language: userProfileDetail.language
          ? userProfileDetail.language.id
          : 0,
      });
    }
  }, [userProfileDetail]);

  const handleSavePersonalInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}influencer/personal_details-update`;
      const headers = {
        authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };
      if (
        personalInfo.interest.length >= 2 &&
        personalInfo.location !== null &&
        personalInfo.language !== null &&
        personalInfo.niche !== null
      ) {
        const requestBody = {
          interest: personalInfo.interest,
          city: parseInt(personalInfo.location.value),
          niche: personalInfo.niche,
          language: personalInfo.language,
        };
        const response = await axios.put(apiUrl, requestBody, { headers });
        if (response.status === 201) {
          const { status, data } = response;
          const { message, theme } = CallToast(status, data.message);
          setShowToast(true);
          setResponseToast({ message, theme });
          setTimeout(() => {
            setShowToast(false);
          }, 5000);
        }
      } else {
        setResponseToast({
          message: "fill all Personal Details",
          theme: "error",
        });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    } catch (error: any) {
      const errorCode = error.statusCode || 500;
      const errorMessage = "Failed to upload personal details";
      const { message, theme } = CallToast(errorCode, errorMessage);
      setResponseToast({ message, theme });
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    }
  };

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "interest") {
      setPersonalInfo((prevPersonalInfo) => ({
        ...prevPersonalInfo,
        [name]: value,
      }));
    } else {
      setPersonalInfo((prevPersonalInfo) => ({
        ...prevPersonalInfo,
        [name]: parseInt(value, 10),
      }));
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setGeneralInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleChangeLocation = (selectedValue: any) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      location: selectedValue,
    }));
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmitGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}users/profile-update`;
      const headers = {
        authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };

      const requestBody = {
        first_name: generalInfo.first_name,
        last_name: generalInfo.last_name,
        gender: generalInfo.gender,
        dob: generalInfo.dob,
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
  return (
    <Fragment>
      {showToast ? (
        <ToastNotification
          message={responseToast.message}
          theme={responseToast.theme}
        />
      ) : (
        ""
      )}
      {userProfileDetail ? (
        <div className="relative bg-white container m-0 p-0 mx-auto ">
          <div></div>
          <div className="p-3">
            <div className="w-full xl:flex ">
              <div className="xl:w-2/12  w-full">
                <ProfilePictureUploader />
              </div>

              {/* General info */}

              <div className="xl:w-10/12 w-full border-1 rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md xl:min-h-[260px] sm:min-h-[280px] min-h-[360px] xl:mx-2 ">
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
                        value={generalInfo.first_name || ""}
                        onChange={handleChange}
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
                        value={generalInfo.last_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full  p-2 md:flex ">
                  <div className="md:w-1/2 xl:w-1/3 w-11/12  pl-2 ">
                    <label className="font-semibold  text-ri-blue">
                      Gender<span className="text-black">*</span>
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      className="w-11/12 px-3 py-2 border border-ri-orange rounded shadow-sm "
                      value={
                        generalInfo.gender === null ? "" : generalInfo.gender
                      }
                      onChange={handleChange}>
                      <option disabled value="">
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
                          value={generalInfo.dob || ""}
                          className="peer border-1 shadow-sm block min-h-[auto] w-full rounded bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none"
                          placeholder="Select a date"
                          max={getCurrentDate()}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-center p-2 float-right">
                  <Link
                    to={""}
                    className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform text-white mx-1 font-['Open Sans']"
                    onClick={handleSubmitGeneral}>
                    save
                  </Link>
                  <Link
                    to={""}
                    className="border-1 rounded w-16 bg-ri-blue px-2 py-1 text-xs uppercase transform text-white mx-1 font-['Open Sans'] ">
                    cancel
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full xl:flex xl:mt-4">
              <div className="w-full border-1 rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md xl:min-h-[260px] sm:min-h-[280px] min-h-[360px] xl:mr-2 ">
                <div className="mt-2 ml-2 text-neutral-400 text-base font-semibold font-['Open Sans'] mb-4">
                  PERSONAL DETAILS
                </div>
                <div className="w-full sm:flex">
                  <div className="sm:w-1/2 w-11/12 mx-3 mb-3  text-ri-blue">
                    <label className=" font-semibold px-1">
                      Interest<span className="text-black">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="fa-regular fa-heart"></i>
                      </div>
                      <input
                        name="interest"
                        required
                        type="text"
                        placeholder="Roast, Spoof and Funny"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                        value={personalInfo.interest}
                        onChange={handlePersonalInfoChange}
                      />
                    </div>
                  </div>
                  <div className="sm:w-1/2 w-11/12 mx-3 mb-3">
                    <label className=" font-semibold px-1  text-ri-blue">
                      Location<span className="text-black">*</span>
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <CIcon icon={cilUser} className="text-black" />
                      </div>
                      <div className="w-full max-w-xl">
                        <Select
                          options={locationArrayForForm}
                          styles={customStyles}
                          value={personalInfo.location}
                          onChange={handleChangeLocation}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full  p-2 md:flex ">
                  <div className="md:w-1/2 xl:w-1/3 w-11/12 pl-2">
                    <label className="font-semibold text-ri-blue">
                      Niche Category<span className="text-black">*</span>
                    </label>
                    <select
                      id="niche"
                      name="niche"
                      className="w-full px-3 py-2 border border-ri-orange rounded shadow-sm"
                      value={personalInfo.niche}
                      onChange={handlePersonalInfoChange}>
                      <option value={0} disabled>
                        Select Niche Category
                      </option>
                      {niche.map((niche) => (
                        <option key={niche.id} value={niche.id}>
                          {niche.niche_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:w-1/2 xl:w-1/3 w-11/12 pl-2">
                    <label className="font-semibold text-ri-blue">
                      Languages<span className="text-black">*</span>
                    </label>
                    <div className="text-right m-auto ">
                      <select
                        id="Language"
                        name="language"
                        className="w-full px-3 py-2 border border-ri-orange rounded shadow-sm"
                        value={personalInfo.language}
                        onChange={handlePersonalInfoChange}>
                        <option value={0} disabled>
                          Select Language
                        </option>
                        {languageData.map((language) => (
                          <option key={language.id} value={language.id}>
                            {language.language_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-center p-2 float-right">
                  <Link
                    to={""}
                    className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform text-white mx-1 font-['Open Sans']"
                    onClick={handleSavePersonalInfo}>
                    save
                  </Link>
                  <Link
                    to={""}
                    className="border-1 rounded w-16 bg-ri-blue px-2 py-1 text-xs uppercase transform text-white mx-1 font-['Open Sans'] ">
                    cancel
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full xl:flex">
              {/* hide contact number  */}

              {/* <div className="xl:w-1/3  w-full border-1 rounded border-gray-200 shadow-md  mt-4 min-h-[180px]">
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
                    preferredCountries={["in", "np", "ae", "lk"]}
                    placeholder="Enter phone number"
                    value={value}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div> */}
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
                      name="email"
                      value={userProfileDetail.user.email}
                      type="text"
                      disabled
                      placeholder="company@domain.com"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-1 border-gray-200 outline-none focus:border-ri-orange shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default BasicInfluencerProfile;
