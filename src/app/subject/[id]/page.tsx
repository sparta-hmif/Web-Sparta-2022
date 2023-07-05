"use client";

import React from "react";
import useSwr from "swr";
import Link from "next/link";

import fetcher from "@/app/lib/fetcher";
import AttachmentList from "@/app/assignment/[id]/components/AttachmentList";
import { AttachmentProps } from "@/components/LinkAttachment";
import { formatDate } from "@/app/assignment/components/Preview";
import Button from "@/components/Button";

interface Content {
  title: string;
  description: string;
}

interface Data {
  namaMateri: string;
  tanggalRilis: Date;
  content: Content[];
  attachment: AttachmentProps[];
}

const SubjectDetail = ({ params }: { params: { id: string } }) => {
  const { data, error, isLoading } = useSwr(
    `http://localhost:3000/api/materi/${params.id}`,
    fetcher
  );
  const mappedData: Data = {
    namaMateri: data?.title || "",
    tanggalRilis: new Date(data?.releaseDate) || new Date(),
    content: data?.sections || [],
    attachment:
      data?.attachments.map((data: any) => ({
        judul: data.title,
        link: data.link,
      })) || [],
  };

  return (
    <div>
      <div className="p-10 sm:px-52	sm:py-20">
        <h2 className="text-primaryDark-300 text-5xl md:text-7xl">
          {mappedData!.namaMateri}
        </h2>
        <p className="body-1">
          Tanggal Rilis : {formatDate(mappedData!.tanggalRilis)}
        </p>
        {mappedData?.content.map((data, index) => (
          <>
            <h4 className="mt-14 text-3xl md:text-4xl" key={index}>
              {data.title}
            </h4>
            <p className="font-sen text-base md:text-lg" key={index}>
              {data.description}
            </p>
          </>
        ))}
        <h4 className="mt-14 text-3xl md:text-4xl mb-3">Attachment</h4>
        <AttachmentList attachmentProps={mappedData!.attachment} />
        <div className="flex justify-end mt-14">
          <div className="w-4/12 sm:w-2/12 ">
            <Link href="/subject" className="w-4/12 sm:w-2/12">
              <div className="w-full ">
                <Button text="Close" isPrimary={true} type="button" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetail;
