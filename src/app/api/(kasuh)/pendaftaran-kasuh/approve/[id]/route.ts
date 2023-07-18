import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findUnique({
      where: {
        id: params.id,
      },
      include: {
        kasuh: true,
      },
    });

    if (!pendaftaranKasuh) {
      return NextResponse.json(
        { message: "Pendaftaran not found" },
        { status: 404 }
      );
    }

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).id !== pendaftaranKasuh.kasuh?.userId &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        {
          message:
            "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!",
        },
        { status: 401 }
      );
    }

    const { approved } = await req.json();

    if (approved) {
      const approvedDesuh = await prisma.pendaftaranKasuh.findMany({
        where: {
          kasuhId: pendaftaranKasuh.kasuhId,
          approved: true,
        },
      });

      if (approvedDesuh.length >= pendaftaranKasuh.kasuh?.kuota) {
        return NextResponse.json(
          { message: "Kuota kasuh sudah penuh" },
          { status: 400 }
        );
      }
    }

    await prisma.pendaftaranKasuh.update({
      where: {
        id: params.id,
      },
      data: {
        approved,
      },
    });

    return NextResponse.json({ message: "Success" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
