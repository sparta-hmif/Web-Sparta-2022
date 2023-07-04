const ScoreboardHeader = () => {
  return (
    <>
      <div className="grid grid-cols-10 gap-1 mt-[10px] py-[10px] px-[5px] justify-center text-center bg-primary-400 border-b-2 border-primaryDark-400">
        <div className=" ">Rank</div>
        <div className="col-span-2">NIM</div>
        <div className="col-span-3">Name</div>
        <div className="col-span-2">Score</div>
        <div className="col-span-2">Action</div>
      </div>
    </>
  );
};

export default ScoreboardHeader;
