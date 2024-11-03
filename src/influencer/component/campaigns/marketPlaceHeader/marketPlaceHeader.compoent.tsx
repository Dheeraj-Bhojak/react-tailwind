import React, { useState, useRef, useEffect, Fragment } from "react";
import CIcon from "@coreui/icons-react";
import { cilFilter } from "@coreui/icons";

interface FilterAndSortInterface {
  sort: string | null;
  selectFilter: {
    platform: string | null;
    influencer_category: string;
  };
  setSelectFilter: React.Dispatch<
    React.SetStateAction<{
      platform: string | null;
      influencer_category: string;
    }>
  >;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}
const CampaignMarketPlaceHeader: React.FC<FilterAndSortInterface> = ({
  sort,
  setSort,
  selectFilter,
  setSelectFilter,
}) => {
  const [isFilterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setSortDropdownOpen] = useState(false);

  const dropdownFilterRef = useRef<HTMLDivElement>(null);
  const dropdownSortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownFilterRef.current &&
        !dropdownFilterRef.current.contains(event.target as Node) &&
        dropdownSortRef.current &&
        !dropdownSortRef.current.contains(event.target as Node)
      ) {
        setSortDropdownOpen(false);
        setFilterDropdownOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [
    setSortDropdownOpen,
    setFilterDropdownOpen,
    dropdownFilterRef,
    dropdownSortRef,
  ]);

  const toggleFilterDropdown = () => {
    setSortDropdownOpen(false);
    setFilterDropdownOpen(!isFilterDropdownOpen);
  };
  const toggleSortDropdown = () => {
    setFilterDropdownOpen(false);
    setSortDropdownOpen(!isSortDropdownOpen);
  };
  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectFilter({
      ...selectFilter,
      [name]: value,
    });
  };
  const handleSortOptionClick = (option: string) => {
    setSort(option);
    setSortDropdownOpen(false);
  };
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchQuery("");
  };
  return (
    <>
      <div className="">
        <div className="flex justify-center item-center">
          <div className="flex items-center mt-[3px]">
            <form onSubmit={handleSearchSubmit} className="ml-2">
              <input
                type="text"
                placeholder=" search campaigns..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                className="border rounded-lg p-1 mr-1 outline-none lg:min-w-[220px] xl:min-w-[420px]"
              />
              <button
                type="submit"
                className="bg-ri-blue text-white py-1 px-2 rounded-md">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>
          <div
            className="relative inline-block m-1 text-white"
            ref={dropdownFilterRef}>
            <button
              className="py-1 px-2 mt-1 bg-ri-blue border-0 cursor-pointer rounded-lg"
              onClick={toggleFilterDropdown}>
              Filter
              <CIcon icon={cilFilter} size="sm" className="ml-2" />
            </button>
            {isFilterDropdownOpen && (
              <div className="block absolute w-48 text-black bg-[#f9f9f9] shadow-md z-10 p-[8px]">
                <h1 className="font-bold mb-2">Platform</h1>

                <div className="filter-options flex flex-wrap mx-auto">
                  <label
                    className={`p-2  cursor-pointer min-w-[40px] flex justify-center items-center `}>
                    <input
                      type="radio"
                      name="platform"
                      value="instagram"
                      className="hidden"
                      onChange={handleChangeFilter}
                    />
                    <i
                      className={`fa-brands fa-instagram text-5xl ${
                        selectFilter.platform === "instagram"
                          ? " bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 via-red-400 to-indigo-700"
                          : ""
                      }`}></i>
                  </label>
                  <label
                    className={`p-2  cursor-pointer min-w-[40px] flex justify-center items-center`}>
                    <input
                      type="radio"
                      name="platform"
                      value="youtube"
                      className="hidden"
                      onChange={handleChangeFilter}
                    />
                    <i
                      className={`fa-brands fa-youtube text-5xl   ${
                        selectFilter.platform === "youtube"
                          ? " text-[#ff0000]"
                          : ""
                      }`}></i>
                  </label>
                </div>
              </div>
            )}
          </div>

          <div
            className="relative inline-block m-1 text-white"
            ref={dropdownSortRef}>
            <button
              className="flex py-1 px-2 mt-1 bg-ri-blue text-[16px]  border-0 cursor-pointer rounded-lg"
              onClick={toggleSortDropdown}>
              Sort By
              <i className="fa-solid fa-arrow-up-long ml-2 mt-[2px]"></i>
              <i className="fa-solid fa-arrow-up-long fa-rotate-180 mt-[2px]"></i>
            </button>
            {isSortDropdownOpen && (
              <div className="absolute w-48 bg-gray-100 text-gray-700 shadow-md  border">
                <div
                  className="cursor-pointer font-semibold hover:bg-slate-300 px-4 py-2 border-b-1"
                  onClick={() => handleSortOptionClick("newest-first")}>
                  Latest first
                </div>
                <div
                  className="cursor-pointer font-semibold hover:bg-slate-300 px-4 py-2"
                  onClick={() => handleSortOptionClick("oldest-first")}>
                  Oldest first
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CampaignMarketPlaceHeader;
