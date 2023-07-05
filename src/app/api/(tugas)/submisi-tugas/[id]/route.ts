import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const session = await getServerSession(authOptions);

  // Route protection
  if (
    !session?.user ||
    ((session.user as User).role !== "MAMET" &&
      (session.user as User).role !== "ADMIN")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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