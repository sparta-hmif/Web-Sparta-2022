"use client";
import { useState } from "react";
import Button from "../Button";
import { AiFillInstagram } from "react-icons/ai";

interface profilProps{
  urlPhoto:string;
  namaIg:string;
  tglLahir:string;
  namaLengkap:string;
  namaPanggilan:string;
  nim:string;
  jurusan:string;
  deskripsi:string;
}

const ProfilKasuh = ({urlPhoto,namaIg,tglLahir,namaLengkap,namaPanggilan,nim,jurusan,deskripsi} : profilProps) => {
  const [hasRegistered, setHasRegistered] = useState(false);
  return (
    <>
      <div className="w-full h-[960px] bg-[url('/images/profil-kasuh/background.svg')] bg-cover flex justify-center pt-16 md:pt-20 lg:items-center">
        <div className="w-[96%] md:w-[80%] h-[720px] lg:h-[75%] bg-white rounded-xl border-[#560C15] border-4 pt-10 md:pt-16 lg:px-16">
          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row gap-4 lg:gap-11 px-4 mb-9">
            <div className="w-40 h-40 lg:w-80 lg:h-[450px] bg-[#D9D9D9] rounded-xl">
              <img src={urlPhoto}/>
            </div>
            <div className="w-auto md:w-[520px] h-[400px] md:h-[360px]">
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-1">
                  <AiFillInstagram />
                  <p className="font-koulen text-black text-[20px]">{namaIg}</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/profil-kasuh/gift.svg" />
                  <p className="font-koulen text-black text-[20px]">{tglLahir}</p>
                </div>
              </div>
              <h4 className="text-primaryDark-400 font-koulen mb-1">
                {namaLengkap}
              </h4>
              <h6 className="text-secondaryDark-500 font-koulen mb-1">
                NAMA PANGGILAN: {namaPanggilan}
              </h6>
              <h6 className="text-secondaryDark-500 font-koulen mb-1">
                NIM: {nim}
              </h6>
              <h6 className="text-secondaryDark-500 font-koulen mb-1">
                JURUSAN: {jurusan}
              </h6>
              <p className="caption md:body-1">
                {deskripsi}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-end gap-4">
            {!hasRegistered ? (
              <div className="w-36 h-12">
                <Button isPrimary={true} text={"Daftar"} type={"button"} />{" "}
              </div>
            ) : (
              <>
                <div className="w-36 h-12">
                  <button
                    type="button"
                    className="
        transition
        w-full 
        py-3 px-2 font-sen
        bg-primary-400
        border-secondary-400
        rounded-xl md:rounded-2xl
        font-bold 
        text-xs md:text-base
        hover:drop-shadow-[0_3px_6px_rgba(188,83,23,0.55)]       
        text-white
        "
                  >
                    Edit Pilihan
                  </button>
                </div>
                <div className="w-36 h-12">
                  <button
                    type="button"
                    className="
        transition
        w-full 
        py-3 px-2 font-sen
        bg-primaryDark-200
        border-secondary-400
        rounded-xl md:rounded-2xl
        font-bold 
        text-xs md:text-base
        hover:drop-shadow-[0_3px_6px_rgba(188,83,23,0.55)]       
        text-white
        "
                  >
                    Hapus Pilihan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilKasuh;
