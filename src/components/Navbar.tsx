"use client";

import { useMemo, useState } from "react";
import { signOut } from "next-auth/react";
import React from "react";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import DefaultProfPic from "@/../public/images/landing/sparta.png";

interface UserSession {
  id: string;
  email: string;
  fullName: string;
  nim: string;
  role: string;
}

interface NavbarProps {
  user: UserSession | null;
}

interface ItemProps {
  name: string;
  href?: string;
  dropdown?: {
    name: string;
    href: string;
  }[];
}

const dataPage = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Dashboard",
    dropdown: [
      {
        name: "Add Module",
        href: "/dashboard/add-module",
      },
      {
        name: "Add Assignment",
        href: "/dashboard/add-assignment",
      },
      {
        name: "Grade Assignment",
        href: "/dashboard/grade-assignment",
      },
      {
        name: "Edit Scoreboard",
        href: "/dashboard/edit-scoreboard",
      },
    ],
  },
  {
    name: "Tasks",
    dropdown: [
      {
        name: "Subject",
        href: "/subject",
      },
      {
        name: "Assignment",
        href: "/assignment",
      },
    ],
  },
  {
    name: "Scoreboard",
    href: "/scoreboard",
  },
  {
    name: "Journey",
    href: "/journey",
  },
];
const Navbar = ({ user }: NavbarProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(-1);
  const router = useRouter();
  const pathName = usePathname();

  const isActive = useMemo(() => {
    return (item: ItemProps) => {
      if (item.dropdown) {
        return item.dropdown.some((item) => pathName.startsWith(item.href));
      }
      return item.href === pathName;
    };
  }, [pathName]);

  const menuElements = (item: ItemProps) => {
    return (
      <>
        <div className="relative inline-block hover:bg-primaryDark-300 hover:text-primary-300 px-4 py-1 rounded-md peer cursor-pointer">
          {item.href ? (
            <Link href={item.href}>{item.name}</Link>
          ) : (
            <>{item.name}</>
          )}
          <div
            className={`absolute w-full inset-x-0 rounded-t-md -bottom-2 h-1 bg-primary-400 ${
              isActive(item) ? "scale-x-100" : "scale-x-0"
            } transition duration-300`}
          ></div>
        </div>
        {item.dropdown && (
          <div className="scale-y-0 absolute pt-3 w-[10%] rounded-lg peer-hover:scale-y-100 hover:scale-y-100 transition origin-top">
            <div className="bg-primaryDark-400 rounded-tr-xl rounded-b-2xl shadow-lg relative overflow-hidden">
              <div className="absolute h-2 w-full top-0 bg-primary-400 rounded-tr-2xl y" />
              <ul className="pt-2 text-sm flex flex-col divide-y-2 divide-primary-400/30">
                {item.dropdown.map((item, idx) => {
                  return (
                    <li key={idx}>
                      <Link
                        href={item.href}
                        className="px-4 py-2 hover:bg-primaryDark-300 w-full text-left inline-flex items-center text-primary-400 text-lg"
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  };

  const toggleDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 w-full text-h5 font-koulen text-primary-400 bg-primaryDark-400 shadow-xl">
      <div className="px-5 md:px-8 relative items-center flex flex-row justify-between py-3 lg:py-2 w-full">
        <div className="flex flex-row items-center justify-start w-full gap-12">
          <Image
            width={200}
            height={200}
            className="w-3/12 max-w-[6rem]"
            alt="Logo"
            src="/images/Logo/Logo.svg"
          />
          <div className="hidden lg:flex flex-row items-end justify-start gap-5 pt-2">
            {dataPage.map((item, index) => (
              <div key={index}>{menuElements(item)}</div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block w-[17rem] relative">
          {user ? (
            <div
              className="w-full flex items-center justify-between border-2 border-primary-400 px-3 rounded-full hover:bg-primary-400 transition cursor-pointer hover:text-primaryDark-400"
              onClick={toggleDropdown}
            >
              <div className="flex flex-1 items-center gap-2">
                <Image
                  width={50}
                  height={50}
                  src={DefaultProfPic}
                  className="w-7 rounded-full "
                  alt="Profile Picture"
                />
                <p className="mt-0.5 truncate">{user.fullName.split(" ")[0]}</p>
              </div>
              <FaChevronDown size={15} />
            </div>
          ) : (
            <div
              onClick={() => {
                router.push("/login");
              }}
              className="w-11/12 mx-auto border-2 border-primary-400 text-center rounded-full cursor-pointer hover:bg-primary-400 hover:text-primaryDark-400 transition"
            >
              LOGIN
            </div>
          )}
          {/* Dropdown menu */}
          <div
            className={`hidden lg:block absolute mt-4 w-10/12 right-0 rounded-lg rounded-tr-none pt-2 overflow-hidden ${
              isUserDropdownOpen ? "scale-y-100" : "scale-y-0"
            } transition origin-top`}
          >
            <div className="absolute h-2 w-full top-0 bg-primary-400" />
            <Link href="/profile">
              <div className="w-full pt-2 py-2 items-center text-primary-400 text-lg px-2 cursor--pointer bg-primaryDark-400 hover:bg-primaryDark-300">
                PROFILE
              </div>
            </Link>
            <div
              onClick={() => {
                handleSignOut();
              }}
              className="w-full pt-2 py-2 items-center text-danger-200 text-lg px-2 cursor--pointer bg-primaryDark-400 hover:bg-primaryDark-300"
            >
              LOGOUT
            </div>
          </div>
        </div>
        <div
          className="lg:hidden cursor-pointer"
          onClick={() => setShowMenu(true)}
        >
          <IoMenu className="text-3xl md:text-5xl" />
        </div>
        <div
          className={`transition block lg:hidden absolute right-0 top-0 w-1/2 h-screen bg-primaryDark-400 shadow-2xl ${
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
                <div key={index}>
                  <div
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
                      {item.dropdown?.map((dropdown, idx) => {
                        return (
                          <div
                            key={idx}
                            className="bg-primary-400/10 px-12 text-xl py-2"
                            onClick={() => {}}
                          >
                            {dropdown.name}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            {user && (
              <>
                <div
                  onClick={() => {
                    handleSignOut();
                  }}
                  className="py-2 px-6 text-xl text-primary-400 hover:bg-primary-400/20 transition"
                >
                  PROFILE
                </div>
                <div
                  onClick={() => {
                    handleSignOut();
                  }}
                  className="py-2 px-6 text-xl text-danger-200 hover:bg-primary-400/20 transition"
                >
                  LOGOUT
                </div>
              </>
            )}
          </div>
          <div className="mt-auto w-full bg-primary-400/[15%] border-t-[1px] border-primary-400 px-4 py-2 flex items-center gap-3">
            {user ? (
              <>
                <Image
                  width={50}
                  height={50}
                  src={DefaultProfPic}
                  className="w-2/12 rounded-full "
                  alt="Profile Picture"
                />
                <p className="text-lg">{user.fullName}</p>
              </>
            ) : (
              <div
                onClick={() => {
                  router.push("/login");
                }}
                className="text-xl text-center w-full"
              >
                LOGIN
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
