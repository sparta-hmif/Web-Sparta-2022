import React from "react";
import Button from "@/components/Button";
import Link from "next/link";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  namaMateri: string;
  tanggalRilis: Date;
  id: string;
}

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const Card = ({ namaMateri, tanggalRilis, id, ...props }: CardProps) => {
  return (
    <div
      className="w-full min-h-32 sm:min-h-40 border-2 border-primaryDark-400 rounded-2xl mt-3 px-5 md:px-10 py-3 md:py-6"
      {...props}
    >
      <h4 className="text-[25px] sm:text-[32px] line-clamp-2">{namaMateri}</h4>
      <p className="text-xs md:text-lg body-1 pt-2 pb-2 md:pb-5">
        Tanggal Rilis : {formatDate(tanggalRilis)}
      </p>
      <div className="flex justify-end">
        <Link href={`/subject/${id}`} className="w-4/12 sm:w-2/12">
          <div className="w-full ">
            <Button text="Open" isPrimary={true} type="submit" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
