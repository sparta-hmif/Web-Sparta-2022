import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  try {
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

    const kasuh = await prisma.userKasuh.findUnique({
      select: {
        PendaftaranKasuh: true,
      },
      where: {
        id: user.id,
      },
    });

    if (!kasuh) {
      return NextResponse.json({ message: "Kasuh not found" }, { status: 400 });
    }

    const adikAsuh = kasuh.PendaftaranKasuh;

    return NextResponse.json({ adikAsuh }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}
