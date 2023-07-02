import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const tugas = await prisma.tugas.findUnique({
    select: {
      title: true,
      day: {
        select: {
          number: true,
        },
      },
      startTime: true,
      endTime: true,
      submisiTugas: {
        select: {
          link: true,
          user: {
            select: {
              nim: true,
              fullName: true,
            },
          },
        },
      },
    },
    where: {
      id,
    },
  });

  if (!tugas) {
    return NextResponse.json({ message: "Tugas not found" }, { status: 404 });
  }

  const nimList = tugas.submisiTugas.map((submisi) => submisi.user.nim);

  const users = await prisma.user.findMany({
    select: {
      nim: true,
      fullName: true,
    },
    where: {
      role: "PESERTA",
    },
  });

  const missingUsers = users.filter((user) => !nimList.includes(user.nim));

  return NextResponse.json({ ...tugas, missingUsers });
}
