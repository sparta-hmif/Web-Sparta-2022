const Button = ({ isPrimary, text }: { isPrimary: boolean; text: string }) => {
  return isPrimary ? (
    <button
      type="submit"
      className="bg-secondary-400 rounded-lg font-sen font-bold text-white text-[8px] py-2 px-6 hover:drop-shadow-[0_4px_6px_rgba(188,83,23,0.75)] active:bg-[#BC5317] lg:text-[16px] lg:py-[15px] lg:px-[50px]"
    >
      {text}
    </button>
  ) : (
    <button className="border-[3px] border-secondary-400 rounded-lg bg-white font-sen font-bold text-secondary-400 text-[8px] py-2 px-6 hover:drop-shadow-[0_4px_6px_rgba(188,83,23,0.75)] active:text-white active:bg-secondary-400 lg:text-[16px] lg:py-[15px] lg:px-[50px]">
      {text}
    </button>
  );
};

export default Button;
