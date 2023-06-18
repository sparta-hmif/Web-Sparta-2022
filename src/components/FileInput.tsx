"use client";
import { useDropzone, FileWithPath } from "react-dropzone";

const FileInput = () => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    maxFiles: 1, // SET NUMBER OF FILE UPLOAD
    // accept: {
    //   "image/*": [],  // SET FILE TYPE
    // },
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const files = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      <div className="flex">
        <div className=" ml-1">
          <p>
            {file.path} - {file.size} bytes
          </p>
          <p className=" text-success font-[8px]">Successfully uploaded!</p>
        </div>
      </div>
    </li>
  ));

  return (
    <div className="container pt-24">
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
