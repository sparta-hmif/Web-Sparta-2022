import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const session = await getServerSession(authOptions);

  // Route protection
  if (
    !session?.user ||
    ((session.user as User).nim !== params.nim &&
      (session.user as User).role !== "ADMIN")
  ) {
    return NextResponse.json(
      { message: "mau ngapain mas/mba ??" },
      { status: 401 }
    );
  }

  const { deskripsi } = await req.json();

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

  try {
    const kasuh = await prisma.userKasuh.update({
      where: { userId: user.id },
      data: {
        deskripsi: deskripsi,
      },
    });

    if (!kasuh) {
      return NextResponse.json({ message: "Kasuh not found" }, { status: 400 });
    }

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}
