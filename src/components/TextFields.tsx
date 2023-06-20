"use client";

import { CSSProperties, useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface TextFieldsProps {
  type?: string;
  placeholder?: string;
  width?: string;
  height?: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  disabled?: boolean;
  regex?: RegExp;
}

const TextFields = ({
  type = "text",
  placeholder,
  width,
  height,
  regex = /^.*$/,
  value,
  onChange,
  disabled,
}: TextFieldsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [labelClass, setLabelClass] = useState("");
  const [inputClass, setInputClass] = useState("");

  const regexString =
    type === "email"
      ? new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      : regex;

  const baseLabelClass =
    "absolute py-0 bg-primaryLight-400 cursor-text pointer-events-none peer-focus:text-secondary-400 peer-focus:tag peer-focus:-top-0.5 peer-focus:left-3 peer-focus:px-1 transition-all peer-disabled:bg-transparent peer-disabled:opacity-70";
  const baseInputClass =
    "w-full resize-none border-2 focus:outline-none focus:ring-0 px-4 py-2 rounded-xl bg-primaryLight-400 text-secondaryDark-400 text-left peer disabled:cursor-not-allowed disabled:bg-primaryLight-700 disabled:border-secondaryDark-400 disabled:opacity-70";

  useEffect(() => {
    if (regexString !== null) {
      if (!regexString?.test(value) && value !== "") {
        setInputClass(
          `${baseInputClass} border-danger-200 hover:border-danger-200 focus:border-danger-200`
        );
      } else {
        setInputClass(
          `${baseInputClass} border-secondaryDark-400 hover:border-secondary-400 focus:border-secondary-400`
        );
      }
    }
    if (value) {
      setLabelClass(
        `${baseLabelClass} text-secondary-400 tag -top-0.5 px-1 left-3`
      );
    } else {
      setLabelClass(
        `${baseLabelClass} text-secondaryDark-200 top-2.5 body-1 left-4`
      );
    }
  }, [value]);

  const style: CSSProperties = {
    width: width || "100%",
    height: height || "auto",
  };

  return (
    <div className="flex relative font-sen" style={style}>
      {type === "textarea" ? (
        <textarea
          disabled={disabled}
          onChange={onChange}
          value={value}
          className="w-full resize-none border-2 border-secondaryDark-400 hover:border-secondary-400 focus:outline-none focus:ring-0 focus:border-secondary-400 px-4 py-2 rounded-xl bg-primaryLight-400  text-secondaryDark-400 text-left peer disabled:cursor-not-allowed disabled:bg-primaryLight-700 disabled:border-secondaryDark-400 disabled:opacity-70"
        />
      ) : (
        <input
          disabled={disabled}
          onChange={onChange}
          value={value}
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
