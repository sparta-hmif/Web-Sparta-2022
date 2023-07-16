import { useEffect, useState } from "react";
import { PersonData, testData } from "./DataDiri";

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

const EntryList = ({
  first,
  second,
  third,
}: {
  first?: PersonData;
  second?: PersonData;
  third?: PersonData;
}) => {
  return (
    <>
      <Entry nama={first?.name} pts={first?.points} rank={first?.rank} />
      <Entry nama={second?.name} pts={second?.points} rank={second?.rank} />
      <Entry nama={third?.name} pts={third?.points} rank={third?.rank} />
    </>
  );
};

export interface MiniScoreboardProps {
  currPerson: PersonData;
  scoreboardLimit: number;
}

// Data fetching di sini.
// Orang Pertama = Fetch orang kedua dan ketiga
// Orang Terakhir = Fetch orang terakhir - 2 dan terakhir - 1
// Otherwise, fetch orang sebelum dan sesudah
// Return array of Person (PersonData: {rank: number, name: string, points: number})
const getPersonData = (currPerson: PersonData) => {
  // Seeded with test data
  let personArray: PersonData[] = [testData[1], testData[2]];
  return personArray;
};

const MiniScoreboard = ({
  currPerson,
  scoreboardLimit,
}: MiniScoreboardProps) => {
  const initialData: PersonData[] = [];
  const [personData, setPersonData] = useState<PersonData[]>(initialData);
  const [first, setFirst] = useState<PersonData>();
  const [second, setSecond] = useState<PersonData>();
  useEffect(() => {
    setPersonData(getPersonData(currPerson));
  }, []);

  useEffect(() => {
    setFirst(personData[0]);
    setSecond(personData[1]);
  }, [personData]);

  return (
    <div>
      <div className="text-gray-400 font-koulen font-bold text-[20px] text-center mb-2">
        . . .
      </div>
      <div className="">
        {currPerson.rank == 1 ? (
          <EntryList first={currPerson} second={first} third={second} />
        ) : null}
        {currPerson.rank > 1 && currPerson.rank < scoreboardLimit ? (
          <EntryList first={first} second={currPerson} third={second} />
        ) : null}
        {currPerson.rank == scoreboardLimit ? (
          <EntryList first={first} second={second} third={currPerson} />
        ) : null}
      </div>
      <div className="text-gray-400 font-koulen font-bold text-[20px] text-center">
        . . .
      </div>
    </div>
  );
};

export default MiniScoreboard;
