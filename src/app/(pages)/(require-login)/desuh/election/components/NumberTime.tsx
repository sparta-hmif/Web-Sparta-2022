const NumberTime = ({ type, value }: { type: string; value: number }) => {
  return (
    <>
      <div className="w-1/4 md:max-w-[8rem] lg:max-w-[14rem] flex gap-[2px] md:gap-1 lg:gap-2 items-end">
        <div className="w-5/12 aspect-square shadow-xl rounded-lg lg:rounded-xl bg-secondary-400 text-primary-400 flex items-center justify-center">
          <h2 className="text-lg md:text-4xl lg:text-7xl pt-1">
            {Math.floor(value / 10)}
          </h2>
        </div>
        <div className="w-5/12 aspect-square shadow-xl rounded-lg lg:rounded-xl bg-secondary-400 text-primary-400 flex items-center justify-center">
          <h2 className="text-lg md:text-4xl lg:text-7xl pt-1">{value % 10}</h2>
        </div>
        <p className="font-koulen text-base md:text-3xl lg:text-5xl text-secondary-400">
          {type}
        </p>
      </div>
    </>
  );
};

export default NumberTime;
