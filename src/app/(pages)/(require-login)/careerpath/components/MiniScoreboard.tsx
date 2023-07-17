import { PersonData } from "./DataDiri";

interface EntryProps {
  rank?: number;
  nama?: string;
  pts?: number;
}

const Entry = ({ rank, nama, pts }: EntryProps) => {
  return (
    <div className="flex justify-start items-center border-2 border-primaryDark-400 font-koulen gap-x-1.5 p-3 rounded-2xl mb-2">
      <div className="text-primaryDark-400 text-[24px]">#{rank}</div>
      <div className="flex grow items-center gap-x-4 justify-between ml-4">
        <div className="uppercase text-[22px] break-all">{nama}</div>
        <div className="flex max-h-[45px] min-w-[67px] justify-center items-center text-center bg-primaryDark-400 px-3 py-2 tracking-wide text-[12px] text-white rounded-xl">
          {pts} PTS
        </div>
      </div>
    </div>
  );
};

export interface MiniScoreboardProps {
  scoreboard: PersonData[];
}

// Data fetching di sini.
// Orang Pertama = Fetch orang kedua dan ketiga
// Orang Terakhir = Fetch orang terakhir - 2 dan terakhir - 1
// Otherwise, fetch orang sebelum dan sesudah
// Return array of Person (PersonData: {rank: number, name: string, points: number})

const MiniScoreboard = ({
  scoreboard,
}: MiniScoreboardProps) => {

  // useEffect(() => {
  //   setPersonData(getPersonData(currPerson));
  // }, [currPerson]);

  return (
    <div>
      <div className="text-gray-400 font-koulen font-bold text-[20px] text-center mb-2">
        . . .
      </div>
      <div className="">
        {scoreboard.map((person, index) => (
          <Entry
            key={index}
            nama={person.name}
            pts={person.points}
            rank={person.rank}
          />
        ))}
      </div>
      <div className="text-gray-400 font-koulen font-bold text-[20px] text-center">
        . . .
      </div>
    </div>
  );
};

export default MiniScoreboard;
