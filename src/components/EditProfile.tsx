"use client";
import { SetStateAction, useState } from "react";
import Button from "./Button";
import FileInput from "./FileInput";
import TextFields from "./TextFields";
import { FileWithPath } from "react-dropzone";

const EditProfile = () => {
  const [data, setData] = useState<string | null>(null);

  const childToParent = (childdata: string) => {
    setData(childdata);
  };

  return (
    <div className="my-24 mx-9 lg:mx-[90px] pt-2 flex flex-col items-center md:flex-row pb-72">
      <div className=" mb-10 md:mb-0">
        {data == null ? (
          <div className="pict h-[159px] w-[159px] md:h-[200px] md:w-[200px] lg:h-[292px] lg:w-[292px] bg-slate-300">
            <div className="relative top-[130px] left-[130px] md:top-[165px] md:left-[165px] lg:top-[256px] lg:left-[256px]">
              <FileInput type="image" childToParent={childToParent} />
            </div>
          </div>
        ) : (
          <div className=" h-[159px] w-[159px] md:h-[200px] md:w-[200px] lg:h-[292px] lg:w-[292px] relative">
            <img
              src={data!}
              alt=""
              className="h-[159px] w-[159px] md:h-[200px] md:w-[200px] lg:h-[292px] lg:w-[292px]"
              onLoad={() => {
                URL.revokeObjectURL(data!);
              }}
            />
            <div className="top-[-25px] left-[135px] md:top-[-30px] md:left-[170px] lg:top-[-30px] lg:left-[260px] relative">
              <FileInput type="image" childToParent={childToParent} />
            </div>
          </div>
        )}
      </div>
      <div className="  w-full md:pl-[100px]">
        <h5 className=" text-h5 font-sen font-bold mb-5">Basic Info</h5>
        <form action="">
          <div className="flex flex-col gap-6 mb-11">
            <TextFields placeholder="Email" type="email" />
            <TextFields placeholder="Nama Lengkap" />
            <TextFields placeholder="Nama Panggilan" />
            <TextFields placeholder="Instagram" />
          </div>
          <h5 className=" text-h5 font-sen font-bold mb-5">Security</h5>
          <div className="flex flex-col gap-6 mb-6">
            <TextFields placeholder="New Password" type="password" />
            <TextFields placeholder="Re-enter new password" type="password" />
          </div>
          <div className="flex gap-10  justify-end">
            <Button isPrimary={false} text="Cancel" />
            <Button isPrimary={true} text="Save" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
