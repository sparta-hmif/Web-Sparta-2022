import DashboardHeader from "@/components/DashboardHeader"
import Card from "./components/card"



const dummyData = [
  {
    id:"1",
    namaMateri: "Berpacu dalam melodi yang memiliki melodi sangat indah sehingga dapat bersinergi menggapai mimpi di pantai indah kapuk",
    tanggalRilis: "2023-07-10",
  },
  {
    id:"2",
    namaMateri: "Materi 2",
    tanggalRilis: "2023-07-15",
  },
  {
    id:"3",
    namaMateri: "Materi 3",
    tanggalRilis: "2023-07-20",
  },
  {
    id:"4",
    namaMateri: "Materi 4",
    tanggalRilis: "2023-07-20"
  }
];


const Assignment = () => {
  return (
    <div>
        <DashboardHeader title="SUBJECT" />
        <div className="flex flex-col items-center py-10">
          {
            dummyData.map((data, index) => (
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

export default Assignment