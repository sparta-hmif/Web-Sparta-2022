"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import Button from '@/components/Button'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  namaMateri: string;
  tanggalRilis: Date;
  id:string;
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const Card = ({namaMateri,tanggalRilis,id,...props}:CardProps) => {
  const router = useRouter()
  return (
    <div className='w-3/4 min-h-32 sm:min-h-40 border-2 border-primaryDark-600 rounded-md mt-3 px-4  py-2 sm:py-4 sm:px-8' {...props}>
        <h4 className='text-[25px] sm:text-[32px] line-clamp-2'>
          {namaMateri}
        </h4>
        <p className='text-xs sm:text-[15px] body-1'>Tanggal : {formatDate(tanggalRilis)}</p>
        <div className='flex justify-end'>
          <div className="w-4/12 sm:w-2/12 ">
            <Button
              text="Open"
              isPrimary={true}
              type="submit"
              onClick={()=>router.push(`/subject/${id}`)}
            />
          </div>
        </div>
    </div>
  )
}

export default Card