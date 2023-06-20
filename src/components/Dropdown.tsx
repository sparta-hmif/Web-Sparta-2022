import { useState } from "react";
import React from "react";

const Dropdown = () => {
  const [selectedOption, setSelectedOption] = useState("Choose Color");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div className="relative inline-block text-left text-[#560C15] font-sen text-button">
        <button
          id="dropdown"
          data-dropdown-toggle="dropdown"
          className="w-full bg-white hover:bg-white focus:ring-2 focus:outline-none focus:ring-black font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:focus:ring-black box-border border-solid border-[1px] border-black"
          type="button"
          onClick={toggleDropdown}
        >
          {selectedOption}
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
        </button>
        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div className="relative right-0 mt-2 w-full bg-white divide-y divide-gray-100 rounded-lg shadow ">
            <ul
              className="py-2 text-sm "
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <button
                  onClick={() => handleOptionSelect("Blue")}
                  className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className = "mr-2"
                  >
                    <circle cx="5" cy="5" r="5" fill="#2375B1" />
                  </svg>
                  Blue
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOptionSelect("Red")}
                  className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex  items-center"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className = "mr-2"
                  >
                    <circle cx="5" cy="5" r="5" fill="#D32525" />
                  </svg>
                  Red
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleOptionSelect("Green")}
                  className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center"
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <circle cx="5" cy="5" r="5" fill="#45B12A" />
                  </svg>
                  Green
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
