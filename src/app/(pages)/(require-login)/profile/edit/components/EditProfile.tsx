"use client";

import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { useS3Upload } from "next-s3-upload";

// Component imports
import Button from "@/components/Button";
import TextFields from "@/components/TextFields";
import DropzoneImage from "@/components/DropzoneImage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const session = useSession();
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    () =>
      process.env.NEXT_PUBLIC_WEB_URL +
      "/api/user/" +
      (session.data?.user as User).nim,
    fetcher
  );

  const [file, setFile] = useState<File>();
  const { uploadToS3 } = useS3Upload();

  let userDataDb: User | null = null;

  if (data?.user) {
    userDataDb = data.user;
  }

  const [userData, setUserData] = useState({
    email: userDataDb?.email || "",
    namaLengkap: userDataDb?.fullName || "",
    namaPanggilan: userDataDb?.shortName || "",
    instagram: userDataDb?.instagram || "",
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

  const handleSave = async () => {
    const toastId = toast.loading('Loading...');
    
    if (!data?.user) {
      toast.error("Invalid credentials", {
        id: toastId,
      });
      return;
    }

    if (userData.newPassword !== userData.confirmPassword) {
      toast.error("Password doesn't match!", {
        id: toastId,
      });
      return;
    }

    if (file) {
      const { url } = await uploadToS3(file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/user/profpic/${data.user.nim}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ imageURL: url }),
        }
      );

      if (res.status !== 200) {
        toast.error("Failed to upload", {
          id: toastId,
        });
        return;
      }
    }

    const body: any = {};
    if (userData.newPassword !== "") {
      body["password"] = userData.newPassword;
    }
    if (userData.email !== "") {
      body["email"] = userData.email;
    }
    if (userData.namaLengkap !== "") {
      body["fullName"] = userData.namaLengkap;
    }
    if (userData.namaPanggilan !== "") {
      body["shortName"] = userData.namaPanggilan;
    }
    if (userData.instagram !== "") {
      body["instagram"] = userData.instagram;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/user/${data.user.nim}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    if (res.status === 200) {
      toast.success("Profile Updated!", {
        id: toastId,
      });
      router.push("/profile");
    } else {
      toast.error("Failed to update", {
        id: toastId,
      });
    }
  };

  const handleFileUpload = (file: File) => {
    // Handle the uploaded file here
    setFile(file);
  };

  return (
    <div className="my-24 mx-9 lg:mx-[90px] pt-2 flex flex-col items-center md:flex-row pb-72">
      <div className="w-full md:w-1/3 mb-10 md:mb-0">
        {/* MULAI SINI */}
        <DropzoneImage onFileUpload={handleFileUpload} />
        {/* SAMPAI SINI */}
      </div>
      <div className="w-full md:pl-[100px]">
        <h5 className=" text-h5 font-sen font-bold mb-5">Basic Info</h5>
        <form action="" onSubmit={(e) => e.preventDefault()}>
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
          <div className="w-full flex flex-row-reverse">
            <div className="flex gap-5 justify-end w-full lg:w-1/2 lg:gap-10">
              <Link href="/profile" className="block w-full">
                <Button isPrimary={false} text="Cancel" type="button" />
              </Link>
              <Button isPrimary={true} text="Save" onClick={handleSave} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
