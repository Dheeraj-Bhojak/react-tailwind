import React from "react";
import HeadingHeader from "../../global_component/headingHeader/headingHeader.componet";
const Refund: React.FC = () => {
  const heading = {
    title: "Refund Policy",
    timeStamp: "Last Updated: October 01, 2023",
  };
  return (
    <div className="w-full bg-slate-100 pb-20 min-h-screen ">
      <HeadingHeader Heading={heading} />
      <div className="w-6/12 flex flex-col justify-center items-center m-auto">
        <p className="text-lg mt-4 font-normal text-gray-600">
          As our services are provided by third-party service providers, we
          regret to inform you that we cannot accommodate any refunds or
          cancellations once the payment has been processed.
        </p>
        <p className="text-lg mt-4 font-normal text-gray-600">
          If you have any questions or concerns about our Return and
          Cancellation Policies, please don&#39;t hesitate to reach out to us at
          support@qikgro.com. We&#39;ll be happy to assist you.
        </p>
      </div>
    </div>
  );
};
export default Refund;
