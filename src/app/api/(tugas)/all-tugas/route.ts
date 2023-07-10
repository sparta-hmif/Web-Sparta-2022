import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function GET() {
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

  const tugasList = await prisma.tugas.findMany({
    select: {
      id: true,
      title: true,
      startTime: true,
      endTime: true,
      submisiTugas: {
        select: {
          userId: true,
        },
      },
    },
    orderBy: {
      endTime: "asc",
    },
  });

  const totalSpartans = await prisma.user.aggregate({
    where: {
      role: "PESERTA",
    },
    _count: {
      id: true,
    },
  });

  const mappedTugas = tugasList.map((tugas) => ({
    ...tugas,
    submisiTugas: tugas.submisiTugas.length,
    totalSpartans: totalSpartans._count.id,
  }));

  return NextResponse.json(mappedTugas);
}
