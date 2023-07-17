import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
/*
  Endpoint Mendapatkan daftar seluruh kasuh
*/
export async function GET() {
  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user) {
    return NextResponse.json(
      {
        message:
          "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!",
      },
      { status: 401 }
    );
  }

  const kasuh = await prisma.userKasuh.findMany({
    select: {
      kuota: true,
      user: {
        select: {
          fullName: true,
          nim: true,
          imageURL: true,
        },
      },
    },
  });

  const sortedKasuh = kasuh.sort((a, b) => {
    if (a.user.fullName < b.user.fullName) {
      return -1;
    }
    if (a.user.fullName > b.user.fullName) {
      return 1;
    }
    return 0;
  });
  return NextResponse.json(sortedKasuh);
}
