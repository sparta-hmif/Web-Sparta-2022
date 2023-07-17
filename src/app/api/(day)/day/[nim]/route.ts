import { Prisma, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

/**
 * Endpoint Lihat Semua Day
 *
 * Endpoint dipake di page day buat nampilin semua day ke peserta + nampilin evaluasi day yang udah pernah dibuat sama peserta
 */
async function GET(req: NextRequest, { params }: { params: { nim: string } }) {
  try {
    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).nim !== params.nim &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        { message: "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        nim: params.nim,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const days = await prisma.day.findMany({
      select: {
        number: true,
        description: true,
        date: true,
        evalDay: {
          select: {
            rating: true,
            story: true,
            reflection: true,
          },
          where: {
            userId: user?.id,
          },
        },
      },
      orderBy: {
        number: "asc",
      },
    });

    const filteredDays = days.filter((day) => day.date <= new Date());

    return NextResponse.json(filteredDays);
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

export { GET };
