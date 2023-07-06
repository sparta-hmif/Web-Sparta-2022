import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { nim } = params;

  const session = await getServerSession(authOptions);

  // Route protection
  if (
    !session?.user ||
    ((session.user as User).nim !== nim &&
      (session.user as User).role !== "ADMIN")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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
