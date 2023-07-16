"use client";

import Button from "@/components/Button";
import { useState } from "react";
import AlasanModal from "./AlasanModal";
import toast from "react-hot-toast";

const DaftarKasuh = ({
  registered,
  nimKasuh,
  nimDesuh,
  alasan,
  idPendaftaranKasuh,
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
    const toastId = toast.loading("Loading...");
    // send a delete req to {{URL}}/pendaftaran-kasuh/:idPendaftaranKasuh
    const res = await fetch(
      process.env.NEXT_PUBLIC_WEB_URL +
        `/api/pendaftaran-kasuh/${idPendaftaranKasuh}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      }
    );

    if (res.status === 200) {
      toast.success("Successfully Deleted!", {
        id: toastId,
      });
      setIsRegistered(false);
    } else {
      toast.error("Failed to delete", {
        id: toastId,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmitAlasan = async () => {
    const toastId = toast.loading("Loading...");
    const res = await fetch(
      process.env.NEXT_PUBLIC_WEB_URL + `/api/pendaftaran-kasuh/${nimDesuh}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nimKasuh: nimKasuh, alasan: value }),
      }
    );

    if (res.status === 200) {
      toast.success("Successfully registered!", {
        id: toastId,
      });
      setIsRegistered(true);
      setIsModalOpen(false);
    } else {
      toast.error("Failed to register", {
        id: toastId,
      });
    }
  };

  const handleUpdateAlasan = async () => {
    const toastId = toast.loading("Loading...");
    const res = await fetch(
      process.env.NEXT_PUBLIC_WEB_URL +
        `/api/pendaftaran-kasuh/alasan/${nimDesuh}/${nimKasuh}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alasan: value }),
      }
    );

    if (res.status === 200) {
      toast.success("Successfully Updated!", {
        id: toastId,
      });
      setIsModalOpen(false);
    } else {
      toast.error("Failed to update", {
        id: toastId,
      });
    }
  };

  return (
    <>
      {isModalOpen && (
        <AlasanModal
          alasan={value}
          onChange={handleChange}
          onClose={() => setIsModalOpen(false)}
          onSubmit={isRegistered ? handleUpdateAlasan : handleSubmitAlasan}
        />
      )}
      <div className="w-full flex justify-center md:justify-end mt-5">
        <div className="w-5/6 max-w-[25rem] flex gap-3 justify-center md:justify-end">
          {isRegistered ? (
            <>
              <Button
                text="Edit Alasan"
                isPrimary
                color="bg-primary-400"
                onClick={() => setIsModalOpen(true)}
              />
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
