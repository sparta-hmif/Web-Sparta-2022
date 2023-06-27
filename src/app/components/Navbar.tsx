import { useState } from "react";
import React from "react";
import Dropdown from "@/components/Dropdown";

const dataPage = [
  {
    name: "Home",
  },
  {
    name: "Tab 1",
  },
  {
    name: "Tab 2",
  },
];
const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState("USERNAME");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  // Dropdown for each button
  const [isDHomeOpen, setisDHomeOpen] = useState(false);
  const [isDTab1Open, setisDTab1Open] = useState(false);
  const [isDTab2Open, setisDTab2Open] = useState(false);

  const toggleDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleHome = () => {
    setisDHomeOpen(!isDHomeOpen);
  };
  const toggeltab1 = () => {
    setisDTab1Open(!isDTab1Open);
  };

  const toggeltab2 = () => {
    setisDTab2Open(!isDTab2Open);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsUserDropdownOpen(false);
  };
  return (
    <div className="w-full text-h5 font-koulen text-primaryDark-400 bg-primary-400">
      <div className="px-8 relative items-center flex flex-row justify-between">
        <div className="flex flex-row items-center justify-between gap-20">
          <img
            className="relative h-[90%] py-2"
            alt="Logo"
            src="/images/Logo/Logo.svg"
          />
          <div className="flex flex-row items-start justify-start gap-20  ">
            <div className="">
              <button
                id="dropdownHoverButton"
                data-dropdown-toggle="dropdownHover"
                data-dropdown-trigger="hover"
                className="relative inline-block hover:bg-primaryDark-300 hover:text-primary-300 p-2 rounded-md"
                onMouseOver={() => setisDHomeOpen(true)}
              >
                Home
              </button>
              <div
                className={`absolute mt-2 w-[10%] bg-primary-400 divide-y divide-gray-100 rounded-lg shadow  ${
                  isDHomeOpen ? "block" : "hidden"
                }`}
                onMouseLeave={() => setisDHomeOpen(false)}
              >
                <div className="absolute h-[6.67%] w-full top-[0.1%] bg-primaryDark-400" />
                <ul
                  className="py-2 text-sm "
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <button
                      // onClick={() => handleOptionSelect("Lorem Ipsum")}
                      className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                    >
                      Lorem ipsum
                    </button>
                  </li>
                  <li>
                    <button
                      // onClick={() => handleOptionSelect("Lorem Ipsum")}
                      className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                    >
                      Lorem ipsum
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="relative inline-block hover:bg-primaryDark-300 hover:text-primary-300 p-2 rounded-md"
              onMouseOver={()=>setisDTab1Open(true)}
            >
              Tab 1
              </button>
              <div
                className={`absolute mt-2 w-[10%] bg-primary-400 divide-y divide-gray-100 rounded-lg shadow  ${
                  isDTab1Open ? "block" : "hidden"
                }`}
                onMouseLeave={() => setisDTab1Open(false)}
              >
                <div className="absolute h-[6.67%] w-full top-[0.1%] bg-primaryDark-400" />
                <ul
                  className="py-2 text-sm "
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <button
                      // onClick={() => handleOptionSelect("Lorem Ipsum")}
                      className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                    >
                      Lorem ipsum
                    </button>
                  </li>
                  <li>
                    <button
                      // onClick={() => handleOptionSelect("Lorem Ipsum")}
                      className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                    >
                      Lorem ipsum
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="">
            <button
              id="dropdownHoverButton"
              data-dropdown-toggle="dropdownHover"
              data-dropdown-trigger="hover"
              className="relative inline-block hover:bg-primaryDark-300 hover:text-primary-300 p-2 rounded-md"
              onMouseOver={()=>setisDTab2Open(true)}
            >
              Tab 2
              </button>
              <div
                className={`absolute mt-2 w-[10%] bg-primary-400 divide-y divide-gray-100 rounded-lg shadow  ${
                  isDTab2Open ? "block" : "hidden"
                }`}
                onMouseLeave={() => setisDTab2Open(false)}
              >
                <div className="absolute h-[6.67%] w-full top-[0.1%] bg-primaryDark-400" />
                <ul
                  className="py-2 text-sm "
                  aria-labelledby="dropdownHoverButton"
                >
                  <li>
                    <button
                      // onClick={() => handleOptionSelect("Lorem Ipsum")}
                      className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                    >
                      Lorem ipsum
                    </button>
                  </li>
                  <li>
                    <button
                      // onClick={() => handleOptionSelect("Lorem Ipsum")}
                      className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                    >
                      Lorem ipsum
                    </button>
                  </li>
                </ul>
              </div>
              </div>
          </div>
        </div>
        <div className=" w-[10%] text-base-color-red">
          <>
            <div className="w-full inline-block text-left text-[#560C15] items-center justify-between">
              <button
                id="dropdown"
                data-dropdown-toggle="dropdown"
                className="w-full bg-primary-400 hover:bg-primaryDark-400 hover:text-primary-400 focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-full text-sm px-4 py-2.5 text-left flex items-center justify-between dark:focus:ring-black box-border border-solid border-[1px] border-black"
                type="button"
                onClick={toggleDropdown}
              >
                <div className="inline-flex items-center gap-2">
                  <svg
                    width="27"
                    height="27"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="13.75" cy="13.625" r="13.125" fill="#8C3E11" />
                  </svg>
                  {selectedOption}
                </div>
                <div>
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </button>
              {/* Dropdown menu */}
              {isUserDropdownOpen && (
                <div className="absolute mt-3 w-[10%] bg-primary-400 divide-y divide-gray-100 rounded-lg shadow ">
                  <div className="absolute h-[6.67%] w-full top-[0.1%] bg-primaryDark-400" />

                  <ul
                    className="py-2 text-sm "
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <button
                        onClick={() => handleOptionSelect("Lorem Ipsum")}
                        className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                      >
                        Lorem ipsum
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleOptionSelect("Lorem Ipsum")}
                        className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                      >
                        Lorem ipsum
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
