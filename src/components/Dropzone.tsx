"use client";

import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { BsFileEarmarkArrowUpFill } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

interface DropzoneProps {
  onFileSelected: (files: File) => void;
  onFileRejected?: (fileRejections: FileRejection[]) => void;
  onFileDeleted: () => void;
}

const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelected,
  onFileRejected,
  onFileDeleted,
}) => {
  const [file, setFile] = useState<File>();
  const handleDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
        onFileDeleted();
      }

      if (onFileRejected && fileRejections.length > 0) {
        onFileRejected(fileRejections);
      }
    },
    [onFileRejected, onFileDeleted]
  );

  useEffect(() => {
    if (file) {
      onFileSelected(file);
    }
  }, [file, onFileSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    maxFiles: 1, // Maximum number of files allowed
  });

  return (
    <div className="w-full my-3">
      {file ? (
        <div className="gap-4 items-center py-3 rounded-lg text-primaryDark-400 bg-neutral-200 inline-flex px-3">
          <BsFileEarmarkArrowUpFill
            size={28}
            className="text-primaryDark-400"
          />
          <p className="font-sen text-lg font-bold">{file.name}</p>
          <IoCloseSharp
            size={20}
            className="cursor-pointer"
            onClick={() => setFile(undefined)}
          />
        </div>
      ) : (
        <div className="border-2 border-dashed rounded-xl bg-neutral-100 w-full text-center">
          <div
            {...getRootProps()}
            className={`dropzone ${isDragActive ? "active" : ""} py-8`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="font-sen text-neutral-400">Drop the file here...</p>
            ) : (
              <p className="font-sen text-neutral-400">
                Drag and drop a file here, or click to select a file <br />
                <span className="font-bold">Only one file</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropzone;
