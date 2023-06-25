"use client";

import EditProfile from "@/components/EditProfile";
import Background from "./components/Background";
import MemberList from "./components/MemberList";
import ProfileDetail from "./components/ProfileDetail";
import { useState, MouseEventHandler } from "react";

export default function Home() {
  // Property for each component
  const profileDetailProps = {
    // profilePicture,
    // namaLengkap,
    // namaPanggilan,
    // nim,
    // jurusan,
    // usernameIG,
    // tanggalLahir,
    // skor,
  };
  const memberListProps = {
    // nomorKelompok,
    // anggotaMentor,
    // kakakAsuh,
  };

  const [editProfile, setEditProfile] = useState(false);

  const editButtonHandle = () => {
    setEditProfile(true);
  };
  return (
    <>
      <div className="w-screen h-screen overflow-x-hidden overflow-y-scroll">
        <div>{/* NAVBAR */}</div>
        <div className="relative top-10 z-0 flex items-center justify-center flex-col w-full overflow-x-hidden pb-10">
          <h1 className="font-koulen bg-gradient-to-b from-white to-[#D39947] text-transparent bg-clip-text hidden sm:block">
            PROFILE
          </h1>
          {!editProfile ? (
            <div className="flex flex-col lg:flex-row w-full items-center lg:items-start justify-center gap-5">
              <div className="hidden lg:block">
                <MemberList {...memberListProps} />
              </div>
              <ProfileDetail
                {...profileDetailProps}
                editButton={editButtonHandle}
              />

              <div className="lg:hidden">
                <MemberList {...memberListProps} />
              </div>
            </div>
          ) : (
            <div className="flex w-full items-center justify-center bg-white">
              <EditProfile />
            </div>
          )}
        </div>
        <div className="absolute w-full h-full top-0 z-[-100]">
          <Background />
        </div>
        <div>{/* FOOTER */}</div>
      </div>
    </>
  );
}
