import { MouseEventHandler } from "react";

const Button = ({
  isPrimary,
  text,
  onClick,
  type,
}: {
  isPrimary: boolean;
  text: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  type?: "button" | "reset" | "submit" | undefined;
}) => {
  return isPrimary ? (
    <button
      type={type}
      onClick={onClick}
      className="bg-secondary-400 rounded-lg font-sen font-bold text-white text-[8px] py-2 px-6 hover:drop-shadow-[0_4px_6px_rgba(188,83,23,0.75)] active:bg-[#BC5317] lg:text-[16px] lg:py-[15px] lg:px-[50px] lg:rounded-[15px]"
    >
      {text}
    </button>
  ) : (
    <button
      type={type}
      onClick={onClick}
      className="border-[3px] border-secondary-400 rounded-lg bg-white font-sen font-bold text-secondary-400 text-[8px] py-2 px-6 hover:drop-shadow-[0_4px_6px_rgba(188,83,23,0.75)] active:text-white active:bg-secondary-400 lg:text-[16px] lg:py-[15px] lg:px-[50px] lg:rounded-[15px]"
    >
      {text}
    </button>
  );
};

export default Button;
