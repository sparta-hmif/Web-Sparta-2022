"use client";

import Button from "@/components/Button";
import { useState } from "react";
import AlasanModal from "./AlasanModal";

const DaftarKasuh = ({
  registered,
  nimKasuh,
  nimDesuh,
  alasan,
  idPendaftaranKasuh
}: {
  registered: boolean;
  nimKasuh: string;
  nimDesuh: string;
  alasan: string;
  idPendaftaranKasuh: string;
}) => {
  const [isRegistered, setIsRegistered] = useState(registered);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(alasan);

  const handleRegister = () => {
    setIsModalOpen(true);
  };

  const handleCancel = async () => {
    // send a delete req to {{URL}}/pendaftaran-kasuh/:idPendaftaranKasuh
    const res = await fetch(process.env.NEXT_PUBLIC_WEB_URL + `/api/pendaftaran-kasuh/${idPendaftaranKasuh}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    setIsRegistered(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitAlasan = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_WEB_URL + `/api/pendaftaran-kasuh/${nimDesuh}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nimKasuh: nimKasuh, alasan: value }),
    });

    setIsRegistered(true);
    setIsModalOpen(false);
  };

  const handleUpdateAlasan = async () => {
    const res = await fetch(process.env.NEXT_PUBLIC_WEB_URL + `/api/pendaftaran-kasuh/alasan/${nimDesuh}/${nimKasuh}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ alasan: value }),
    });

    setIsModalOpen(false);
  }

  return (
    <>
      {isModalOpen && <AlasanModal alasan={value} onChange={handleChange} onClose={() => setIsModalOpen(false)} onSubmit={isRegistered ? handleUpdateAlasan : handleSubmitAlasan} />}
      <div className="w-full flex justify-center md:justify-end mt-5">
        <div className="w-5/6 max-w-[25rem] flex gap-3 justify-center md:justify-end">
          {isRegistered ? (
            <>
              <Button text="Edit Alasan" isPrimary color="bg-primary-400" onClick={() => setIsModalOpen(true)} />
              <Button
                text="Batal"
                isPrimary
                color="bg-danger-200"
                onClick={handleCancel}
              />
            </>
          ) : (
            <div className="w-full max-w-[17rem]">
              <Button text="Daftar" isPrimary onClick={handleRegister} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DaftarKasuh;
