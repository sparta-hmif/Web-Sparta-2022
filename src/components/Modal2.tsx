import ex from "../../public/close.svg"
const Modal2 = () => {
    return(
        <>
            <div className="w-full h-auto flex justify-center items-center py-0">
                <div className="w-[270px] lg:w-[30%] h-auto rounded-xl drop-shadow-lg bg-[#FFFFFF] pt-4 pb-8">
                    <div className="w-full flex justify-end px-5">
                        <button className=""><img src={ex.src} className="" /></button>
                    </div>
                    <div className="w-full flex flex-col justify-center items-center gap-y-4">
                        <p className="font-koulen text-black text-[20px]">ARE YOU OK?</p>
                        <p className="font-koulen text-black text-[14px]">JUST CHECKING IN</p>
                        <button className="w-[180px] h-auto font-sen text-[16px] text-white bg-[#8C3E11] rounded-lg flex justify-center items-center py-2">Button Yes</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal2;