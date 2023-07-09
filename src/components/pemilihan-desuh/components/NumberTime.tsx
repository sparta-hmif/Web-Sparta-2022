const NumberTime = ({ type, value }: { type: string; value: number }) => {
  return (
    <>
      <div className="w-auto flex gap-[2px] lg:gap-2 items-end">
        <div className="w-[25px] h-[25px] lg:w-[71px] lg:h-[71px] rounded-lg lg:rounded-xl bg-secondary-400 text-primary-400 flex items-center justify-center">
          <h2 className="text-[20px] lg:text-[64px]">
            {Math.floor(value / 10)}
          </h2>
        </div>
        <div className="w-[25px] h-[25px] lg:w-[71px] lg:h-[71px] rounded-lg lg:rounded-xl bg-secondary-400 text-primary-400 flex items-center justify-center">
          <h2 className="text-[20px] lg:text-[64px]">{value % 10}</h2>
        </div>
        <p className="font-koulen text-[12px] lg:text-3xl text-secondary-400">
          {type}
        </p>
      </div>
    </>
  );
};

export default NumberTime;
