"use client";

import Button from "@/components/Button";
import { useState } from "react";
import AlasanModal from "./AlasanModal";

const DaftarKasuh = ({
  registered,
  alasan,
} : {
  registered: boolean;
  alasan: string;
}) => {
  const [isRegistered, setIsRegistered] = useState(registered);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState(alasan);

  const handleRegister = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsRegistered(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitAlasan = () => {
    setIsRegistered(true);
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && <AlasanModal alasan={value} onChange={handleChange} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmitAlasan} />}
      <div className="w-full flex justify-center md:justify-end mt-5">
        <div className="w-5/6 max-w-[25rem] flex gap-3 justify-center md:justify-end">
          {isRegistered ? (
            <>
              <Button text="Edit Alasan" isPrimary color="bg-primary-400" onClick={() => setIsModalOpen(true)}/>
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
