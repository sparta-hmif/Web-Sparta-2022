import Button from "@/components/Button";
import { useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import AlasanModal from "../../[nim]/components/AlasanModal";

const Card = ({
  rank,
  name,
  nim,
  kuota,
  image,
  handleUp,
  handleDown,
}: {
  rank: number;
  name: string;
  nim: string;
  kuota: number;
  image: string;
  handleUp: (rank: number) => void;
  handleDown: (rank: number) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alasan, setAlasan] = useState("");
  return (
    <>
      {isModalOpen && (
        <AlasanModal
          alasan={alasan}
          onClose={() => setIsModalOpen(false)}
          onSubmit={() => {}}
          onChange={(e) => setAlasan(e.target.value)}
        />
      )}
      <div
        className="duration-300 transition-transform w-full h-32 md:h-40 border-4 border-primaryDark-400 bg-white flex px-3 md:px-7 py-3 rounded-xl items-center gap-3 top-0 absolute"
        style={{
          transform: `translateY(${(rank - 1) * 110}%)`,
        }}
      >
        <div className="flex flex-col justify-between gap-3 w-[12%] max-w-[4rem]">
          <BsFillCaretUpFill
            className="text-neutral-400 text-xl hover:text-primaryDark-400 cursor-pointer md:hidden"
            onClick={() => handleUp(rank)}
          />
          <h1 className="text-neutral-400 text-2xl md:text-7xl leading-none">
            #{rank}
          </h1>
          <BsFillCaretDownFill
            className="text-neutral-400 text-xl hover:text-primaryDark-400 cursor-pointer md:hidden"
            onClick={() => handleDown(rank)}
          />
        </div>
        <div className="hidden md:flex md:flex-col md:mx-2 lg:mx-4">
          <BsFillCaretUpFill
            className="text-neutral-400 text-4xl cursor-pointer hover:text-primaryDark-400 hover:-translate-y-0.5 hover:scale-110 transition"
            onClick={() => handleUp(rank)}
          />
          <BsFillCaretDownFill
            className="text-neutral-400 text-4xl cursor-pointer  hover:text-primaryDark-400 hover:translate-y-0.5 hover:scale-110 transition"
            onClick={() => handleDown(rank)}
          />
        </div>
        <div className="w-1/6 max-w-[8rem] aspect-square bg-primaryDark-400 rounded-full"></div>
        <div className="flex flex-col md:ml-2 lg:ml-4">
          <h1 className="text-xl md:text-4xl line-clamp-2">{name}</h1>
          <h1 className="text-lg md:text-3xl text-primaryDark-400 leading-none">
            {nim}
          </h1>
          <h6 className="text-sm md:text-xl font-bold">Kuota : {kuota}</h6>
        </div>
        <div className="flex flex-col gap-2 ml-auto w-1/5 md:gap-4">
          <Button
            text="Edit Alasan"
            isPrimary
            onClick={() => setIsModalOpen(true)}
          />
          <Button text="Hapus" isPrimary color="bg-danger-300" />
        </div>
      </div>
    </>
  );
};

export default Card;