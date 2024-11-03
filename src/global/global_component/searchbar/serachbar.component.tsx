import React, { useState } from "react";

const SearchBarComponent: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("All");
  const [searchInput, setSearchInput] = useState<string>("");

  const handleOptionChange = (concept: string) => {
    setSelectedOption(concept);
  };

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearchSubmit = () => {
    alert("Search?"); // You can perform the actual search action here
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center mt-10">
        <div className="w-3/4">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">
                {/* You can change the icon here */}
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M9.293 9.293a1 1 0 011.414 0l4 4a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <input
              type="text"
              className="form-input py-3 pl-10 block w-full rounded-md sm:text-sm sm:leading-5"
              placeholder="Search"
              value={searchInput}
              onChange={handleSearchInput}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBarComponent;
