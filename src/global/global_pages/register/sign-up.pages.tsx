import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { bindActionCreators } from "redux";

import CIcon from "@coreui/icons-react";
import { cilUser, cilLockLocked, cilEnvelopeClosed } from "@coreui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ResetErrorsActions, registerUserActions } from "../../../utils";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../global_component/buttons/button.component";
import "./sign-up.styles.css";
const defaultRegisterFields = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "Influencer",
};
interface Errors {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
}
const RegistrationForm: React.FC = () => {
  const [registerFields, setRegisterFields] = useState(defaultRegisterFields);
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.userData !== null && user.userData.user.is_active === false) {
      navigate("otp-verification");
    } else if (
      user.userData !== null &&
      user.userData.user.is_active === true
    ) {
      navigate("/influencer-app/profile");
    }
  }, [user.userData]);

  const dispatch = useDispatch();
  const { ResetErrors } = bindActionCreators(ResetErrorsActions, dispatch);
  const { registerUser } = bindActionCreators(registerUserActions, dispatch);

  const { first_name, last_name, email, password, confirmPassword, role } =
    registerFields;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const resetFormFields = () => {
    setRegisterFields(defaultRegisterFields);
  };

  const handleChangeRegister = (e: any) => {
    const { name, value } = e.target;
    setRegisterFields({
      ...registerFields,
      [name]: value,
    });
  };
  const handleSubmitRegister = async (event: any) => {
    event.preventDefault();
    ResetErrors();
    let errors = {
      first_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
    };
    setErrors(errors);

    //first name length must > 2
    if (first_name.length < 2) {
      errors.first_name = "First name should contain at least 2 characters.";
    }
    //email format
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      errors.email = "Invalid Email format";
    }
    if (!/^(?=.*[0-9])(.{6,})$/.test(password)) {
      errors.password =
        "Password should contain at least one Uppercase letter and one number.";
    }
    if (!role) {
      errors.role = "Select please role";
    }
    if (password.length < 6) {
      errors.password = "Password should contain at least 6 characters";
    }
    if (password !== confirmPassword) {
      errors.confirmPassword = "Password Not Matched";
    }

    if (
      errors.first_name.length === 0 &&
      errors.password.length === 0 &&
      errors.confirmPassword.length === 0
    ) {
      try {
        registerUser(first_name, last_name, email, password, role);
        resetFormFields();
      } catch (error) {}
    } else {
      setErrors(errors);
    }
  };

  useEffect(() => {
    if (user.error !== null) {
      if (user.error !== null && user.error.status === 409) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: user.error.message,
        }));
      }
      if (user.error !== null && user.error.status === 401) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: user.error.message,
        }));
      }
    }
  }, [user]);

  const handleEnterKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleSubmitRegister(event);
    }
  };
  return (
    <>
      <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-100">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-ri-blue py-10 px-10"></div>
            <form className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">REGISTER</h1>
                <p>Enter your information to register</p>
              </div>
              <div>
                <div className="switches-container">
                  <input
                    type="radio"
                    id="switchInfluencer"
                    name="role"
                    value="Influencer"
                    checked={role === "Influencer"}
                    onChange={handleChangeRegister}
                  />
                  <input
                    type="radio"
                    id="switchMarketer"
                    name="role"
                    value="Marketer"
                    onChange={handleChangeRegister}
                  />
                  <label htmlFor="switchInfluencer">Influencer</label>
                  <label htmlFor="switchMarketer">Marketer</label>
                  <div className="switch-wrapper">
                    <div className="switch">
                      <div>Influencer</div>
                      <div>Marketer</div>
                    </div>
                  </div>
                  <div className="switch-wrapper">
                    <div className="switch">
                      <div>Influencer</div>
                      <div>Marketer</div>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-1/2 px-3 mb-1">
                    <label className="text-xs font-semibold px-1">
                      First name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <CIcon icon={cilUser} className="text-black" />
                      </div>
                      <input
                        name="first_name"
                        value={first_name}
                        onChange={handleChangeRegister}
                        onKeyDown={handleEnterKeyPress}
                        required
                        type="text"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                        placeholder="John"
                      />
                    </div>
                    {errors.first_name && (
                      <span className="text-red-500 text-8p first_name">
                        {errors.first_name}
                      </span>
                    )}
                  </div>
                  <div className="w-1/2 px-3 mb-1">
                    <label className="text-xs font-semibold px-1">
                      Last name
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <CIcon icon={cilUser} className="text-black" />
                      </div>
                      <input
                        type="text"
                        name="last_name"
                        value={last_name}
                        onChange={handleChangeRegister}
                        onKeyDown={handleEnterKeyPress}
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                        placeholder="Smith"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-1">
                    <label className="text-xs font-semibold px-1">Email</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <CIcon
                          icon={cilEnvelopeClosed}
                          className="text-black"
                        />
                      </div>
                      <input
                        name="email"
                        value={email}
                        onChange={handleChangeRegister}
                        onKeyDown={handleEnterKeyPress}
                        required
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                        placeholder="johnsmith@example.com"
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500 text-8p email">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <label className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <CIcon icon={cilLockLocked} className="text-black" />
                      </div>
                      <input
                        required
                        name="password"
                        value={password}
                        onChange={handleChangeRegister}
                        type={showPassword ? "text" : "password"}
                        className="w-full -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                        placeholder="Password"
                        autoComplete="new-Password"
                        onKeyDown={handleEnterKeyPress}
                      />
                      <div className="w-4 z-10 marker:text-center flex items-center justify-center">
                        <div
                          onClick={togglePasswordVisibility}
                          className="cursor-pointer z-10 passwordVisibility">
                          {showPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye"
                              viewBox="0 0 16 16">
                              {" "}
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye-slash"
                              viewBox="0 0 16 16">
                              {" "}
                              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />{" "}
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />{" "}
                              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />{" "}
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    {errors.password && (
                      <span className="text-red-500 text-8p password">
                        {errors.password}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-2">
                    <label className="text-xs font-semibold px-1">
                      Confirm Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <CIcon icon={cilLockLocked} className="text-black" />
                      </div>
                      <input
                        required
                        value={confirmPassword}
                        onChange={handleChangeRegister}
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full -ml-10 pl-10 -mr-10 pr-0 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-ri-orange"
                        placeholder="Re-type Password"
                        autoComplete="new-Password"
                        onKeyDown={handleEnterKeyPress}
                      />
                      <div className="w-4 z-10 marker:text-center flex items-center justify-center">
                        <div
                          onClick={toggleConfirmPasswordVisibility}
                          className="cursor-pointer z-10">
                          {showConfirmPassword ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye z-10"
                              viewBox="0 0 16 16">
                              {" "}
                              <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                              <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-eye-slash"
                              viewBox="0 0 16 16">
                              {" "}
                              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />{" "}
                              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />{" "}
                              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />{" "}
                            </svg>
                          )}
                        </div>
                      </div>
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-8p confirmPasswordError">
                        {errors.confirmPassword}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-sm">
                    Already have an Account ?
                    <Link
                      to={"/login"}
                      className="underline text-blue-400 pl-1">
                      login
                    </Link>
                  </p>
                </div>
                <div className=" rounded-t-lg p-4">
                  <p className="text-xl text-center underline mb-7">OR</p>
                  <p className="text-center text-sm font-semibold text-gray-700 ">
                    Sign up with
                  </p>
                  <div>
                    <div className="flex items-center justify-center space-x-4 mt-3">
                      <button className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        <svg viewBox="0 0 16 16" className="w-6 h-6 mr-3">
                          <path
                            fill="#3b5998"
                            fillRule="evenodd"
                            d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                        </svg>
                        Facebook
                      </button>
                      <button className="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48">
                          <path
                            fill="#fbc02d"
                            d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                          />
                          <path
                            fill="#e53935"
                            d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
                          />
                          <path
                            fill="#4caf50"
                            d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                          />
                          <path
                            fill="#1565c0"
                            d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                          />
                        </svg>
                        Google
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-1">
                    <Button
                      buttonType={BUTTON_TYPE_CLASSES.pressButton}
                      type="submit"
                      onClick={handleSubmitRegister}
                      className="block w-full max-w-xs mx-auto  px-3 py-3 font-semibold">
                      REGISTER NOW
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
