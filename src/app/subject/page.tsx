"use client"
import {useState,useEffect, use} from 'react'
import DashboardHeader from "@/components/DashboardHeader"
import Card from "./components/card"
import CardSkeleton from './components/cardSkeleton'


const today = new Date();
const futureDay = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 10);
const pastDay = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 10);
const dummyData = [
  {
    id:"1",
    namaMateri: "Berpacu dalam melodi yang memiliki melodi sangat indah sehingga dapat bersinergi menggapai mimpi di pantai indah kapuk",
    tanggalRilis: today,
  },
  {
    id:"2",
    namaMateri: "Materi 2",
    tanggalRilis: futureDay,
  },
  {
    id:"3",
    namaMateri: "Materi 3",
    tanggalRilis: pastDay,
  },
  {
    id:"4",
    namaMateri: "Materi 4",
    tanggalRilis: futureDay
  }
];

interface Data {
  id:string,
  namaMateri:string,
  tanggalRilis:Date
}

const Subject = () => {
  const [loading,setLoading] = useState<Boolean>(true)
  const [data,setData] = useState<Data[]>([])
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
      setData(dummyData)
    },5000)
  },[])

  return (
    <div>
        <DashboardHeader title="SUBJECT" />
        <div className="flex flex-col items-center py-10">
          {
            loading ? 
            <>
              <CardSkeleton/>
              <CardSkeleton/>
              <CardSkeleton/>
              <CardSkeleton/>
            </>
            :
            data.map((data, index) => (
              <Card
                key={index}
                id={data.id}
                namaMateri={data.namaMateri}
                tanggalRilis={data.tanggalRilis}
              />
            ))
          }
        </div>
    </div>
  )
}

export default Subject