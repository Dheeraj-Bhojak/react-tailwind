import { cilCloudDownload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import React, { Fragment, useState } from "react";

const EarningHistory: React.FC = () => {
  const transactions = [
    {
      id: 1,
      date: "21-12-2024 at 17:55",
      transferredBy: "Lorem ipsum dolor sit amet.",
      amount: "+234",
      transId: "3546-2463-3434-344",
    },
  ];
  const [searchString, setSearchString] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelection = (selectedOption: React.SetStateAction<string>) => {
    console.log("Selected option:", selectedOption);
  };

  const handleSelect = (option: React.SetStateAction<string>) => {
    setSelectedOption(option);
    handleSelection(option);
    setIsOpen(false);
  };
  const options = [
    { label: "3 Months", value: "90" },
    { label: "1 Year", value: "365" },
    { label: "2 Years", value: "730" },
  ];
  return (
    <Fragment>
      <div className="container mt-0">
        <h1>Earning History</h1>
        <div className="w-full">
          <div className="flex items-center">
            <h2 className="font-bold">Total Earning:</h2>
            <p className="ml-4 text-2xl font-bold text-ri-blue">{"₹345"}</p>
          </div>
        </div>
        <hr />
        <div className="w-full">
          <div className=" w-full flex justify-center">
            <div className=" w-[60%] rounded-md min-h-32 p-1 mb-2 flex">
              <div className="w-[80%] flex items-center relative">
                <i className="fa-solid fa-magnifying-glass absolute left-2 text-ri-blue"></i>
                <input
                  type="text"
                  className="border-1 outline-ri-orange w-full px-8 rounded-lg py-2 text-sm"
                  placeholder="Search Transaction Id"
                />
                <i className="fa-solid fa-x absolute text-xs cursor-pointer right-3"></i>
              </div>

              {/* <button className="mx-auto border-1 px-2 rounded-md text-sm">
                Filter
              </button> */}
              <div className="relative inline-block mx-auto">
                <button
                  className="w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md shadow-sm"
                  onClick={() => setIsOpen(!isOpen)}>
                  {selectedOption || "Select a Option"}
                </button>
                {isOpen && (
                  <div className="absolute z-10 h-32 w-48 overflow-scroll mt-2 bg-white border border-gray-300 rounded-md shadow-lg ">
                    {options.map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        <input
                          type="radio"
                          name="dropdown-radio"
                          value={option.value}
                          checked={selectedOption === option.value}
                          onChange={() => handleSelect(option.value)}
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <hr className="w-[60%]" />
          </div>
          <ul className="mt-2">
            {transactions.map((transaction, index) => {
              return (
                <div
                  className="w-full flex justify-center items-center"
                  key={index}>
                  <li className="flex border-b-1 md:w-[70%] w-full rounded-md bg-gray-50 min-h-32 mt-2 shadow-sm p-4 ">
                    <div className="w-2/12">
                      <p className="text-lg font-bold text-ri-blue text-center">
                        {transaction.amount}
                      </p>
                    </div>
                    <div className="w-6/12">
                      <p className="text-sm items-center flex">
                        {transaction.transferredBy}
                      </p>
                      <p className="text-xs text-[#b1b1b1]">
                        {transaction.transId}
                      </p>
                    </div>
                    <div className="w-4/12 justify-end items-center flex">
                      <p className="text-[10px] mx-2 ">{transaction.date}</p>
                      <CIcon
                        icon={cilCloudDownload}
                        className="me-2 text-lg hover:cursor-pointer"
                      />
                    </div>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default EarningHistory;
