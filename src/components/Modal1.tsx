import ex from "../../public/close.svg"
import cek from "../../public/check-one.svg"
const Modal2 = () => {
    return(
        <>
            <div className="w-full h-auto flex justify-center items-center py-0">
                <div className="w-[310px] lg:w-[33%] h-auto rounded-xl drop-shadow-lg bg-[#FFFFFF] pt-4 pb-16 lg:pb-8">
                    <div className="w-full flex justify-end px-5">
                        <button className=""><img src={ex.src} className="" /></button>
                    </div>
                    <div className="w-full h-auto flex items-center justify-center lg:justify-start lg:px-16 gap-x-4 mt-6 lg:mt-4 lg:gap-x-8">
                        <div className=""><img src={cek.src} className=""/></div>
                        <div className="flex flex-col justify-start items-start gap-y-1">
                            <p className="font-koulen text-black text-[20px]">SURE YOU WANT TO SUBMIT?</p>
                            <p className="font-koulen text-black text-[14px]">ARE YOU SURE YOU WANT TO ACCEPT THIS?</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-y-4 lg:gap-x-4 mt-8">
                        <button className="w-[160px] h-auto font-sen text-[16px] text-white bg-[#FF1C26] rounded-lg flex justify-center items-center py-2">Button No</button>
                        <button className="w-[160px] h-auto font-sen text-[16px] text-white bg-[#8C3E11] rounded-lg flex justify-center items-center py-2">Button Yes</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal2;