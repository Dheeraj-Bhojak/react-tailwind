import React from "react";

interface SeeAllFeaturesComponentProps {
  closeModal: () => void;
}

const tableData = {
  headers: [
    {
      th: "Features",
      tds: [
        "200M+ influencers",
        "Social Networks",
        "No. of Searches",
        "Monthly Results",
        "Influencer Filters",
        "Audience Filters",
        "Content Filters",
        "Advanced Filters",
        "Save Your Searches",
      ],
    },
    {
      th: "Basic",
      tds: [
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        "1",
        "Unlimited",
        "2000",
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
      ],
    },
    {
      th: "Pro",
      tds: [
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        "All",
        "Unlimited",
        "3000",
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
        <span key="check">
          <i className="fa-solid fa-check text-[#4267B2]"></i>
        </span>,
      ],
    },
  ],
};

const SeeAllFeaturesComponent: React.FC<SeeAllFeaturesComponentProps> = ({
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-4 rounded-md w-[90%] md:w-[70%] lg:w-[50%] 2xl:w-[40%] xl:mt-20 2xl:mt-0">
        <p className="font-medium text-lg 2xl:text-xl">Discover</p>
        <button className="absolute top-5 mr-5 self-start" onClick={closeModal}>
          <i className="fa-solid fa-x text-xl"></i>
        </button>
        <div>
          <table className="w-full mt-3 border-1 rounded-md">
            <thead>
              <tr>
                {tableData.headers.map((header, index) => (
                  <th key={index} className="text-sm 2xl:text-base text-center">
                    {header.th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-none">
              <tr>
                {tableData.headers.map((header, index) => (
                  <td key={index} className="border-b-1 text-center">
                    {header.tds.map((td, idx) => (
                      <div
                        key={idx}
                        className={
                          idx === header.tds.length - 1
                            ? ""
                            : "border-b-1 border-dashed"
                        }>
                        <p className="text-sm 2xl:text-base py-2">{td}</p>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SeeAllFeaturesComponent;
