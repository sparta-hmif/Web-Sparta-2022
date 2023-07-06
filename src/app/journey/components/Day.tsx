import DayButton from "./DayButton";

const Day = ({
  day,
  onOpen,
}: {
  day: number;
  onOpen: (day: number) => void;
}) => {
  switch (day) {
    case 1:
      return (
        <div className="w-full h-[100vh] lg:h-[150vh] bg-primaryDark-400 bg-[url('/images/journey/DayOne.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
        </div>
      );
    case 2:
      return (
        <div className="w-full h-[100vh] lg:h-[180vh] bg-primaryDark-400 bg-[url('/images/journey/DayTwo.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
          <DayButton width="16%" bottom="18vw" right="45%" onOpen={() => onOpen(2)} />
        </div>
      );
    case 3:
      return (
        <div className="w-full h-[100vh] lg:h-[250vh] bg-primaryDark-400 bg-[url('/images/journey/DayThree.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
          <DayButton width="16%" bottom="18vw" right="45%" onOpen={() => onOpen(2)} />
          <DayButton width="16%" bottom="47vw" left="11%" onOpen={() => onOpen(3)} />
        </div>
      );
    case 4:
      return (
        <div className="w-full h-[100vh] lg:h-[300vh] bg-primaryDark-400 bg-[url('/images/journey/DayFour.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
          <DayButton width="16%" bottom="18vw" right="45%" onOpen={() => onOpen(2)} />
          <DayButton width="16%" bottom="47vw" left="11%" onOpen={() => onOpen(3)} />
          <DayButton width="16%" bottom="78vw" left="22%" onOpen={() => onOpen(4)} />
        </div>
      );
    case 5:
      return (
        <div className="w-full h-[100vh] lg:h-[340vh] bg-primaryDark-400 bg-[url('/images/journey/DayFive.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
          <DayButton width="16%" bottom="18vw" right="45%" onOpen={() => onOpen(2)} />
          <DayButton width="16%" bottom="47vw" left="11%" onOpen={() => onOpen(3)} />
          <DayButton width="16%" bottom="78vw" left="22%" onOpen={() => onOpen(4)} />
          <DayButton width="16%" bottom="97vw" right="29%" onOpen={() => onOpen(5)} />
        </div>
      );
    case 6:
      return (
        <div className="w-full h-[100vh] lg:h-[390vh] bg-primaryDark-400 bg-[url('/images/journey/DaySix.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
          <DayButton width="16%" bottom="18vw" right="45%" onOpen={() => onOpen(2)} />
          <DayButton width="16%" bottom="47vw" left="11%" onOpen={() => onOpen(3)} />
          <DayButton width="16%" bottom="78vw" left="22%" onOpen={() => onOpen(4)} />
          <DayButton width="16%" bottom="97vw" right="29%" onOpen={() => onOpen(5)} />
          <DayButton width="15%" bottom="128vw" right="13%" onOpen={() => onOpen(6)} />
        </div>
      );
    case 7:
      return (
        <div className="w-full h-[100vh] lg:h-[470vh] bg-primaryDark-400 bg-[url('/images/journey/DaySeven.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
          <DayButton width="16%" bottom="18vw" right="45%" onOpen={() => onOpen(2)} />
          <DayButton width="16%" bottom="47vw" left="11%" onOpen={() => onOpen(3)} />
          <DayButton width="16%" bottom="78vw" left="22%" onOpen={() => onOpen(4)} />
          <DayButton width="16%" bottom="97vw" right="29%" onOpen={() => onOpen(5)} />
          <DayButton width="15%" bottom="128vw" right="13%" onOpen={() => onOpen(6)} />
          <DayButton width="16%" bottom="159vw" right="33%" onOpen={() => onOpen(7)} />
        </div>
      );
    case 8:
      return (
        <div className="w-full h-[100vh] lg:h-[530vh] bg-primaryDark-400 bg-[url('/images/journey/DayEight.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
          <DayButton width="16%" bottom="18vw" right="45%" onOpen={() => onOpen(2)} />
          <DayButton width="16%" bottom="47vw" left="11%" onOpen={() => onOpen(3)} />
          <DayButton width="16%" bottom="78vw" left="22%" onOpen={() => onOpen(4)} />
          <DayButton width="16%" bottom="97vw" right="29%" onOpen={() => onOpen(5)} />
          <DayButton width="15%" bottom="128vw" right="13%" onOpen={() => onOpen(6)} />
          <DayButton width="16%" bottom="159vw" right="33%" onOpen={() => onOpen(7)} />
          <DayButton width="15%" bottom="183vw" left="20%" onOpen={() => onOpen(8)} />
        </div>
      );
    case 9:
      return (
        <div className="w-full h-[120vh] lg:h-[580vh] bg-primaryDark-400 bg-[url('/images/journey/DayNine.svg')] bg-cover bg-no-repeat bg-bottom relative">
          <DayButton width="16%" bottom="6vw" right="11%" onOpen={() => onOpen(1)} />
          <DayButton width="16%" bottom="18vw" right="45%" onOpen={() => onOpen(2)} />
          <DayButton width="16%" bottom="47vw" left="11%" onOpen={() => onOpen(3)} />
          <DayButton width="16%" bottom="78vw" left="22%" onOpen={() => onOpen(4)} />
          <DayButton width="16%" bottom="97vw" right="29%" onOpen={() => onOpen(5)} />
          <DayButton width="15%" bottom="128vw" right="13%" onOpen={() => onOpen(6)} />
          <DayButton width="16%" bottom="159vw" right="33%" onOpen={() => onOpen(7)} />
          <DayButton width="15%" bottom="183vw" left="20%" onOpen={() => onOpen(8)} />
          <DayButton width="16%" bottom="218vw" left="42%" onOpen={() => onOpen(9)} />
        </div>
      );
    default:
      return <div></div>;
  }
};

export default Day;
