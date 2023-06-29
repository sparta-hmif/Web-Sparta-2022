"use client";

import { useState } from "react";
import React from "react";
import Dropdown from "@/components/Dropdown";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";

const dataPage = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Tab 1",
    dropdown: [
      {
        name: "Tab 1.1",
        href: "/",
      },
      {
        name: "Tab 1.2",
        href: "/",
      },
    ],
  },
  {
    name: "Tab 2",
    href: "/",
  },
];
const Navbar = () => {
  const [username, setUsername] = useState("John Doe");
  const [showMenu, setShowMenu] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(-1);

  const menuElements = (item: {
    name: string;
    href?: string;
    dropdown?: {
      name: string;
      href: string;
    }[];
  }) => {
    return (
      <div className="">
        <button className="relative inline-block hover:bg-primaryDark-300 hover:text-primary-300 px-4 py-1 rounded-md peer">
          {item.name}
        </button>
        {item.dropdown && (
          <div className="hidden absolute pt-3 w-[10%] rounded-lg shadow peer-hover:block hover:block">
            <div className="bg-primary-400 rounded-tr-xl rounded-b-2xl shadow relative overflow-hidden">
              <div className="absolute h-2 w-full top-0 bg-primaryDark-400 rounded-tr-2xl" />
              <ul className="pt-2 text-sm">
                {item.dropdown.map((item) => {
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="px-4 py-2 hover:bg-[#E5B171] rounded w-full text-left inline-flex items-center text-primaryDark-400 text-lg"
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  };

  const toggleDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full text-h5 font-koulen text-primary-400 bg-primaryDark-400 shadow-xl">
      <div className="px-8 relative items-center flex flex-row justify-between py-2">
        <div className="flex flex-row items-center justify-start w-full gap-12">
          <Image
            width={200}
            height={200}
            className="w-24"
            alt="Logo"
            src="/images/Logo/Logo.svg"
          />
          <div className="hidden md:flex flex-row items-end justify-start gap-10 pt-2">
            {dataPage.map((item) => menuElements(item))}
          </div>
        </div>
        <div className="hidden md:block w-[15rem] relative">
          {username ? (
            <div
              className="w-full flex items-center justify-between border-2 border-primary-400 px-3 rounded-full hover:bg-primary-400 transition cursor-pointer hover:text-primaryDark-400"
              onClick={toggleDropdown}
            >
              <div className="flex flex-1 items-center gap-2">
                <Image
                  width={50}
                  height={50}
                  src="/images/Landing/placeholder.jpg"
                  className="w-7 rounded-full "
                  alt="Profile Picture"
                />
                <p className="mt-0.5">{username}</p>
              </div>
              <FaChevronDown size={15} />
            </div>
          ) : (
            <div className="w-11/12 mx-auto border-2 border-primary-400 text-center rounded-full cursor-pointer hover:bg-primary-400 hover:text-primaryDark-400 transition">
              LOGIN
            </div>
          )}
          {/* Dropdown menu */}
          {isUserDropdownOpen && (
            <div className="hidden md:block absolute mt-4 w-10/12 left-1/2 -translate-x-1/2 bg-primary-400 hover:bg-[#E5B171] rounded-lg shadow">
              <div className="absolute h-1 rounded-t-lg w-full top-0 bg-primaryDark-400" />

              <div
                onClick={() => {}}
                className="w-full pt-2 pb-1 items-center text-danger-300 text-lg px-2"
              >
                LOGOUT
              </div>
            </div>
          )}
        </div>
        <div
          className="md:hidden cursor-pointer"
          onClick={() => setShowMenu(true)}
        >
          <IoMenu size={30} />
        </div>
        <div
          className={`transition block md:hidden absolute right-0 top-0 w-1/2 h-screen bg-primaryDark-400 shadow-2xl ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }
          flex flex-col justify-start`}
        >
          <div className="pb-2 pt-4 flex items-center justify-end px-4">
            <IoClose size={25} onClick={() => setShowMenu(false)} />
          </div>
          <div className="py-2">
            {dataPage.map((item, index) => {
              return (
                <>
                  <div
                    key={item.name}
                    className={`py-2 px-6 text-xl ${
                      showDropdown === index && "bg-primary-400/20"
                    } hover:bg-primary-400/20 transition`}
                    onClick={() => {
                      if (item.dropdown) {
                        setShowDropdown((data) =>
                          data === index ? -1 : index
                        );
                        console.log(showDropdown);
                      }
                    }}
                  >
                    {item.name}
                  </div>
                  {showDropdown === index && (
                    <div className="">
                      {item.dropdown?.map((dropdown) => {
                        return (
                          <div
                            key={dropdown.name}
                            className="bg-primary-400/10 px-12 text-xl py-2"
                            onClick={() => {}}
                          >
                            {dropdown.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              );
            })}
            {username && <div className="py-2 px-6 text-xl text-danger-200 hover:bg-primary-400/20 transition">LOGOUT</div>}
          </div>
          <div className="mt-auto w-full bg-primary-400/[15%] border-t-[1px] border-primary-400 px-4 py-2 flex items-center gap-3">
            {username ? (
              <>
                <Image
                  width={50}
                  height={50}
                  src="/images/Landing/placeholder.jpg"
                  className="w-2/12 rounded-full "
                  alt="Profile Picture"
                />
                <p className="text-lg">{username}</p>
              </>
            ) : (
              <div className="text-xl text-center w-full">LOGIN</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
