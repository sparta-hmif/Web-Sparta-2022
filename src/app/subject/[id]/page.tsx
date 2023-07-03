"use client"
import React,{useState,useEffect} from 'react'
import Button from '@/components/Button'
import { useRouter } from "next/navigation";
import DashboardHeader from '@/components/DashboardHeader'


interface Data {
  namaMateri : string,
  tanggalRilis:string,
  section1:string,
  section2:string,
  attachment:string[]
}

const subjectDetail = ({ params }: { params: { id: string } }) => {
  const[data,setData] = useState<Data>()
  const[loading,setLoading] = useState<Boolean>(true)
  useEffect(()=>{
    setTimeout(()=>{
      const dummyData =   {
        namaMateri: "Berpacu dalam melodi yang memiliki melodi sangat indah sehingga dapat bersinergi menggapai mimpi di pantai indah kapuk",
        tanggalRilis: "2023-07-10",
        section1:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam.",
        section2:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam.",
        attachment:['./aapa.pdf','./asas.pdf']
      }
      setData(dummyData)
      setLoading(false)
    },5000)
  },[])
  const router = useRouter()
  return (
    <div>
      <DashboardHeader title='SUBJECT' />
      <div className='px-52	py-20 min-h-screen'>
          <h2 className='text-primaryDark-300'>
              {data?.namaMateri}
          </h2>
          <p className='body-1'>
            Tanggal Rilis : {data?.tanggalRilis}
          </p>
          <h4 className='mt-14'>
            Section 1
          </h4>
          <p className='body-1'>
            {data?.section1}
          </p>
          <h4 className='mt-14'>
            Section 2
          </h4>
          <p className='body-1'>
            {data?.section2}
          </p>
          <h4 className='mt-14'>
            Attachment
          </h4>
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
      </div>
    </div>
  )
}

export default subjectDetail