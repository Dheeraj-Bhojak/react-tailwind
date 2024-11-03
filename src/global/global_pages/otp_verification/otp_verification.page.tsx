import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { GetProfileDataAction } from "../../../utils";

const OtpVerification: React.FC = () => {
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(6).fill(null));

  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { GetProfileData } = bindActionCreators(GetProfileDataAction, dispatch);

  useEffect(() => {
    if (user.userData !== null && user.userData.user.is_active === true) {
      if (user.userData.user.role === "Influencer") {
        navigate("/influencer-app/profile");
      } else if (user.userData.user.role === "Marketer") {
        navigate("/marketer-app/profile");
      } else if (user.userData.user.role === "Admin") {
        navigate("/admin-app/profile");
      }
    } else if (user.userData === null) {
      navigate("/");
    }
  }, [user.userData]);
  const handleDigitChange = (index: number, value: string) => {
    if (value.match(/^\d*$/)) {
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);

      if (index < 5 && value !== "") {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Backspace") {
      if (index > 0) {
        handleDigitChange(index, "");
        inputRefs.current[index - 1]?.focus();
      } else if (index === 0 && otpDigits[index] === "") {
        inputRefs.current[index]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const otp = otpDigits.join("");

    if (user.userData !== null && user.userData.token.access_token !== null) {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}users/verify-otp`,
        { otp },
        {
          headers: {
            Authorization: `Bearer ${user.userData.token.access_token}`,
          },
        }
      );
      if (data && data.status === 202) {
        const { access_token } = user.userData.token;
        // GetProfileData(access_token);

        if (user.userData.user.role === "Influencer") {
          navigate("/influencer-app/profile");
        } else if (user.userData.user.role === "Marketer") {
          navigate("/marketer-app/profile");
        } else if (user.userData.user.role === "Admin") {
          navigate("/admin-app/profile");
        }
      }
    }

    // Clear the OTP input fields
    setOtpDigits(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };

  return (
    <>
      <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-100">
          <div className="md:flex w-full">
            <div className="hidden md:block w-1/2 bg-ri-blue py-10 px-10">
              <h1 className="text-white  text-3xl">
                Lorem ipsum dolor sit consectetur adipisicing elit.
              </h1>
            </div>
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="text-2xl font-bold">OTP Verification</h1>
                <div className="flex flex-col mt-4">
                  <span>Enter the OTP you received at</span>
                  <span className="font-bold">Email</span>
                </div>
                <div className="flex justify-center py-6">
                  {otpDigits.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      value={digit}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyUp={(e) => handleKeyDown(index, e)}
                      className="w-10 h-10 text-center border rounded-md mr-2 focus:outline-none focus:ring focus:border-blue-300"
                      maxLength={1}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                  ))}
                </div>
                <div className="item-center">
                  <div className="w-full px-3 mb-5">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="block w-full max-w-xs  uppercase mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">
                      verify
                    </button>
                  </div>
                </div>
                <div className="flex justify-center text-center mt-5">
                  <Link
                    to={"/"}
                    className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                    <span className="font-bold">Resend OTP</span>
                    <i className="bx bx-caret-right ml-1"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OtpVerification;
