import React, { useState } from "react";
import { Link } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import { Key, Eye, EyeOff } from "react-feather";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import axios from "axios";
import ToastNotification from "../../../global/global_component/toastNotification/ToastNotification";
import CallToast from "../../../utils/utilsMethods/callToast.utils";

interface PasswordState {
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showNewConfirmPassword: boolean;
}

interface passwords {
  CurrentPassword: string;
  NewPassword: string;
  NewConfirmPassword: string;
}
interface Errors {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const ChangePasswordInfluencer: React.FC = () => {
  const [showPassword, setShowPassword] = useState<PasswordState>({
    showCurrentPassword: false,
    showNewPassword: false,
    showNewConfirmPassword: false,
  });

  const [errors, setErrors] = useState<Errors>({});

  const [passwordObject, setPasswordObject] = useState<passwords>({
    CurrentPassword: "",
    NewPassword: "",
    NewConfirmPassword: "",
  });

  const { CurrentPassword, NewPassword, NewConfirmPassword } = passwordObject;

  const togglePasswordVisibility = (keyName: keyof PasswordState) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [keyName]: !prevState[keyName],
    }));
  };

  const handleChangePassword = (e: any) => {
    const { name, value } = e.target;
    setPasswordObject({
      ...passwordObject,
      [name]: value,
    });
  };

  const user = useSelector(selectCurrentUser);
  const { access_token } = user.userData.token;
  const [responseToast, setResponseToast] = useState({
    message: "",
    theme: "",
  });
  const [showToast, setShowToast] = useState(false);

  const handleSubmitChangePassword = async (event: any) => {
    event.preventDefault();
    let errors = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    };
    if (CurrentPassword.length < 6) {
      errors.currentPassword =
        "Current password length should at least 6 characters";
    }
    if (CurrentPassword === NewPassword) {
      errors.newPassword =
        "The new password cannot be the same as your current password. ";
    }

    if (NewPassword.length < 6) {
      errors.newPassword = "new password length should at least 6 characters";
    }

    if (!/^(?=.*[0-9])(.{6,})$/.test(NewPassword)) {
      errors.newPassword = "Password should contain at least one number.";
    }

    if (NewPassword !== NewConfirmPassword) {
      errors.confirmNewPassword = "Password Not Matched";
    }

    setErrors(errors);
    if (
      errors.confirmNewPassword.length === 0 &&
      errors.currentPassword.length === 0 &&
      errors.newPassword.length === 0
    ) {
      try {
        const config = {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };

        const result = await axios.post(
          `${process.env.REACT_APP_API_URL}users/update-password`,
          passwordObject,
          config
        );
        const { status, data } = result;

        const { message, theme } = CallToast(status, data);
        setResponseToast({ message, theme });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      } catch (error: any) {
        const errorCode = error.statusCode || 401;
        const errorMessage = "Current Password is Incorrect";
        const { message, theme } = CallToast(errorCode, errorMessage);
        setResponseToast({ message, theme });
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    }
  };

  const HandleCancel = () => {
    setPasswordObject({
      CurrentPassword: "",
      NewPassword: "",
      NewConfirmPassword: "",
    });
  };

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
              <form className="m-1">
                <div className="w-full ">
                  <div className="sm:w-7/12 ">
                    <div className="w-full mx-3 mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none">
                        Current Password<span className="text-black">*</span>
                      </label>
                      <Link
                        className="float-right text-ri-blue sm:mr-0 mr-10 hover:text-black text-sm mt-1"
                        to={"/influencer-app/security/forgot-password"}>
                        Forgot Password ?
                      </Link>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <Key size={16} />
                        </div>
                        <input
                          required
                          name="CurrentPassword"
                          type={
                            showPassword.showCurrentPassword
                              ? "text"
                              : "password"
                          }
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="Password"
                          autoComplete="current-Password"
                          value={CurrentPassword}
                          onChange={handleChangePassword}
                        />

                        <div className="w-4 z-10 marker:text-center flex items-center justify-center">
                          <div
                            onClick={() =>
                              togglePasswordVisibility("showCurrentPassword")
                            }
                            className="cursor-pointer z-10 passwordVisibility">
                            {showPassword.showCurrentPassword ? (
                              <Eye size={16} />
                            ) : (
                              <EyeOff size={16} />
                            )}
                          </div>
                        </div>
                      </div>
                      {errors.currentPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.currentPassword}
                        </span>
                      )}
                    </div>
                    <div className="w-full mx-3 mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none ">
                        New Password<span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <Key size={16} />
                        </div>
                        <input
                          required
                          name="NewPassword"
                          type={
                            showPassword.showNewPassword ? "text" : "password"
                          }
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="Password"
                          autoComplete="new-Password"
                          value={NewPassword}
                          onChange={handleChangePassword}
                        />

                        <div className="w-4 z-10 marker:text-center flex items-center justify-center">
                          <div
                            onClick={() =>
                              togglePasswordVisibility("showNewPassword")
                            }
                            className="cursor-pointer z-10 passwordVisibility">
                            {showPassword.showNewPassword ? (
                              <Eye size={16} />
                            ) : (
                              <EyeOff size={16} />
                            )}
                          </div>
                        </div>
                      </div>
                      {errors.newPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.newPassword}
                        </span>
                      )}
                    </div>
                    <div className="w-full mx-3 mb-3">
                      <label className=" font-semibold px-1  text-ri-blue select-none">
                        Confirm New Password
                        <span className="text-black">*</span>
                      </label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <Key size={16} />
                        </div>
                        <input
                          required
                          name="NewConfirmPassword"
                          type={
                            showPassword.showNewConfirmPassword
                              ? "text"
                              : "password"
                          }
                          className="sm:w-full w-11/12 -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                          placeholder="Password"
                          autoComplete="new-Password"
                          value={NewConfirmPassword}
                          onChange={handleChangePassword}
                        />

                        <div className="w-4 z-10 marker:text-center flex items-center justify-center">
                          <div
                            onClick={() =>
                              togglePasswordVisibility("showNewConfirmPassword")
                            }
                            className="cursor-pointer z-10 passwordVisibility">
                            {showPassword.showNewConfirmPassword ? (
                              <Eye size={16} />
                            ) : (
                              <EyeOff size={16} />
                            )}
                          </div>
                        </div>
                      </div>
                      {errors.confirmNewPassword && (
                        <span className="text-red-500 text-8p first_name">
                          {errors.confirmNewPassword}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center text-center p-4 float-right">
                    <button
                      onClick={handleSubmitChangePassword}
                      className="border-1 rounded w-16 bg-ri-orange px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-black mx-1  font-['Open Sans']">
                      save
                    </button>
                    <button
                      type="button"
                      className="border-1 rounded bg-ri-blue px-2 py-1 text-xs uppercase transform hover:scale-105 duration-150 text-white mx-1  font-['Open Sans']"
                      onClick={HandleCancel}>
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

export default ChangePasswordInfluencer;
