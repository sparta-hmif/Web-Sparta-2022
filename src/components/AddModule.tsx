"use client";
import { useState } from "react";
import Button from "./Button";
import { MdClose } from "react-icons/md";
import FileInput from "./FileInput";

const AddModule = () => {
  const [contentFocus, setContenFocus] = useState(-1);

  const [content, setContent] = useState<
    Array<{ title: string; desc: string }>
  >([{ title: "aku", desc: "opo iki le" }]);

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

  return (
    <>
      <div className="p-7 lg:px-64 lg:py-10">
        <h1 className="text-[40px] text-primaryDark-400 lg:text-[64px]">
          NEW MODULE
        </h1>
        <form>
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
              className="py-2 px-3 text-[8px] font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg border-secondaryDark-400 border-[1px] placeholder:text-secondaryDark-200 focus:outline-none focus:border-[1px] focus:border-secondary-400 lg:text-[16px]"
              placeholder="Judul"
            />
          </div>
          <div className="flex justify-between items-center my-1 lg:my-4">
            <p className="sub-1 text-[14px] lg:text-[24px] ">Content</p>
            <div className="hidden lg:block">
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
                    "py-2 pl-3 pr-7 lg:pr-9 text-[8px] font-sen text-secondaryDark-400 bg-[#BEBEBE] rounded-lg rounded-b-none border-[1px] border-b-0 placeholder:text-secondaryDark-200 focus:outline-none lg:text-[16px]"
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
                    "h-[64px] lg:h-[100px] py-2 px-3 text-[8px] font-sen text-secondaryDark-400 bg-primaryLight-400 rounded-lg rounded-t-none border-[1px] placeholder:text-secondaryDark-200 focus:outline-none lg:text-[16px]"
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
            <FileInput childToParent={undefined}></FileInput>
          </div>
          <div className="flex justify-center gap-2 my-7 lg:justify-end">
            <Button isPrimary={false} text={"Cancel"}></Button>
            <Button isPrimary={true} text={"Post"}></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddModule;
