import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { number: string } }
) {
  const { number } = params;
  const { searchParams } = new URL(req.url);
  const kelompok = searchParams.get("kelompok");

  const session = await getServerSession(authOptions);

  // Route protection
  if (
    !session?.user ||
    ((session.user as User).role !== "MAMET" &&
      (session.user as User).role !== "MENTOR" &&
      (session.user as User).role !== "ADMIN")
  ) {
    return NextResponse.json(
      { message: "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!" },
      { status: 401 }
    );
  }

  let day = await prisma.day.findUnique({
    select: {
      number: true,
      date: true,
      evalDay: {
        select: {
          rating: true,
          story: true,
          reflection: true,
          user: {
            select: {
              nim: true,
              fullName: true,
              kelompok: true,
              role: true,
            },
          },
        },
      },
    },
    where: {
      number: Number(number),
    },
  });

  if (!day) {
    return NextResponse.json({ message: "Day not found" }, { status: 404 });
  }

  day = {
    ...day,
    evalDay: day.evalDay.filter((val) => val.user.role === "PESERTA"),
  };

  if (kelompok) {
    day = {
      ...day,
      evalDay: day.evalDay.filter((val) => val.user.kelompok === kelompok),
    };
  }

  const nimList = day.evalDay.map((val) => val.user.nim);

  const users = await prisma.user.findMany({
    select: {
      nim: true,
      fullName: true,
    },
    where: {
      role: "PESERTA",
      kelompok: kelompok ?? undefined,
    },
  });

  const missingUsers = users.filter((user) => !nimList.includes(user.nim));
  return NextResponse.json({ ...day, missingUsers });
}
