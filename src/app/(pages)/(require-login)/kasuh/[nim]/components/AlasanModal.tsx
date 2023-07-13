import Button from "@/components/Button";
import { useState } from "react";

const AlasanModal = ({
  alasan,
  onClose,
  onSubmit,
  onChange,
}: {
  alasan: string;
  onClose: () => void;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) => {
  return (
    <div className="fixed z-50 h-screen top-0 inset-x-0 bg-neutral-800/70 backdrop-blur-[2px]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-11/12 max-w-[40rem] bg-white border-4 border-secondary-400 rounded-xl md:rounded-2xl px-5 md:px-8 py-7 relative drop-shadow-xl">
          <div className="absolute bg-secondary-400 text-white font-sen font-bold text-2xl md:text-3xl px-8 md:px-10 py-2 rounded-t-xl top-0 -translate-y-full left-1/2 -translate-x-1/2">
            ALASAN
          </div>
          <p className="font-sen text-base font-bold text-secondary-400 md:text-lg">
            Masukkan Alasanmu Memilih Dia!
          </p>
          <textarea
            className="w-full h-52 resize-none text-sm md:text-base px-2 flex-1 rounded-xl body-1 bg-neutral-100 mt-2 border-secondaryDark-400 hover:border-secondary-400 focus:outline-none focus:ring-0 focus:border-secondary-400"
            placeholder="Ketik disini..."
            value={alasan}
            onChange={onChange}
          />
          <div className="w-2/3 ml-auto flex gap-2 mt-3">
            <Button text="Cancel" isPrimary={false} onClick={onClose}/>
            <Button text="Submit" isPrimary onClick={onSubmit}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlasanModal;
