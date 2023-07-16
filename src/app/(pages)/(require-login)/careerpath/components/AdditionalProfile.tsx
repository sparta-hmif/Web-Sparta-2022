"use client";

import { PersonData } from "./DataDiri";
import MiniScoreboard, { MiniScoreboardProps } from "./MiniScoreboard";
import ScoreboardBar from "./ScoreboardBar";

const AdditionalProfile = ({ currPerson }: { currPerson: PersonData }) => {
  const barSize = 50;
  const multiplier = Math.floor(currPerson.rank / (barSize + 1)) + 1;
  const leftRank = multiplier * barSize;
  const rightRank = 1 + (multiplier - 1) * barSize;
  return (
    <div className="pb-3">
      <p className="font-sen text-[14px] md:text-[15px] mb-3 text-primaryDark-400">
        Yuk berkegiatan lebih aktif lagi agar poinmu meningkat dan kamu bisa
        mengisi preferensimu lebih cepat!
      </p>
      <div className="mt-8">
        <ScoreboardBar
          leftRank={leftRank}
          rightRank={rightRank}
          currRank={currPerson.rank}
        />
      </div>
      <div>
        <MiniScoreboard currPerson={currPerson} scoreboardLimit={300} />
      </div>
    </div>
  );
};

export default AdditionalProfile;