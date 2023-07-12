const Card = () => {
    return ( 
        <div className="relative h-[10vh] md:h-[25vh] flex flex-row items-center w-[80vw] md:w-full justify-between gap-1 md:gap-auto box-border border-solid border-[2px] border-primaryDark-400 rounded-[10px] p-1 md:p-4">
      <div className="flex flex-row items-center justify-start gap-[0.1rem] md:gap-[0.5rem] w-[45vw] md:w-[50vw] ">
            <div className="relative text-h5 md:text-h2 inline-block text-[#9f9f9f] font-koulen">
              #1
            </div>
            <button className="hidden md:block relative">
              <img className="relative" alt="" src="/images/kasuh/icon.svg" />
            </button>
            <img
              className="relative p-[0.5rem]"
            alt=""
            width="50px md:100px"
            height="50px md:100px"
              src="/images/kasuh/circle.svg"
            />
            <div className=" flex flex-col items-start justify-start text-left w-full">
              <div className="relative inline-block font-hammersmith text-black text-[14px] md:text-h4">
                NAMA KAKAK ASUH
              </div>
              <b className="relative text-[12px] md:text-h5 flex text-primaryDark-400 items-center">
                135182XX
              </b>
              <b className="relative text-[10px] md:text-sub-1 flex whitespace-pre-wrap items-center">
                <span className="[line-break:anywhere] w-full">
                  <p className="m-0">Pendaftar : XX</p>
                  <p className="m-0">Kuota : XX</p>
                </span>
              </b>
            </div>
        </div>
            <div className="flex flex-col md:flex-row gap-[0.6rem] text-[10px] md:text-sub-1 text-white h-full md:w-[20vw] items-center justify-center md:items-end md:justify-end font-sen">
              <button className="rounded-lg bg-danger-300 hover:bg-[#b01018] flex flex-row py-[0.5rem] px-[0.5rem] md:px-[1rem] md:py-[0.5rem] items-center justify-center w-full md:w-[50%]">
                <b className="relative">Hapus Pilihan</b>
              </button>
              <button className="rounded-lg bg-secondary-400 hover:bg-secondary-500 flex flex-row py-[0.5rem] px-[0.5rem] md:px-[1rem] md:py-[0.5rem] items-center justify-center w-full md:w-[50%]">
                <b className="relative">Edit Alasan</b>
              </button>
            </div>
      </div>
     );
}
 
export default Card;