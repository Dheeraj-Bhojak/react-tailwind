import React, { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import CallToast from "../../../utils/utilsMethods/callToast.utils";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import { adminPersonalDetail } from "./adminProfileForm.component";

interface ResponseToast {
  message: string;
  theme: string;
  showToast: boolean;
}

interface AdminProfilePersonalDetails {
  personalDetail: adminPersonalDetail;
  setPersonalDetail: React.Dispatch<React.SetStateAction<adminPersonalDetail>>;
}

const AdminProfilePersonalDetails: React.FC<AdminProfilePersonalDetails> = ({
  personalDetail,
  setPersonalDetail,
}) => {
  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;

  const [responseToast, setResponseToast] = useState<ResponseToast>({
    message: "",
    theme: "",
    showToast: false,
  });

  const [formattedAccountNumber, setFormattedAccountNumber] = useState<string>(
    personalDetail.account_number
  );

  const getFormattedDate = (value: string) => {
    const cleanedValue = value.replace(/-/g, "").replace(/\D/g, "");

    let formattedValue = cleanedValue.replace(/(.{4})/g, "$1-").slice(0, 19);

    if (formattedValue.slice(-1) === "-") {
      formattedValue = formattedValue.slice(0, -1);
    }
    setFormattedAccountNumber(formattedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    if (name === "account_number") {
      getFormattedDate(value);

      setPersonalDetail((prevState) => ({
        ...prevState,
        account_number: formattedAccountNumber.replace(/-/g, ""),
      }));
    } else {
      setPersonalDetail((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updateAdminPersonalDetail = async () => {
      const updatePersonalDetailApi = `${process.env.REACT_APP_API_URL}admin/update-profile`;
      const headers = {
        authorization: `Bearer ${access_token}`,
      };
      try {
        const response = await axios.post(
          updatePersonalDetailApi,
          personalDetail,
          {
            headers,
          }
        );
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
    updateAdminPersonalDetail();
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear() - 10;
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  console.log("personal Derails", personalDetail);
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
      <div className="pb-3">
        <div className="flex justify-between mt-2">
          <div className="w-[49%] flex flex-col justify-start">
            <div className="flex">
              <p className="text-xs 2xl:text-sm 3xl:text-base">First Name</p>
            </div>
            <input
              className={`border-2 py-2 px-2 rounded-md mt-1 custom-input text-xs 2xl:text-sm 3xl:text-base`}
              name="first_name"
              type="text"
              placeholder="John"
              value={personalDetail.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="w-[49%] flex flex-col justify-end">
            <div className="flex">
              <p className="text-xs 2xl:text-sm 3xl:text-base">Last Name</p>
            </div>

            <input
              className={`border-2 py-2 px-2 rounded-md mt-1 custom-input text-xs 2xl:text-sm 3xl:text-base`}
              name="last_name"
              type="text"
              placeholder="Doe"
              value={personalDetail.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="w-[49%] flex flex-col justify-start">
            <p className="text-xs 2xl:text-sm 3xl:text-base">Gender</p>
            <div className="flex w-full">
              <label
                className={`w-1/2 border-y-2 border-l-2 py-2 px-2 rounded-l-md mt-1 custom-input items-center flex`}>
                <input
                  type="radio"
                  name="gender"
                  value="m"
                  checked={personalDetail.gender?.toLowerCase() === "m"}
                  onChange={handleChange}
                />
                <span className="pl-3 text-xs ">Male</span>
              </label>
              <label
                className={`w-1/2 border-2 py-2 px-2 rounded-r-md mt-1 custom-input items-center flex`}>
                <input
                  type="radio"
                  name="gender"
                  value="f"
                  checked={personalDetail.gender?.toLowerCase() === "f"}
                  onChange={handleChange}
                />
                <span className="pl-3 text-xs ">Female</span>
              </label>
            </div>
          </div>

          <div className="w-[49%] flex flex-col justify-end">
            <p className="text-xs 2xl:text-sm 3xl:text-base">Date of Birth</p>
            <div className="text-right w-full ">
              <div
                className="relative"
                data-te-datepicker-init
                data-te-input-wrapper-init>
                <input
                  type="date"
                  name="dob"
                  value={personalDetail.dob || ""}
                  className="peer border-1 shadow-sm block min-h-[auto] w-full rounded  bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 "
                  placeholder="Select a date"
                  max={getCurrentDate()}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="w-[49%] flex flex-col justify-end">
            <p className="text-xs 2xl:text-sm 3xl:text-base">Account No.</p>
            <input
              className={`border-2 py-2 px-2 rounded-md mt-1 custom-input text-xs 2xl:text-sm 3xl:text-base`}
              name="account_number"
              type="text"
              placeholder="(ex:- XXXX-XXXX-XXXX-XXXX)"
              value={formattedAccountNumber}
              onChange={handleChange}
            />
          </div>

          <div className="w-[49%] flex flex-col justify-end">
            <p className="text-xs 2xl:text-sm 3xl:text-base">PAN No.</p>
            <input
              className={`border-2 py-2 px-2 rounded-md mt-1 custom-input text-xs 2xl:text-sm 3xl:text-base`}
              name="pan_number"
              type="text"
              placeholder="(ex :- ABCDE1234F)"
              maxLength={10}
              value={personalDetail.pan_number}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex mt-3 justify-between">
          <div className="w-[49%] flex flex-col justify-end">
            <p className="text-xs 2xl:text-sm 3xl:text-base">IFSC Code</p>
            <input
              className={`border-2 py-2 px-2 rounded-md mt-1 custom-input text-xs 2xl:text-sm 3xl:text-base`}
              name="ifsc"
              type="text"
              placeholder="(ex :- ABCD0123456)"
              value={personalDetail.ifsc}
              onChange={handleChange}
            />
          </div>
          <div className="w-[49%]">
            <p className="text-white select-none">ifsc</p>
            <div className="flex mt-2 justify-end">
              <button
                className="bg-[#4267B2] py-2 px-4 rounded-md mr-4 text-white text-xs 2xl:text-sm 3xl:text-base"
                onClick={handleSubmit}>
                Save
              </button>
              <button className="bg-[#FDC100] py-2 px-4 rounded-md ml-4 text-white text-xs 2xl:text-sm 3xl:text-base">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminProfilePersonalDetails;
