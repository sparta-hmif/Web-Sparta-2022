import DashboardHeader from "@/components/DashboardHeader";
import Assignment from "./components/Assignment";
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

// DUMMY
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
];

const ongoingAssignment: AssignmentProps = {
  judulTugas: "Judul Tugas Ongoing",
  dayTugas: 1,
  startDate: today,
  endDate: futureDay,
  deskripsi:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper urna ac quam cursus feugiat. Cras gravida eu odio elementum placerat. Morbi quam magna, tincidunt quis porttitor a, vehicula ut ipsum. Donec neque lectus, luctus sed metus elementum, maximus auctor metus. Nullam blandit, risus a luctus dapibus, purus lectus finibus tellus, vel congue nunc arcu in metus. Ut eu lorem eu metus bibendum fermentum ac vel lacus. Phasellus sem lectus, congue nec dui eu, ullamcorper lobortis nunc. Ut varius elit felis, et aliquet sapien suscipit in. Duis lobortis ligula in maximus dapibus. Ut a ullamcorper tortor. Nulla eu magna porta.",
  attachment: attachment,
  submission: [],
  isSubmitted: false,
};

const submittedAssignment: AssignmentProps = {
  ...ongoingAssignment,
  judulTugas: "Judul Tugas Submitted",
  endDate: pastDay,
  isSubmitted: true,
};

const expiredAssignment: AssignmentProps = {
  ...ongoingAssignment,
  judulTugas: "Judul Tugas Expired",
  endDate: pastDay,
};
// END OF DUMMY

const Page = ({ params }: { params: { id: string } }) => {
  const assignmentData: AssignmentProps = {
    // Ambil dari backendnya disini (mungkin)
    ...ongoingAssignment,
  };
  return (
    <div className="h-fit overflow-x-hidden">
      <DashboardHeader title="ASSIGNMENTS" />
      <Assignment {...assignmentData} />
    </div>
  );
};

export default Page;
