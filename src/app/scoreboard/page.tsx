import Image from "next/image";
import ScoreList from "./components/ScoreList";
import ScorePillar from "./components/ScorePillar";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

const Scoreboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user as User;

  const res = await fetch("http://localhost:3000/api/scoreboard", {
    headers: { Cookie: cookies().toString() },
  });
  const resJson = await res.json();

  let data: any = [];
  let userRank = 0;
  let userIdx = 0;

  if (res.status === 200) {
    const { spartans } = resJson;

    let count = 1;
    for (let i = 0; i < spartans.length; i++) {
      if (i !== 0 && spartans[i - 1].score > spartans[i].score) {
        count++;
      }

      if (spartans[i].nim === user.nim) {
        userRank = count;
        userIdx = i;
      }

      const newData = {
        rank: count,
        name: spartans[i].fullName,
        nim: spartans[i].nim,
        score: spartans[i].score,
        image: "",
      };

      data = [...data, newData];
    }
  }

  return (
    <div>
      <div className="bg-[url('/images/scoreboard/Background.svg')] h-[33rem] md:h-[50rem] lg:h-[58rem] flex flex-col items-center w-full bg-cover bg-no-repeat bg-center relative pt-20">
        <h1 className="bg-gradient-to-b from-white to-[#D39947] bg-clip-text text-transparent from-40% font-koulen md:text-[105px] sm:text-[70px] text-[45px]">
          SCOREBOARD
        </h1>
        <ScorePillar users={data.slice(0, 3)} />
        <Image
          src="/images/scoreboard/Cobain.svg"
          width={100}
          height={100}
          className="absolute bottom-0 w-full translate-y-[20%] md:translate-y-1/3"
          alt="mountain"
        />
      </div>
      <div className="container mx-auto relative mt-16 md:mt-20 pb-10">
        <div className="shadow-lg px-4 py-3 md:px-7 md:py-5 mb-10 font-koulen text-primaryDark-400 w-[90%] max-w-[38rem] bg-white flex border-primaryDark-400 border-4 rounded-xl md:rounded-3xl mx-auto">
          <div className="w-1/2 flex flex-col items-start justify-between">
            <div className="w-5/12 rounded-full aspect-square bg-primaryDark-400 overflow-hidden">
              <Image
                src={"/images/landing/placeholder.jpg"}
                alt="user"
                width={200}
                height={200}
                className="object-cover object-center"
              />
            </div>
            <p className="text-2xl md:text-4xl mt-5 md:mt-10 lg:mt-15 line-clamp-2">
              {user.fullName}
            </p>
          </div>
          <div className="w-1/2 flex flex-col items-end justify-between">
            <p className="text-4xl md:text-7xl">#{userRank}</p>
            <div className="text-white bg-primaryDark-400 flex px-3 py-2 md:px-6 tracking-wide md:py-3 text-lg md:text-3xl rounded-lg">
              {data[userIdx].score} PTS
            </div>
          </div>
        </div>
        <ScoreList users={data} userRank={userRank} />
      </div>
    </div>
  );
};

export default Scoreboard;
