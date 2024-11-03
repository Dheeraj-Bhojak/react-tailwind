import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { useNavigate } from "react-router-dom";
import _ from "lodash";

interface SubscriptionButtonInterface {
  planId: string;
  isPopular: boolean;
  buttonName: string;
}

const SubscriptionButton: React.FC<SubscriptionButtonInterface> = ({
  planId,
  isPopular,
  buttonName,
}) => {
  const user = useSelector(selectCurrentUser);
  const userData = user.userData;

  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/register");
  };
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handleStartYourTrialPress = async (plan_id: string) => {
    const { access_token } = user.userData.token;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const headers = {
      authorization: `Bearer ${access_token}`,
    };
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}payment/subscription`,
      { plan_id },
      { headers }
    );
    if (!result) {
      return;
    }
    const { id } = result.data;
    const { name, description } = result.data.notes;
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      subscription_id: id,
      currency: "INR",
      name,
      description,
      handler: async function (response: any) {
        console.log("response", response);
        const data = {
          razorpayPaymentId: response.razorpay_payment_id,
          razorpaySubscriptionId: response.razorpay_subscription_id,
          razorpaySignature: response.razorpay_signature,
          razorpayPlanId: plan_id,
        };
        const result = await axios.post(
          `${process.env.REACT_APP_API_URL}payment/verification`,
          data,
          { headers }
        );
        alert(result.data.msg);
      },
      theme: {
        color: ["#4267B2"],
      },
    };
    const Razorpay = (window as any).Razorpay;
    const paymentObject = new Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
      {userData ? (
        <button
          className={` w-full p-2 rounded-lg text-white ${
            isPopular ? "bg-ri-orange" : "bg-ri-blue"
          }`}
          onClick={() => {
            handleStartYourTrialPress(planId);
          }}>
          <p className="text-sm">{_.toUpper(buttonName)}</p>
        </button>
      ) : (
        <button
          className="bg-[#4267B2] w-full p-2 rounded-lg text-white"
          onClick={() => {
            handleNavigate();
          }}>
          <p className="text-sm">{_.toUpper(buttonName)}</p>
        </button>
      )}
    </>
  );
};

export default SubscriptionButton;
