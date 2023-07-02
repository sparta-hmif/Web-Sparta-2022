import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string; id: string } }
) {
  const { nim, id } = params;

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

  const tugas = await prisma.tugas.findUnique({
    select: {
      id: true,
      title: true,
      day: {
        select: {
          number: true,
        },
      },
      description: true,
      endTime: true,
      attachments: true,
      submisiTugas: {
        select: {
          userId: true,
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

  const mappedTugas = {
    ...tugas,
    submisiTugas:
      tugas.submisiTugas.filter((submisi) => submisi.userId === user.id)
        .length > 0,
  };

  return NextResponse.json(mappedTugas);
}
