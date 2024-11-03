import React, { Fragment, useRef, useState } from "react";
import india from "../../../assets/img/india.png";
import _ from "lodash";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import { ResponseToast } from "../../../marketer/components/campaigns/campaignCardsView/campaignCards.component";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import { adminAddressInterface } from "./adminProfileForm.component";

interface AdminProfilePersonalDetails {
  addressData: adminAddressInterface;
  setAddressData: React.Dispatch<React.SetStateAction<adminAddressInterface>>;
}

const AdminProfileContactDetails: React.FC<AdminProfilePersonalDetails> = ({
  addressData,
  setAddressData,
}) => {
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const [responseToast, setResponseToast] = useState<ResponseToast>({
    message: "",
    theme: "",
    showToast: false,
  });

  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtpButton, setShowOtpButton] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [otpInputs, setOtpInputs] = useState(["", "", "", ""]);
  const [showOtpError, setShowOtpError] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  const handleOtpInput = (index: number, value: string) => {
    // Ensure only numbers are entered
    const newValue = value.replace(/\D/, "");
    // Update the corresponding input value
    const newInputs = [...otpInputs];
    newInputs[index] = newValue;
    setOtpInputs(newInputs);

    // Automatically shift focus to the next input field if value is entered
    if (
      newValue &&
      index < otpInputs.length - 1 &&
      inputRefs.current[index + 1]
    ) {
      inputRefs.current[index + 1]!.focus();
    }

    // If value is deleted and the current input is not the first one, shift focus to the previous input field
    if (!newValue && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]!.focus();
    }
  };

  const handleOtpSubmit = () => {
    // Check if any OTP input is empty
    const isEmpty = otpInputs.some((input) => input === "");
    if (isEmpty) {
      // Show error message
      setShowOtpError(true);
    } else {
      // Do something with the OTP inputs

      setShowModal(false);
      setOtpInputs(["", "", "", ""]);
      setShowOtpButton(false);
      setShowOtpError(false);
    }
  };

  const handleOtpCancelButton = () => {
    setShowModal(false);
    setOtpInputs(["", "", "", ""]);
    setShowOtpError(false);
  };

  const handleChangeMobile = (e: { target: { value: any } }) => {
    let input = e.target.value;
    // Filter out non-numeric characters
    input = input.replace(/[^0-9]/g, "");
    const formattedInput = input.slice(0, 10); // Limit input to 10 characters
    setMobileNumber(formattedInput);

    // Check if the formatted input has 10 digits to determine whether to show the OTP button
    setShowOtpButton(formattedInput.length === 10);
  };

  const handleOtpModal = () => {
    setShowModal(true);
  };

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;

    if (name === "pin_code") {
      const digitsOnly = _.replace(value, /\D/g, "");
      const pincodeValue = _.slice(digitsOnly, 0, 6);

      setAddressData((prevData) => ({
        ...prevData,
        pin_code: `${pincodeValue.join("")}`,
      }));
    } else {
      setAddressData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const uploadAddressDetails = async () => {
    const uploadAddressDetailsApi = `${process.env.REACT_APP_API_URL}admin/update-address`;
    const headers = {
      authorization: `Bearer ${access_token}`,
    };
    try {
      const response = await axios.post(uploadAddressDetailsApi, addressData, {
        headers,
      });
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

  const handleSaveAddress = (e: React.FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    uploadAddressDetails();
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
      <div className="flex justify-between">
        <div className="w-[50%] flex flex-col justify-start mr-3">
          <p className="text-xs 2xl:text-sm 3xl:text-base">Mobile Number</p>
          <div className="flex relative">
            <div className="border-y-2 border-l-2 py-2 px-2 mt-1 rounded-l-md 3xl:w-1/12 flex items-center justify-center bg-[#E7E7E7]">
              <img
                src={india}
                alt=""
                className="w-4 h-4 3xl:w-5 3xl:h-5 mr-1"
              />{" "}
              <p className="text-xs 2xl:text-sm 3xl:text-base">+91</p>
            </div>
            <input
              className="border-2 py-2 px-2 rounded-r-md mt-1 w-11/12 custom-input text-xs 2xl:text-sm 3xl:text-base"
              type="text"
              placeholder="9876543210"
              maxLength={10}
              value={mobileNumber}
              onChange={handleChangeMobile}
            />
            {showOtpButton ? (
              <button
                className="absolute right-0 px-4 py-[11px] xl:py-[10px] 2xl:py-[10px] bg-[#7f9cf5] text-white rounded-r-md"
                onClick={handleOtpModal}>
                <p className="text-xs 2xl:text-[14px] 3xl:text-base">Verify</p>
              </button>
            ) : (
              ""
            )}
          </div>
          {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-4 rounded-md">
                <p className="font-semibold text-lg justify-center flex">
                  Verify with OTP
                </p>
                <p className="text-sm flex justify-center mt-2">
                  Please enter the One-Time Password(OTP) sent to your mobile
                  number.
                </p>
                {showOtpError && (
                  <p className="text-red-500 text-center text-sm">
                    Please enter the OTP code to proceed
                  </p>
                )}
                <div className="flex mt-4 justify-evenly">
                  {otpInputs.map((input, index) => (
                    <input
                      key={index}
                      maxLength={1}
                      type="text"
                      pattern="[0-9]"
                      inputMode="numeric"
                      className="w-12 h-12 border-2 rounded-md text-center custom-input"
                      value={input}
                      onChange={(e) => handleOtpInput(index, e.target.value)}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
                </div>
                <p className="text-sm mt-4 text-center">
                  Didn't recieve the OTP?
                  <button className="text-[#4267B2] font-medium text-sm">
                    Resend
                  </button>
                </p>
                <div className="mt-4 flex justify-evenly">
                  <button
                    onClick={handleOtpSubmit}
                    className="bg-[#4267B2] text-white py-2 px-8 rounded-md">
                    Submit
                  </button>
                  <button
                    onClick={handleOtpCancelButton}
                    className="bg-[#FDC100] text-white py-2 px-8 rounded-md">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-[50%] flex flex-col justify-end">
          <p className="text-xs 2xl:text-sm 3xl:text-base">Email Address</p>
          <input
            className="border-2 py-2 px-2 rounded-md mt-1 bg-[#eeeeee] text-xs 2xl:text-sm 3xl:text-base"
            type="text"
            placeholder="example@gmail.com"
            disabled
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between mt-3">
          <div className="w-[50%] flex flex-col justify-end mr-3">
            <p className="text-xs 2xl:text-sm 3xl:text-base">Address</p>
            <input
              className="border-2 py-2 px-2 rounded-md mt-1 custom-input text-xs 2xl:text-sm 3xl:text-base"
              type="text"
              placeholder="House No."
              name="house_no"
              value={addressData.house_no}
              onChange={handleAddressChange}
            />
          </div>

          <div className="w-[50%] flex flex-col justify-end">
            <input
              className="border-2 py-2 px-2 rounded-md mt-1 custom-input text-xs 2xl:text-sm 3xl:text-base"
              type="text"
              placeholder="Street Name/Locality"
              name="street"
              value={addressData.street}
              onChange={handleAddressChange}
            />
          </div>
        </div>
        <input
          className="mt-3 w-full border-2 py-2 px-2 rounded-md custom-input text-xs 2xl:text-sm 3xl:text-base"
          type="text"
          placeholder="Landmark"
          name="landmark"
          value={addressData.landmark}
          onChange={handleAddressChange}
        />
        <div className="flex justify-between">
          <input
            className="mt-3 w-[32.9%] border-2 py-2 px-2 rounded-md custom-input text-xs 2xl:text-smsm 3xl:text-base"
            type="text"
            placeholder="City"
            name="city"
            value={addressData.city}
            onChange={handleAddressChange}
          />
          <input
            className="mt-3 w-[32.9%] border-2 py-2 px-2 rounded-md custom-input text-xs 2xl:text-sm 3xl:text-base"
            type="text"
            placeholder="State"
            name="state"
            value={addressData.state}
            onChange={handleAddressChange}
          />
          <input
            className="mt-3 w-[32.9%] border-2 py-2 px-2 rounded-md custom-input text-xs 2xl:text-sm 3xl:text-base"
            type="text"
            inputMode="numeric"
            placeholder="Pincode"
            name="pin_code"
            value={addressData.pin_code}
            onChange={handleAddressChange}
          />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-end">
          <button
            className="bg-[#4267B2] py-2 px-4 rounded-md mr-4"
            onClick={handleSaveAddress}>
            <p className="text-white text-xs 2xl:text-sm 3xl:text-base">Save</p>
          </button>
          <button className="bg-[#FDC100] py-2 px-4 rounded-md ml-4">
            <p className="text-white text-xs 2xl:text-sm 3xl:text-base">
              Cancel
            </p>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminProfileContactDetails;
