import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Prisma, User } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).role !== "MAMET" &&
        (session.user as User).role !== "MENTOR" &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }

    const days = await prisma.day.findMany({
      select: {
        number: true,
        date: true,
        evalDay: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        number: "asc",
      },
    });

    const filteredDays = days.filter((day) => day.date <= new Date());

    const totalSpartans = await prisma.user.aggregate({
      where: {
        role: "PESERTA",
      },
      _count: {
        id: true,
      },
    });

    const mappedDays = filteredDays.map((day) => ({
      ...day,
      submisiJourney: day.evalDay.length,
      totalSpartans: totalSpartans._count.id,
    }));

    return NextResponse.json(mappedDays);
  } catch (err) {
    let msg = "Internal Server Error";
    let status = 500;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      msg = err.message.replace(/\s{2,}/g, " ").slice(1);
      status = 400;
    }

    return NextResponse.json({ message: msg }, { status: status });
  }
}
