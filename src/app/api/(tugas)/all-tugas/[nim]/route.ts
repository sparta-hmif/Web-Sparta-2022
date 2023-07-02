import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { nim } = params;

  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: {
      nim,
    },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const tugasList = await prisma.tugas.findMany({
    select: {
      id: true,
      title: true,
      day: {
        select: {
          number: true,
        },
      },
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

  const mappedTugas = tugasList.map((tugas) => ({
    ...tugas,
    submisiTugas:
      tugas.submisiTugas.filter((submisi) => submisi.userId === user.id)
        .length > 0,
  }));

  return NextResponse.json(mappedTugas);
}
