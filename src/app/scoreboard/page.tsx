import Image from "next/image";
import Pillar from "./components/Pillar";
import ScoreList from "./components/ScoreList";
import ScorePillar from "./components/ScorePillar";
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import { redirect } from "next/navigation";

const Scoreboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login')
  }

  const dummy = [
    {
      rank: 1,
      name: "Kevin Sebastian",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 2,
      name: "Kevin Sebastian Sheva",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 3,
      name: "Kevin Sebastian Sheva Tjahyana Apa Kek Gitu",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 4,
      name: "Kevin Sebastian Sheva Tjahyana Apa Kek Panjang Banget Pokoknya",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 5,
      name: "Kevin Sebastian Sheva Tjahyana Apa Kek",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 6,
      name: "Kevin Sebastian Sheva Tjahyana Apa Kek",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 7,
      name: "Kevin",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 8,
      name: "Kevin Sebastian Sheva",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 9,
      name: "Kevin Sebastian Sheva Tjahyana",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 10,
      name: "Kevin",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 11,
      name: "Kevin Sebastian Sheva",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 12,
      name: "Kevin",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 13,
      name: "Kevin",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 14,
      name: "Kevin Sebastian Sheva",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 15,
      name: "Kevin Sebastian Sheva Tjahyana",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 16,
      name: "Kevin",
      nim: "18221143",
      score: 999,
    },
    {
      rank: 17,
      name: "Kevin Sebastian Sheva",
      nim: "18221143",
      score: 999,
    },
  ];

  return (
    <div>
      <div className="bg-[url('/images/scoreboard/Background.svg')] h-[33rem] md:h-[50rem] lg:h-[58rem] flex flex-col items-center w-full bg-cover bg-no-repeat bg-center relative pt-20">
        <h1 className="bg-gradient-to-b from-white to-[#D39947] bg-clip-text text-transparent from-40% font-koulen md:text-[105px] sm:text-[70px] text-[45px]">
          SCOREBOARD
        </h1>
        <ScorePillar users={dummy.slice(0,3)}/>
        <Image
          src="/images/scoreboard/Cobain.svg"
          width={100}
          height={100}
          className="absolute bottom-0 w-full translate-y-[20%] md:translate-y-1/3"
          alt="mountain"
        />
        <div className="shadow-lg px-4 py-3 md:px-7 md:py-5 font-koulen text-primaryDark-400 w-[90%] max-w-[38rem] bg-white flex border-primaryDark-400 border-4 rounded-xl md:rounded-3xl mx-auto absolute bottom-0 translate-y-[120%] left-1/2 -translate-x-1/2">
          <div className="w-1/2 flex flex-col items-start justify-between">
            <div className="w-5/12 rounded-full aspect-square bg-primaryDark-400"></div>
            <p className="text-xl md:text-4xl mt-20">
              NAMA KEK SABEB BANYAK JG GAPAPA
            </p>
          </div>
          <div className="w-1/2 flex flex-col items-end justify-between">
            <p className="text-4xl md:text-7xl">#999</p>
            <div className="text-white bg-primaryDark-400 flex px-3 py-2 md:px-6 tracking-wide md:py-3 text-lg md:text-3xl rounded-lg">
              999 PTS
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <ScoreList users={dummy.slice(3)}/>
      </div>
    </div>
  );
};

export default Scoreboard;
