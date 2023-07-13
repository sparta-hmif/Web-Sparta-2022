import { AiFillInstagram, AiOutlineGift } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";
import DaftarKasuh from "./components/DaftarKasuh";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-[url('/images/profil-kasuh/background.svg')] bg-cover flex items-center py-20 md:py-26">
      <div className="container bg-white border-4 rounded-2xl border-primaryDark-400 mx-auto w-11/12 max-w-[65rem] px-5 md:px-14 py-10">
        <Link href="/kasuh">
          <div className="flex cursor-pointer items-center mb-3 gap-3">
            <FaChevronLeft size={20} className="text-primaryDark-400" />
            <p className="font-sen font-bold text-xl text-primaryDark-400">
              Back
            </p>
          </div>
        </Link>
        <div className="w-full flex flex-col justify-between items-center md:items-start md:flex-row gap-4 md:gap-11">
          <div className="w-2/3 aspect-square max-w-[20rem] md:aspect-[3/4] bg-[#D9D9D9] rounded-xl">
            <Image src="/images/landing/sparta.png" alt="Profile Kasuh" width={200} height={200} className="w-full h-full object-cover object-center"/>
          </div>
          <div className="w-full md:flex-1 flex flex-col gap-1">
            <div className="flex justify-between mb-1 font-koulen text-black text-xl">
              <div className="flex items-center gap-1">
                <AiFillInstagram size={24} />
                <p>kevin.sst</p>
              </div>
              <div className="flex items-center gap-1">
                <AiOutlineGift size={24} />
                <p>dawdawd</p>
              </div>
            </div>
            <h4 className="text-primaryDark-400 font-koulen text-3xl md:text-5xl my-2">
              Kevin Sebastian
            </h4>
            <h6 className="text-secondaryDark-500 text-xl md:text-2xl font-koulen">
              NAMA PANGGILAN: Kevin
            </h6>
            <h6 className="text-secondaryDark-500 text-xl md:text-2xl font-koulen">
              NIM: 18221143
            </h6>
            <h6 className="text-secondaryDark-500 text-xl md:text-2xl font-koulen">
              JURUSAN: STI
            </h6>
            <p className="caption md:body-1">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
              architecto culpa quo maxime quam aperiam ratione! Iste praesentium
              veritatis laborum dolor, alias odio nesciunt adipisci veniam
              itaque quo eligendi quod eveniet est, earum quibusdam explicabo!
              Quam totam minus repellendus nobis?
            </p>
          </div>
        </div>
        <DaftarKasuh
          registered={true}
          alasan="Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita"
        />
      </div>
    </div>
  );
};

export default Page;
