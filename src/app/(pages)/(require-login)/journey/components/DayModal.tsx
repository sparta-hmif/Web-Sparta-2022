"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import ContentElement from "./ContentElement";

import { formatDate } from "../../assignment/components/Preview";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

const DayModal = ({
  day,
  date,
  content,
  onClose,
}: {
  day: number;
  date: string;
  content: {
    starReview: number;
    story: string;
    reflection: string;
    isVisible: boolean;
  };
  onClose: () => void;
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const session = useSession();
  const router = useRouter();

  const handleSubmit = async () => {
    const toastId = toast.loading("Loading...");

    if (!session?.data) {
      toast.error("Invalid credentials", {
        id: toastId,
      });
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/day-eval/${day}/${
        (session.data?.user as User).nim
      }`,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          rating: contentValue.starReview,
          story: contentValue.story,
          reflection: contentValue.reflection,
        }),
      }
    );

    if (res.status === 200) {
      toast.success("Journey Updated!", {
        id: toastId,
      });
      router.refresh();
    } else {
      toast.error("Failed to save", {
        id: toastId,
      });
    }
  };

  const StarElement = ({ order }: { order: number }) => {
    return (
      <FaStar
        size={20}
        className={`${
          contentValue.starReview >= order
            ? "text-primary-400"
            : "text-primaryLight-700"
        } ${viewMode ? "cursor-default" : "cursor-pointer"}`}
        onClick={() => {
          if (!viewMode) {
            setContentValue((prev) => ({ ...prev, starReview: order }));
          }
        }}
      />
    );
  };

  const [viewMode, setViewMode] = useState(true);
  const [contentValue, setContentValue] = useState(content);
  const [fullScale, setFullScale] = useState(false);

  setTimeout(() => (content?.isVisible ? setFullScale(true) : null), 50);

  return (
    <div className="fixed z-50 h-screen top-0 inset-x-0 bg-neutral-800/70 backdrop-blur-[2px]">
      <div className="w-full h-full relative flex justify-center items-center">
        <Image
          src="/images/journey/Bottom.svg"
          alt="Bottom"
          width={375}
          height={375}
          className="absolute w-full bottom-0"
          onClick={() => {
            setFullScale(false);
            onClose();
          }}
        />
        <div
          style={{
            transform: fullScale ? "scale(1)" : "scale(0.8)",
          }}
          className="w-11/12 h-[90vh] max-w-2xl duration-500 transition-transform bg-white border-4 border-primaryDark-400 z-10 rounded-2xl py-3 px-5 md:p-10 flex flex-col items-center scale-50"
        >
          <div className="w-11/12 max-w-[20rem] flex items-center flex-col gap-3">
            <Image
              src="/images/journey/Awesome.svg"
              alt="Awesome"
              width={375}
              height={375}
              className="object-contain w-10/12"
            />
            <div className="w-full drop-shadow-lg rounded-2xl bg-white flex py-3 px-5 justify-center items-center gap-2">
              <StarElement order={1} />
              <StarElement order={2} />
              <StarElement order={3} />
              <StarElement order={4} />
              <StarElement order={5} />
              {!viewMode && (
                <h5 className="font-bold leading-none text-lg ml-2">
                  {contentValue.starReview}
                </h5>
              )}
            </div>
          </div>
          <div className=" w-full flex flex-col h-[70%] lg:h-[65%] mt-4 mb-3">
            <h2 className="text-primaryDark-400 leading-none text-4xl md:text-6xl">
              DAY {day}
            </h2>
            <p className="body-1 text-xs md:text-sm mb-2">
              {formatDate(new Date(date))}
            </p>
            <div className="w-full h-[85%] lg:h-[75%] mt-auto flex-col gap-3 flex">
              <ContentElement
                title="What Spartan Did?"
                value={contentValue.story}
                onChange={handleChange}
                name="story"
                viewMode={viewMode}
              />
              <ContentElement
                title="Spartan's Reflection"
                value={contentValue.reflection}
                onChange={handleChange}
                name="reflection"
                viewMode={viewMode}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 gap-4 flex mt-auto">
            <Button
              text="Close"
              isPrimary={false}
              onClick={() => {
                setFullScale(false);
                onClose();
              }}
            />
            {viewMode ? (
              <Button
                text="Edit"
                isPrimary={true}
                onClick={() => setViewMode(false)}
              />
            ) : (
              <Button text="Save" isPrimary={true} onClick={handleSubmit} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayModal;
