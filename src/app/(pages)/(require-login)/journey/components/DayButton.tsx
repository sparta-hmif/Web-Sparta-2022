"use client";

const DayButton = ({
  width,
  bottom,
  left,
  right,
  onOpen,
}: {
  width: string;
  bottom: string;
  left?: string;
  right?: string;
  onOpen: () => void;
}) => {
  return (
    <div
      className={`aspect-square rounded-full absolute cursor-pointer`}
      style={{
        bottom: `${bottom}`,
        left: `${left}`,
        right: `${right}`,
        width: `${width}`,
      }}
      onClick={onOpen}
    ></div>
  );
};

export default DayButton;
