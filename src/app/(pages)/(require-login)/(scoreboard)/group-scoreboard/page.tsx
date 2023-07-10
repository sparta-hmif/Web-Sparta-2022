import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";
import { cookies } from "next/headers";

// Asset imports
import DefaultProfPic from "@/../public/images/landing/sparta.png";

// Component imports
import ScoreList from "../components/ScoreList";
import ScorePillar from "../components/ScorePillar";

const Scoreboard = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user as User;

  const res = await fetch(process.env.NEXT_PUBLIC_WEB_URL + "/api/scoreboard", {
    headers: { Cookie: cookies().toString() },
  });
  const resJson = await res.json();

  let data: any = [];
  let userRank = 0;
  let userIdx = -1;

  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    data.push({ name: `Kelompok ${letter}`, score: 0, nim: "", rank: 0 });
  }

  if (res.status === 200) {
    const { spartans } = resJson;

    for (let i = 0; i < spartans.length; i++) {
      if (spartans[i].kelompok) {
        data[spartans[i].kelompok.charCodeAt(0) - 65].score +=
          spartans[i].score;
      }
    }

    data.sort((a: any, b: any) => b.score - a.score);
    let count = 1;
    for (let i = 0; i < data.length; i++) {
      
      if (i !== 0 && data[i - 1].score > data[i].score) {
        count++;
      }
      data[i].rank = count;

      if (data[i].name === `Kelompok ${user.kelompok}`) {
        userIdx = i;
      }
    }
    console.log(data);
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
            <div className="w-5/12 rounded-full aspect-square overflow-hidden">
              <Image
                src={DefaultProfPic}
                alt="user"
                width={300}
                height={300}
                className="object-cover w-full h-full object-center"
              />
            </div>
            <p className="text-2xl md:text-4xl mt-5 md:mt-10 lg:mt-15 line-clamp-2">
              {user.fullName}
            </p>
          </div>
          <div className="w-1/2 flex flex-col items-end justify-between">
            <p className="text-4xl md:text-7xl">#{userRank}</p>
            <div className="text-white bg-primaryDark-400 flex px-3 py-2 md:px-6 tracking-wide md:py-3 text-lg md:text-3xl rounded-lg">
              {userIdx !== -1 ? data[userIdx].score : 0} PTS
            </div>
          </div>
        </div>
        <ScoreList users={data} userRank={userIdx} />
      </div>
    </div>
  );
};

export default Scoreboard;
