"use client";

import { useState, useRef } from "react";
import Button from "@/components/Button";
import { MdClose } from "react-icons/md";
import LinkAttachment, { AttachmentProps } from "@/components/LinkAttachment";
import toast from "react-hot-toast";

const AddModule = () => {
  // Component states
  const [contentFocus, setContenFocus] = useState(-1);
  const [title, setTitle] = useState<string>("");

  const [content, setContent] = useState<
    Array<{ title: string; desc: string }>
  >([{ title: "", desc: "" }]);
  const [attachment, setAttachment] = useState<Array<AttachmentProps>>([]);

  // Component refs
  let titleRef = useRef<HTMLInputElement>(null);
  let linkRef = useRef<HTMLInputElement>(null);

  const addContent = () => {
    setContent([...content, { title: "", desc: "" }]);
  };

  const deleteContent = (val: { title: string; desc: string }) => {
    const temp = [...content];
    var index = temp.indexOf(val);
    if (index !== -1) {
      temp.splice(index, 1);
      setContent(temp);
    }
  };

  const changeTitle = (index: number, value: string) => {
    const temp = [...content];
    temp[index].title = value;
    setContent(temp);
  };

  const changeDesc = (index: number, value: string) => {
    const temp = [...content];
    temp[index].desc = value;
    setContent(temp);
  };

  const addAttachment = (val: AttachmentProps) => {
    setAttachment([...attachment, val]);
  };

  const deleteAttachment = (idx: number) => {
    const temp = [...attachment];
    temp.splice(idx, 1);
    setAttachment(temp);
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data = {
      title,
      sections: content.map((val) => ({
        title: val.title,
        description: val.desc,
      })),
      attachments: attachment.map((val) => ({
        title: val.judul,
        link: val.link,
      })),
    };
    const toastId = toast.loading("Loading...");

    const res = await fetch(process.env.NEXT_PUBLIC_WEB_URL + "/api/materi", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resJson = await res.json();

    if (resJson.message === "success") {
      toast.success("Module added successfully", {
        id: toastId,
      });
      return handleReset();
    }

    toast.error("Failed to add module", {
      id: toastId,
    });
  };

  // Handle form reset
  const handleReset = () => {
    setTitle("");
    setContent([{ title: "", desc: "" }]);
    setAttachment([]);
    if (titleRef.current && linkRef.current) {
      titleRef.current.value = "";
      linkRef.current.value = "";
    }
  };

  return (
    <>
      <div className="p-7 lg:px-64 lg:py-10">
        <h1 className="text-[40px] text-primaryDark-400 lg:text-[64px]">
          NEW MODULE
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col">
            <label
              htmlFor="judul"
              className="sub-1 text-[14px] my-1 lg:text-[24px] lg:my-3"
            >
              Judul
            </label>
            <input
              type="text"
              id="judul"
              className="py-2 px-3 text-sm font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400 lg:base"
              placeholder="Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center my-1 lg:my-4">
            <p className="sub-1 text-[14px] lg:text-[24px] ">Content</p>
            <div className="hidden lg:block w-[14%]">
              <Button
                type="button"
                onClick={addContent}
                isPrimary={true}
                text={"Add Section"}
              ></Button>
            </div>
          </div>
          {content.map(function (row, index): any {
            return (
              <div
                key={index}
                className="relative flex flex-col w-auto h-auto mb-2 lg:mb-4"
              >
                <button
                  type="button"
                  onClick={() => deleteContent(row)}
                  className="absolute text-secondaryDark-400 text-[24px] w-6 h-6 top-1 right-1 lg:text-[28px] lg:w-7 lg:h-7 lg:top-2 lg:right-2"
                >
                  <MdClose></MdClose>
                </button>
                <input
                  type="text"
                  id={"title" + index}
                  onFocus={() => setContenFocus(index)}
                  onBlur={() => setContenFocus(-1)}
                  value={row.title}
                  onChange={(val) => changeTitle(index, val.target.value)}
                  className={
                    (contentFocus == index
                      ? "border-secondary-400 "
                      : "border-secondaryDark-400 ") +
                    "py-2 pl-3 pr-7 lg:pr-9 text-sm font-sen text-secondaryDark-400 bg-[#BEBEBE] rounded-lg rounded-b-none border-[1px] border-b-0 placeholder:text-secondaryDark-200 focus:outline-none lg:text-base"
                  }
                  placeholder="Section Title"
                />
                <textarea
                  id={"description" + index}
                  onFocus={() => setContenFocus(index)}
                  onBlur={() => setContenFocus(-1)}
                  value={row.desc}
                  onChange={(val) => changeDesc(index, val.target.value)}
                  className={
                    (contentFocus == index
                      ? "border-secondary-400 border-t-secondaryDark-400 "
                      : "border-secondaryDark-400 ") +
                    "h-[64px] lg:h-[100px] py-2 px-3 text-sm font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg rounded-t-none border-[1px] placeholder:text-secondaryDark-200 focus:outline-none lg:text-base"
                  }
                  placeholder="Description"
                />
              </div>
            );
          })}
          <div className="flex justify-center my-4 lg:hidden">
            <Button
              type="button"
              onClick={addContent}
              isPrimary={true}
              text={"Add Section"}
            ></Button>
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="attachment"
              className="sub-1 text-[14px] my-1 lg:text-[24px] lg:my-3"
            >
              Attachment
            </label>
            <div className="w-full">
              <LinkAttachment
                linkArray={attachment}
                addLink={addAttachment}
                deleteLink={deleteAttachment}
              />
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-10 w-full max-w-[30rem] lg:justify-end md:ml-auto">
            <Button
              isPrimary={false}
              text={"Cancel"}
              type="button"
              onClick={handleReset}
            ></Button>
            <Button
              isPrimary={true}
              text={"Post"}
              type="button"
              onClick={handleSubmit}
            ></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddModule;
