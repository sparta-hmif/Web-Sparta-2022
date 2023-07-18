import CareerPathCountdown from "./components/CareerPathCountdown";
import CareerPathInfo from "./components/CareerPathInfo";
import DataDiri from "./components/DataDiri";
import PathSelection from "./components/PathSelection";

const CareerPath = () => {
  const targetTestDate = new Date("2023-07-14T00:00:00");
  return (
    <div className="mx-3 md:mx-[30px] lg:mx-[70px] mt-[30px] lg:mt-[50px] lg:flex lg:gap-x-5">
      <div className="lg:mr-[50px]">
        <DataDiri targetDate={targetTestDate} />
      </div>
      <div className="lg:mr-[10px]">
        <CareerPathInfo targetDate={targetTestDate} />
        <div className="mb-16">
          {targetTestDate.getTime() > new Date().getTime() ? (
            <CareerPathCountdown targetDate={targetTestDate} />
          ) : (
            <PathSelection />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPath;
