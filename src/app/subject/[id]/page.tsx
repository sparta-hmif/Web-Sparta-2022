"use client"
import React,{useState,useEffect} from 'react'
import Button from '@/components/Button'
import { useRouter } from "next/navigation";
import DashboardHeader from '@/components/DashboardHeader'
import AttachmentList from "../../assignment/detail/components/AttachmentList";
import { AttachmentProps } from "@/components/LinkAttachment";


interface Content {
  title:string,
  desc:string
}

const today = new Date();

const attachments:AttachmentProps[] = [
  {
    judul: "Dummy Attachment 1",
    link: "https://www.google.com/",
  },
  {
    judul: "Dummy Attachment 2",
    link: "https://www.google.com/",
  },
  {
    judul: "Dummy Attachment 3",
    link: "https://www.google.com/",
  },
]

const content  : Content[] =[
  {
    title:"apa itu cinta?",
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam."
  },
  {
    title:"bagaimana kah cintamu ?",
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam."
  },
  {
    title:"maap yang ngoding lagi galau",
    desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam."
  },
  
]
interface Data {
  namaMateri : string,
  tanggalRilis: Date,
  content:Content[],
  attachment:AttachmentProps[]
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const subjectDetail = ({ params }: { params: { id: string } }) => {
  const[data,setData] = useState<Data>()
  const[loading,setLoading] = useState<Boolean>(true)
  useEffect(()=>{
    setTimeout(()=>{
      const dummyData =   {
        namaMateri: "Berpacu dalam melodi yang memiliki melodi sangat indah sehingga dapat bersinergi menggapai mimpi di pantai indah kapuk",
        tanggalRilis: today,
        content: content,
        attachment:attachments
      }
      setData(dummyData)
      setLoading(false)
    },5000)
  },[])
  const router = useRouter()
  return (
    <div>
      <DashboardHeader title='SUBJECT' />
        <div className='p-10 sm:px-52	sm:py-20'>
        {loading ? 
          <div role="status" className="animate-pulse">
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5"></div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
            <div className="w-full mt-10">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <div className="w-full mt-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <div className="w-full mt-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <div className="w-full mt-4">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
          </div>
          :
          <>
            <h2 className='text-primaryDark-300'>
                {data!.namaMateri}
            </h2>
            <p className='body-1'>
              Tanggal Rilis : {formatDate(data!.tanggalRilis)}
            </p>
            {
              data?.content.map((data,index)=>(
                <>
                  <h4 className='mt-14' key={index}>
                    {data.title}
                  </h4>
                  <p className='body-1'key={index}>
                    {data.desc}
                  </p>
                </>
              ))
            }
            <h4 className='mt-14'>
              Attachment
            </h4>
            <AttachmentList attachmentProps={data!.attachment}/>
            <div className='flex justify-end mt-14'>
              <div className="w-4/12 sm:w-2/12 ">
                <Button
                  text="Close"
                  isPrimary={true}
                  type="submit"
                  onClick={()=>router.push(`/subject`)}
                />
              </div>
            </div>
          </>
        }
      </div>
    </div>
  )
}

export default subjectDetail