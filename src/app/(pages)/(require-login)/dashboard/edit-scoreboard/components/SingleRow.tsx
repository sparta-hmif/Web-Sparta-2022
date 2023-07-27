import Button from "@/components/Button";
import { dataProp } from "./Scoreboard";
import { useEffect, useRef, useState } from "react";
import { IoMdCheckboxOutline, IoMdCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

const SingleRow = ({ rank, nim, name, score }: dataProp) => {
  const [isEdit, setIsEdit] = useState(false);
  const [scoreEdit, setScoreEdit] = useState(score);
  const lastScoreSaved = useRef(score);

  useEffect(() => setScoreEdit(score), [score]);

  const handleSave = async () => {
    const toastId = toast.loading("Loading...");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/score/${nim}`,
      {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          score: scoreEdit,
        }),
      }
    );
    if (res.status === 200) {
      setIsEdit(false);
      lastScoreSaved.current = scoreEdit;
      toast.success("Score updated!", { id: toastId });
      return;
    }

    toast.error("Failed to update score", { id: toastId });
  };

  const handleCancel = () => {
    setIsEdit(false);
    setScoreEdit(lastScoreSaved.current);
  };

  return (
    <div className="grid grid-cols-10 bg-primaryLight-400 border-b-[2px] border-secondaryDark-100 gap-3 px-[5px] py-[10px] items-center justify-center text-center">
      <div className="">{rank}</div>
      <div className="text-xs md:text-base col-span-2">{nim}</div>
      <div className="text-xs md:text-base col-span-2 md:col-span-3">
        <div className="">{name}</div>
      </div>
      <div className="col-span-3 md:col-span-2">
        {isEdit ? (
          <input
            type="number"
            value={scoreEdit}
            onChange={(e) => setScoreEdit(parseInt(e.target.value))}
            className="w-full text-center text-xs md:text-base rounded-lg focus:ring-1 focus:outline-none outline-none ring-0 border-1 border-neutral-400 focus:border-none focus:ring-primaryDark-400"
          />
        ) : (
          <>{scoreEdit}</>
        )}
      </div>

      <div className="col-span-2 lg:mx-5 ">
        {isEdit ? (
          <div className="w-full flex justify-center gap-3">
            <IoMdCloseCircleOutline
              className="text-xl md:text-3xl text-neutral-400 hover:text-danger-300 transition duration-300 cursor-pointer"
              onClick={handleCancel}
            />
            <IoMdCheckboxOutline
              className="text-xl md:text-3xl text-neutral-400 hover:text-success-300 transition duration-300 cursor-pointer"
              onClick={handleSave}
            />
          </div>
        ) : (
          <Button
            isPrimary={true}
            text="Edit"
            onClick={() => setIsEdit(true)}
          />
        )}
      </div>
    </div>
  );
};

export default SingleRow;
