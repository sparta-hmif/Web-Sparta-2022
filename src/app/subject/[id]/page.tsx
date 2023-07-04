"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import AttachmentList from "@/app/assignment/[id]/components/AttachmentList";
import { AttachmentProps } from "@/components/LinkAttachment";
import { formatDate } from "@/app/assignment/components/Preview";

interface Content {
  title: string;
  desc: string;
}

const today = new Date();

const attachments: AttachmentProps[] = [
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

const content: Content[] = [
  {
    title: "apa itu cinta?",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam.",
  },
  {
    title: "bagaimana kah cintamu ?",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam.",
  },
  {
    title: "maap yang ngoding lagi galau",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt minima, ipsum quasi sunt quisquam unde ex numquam inventore. Nam itaque omnis possimus molestiae nobis qui voluptatibus velit explicabo pariatur ipsam.",
  },
];
interface Data {
  namaMateri: string;
  tanggalRilis: Date;
  content: Content[];
  attachment: AttachmentProps[];
}

const dummyData = {
  namaMateri:
    "Berpacu dalam melodi yang memiliki melodi sangat indah sehingga dapat bersinergi menggapai mimpi di pantai indah kapuk",
  tanggalRilis: today,
  content: content,
  attachment: attachments,
};

const SubjectDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [data, setData] = useState<Data>(dummyData);
  // const [loading, setLoading] = useState<Boolean>(true);
  return (
    <div>
      <DashboardHeader title="SUBJECT" />
      <div className="p-10 sm:px-52	sm:py-20">
        <h2 className="text-primaryDark-300 text-5xl md:text-7xl">{data!.namaMateri}</h2>
        <p className="body-1">
          Tanggal Rilis : {formatDate(data!.tanggalRilis)}
        </p>
        {data?.content.map((data, index) => (
          <>
            <h4 className="mt-14 text-3xl md:text-4xl" key={index}>
              {data.title}
            </h4>
            <p className="font-sen text-base md:text-lg" key={index}>
              {data.desc}
            </p>
          </>
        ))}
        <h4 className="mt-14 text-3xl md:text-4xl mb-3">Attachment</h4>
        <AttachmentList attachmentProps={data!.attachment} />
        <div className="flex justify-end mt-14">
          <div className="w-4/12 sm:w-2/12 ">
            <Button
              text="Close"
              isPrimary={true}
              type="submit"
              onClick={() => router.push(`/subject`)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
