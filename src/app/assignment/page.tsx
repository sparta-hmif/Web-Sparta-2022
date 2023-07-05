import DashboardHeader from "@/components/DashboardHeader";
import List from "./components/List";
import { AttachmentProps } from "@/components/LinkAttachment";


interface AssignmentProps {
  judulTugas: string;
  dayTugas: number;
  startDate: Date;
  endDate: Date;
  deskripsi: string;
  attachment: AttachmentProps[];
  submission: string[];
  isSubmitted: boolean;
}

// DUMMY DATA
const today = new Date();
const futureDay = new Date(today.getTime() + 1000 * 60 * 60 * 24 * 10);
const pastDay = new Date(today.getTime() - 1000 * 60 * 60 * 24 * 10);
const attachment: AttachmentProps[] = [
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

const data = [
  {
    id: "1",
    judulTugas: "Judul Tugas 1",
    dayTugas: 1,
    startDate: today,
    endDate: futureDay,
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper urna ac quam cursus feugiat.",
    attachment: attachment,
    submission: [],
    isSubmitted: false,
  },
  {
    id: "2",
    judulTugas: "Judul Tugas 2",
    dayTugas: 2,
    startDate: pastDay,
    endDate: pastDay,
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper urna ac quam cursus feugiat.",
    attachment: attachment,
    submission: [],
    isSubmitted: false,
  },
  {
    id: "3",
    judulTugas: "Judul Tugas 3",
    dayTugas: 3,
    startDate: today,
    endDate: futureDay,
    deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper urna ac quam cursus feugiat.",
    attachment: attachment,
    submission: [],
    isSubmitted: true,
  }
];
// END OF DUMMY DATA

const Dashboard = () => {
  return (
    <div className="h-fit overflow-x-hidden">
      <DashboardHeader title="ASSIGNMENTS" />
      <List assignments={data} />
    </div>
  );
};

export default Dashboard;
