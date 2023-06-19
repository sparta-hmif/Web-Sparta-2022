"use client";

import { CSSProperties, useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface TextFieldsProps {
  type?: string;
  placeholder: string;
  width?: string;
  height?: string;
  regex?: RegExp;
}

// TODO:
// Ngirin hasil inputnya kemana
// Scrollbar
// Labelnya
// Error
const TextFields = ({
  type = "text",
  placeholder,
  width,
  height,
  regex = /^.*$/,
}: TextFieldsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [labelClass, setLabelClass] = useState("");
  const [inputClass, setInputClass] = useState("");

  const regexString =
    type === "email"
      ? new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      : regex;

  const baseLabelClass =
    "absolute left-4 top-2.5 py-0 bg-primaryLight-400 cursor-text pointer-events-none peer-focus:text-secondary-400 peer-focus:tag peer-focus:-top-0.5 peer-focus:left-3 peer-focus:px-1 transition-all";
  const baseInputClass =
    "w-full resize-none border-2 focus:outline-none px-4 py-2 rounded-xl bg-primaryLight-400 text-secondaryDark-400 text-left peer";

  useEffect(() => {
    if (regexString !== null) {
      if (!regexString?.test(inputValue) && inputValue !== "") {
        setInputClass(
          `${baseInputClass} border-danger-200 hover:border-danger-200 focus:border-danger-200`
        );
      } else {
        setInputClass(
          `${baseInputClass} border-secondaryDark-400 hover:border-secondary-400 focus:border-secondary-400`
        );
      }
    }
    if (inputValue !== "") {
      setLabelClass(
        `${baseLabelClass} text-secondary-400 tag -top-0.5 px-1 left-3`
      );
    } else {
      setLabelClass(`${baseLabelClass} text-secondaryDark-200 body-1`);
    }
  }, [inputValue]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(event.target.value);
  };

  const style: CSSProperties = {
    width: width || "100%",
    height: height || "auto",
  };

  return (
    <div className="flex relative font-sen" style={style}>
      {type === "textarea" ? (
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          className="w-full resize-none border-2 border-secondaryDark-400 hover:border-secondary-400 focus:outline-none focus:border-secondary-400 px-4 py-2 rounded-xl bg-primaryLight-400 text-secondaryDark-400 text-left peer "
        />
      ) : (
        <input
          value={inputValue}
          onChange={handleInputChange}
          className={inputClass}
          type={isVisible ? "text" : type}
        />
      )}

      <label className={labelClass}>{placeholder}</label>
      {type === "password" && (
        <button
          className="absolute right-3 top-3.5 body-1 secondaryDark-400"
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          {isVisible ? <FiEye /> : <FiEyeOff />}
        </button>
      )}
    </div>
  );
};

export default TextFields;
