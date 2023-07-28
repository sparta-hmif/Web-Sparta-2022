import { cookies } from "next/headers";
import CareerPathCountdown from "./components/CareerPathCountdown";
import CareerPathInfo from "./components/CareerPathInfo";
import DataDiri from "./components/DataDiri";
import PathSelection from "./components/PathSelection";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const CareerPath = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const user = session.user as User;

  const res = await fetch(process.env.NEXT_PUBLIC_WEB_URL + "/api/scoreboard", {
    headers: { Cookie: cookies().toString() },
  });
  const resJson = await res.json();

  let userRank = 0;

  if (res.status === 200) {
    const { spartans } = resJson;

    let count = 1;
    for (let i = 0; i < spartans.length; i++) {
      if (i !== 0 && spartans[i - 1].score > spartans[i].score) {
        count++;
      }

      if (spartans[i].nim === user.nim) {
        userRank = count;
        break;
      }
    }
  }

  let targetDate = new Date();
  if (userRank >= 1 && userRank <= 17) {
    targetDate = new Date(2023, 6, 28, 9, 0, 0);
  } else if (userRank >= 18 && userRank <= 26) {
    targetDate = new Date(2023, 6, 28, 9, 15, 0);
  } else if (userRank >= 27 && userRank <= 35) {
    targetDate = new Date(2023, 6, 28, 9, 30, 0);
  } else if (userRank >= 36 && userRank <= 58) {
    targetDate = new Date(2023, 6, 28, 9, 45, 0);
  } else if (userRank >= 59) {
    targetDate = new Date(2023, 6, 28, 10, 0, 0);
  }

  const ress = await fetch(process.env.NEXT_PUBLIC_WEB_URL + "/api/time", {
    cache: "no-store",
  });
  const { time } = await ress.json();

  return (
    <div className="mx-3 md:mx-[30px] lg:mx-[70px] mt-[30px] lg:mt-[50px] lg:flex lg:gap-x-5">
      <div className="lg:mr-[50px]">
        <DataDiri targetDate={targetDate} />
      </div>
      <div className="lg:mr-[10px]">
        <CareerPathInfo targetDate={targetDate} />
        <div className="mb-16">
          {targetDate.getTime() > new Date(time).getTime() ? (
            <CareerPathCountdown targetDate={targetDate} />
          ) : (
            <PathSelection />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerPath;
