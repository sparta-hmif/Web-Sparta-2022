"use client";
import { useState } from "react";
import Button from "@/components/Button";
import TextFields from "@/components/TextFields";
import { useRouter } from "next/navigation";
import DropzoneImage from "@/components/DropzoneImage";

const EditProfile = () => {
  const router = useRouter();
  const [file, setFile] = useState<File>();

  const [userData, setUserData] = useState({
    email: "",
    namaLengkap: "",
    namaPanggilan: "",
    instagram: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {};

  const handleFileUpload = (file: File) => {
    // Handle the uploaded file here
    setFile(file);
  };

  return (
    <div className="my-24 mx-9 lg:mx-[90px] pt-2 flex flex-col items-center md:flex-row pb-72">
      <div className="w-full md:w-1/3 mb-10 md:mb-0">
        {/* MULAI SINI */}
        <DropzoneImage onFileUpload={handleFileUpload}/>
        {/* SAMPAI SINI */}
      </div>
      <div className="w-full md:pl-[100px]">
        <h5 className=" text-h5 font-sen font-bold mb-5">Basic Info</h5>
        <form action="">
          <div className="flex flex-col gap-6 mb-11">
            <TextFields
              placeholder="Email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              name="email"
            />
            <TextFields
              placeholder="Nama Lengkap"
              value={userData.namaLengkap}
              onChange={handleChange}
              name="namaLengkap"
            />
            <TextFields
              placeholder="Nama Panggilan"
              value={userData.namaPanggilan}
              onChange={handleChange}
              name="namaPanggilan"
            />
            <TextFields
              placeholder="Instagram"
              value={userData.instagram}
              onChange={handleChange}
              name="instagram"
            />
          </div>
          <h5 className=" text-h5 font-sen font-bold mb-5">Security</h5>
          <div className="flex flex-col gap-6 mb-6">
            <TextFields
              placeholder="New Password"
              type="password"
              value={userData.newPassword}
              onChange={handleChange}
              name="newPassword"
            />
            <TextFields
              placeholder="Re-enter new password"
              type="password"
              value={userData.confirmPassword}
              onChange={handleChange}
              name="confirmPassword"
            />
          </div>
          <div className="flex gap-10  justify-end">
            <Button
              isPrimary={false}
              text="Cancel"
              type="button"
              onClick={() => router.push("/profile")}
            />
            <Button isPrimary={true} text="Save" onClick={handleSave} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
