import Button from "@/components/Button";
import { dataProp } from "../page";

const SingleRow = ({ rank, nim, name, score }: dataProp) => {
  return (
    <div className="grid grid-cols-10 bg-primaryLight-400 border-b-[2px] border-secondaryDark-100 gap-1 px-[5px] py-[10px] items-center justify-center text-center">
      <div className="">{rank}</div>
      <div className="col-span-2">{nim}</div>
      <div className="col-span-3">
        <div className="">{name}</div>
      </div>

      <div className="col-span-2">{score}</div>
      <div className="col-span-2 lg:mx-5">
        <Button isPrimary={true} text="Edit" />
      </div>
    </div>
  );
};

export default SingleRow;
