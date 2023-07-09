import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string; id: string } }
) {
  const { nim, id } = params;

  const session = await getServerSession(authOptions);

  // Route protection
  if (
    !session?.user ||
    ((session.user as User).nim !== nim &&
      (session.user as User).role !== "ADMIN")
  ) {
    return NextResponse.json(
      { message: "mau ngapain mas/mba ??" },
      { status: 401 }
    );
  }

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
      startTime: true,
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
