import { IoClose } from "react-icons/io5";

const StaffModal = () => {
  return (
    <div className="fixed inset-0 bg-neutral-800/70 z-50 flex items-center justify-center">
      <div className="bg-[url('/images/landing/PopUp.svg')] h-[50%] w-5/12 bg-cover bg-no-repeat rounded-lg flex relative">
        <IoClose className="absolute text-primary-400 right-3 top-3 cursor-pointer" size={30}/>
        <div className="flex-1 flex items-center justify-center">
          <div className="h-48 w-48 rounded-full bg-primaryDark-400"></div>
        </div>
        <div className="flex-1 flex items-start justify-around pt-4 flex-col text-start">
          <div className=" px-12">
            <p className="font-sen text-secondaryDark-400 font-extrabold text-4xl tracking-tight">DIVISI</p>
            <p className="font-sen text-secondaryDark-400 font-light text-2xl tracking-tight">YUNANI</p>
          </div>
          <div className="px-12">
            <p className="font-sen font-bold text-primaryDark-400 text-xl">Kevin Sebastian</p>
            <p className="font-sen font-normal text-primaryDark-400 text-xl">18221143</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
