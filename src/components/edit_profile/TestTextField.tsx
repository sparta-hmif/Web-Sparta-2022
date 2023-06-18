"use client";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const TextField = ({
  name,
  placeholder,
  type,
  style,
}: {
  name: string;
  placeholder: string;
  type: string;
  style: string;
}) => {
  const [currType, setCurrType] = useState("password");
  const [icon, setIcon] = useState(<AiFillEyeInvisible></AiFillEyeInvisible>);

  const handleToggle = () => {
    if (currType === "password") {
      setIcon(<AiFillEye></AiFillEye>);
      setCurrType("text");
    } else {
      setIcon(<AiFillEyeInvisible></AiFillEyeInvisible>);
      setCurrType("password");
    }
  };

  return (
    <>
      {type == "password" ? (
        <div className="relative flex items-center">
          <input
            type={currType}
            name={name}
            id={name}
            placeholder={placeholder}
            required
            className={style + " bg-primaryLight-400"}
          />
          <span
            className="absolute flex justify-around items-center right-[20px] text-2xl top-3 text-secondaryDark-400"
            onClick={handleToggle}
          >
            {icon}
          </span>
        </div>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          required
          className={style + "bg-primaryLight-400"}
        />
      )}
    </>
  );
};

export default TextField;
