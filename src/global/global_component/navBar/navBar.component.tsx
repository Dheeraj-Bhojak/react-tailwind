import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LogoImg from "../../../assets/images/new/logo-quickGrow1.png";
import { selectCurrentUser } from "../../../utils/selectors/user.selectors";
import { bindActionCreators } from "redux";
import { userLogOutActions } from "../../../utils";
import NavProfileDropDown from "../navProfie/navProfile.component";
import defaultUserPicture from "../../../assets/images/avatars/user.png";
import Button from "../buttons/button.component";
import { BUTTON_TYPE_CLASSES } from "../buttons/button.component";
import { socialIcons } from "../../../seeder";
import _ from "lodash";
import { title } from "process";

export interface Category {
  title: string;
  _id: string;
}
interface MenuItem {
  id: number;
  title: string;
  to: string;
  active: boolean;
}
interface MarketerLayoutProps {
  navigationMenus: MenuItem[];
}

//default login state value
const defaultFields = {
  searchInfluencer: "",
  searchPlatform: "",
};

const Navbar: React.FC<MarketerLayoutProps> = ({ navigationMenus }) => {
  const [isOpen, setIsOpen] = useState(false); // for hemburger open or close

  //toggle open the hemburger
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [searchValue, setSearchValue] = useState(defaultFields);

  const handleChangeSearch = (e: any) => {
    const { name, value } = e.target;
    setSearchValue({
      ...searchValue,
      [name]: value,
    });
  };

  const dispatch = useDispatch();
  const { userLogOut } = bindActionCreators(userLogOutActions, dispatch);

  const handleLogOut = () => {
    userLogOut();
  };
  const { userData } = useSelector(selectCurrentUser);

  const [query, setQuery] = useState("");
  const handleSubmit = () => {};
  const [openCate, setOpenCat] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const category = () => {
    setOpenCat(!openCate);
    setDropdown(false);
  };
  const [selctedCat, setSelectedCat] = useState("all categories");
  const handleCategory = (id: string) => {};
  const categories = [
    { _id: "all categories", title: "all categories" },
    { _id: "instagram", title: "instagram" },
    { _id: "facebook", title: "facebook" },
    { _id: "twitter", title: "twitter" },
    { _id: "youtube", title: "youtube" },
  ];
  return (
    <>
      <nav className="relative z-50 py-3 flex justify-between bg-ri-blue lg:items-center ">
        <div className="flex items-center  lg:mx-2 w-full sm:right-0 text-gray-100 lg:w-2/12  hover:text-amber-300">
          <Link to="/" className="item-center">
            <img
              src={LogoImg}
              alt=""
              className="logo self-center font-extrabold	text-xl  ml-10 h-10"
            />
          </Link>
        </div>

        <div className="lg:hidden">
          <button className="navbar-burger ml-5 p-3" onClick={toggleMenu}>
            <svg
              className="block h-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <title>menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <div className="w-10/12">
          <ul
            className={`hidden lg:w-9/12 font-medium absolute p-4 top-1/2  transform -translate-y-1/2 translate-x-1/12 lg:float-right lg:flex lg:space-x-6 ${
              isOpen ? "flex" : ""
            }`}>
            <li className="search-bar 2xl:w-[70%] lg:w-[60%] focus:outline-none focus:border-blue-500">
              <form onSubmit={handleSubmit}>
                <div className="relative hidden sm:flex">
                  <button
                    id="dropdown-button"
                    data-dropdown-toggle="dropdown"
                    className="flex-shrink-0 hidden z-10 md:flex items-center py-1 px-4 text-sm font-medium text-center  rounded-l-lg text-gray-900 bg-gray-100 hover:bg-gray-200  focus:outline-none focus:ring-gray-100"
                    type="button"
                    onClick={category}>
                    {" "}
                    {selctedCat === "all categories" ? (
                      "All categories "
                    ) : (
                      <img
                        src={socialIcons[selctedCat]}
                        loading="lazy"
                        width="24"
                        height="24"
                        alt={`${socialIcons[selctedCat]}`}
                        className="ml-1 inline"
                      />
                    )}
                  </button>
                  {openCate && (
                    <div
                      className="absolute left-0 top-10 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black  focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button">
                      <div className="py-1" role="none">
                        {categories &&
                          categories.map((cat: Category) => (
                            <div
                              onClick={() => {
                                handleCategory(cat?._id);
                                setSelectedCat(cat?.title);
                              }}
                              key={cat?._id}
                              className="hover:text-black  hover:bg-gray-200 bg-opacity-90 pl-5 my-2 fill-gradient-instagram cursor-pointer">
                              {cat?.title === "all categories" ? (
                                "All categories "
                              ) : (
                                <Fragment>
                                  <img
                                    src={socialIcons[cat?.title]}
                                    loading="lazy"
                                    width="24"
                                    height="24"
                                    alt={`${socialIcons[cat?.title]}`}
                                    className="ml-1 inline"
                                  />
                                  <span className="ml-2">
                                    {_.capitalize(cat?.title)}
                                  </span>
                                </Fragment>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                  <div className="relative w-full">
                    <input
                      onChange={(e) => setQuery(e.target.value)}
                      value={query}
                      type="search"
                      id="search-dropdown"
                      className="block outline-none border-none p-1.5  w-full z-20 text-md md:rounded-l-none rounded-lg rounded-r-lg focus:border-ri-orange"
                      placeholder="Find Influencer"
                      required
                    />
                    <button
                      type="submit"
                      className="group bg-[#fdc100] absolute top-0 right-0  px-3 text-sm font-medium h-full text-white rounded-r-lg">
                      <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                  </div>
                </div>
              </form>
            </li>

            {navigationMenus.map((menuItem) => (
              <li key={menuItem.id} className="text-white ">
                <Link
                  to={menuItem.to}
                  className="relative py-2 pl-3 pr-4 flex md:p-0 hover:text-[#f2f2f2] hover-underline "
                  aria-current="page">
                  {menuItem.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-3">
            <ul className=" flex justify-end items-end">
              <Fragment>
                {userData ? (
                  <div className="mx-2">
                    <NavProfileDropDown
                      LogOut={handleLogOut}
                      role={userData.user.role}
                      profile_picture={
                        userData &&
                        userData.user &&
                        userData.user.profile_picture !== null
                          ? userData.user.profile_picture
                          : defaultUserPicture
                      }
                    />
                  </div>
                ) : (
                  <div className="rounded-sm ">
                    <Link to="/login">
                      <Button
                        buttonType={BUTTON_TYPE_CLASSES.slideLeftButtonYellow}
                        className="peer px-5 m-0 py-1  flex-auto border-1 border-ri-orange bg-[#fdc100] hover:bg-amber-400 rounded slideleft bouncein">
                        <span className="text-sm">Login</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </Fragment>
            </ul>
          </div>
        </div>

        {isOpen && (
          <div className="navbar-menu relative z-50">
            <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
              <div className="flex items-center mb-8">
                <Link to="#" className="flex items-center mr-auto">
                  {/* {logo} */}
                  <h1 className=" self-center font-extrabold	text-2xl whitespace-nowrap  hover:text-amber-300">
                    QikGro
                  </h1>
                </Link>
                <button className="navbar-close" onClick={toggleMenu}>
                  <svg
                    className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div id="mobile-menu-2">
                <ul>
                  {navigationMenus.map((MenuItem) => (
                    <li key={MenuItem.id} className="mb-1">
                      <Link
                        className="block p-4 text-sm font-semibold text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                        to={MenuItem.to}>
                        {MenuItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              {!userData ? (
                <div className="mt-auto">
                  <Link
                    className="block py-3 px-6 mb-4 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
                    to="/login">
                    Sign In
                  </Link>
                  <Link
                    className="block py-3 px-6 bg-indigo-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
                    to="/register">
                    Sign Up
                  </Link>
                </div>
              ) : (
                ""
              )}
            </nav>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
