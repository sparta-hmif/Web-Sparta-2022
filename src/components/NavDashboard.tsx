"use client";
import React, { useState } from "react";
import './Nav.css'

const NavDashboard = () => {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    const handleItemClick = (index:number) => {
      setActiveIndex(index);
    };

    return(
        <>
            <ul className="w-full h-auto flex justify-center items-center py-0 gap-0">
                <button className="hover:bg-[#E8DDDF]" onClick={() => handleItemClick(0)}>
                    <li className="w-60 h-auto flex flex-col justify-center items-center py-0 gap-y-2">
                        <div className={`w-full h-[6px] bg-[#E6B93D] ${activeIndex === 1 ? 'translate-x-[100%]' : ''} ${activeIndex === 2 ? 'translate-x-[200%]' : ''} transisi`}>
                            
                        </div>
                        <p className="font-koulen text-[24px] text-[#E6B93D]">ADD MODULE</p>
                        <div className="w-full h-[6px] bg-white"></div>
                    </li>
                </button>
                <button className="hover:bg-[#E8DDDF]" onClick={() => handleItemClick(1)}>
                    <li className="w-60 h-auto flex flex-col justify-center items-center py-0 gap-y-2">
                        <div className={`w-full h-[6px]`}>
                            
                        </div>
                        <p className="font-koulen text-[24px] text-[#E6B93D]">ADD ASSIGNMENT</p>
                        <div className="w-full h-[6px] bg-white"></div>
                    </li>
                </button>
                <button className="hover:bg-[#E8DDDF]" onClick={() => handleItemClick(2)}>
                    <li className="w-60 h-auto flex flex-col justify-center items-center py-0 gap-y-2">
                        <div className={`w-full h-[6px]`}>
                            
                        </div>
                        <p className="font-koulen text-[24px] text-[#E6B93D]">EDIT SCOREBOARD</p>
                        <div className="w-full h-[6px] bg-white"></div>
                    </li>
                </button>
            </ul>
        </>
    )
}

export default NavDashboard;