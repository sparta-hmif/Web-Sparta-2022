"use client";

import { CSSProperties, useState } from "react";
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
}

const TextFields = ({
  type = "text",
  placeholder,
  width,
  height,
  value,
  onChange,
  disabled,
}: TextFieldsProps) => {
  const [isVisible, setIsVisible] = useState(false);

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
          type={isVisible ? "text" : type}
          placeholder=" "
          id={placeholder}
          className="
            border-secondary-400
            focus:border-secondary-400 
            w-full 
            resize-none 
            border-2 
            focus:outline-none 
            focus:ring-0 
            px-4 
            py-2 
            rounded-xl 
            bg-primaryLight-400 
            text-secondaryDark-400 
            text-left 
            peer 
            disabled:cursor-not-allowed 
            disabled:bg-primaryLight-700 
            disabled:border-secondaryDark-400 
            disabled:opacity-70
            placeholder-shown:border-secondaryDark-400
            "
        />
      )}

      <label
        htmlFor={placeholder}
        className="cursor-text absolute top-1/2 transition -translate-y-8 bg-gradient-to-b from-white to-primaryLight-400 px-1 text-secondary-400 text-[0.9rem] left-4
        peer-placeholder-shown:scale-110
        peer-placeholder-shown:-translate-y-1/2
        peer-placeholder-shown:left-4
        peer-placeholder-shown:bg-none
        peer-placeholder-shown:text-secondaryDark-400
        peer-focus:-translate-y-8
        peer-focus:scale-100
        peer-focus:left-4
        peer-focus:text-secondary-400
        peer-focus:bg-gradient-to-b
        peer-focus:from-white
        peer-focus:to-primaryLight-400
      "
      >
        {placeholder}
      </label>
      {type === "password" && (
        <button
          type="button"
          className="absolute right-3 top-3.5 body-1 secondaryDark-400"
          onClick={() => {
            setIsVisible((data) => !data);
          }}
        >
          {isVisible ? <FiEye /> : <FiEyeOff />}
        </button>
      )}
    </div>
  );
};

export default TextFields;
