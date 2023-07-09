
import Button from "../Button";
import {AiFillInstagram}  from "react-icons/ai";

const ProfilKasuh = () => {
  return (
    <>
      <div className="w-full h-[960px] bg-[url('/images/profil-kasuh/background.svg')] bg-cover flex justify-center pt-16 md:pt-20 lg:items-center">
        <div className="w-[96%] md:w-[80%] h-[720px] lg:h-[75%] bg-white rounded-xl border-[#560C15] border-4 pt-10 md:pt-16 lg:px-16">
          <div className="flex flex-col justify-center items-center lg:items-start lg:flex-row gap-4 lg:gap-11 px-4 mb-9">
            <div className="w-40 h-40 lg:w-80 lg:h-[450px] bg-[#D9D9D9] rounded-xl"></div>
            <div className="w-auto md:w-[520px] h-[400px] md:h-[360px]">
              <div className="flex justify-between mb-1">
                <div className="flex items-center gap-1">
                <AiFillInstagram/>
                  <p className="font-koulen text-black text-[20px]">NAMA_IG</p>
                </div>
                <div className="flex items-center gap-1">
                  <img src="/images/profil-kasuh/gift.svg"/>
                  <p className="font-koulen text-black text-[20px]">6/6/2026</p>
                </div>
              </div>
              <h4 className="text-primaryDark-400 font-koulen mb-1">
                NAMA LENGKAP DARI PENGGUNA
              </h4>
              <h6 className="text-secondaryDark-500 font-koulen mb-1">
                NAMA PANGGILAN: TANGGA
              </h6>
              <h6 className="text-secondaryDark-500 font-koulen mb-1">
                NIM: 13521000
              </h6>
              <h6 className="text-secondaryDark-500 font-koulen mb-1">
                JURUSAN: STIF
              </h6>
              <p className="caption md:body-1">
                Deskripsi tentang kasuh (termasuk hobby, mbti, interset,
                domisili, dll) Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Praesent velit libero, hendrerit sed odio et,
                finibus condimentum mi. Praesent tristique, arcu ut efficitur
                porta, nulla metus maximus mauris, sed finibus urna ex non
                ligula. Proin quis ante non nisl iaculis tincidunt eget vitae
                nisl.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center lg:justify-end">
            <div className="w-36 h-12">
              <Button isPrimary={true} text={"Daftar"} type={"button"} />{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilKasuh;
