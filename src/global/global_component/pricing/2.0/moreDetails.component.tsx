import React from "react";

interface MoreDetailsComponentProps {
  closeModal: () => void;
}

const tableData = {
  headers: [
    {
      th: "Influencer storage",
      tds: [
        "First 100",
        "101 - 500",
        "501 - 1000",
        "1001 - 2000",
        "2001 - 5000",
        "5000+",
      ],
    },
    {
      th: "Billed at",
      tds: [
        "₹0",
        "₹20000 per 100",
        "₹15000 per 100",
        "₹10000 per 100",
        "₹7000 per 100",
        "Contact Us",
      ],
    },
  ],
};

const MoreDetailsComponent: React.FC<MoreDetailsComponentProps> = ({
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="relative bg-white p-4 rounded-md text-center w-[90%] md:w-[70%] lg:w-[40%] 2xl:w-[20%] xl:mt-20 2xl:mt-0">
        <p className="font-medium text-sm 2xl:text-base">Discover | Basic</p>
        <button className="absolute top-5 mr-5 self-start" onClick={closeModal}>
          <i className="fa-solid fa-x text-xl"></i>
        </button>
        <p className="font-medium text-lg 2xl:text-xl mt-3">Monthly Results</p>
        <p className="text-sm 2xl:text-base mt-3">
          Access up to 1,000 search results monthly, either in one search or
          multiple searches of 100 results each. Adjust your tier before
          renewal, with upgrades available anytime. Cancel anytime, retaining
          access to remaining results until subscription end. Renewal updates
          results monthly.
        </p>
        <div>
          <table className="w-full mt-3 border-1 border-black">
            <thead>
              <tr>
                {tableData.headers.map((header, index) => (
                  <th
                    key={index}
                    className="text-sm 2xl:text-base border-black  "
                  >
                    {header.th}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-none">
              <tr>
                {tableData.headers.map((header, index) => (
                  <td key={index} className="border-b-1 border-black">
                    {header.tds.map((td, idx) => (
                      <div
                        key={idx}
                        className={
                          idx === header.tds.length - 1
                            ? ""
                            : "border-b-1 border-dashed"
                        }
                      >
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

export default MoreDetailsComponent;
