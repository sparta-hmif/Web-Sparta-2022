"use client";

import Button from "@/components/Button";

const CareerPathInfo = ({ targetDate }: { targetDate: Date }) => {
  return (
    <>
      <div className="text-primaryDark-400 uppercase font-koulen text-[42px] my-3">
        Career Path
      </div>
      <div className="font-sen text-[13px] md:text-[15px] mb-6">
        <p className="mb-3">
          Yuk Spartans, isi preferensi karir kamu! Career path ini bisa membantu
          kamu agar lebih fokus mendalami bidang keinformatikaan yang kamu
          minati!
        </p>
        {/* <p>
          Jangan lupa untuk cek modul terbaru agar kamu bisa paham lebih jauh
          mengenai karir yang akan kamu pilih
        </p> */}
      </div>
      {/* <div className="flex justify-center">
        <div className="min-w-[50%]">
          <Button
            isPrimary={true}
            text="Cek Modul Terbaru"
            onClick={() => {}}
            type="button"
          />
        </div>
      </div> */}
      <div className="w-full h-[3px] my-6 bg-primaryLight-400"></div>
    </>
  );
};

export default CareerPathInfo;
