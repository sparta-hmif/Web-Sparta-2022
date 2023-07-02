import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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
