import CIcon from "@coreui/icons-react";
import { cilCheckAlt } from "@coreui/icons";
import { Link } from "react-router-dom";

const Pricing: React.FC = () => {
  //all subscription plan list data array
  const SubscriptionList = [
    {
      id: 1,
      title: "first Pack",
      price: 5,
      planDetails: ["Lorem ipsum", "Dolor sit amet`"],
      styles: "md:my-6",
    },
    {
      id: 2,
      title: "second Pack",
      price: 15,
      planDetails: [
        "Lorem ipsum",
        "Dolor sit amet`",
        " Consectetur",
        " Adipisicing",
      ],
      styles: " md:relative md:z-50 md:-mx-3 md:mb-0",
    },
    {
      id: 3,
      title: "third Pack",
      price: 35,
      planDetails: [
        "Lorem ipsum",
        " Dolor sit amet",
        " Consectetur",
        " Adipisicing",
        "Elit repellat",
        " Much more",
      ],
      styles: "md:my-6",
    },
  ];

  return (
    <>
      <div className="pricing w-full mx-auto bg-gray-200 px-5 py-10 text-gray-600">
        <div className="text-center max-w-xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-5 text-indigo-600">
            Pricing
          </h1>
          <h3 className="pricing-text text-xl font-medium mb-10">
            Lorem ipsum dolor sit amet consectetur adipisicing elit repellat
            dignissimos laboriosam odit accusamus porro
          </h3>
        </div>
        <div className="max-w-4xl mx-auto md:flex">
          {SubscriptionList.map((items) => (
            <div
              key={items.id}
              className={`w-full md:w-1/3 md:max-w-none bg-gray-100 px-8 md:px-10 py-8 md:py-10 mb-3 mx-auto rounded-md shadow-lg shadow-gray-600 md:flex md:flex-col ${items.styles}`}>
              <div className="w-full flex-grow">
                <h2 className="text-center font-bold uppercase mb-4">
                  {items.title}
                </h2>
                <h3 className="text-center font-bold text-4xl mb-5 text-indigo-600">
                  ${items.price}/mo
                </h3>
                <ul className="text-sm content-center mb-8">
                  {items.planDetails.map((detail, idx) => (
                    <li key={idx} className="leading-tight">
                      <CIcon icon={cilCheckAlt} className="nav-icon" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full">
                <Link to="/">
                  <button className="font-bold text-white bg-indigo-600 hover:text-black hover:bg-amber-300 rounded-md px-10 py-2 transition-colors w-full">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Pricing;
