import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findUnique({
      select: {
        desuhId: true,
      },
      where: {
        id: params.id,
      },
    });

    if (!pendaftaranKasuh) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).id !== pendaftaranKasuh.desuhId &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }

    await prisma.pendaftaranKasuh.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}
