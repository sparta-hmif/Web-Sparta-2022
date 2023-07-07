"use client"
import React from 'react'
import { useRouter } from "next/navigation";
import Button from '@/components/Button'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}


const CardSkeleton = ({...props}:CardProps) => {
  return (
    <div  role="status" className='animate-pulse  w-3/4 min-h-32 sm:min-h-40 border-2 border-primaryDark-600 rounded-md mt-3 px-4 py-4 sm:py-4 sm:pb-10 sm:px-8' {...props}>
        <div className="w-full mt-4">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
    </div>
  )
}

export default CardSkeleton