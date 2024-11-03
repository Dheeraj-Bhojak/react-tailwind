import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Home, MapPin, Phone, User } from "react-feather";
import { Link } from "react-router-dom";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
interface AddressDataInterface {
  id: number;
  house_no: string;
  street: string;
  landmark: string;
  city: string;
  state: string;
  pin_code: string;
  mobile_no: string;
  full_name: string;
}
const InfluencerAddress: React.FC = () => {
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const [showToast, setShowToast] = useState(false);
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const initialAddressData: AddressDataInterface = {
    id: 0,
    house_no: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    pin_code: "",
    mobile_no: "",
    full_name: "",
  };
  const [addressData, setAddressData] =
    useState<AddressDataInterface>(initialAddressData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setAddressData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fetchUserAddress = async () => {
    const addressDetailsApi = `${process.env.REACT_APP_API_URL}mobile/address`;
    const config = {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    };
    try {
      const { data } = await axios.get(addressDetailsApi, config);
      setAddressData({
        id: data.address.id,
        house_no: data.address.house_no,
        street: data.address.street,
        landmark: data.address.landmark,
        city: data.address.city,
        state: data.address.state,
        pin_code: data.address.pin_code,
        mobile_no: data.address.mobile_no,
        full_name: data.address.full_name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAddressDetails = async () => {
    const uploadAddressApi = `${process.env.REACT_APP_API_URL}mobile/update_address`;
    const headers = {
      authorization: `Bearer ${access_token}`,
    };
    try {
      const response = await axios.post(uploadAddressApi, addressData, {
        headers,
      });
      const { status, data } = response;
      const { message, theme } = CallToast(status, data.message);
      setShowToast(true);
      setResponseToast({ message, theme });
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
      console.log(data);
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

  useEffect(() => {
    fetchUserAddress();
  }, []);
  return (
    <div className="" id="marketerBrandForm">
      {showToast ? (
        <ToastNotification
          message={responseToast.message}
          theme={responseToast.theme}
        />
      ) : (
        ""
      )}
      <div className="relative bg-white">
        <div className="p-3">
          <div className="w-full xl:flex ">
            <div className="xl:w-2/3 w-full  border-1 rounded border-gray-200 xs:mt-6 xl:mt-0 shadow-md p-2  min-h-[420px] xl:mx-2 xl:">
              <div className="mt-2 ml-2 text-neutral-400 text-base font-semibold font-['Open Sans'] mb-4">
                Password
              </div>
              <form className="m-1 ">
                <div className="w-full px-4">
                  <div className="sm:w-7/12 ">
                    <div className="w-full mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none">
                        Full Name<span className="text-black">*</span>
                      </label>
                      {/* <Link
                        className="float-right text-ri-blue sm:mr-0 mr-10 hover:text-black text-sm mt-1"
                        to={"/influencer-app/security/forgot-password"}>
                        Forgot Password ?
                      </Link> */}
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <User size={16} />
                        </div>
                        <input
                          required
                          name="full_name"
                          type="text"
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="Full Name"
                          value={addressData.full_name}
                          onChange={handleChange}
                        />
                      </div>
                      {/* {errors.currentPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.currentPassword}
                        </span>
                      )} */}
                    </div>
                    <div className="w-full mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none ">
                        Apartment/House_no.<span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <Home size={16} />
                        </div>
                        <input
                          required
                          name="house_no"
                          type="text"
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="House Number"
                          value={addressData.house_no}
                          onChange={handleChange}
                        />
                      </div>
                      {/* {errors.newPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.newPassword}
                        </span>
                      )} */}
                    </div>
                    <div className="w-full mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none">
                        Street
                        <span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <MapPin size={16} />
                        </div>
                        <input
                          required
                          name="street"
                          type="text"
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="Street"
                          value={addressData.street}
                          onChange={handleChange}
                        />
                      </div>
                      {/* {errors.confirmNewPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.confirmNewPassword}
                        </span>
                      )} */}
                    </div>
                    <div className="w-full mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none">
                        LandMark
                        <span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <MapPin size={16} />
                        </div>
                        <input
                          required
                          name="landmark"
                          type="text"
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="LandMark"
                          value={addressData.landmark}
                          onChange={handleChange}
                        />
                      </div>
                      {/* {errors.confirmNewPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.confirmNewPassword}
                        </span>
                      )} */}
                    </div>
                    {/*                                       
/
                                    
/

/ */}
                    <div className="mb-2 flex">
                      <div className="w-1/2">
                        <label className=" font-semibold px-1  text-ri-blue select-none">
                          City
                          <span className="text-black">*</span>
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <MapPin size={16} />
                          </div>
                          <input
                            required
                            name="city"
                            type="text"
                            className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                            placeholder="City"
                            value={addressData.city}
                            onChange={handleChange}
                          />
                        </div>
                        {/* {errors.confirmNewPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.confirmNewPassword}
                        </span>
                      )} */}
                      </div>
                      <div className="w-1/2 ml-3 ">
                        <label className=" font-semibold px-1  text-ri-blue select-none">
                          State
                          <span className="text-black">*</span>
                        </label>
                        <div className="flex">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <MapPin size={16} />
                          </div>
                          <input
                            required
                            name="state"
                            type="text"
                            className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                            placeholder="State"
                            value={addressData.state}
                            onChange={handleChange}
                          />
                        </div>
                        {/* {errors.confirmNewPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.confirmNewPassword}
                        </span>
                      )} */}
                      </div>
                    </div>
                    <div className="w-full mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none">
                        PinCode
                        <span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <MapPin size={16} />
                        </div>
                        <input
                          required
                          name="pin_code"
                          type="text"
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="Pin Code"
                          value={addressData.pin_code}
                          onChange={handleChange}
                        />
                      </div>
                      {/* {errors.confirmNewPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.confirmNewPassword}
                        </span>
                      )} */}
                    </div>
                    <div className="w-full mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none">
                        Contact Number
                        <span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <Phone size={16} />
                        </div>
                        <input
                          required
                          name="mobile_no"
                          type="text"
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="Mobile number"
                          value={addressData.mobile_no}
                          onChange={handleChange}
                        />
                      </div>
                      {/* {errors.confirmNewPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.confirmNewPassword}
                        </span>
                      )} */}
                    </div>
                  </div>

                  <div className="flex items-center text-center p-4 float-right">
                    <button
                      onClick={uploadAddressDetails}
                      className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black mx-1  font-['Open Sans']">
                      save
                    </button>
                    <button
                      type="button"
                      className="border-1 rounded bg-ri-blue px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-white mx-1  font-['Open Sans']"
                      // onClick={HandleCancel}
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfluencerAddress;
