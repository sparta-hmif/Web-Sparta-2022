"use client";
import { useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface FileInputProps {
  type?: string;
  childToParent: any;
}

const FileInput = ({ type, childToParent }: FileInputProps) => {
  const { getRootProps, getInputProps, open, acceptedFiles } =
    type === "image"
      ? useDropzone({
          maxFiles: 1, // SET NUMBER OF FILE UPLOAD

          accept: {
            "image/*": [], // SET FILE TYPE
          },

          // Disable click and keydown behavior
          noClick: true,
          noKeyboard: true,
        })
      : useDropzone({
          maxFiles: 1, // SET NUMBER OF FILE UPLOAD

          noClick: true,
          noKeyboard: true,
        });

  const files = acceptedFiles.map((file) => {
    type === "image"
      ? childToParent(URL.createObjectURL(file))
      : childToParent(file);
  });

  return type === "image" ? (
    <button type="button" onClick={open}>
      <div {...getRootProps({ className: "dropzone" })}></div>
      <input {...getInputProps()} />
      <div className="edit p-1 md:p-2 lg:p-3 rounded-[12px] bg-secondary-400 flex items-center justify-center">
        <img src="/pencil.svg" alt="" />
      </div>
      <style jsx>
        {".edit {box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);}"}
      </style>
    </button>
  ) : (
    <div className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="wrapper w-full bg-primaryLight-400 rounded-xl py-[36px] md:py-[45px]  flex gap-1 items-center justify-center border border-secondaryDark-200 border-dashed">
          <button
            type="button"
            onClick={open}
            className="cursor-pointer bg-primary-400 text-white w-auto rounded-2xl px-[24px] py-[7px] md:px-[51px] md:pt-[15px] md:pb-[7px] flex justify-around items-center font-sen text-sub-1 font-bold"
          >
            Choose File
          </button>
        </div>
      </div>
      <style jsx>
        {"button {box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);}"}
      </style>
    </div>
  );
};

export default FileInput;
