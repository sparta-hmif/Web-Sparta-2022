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
        { message: "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      select: {
        UserKasuh: {
          select: {
            PendaftaranKasuh: {
              select: {
                id: true,
                alasan: true,
                approved: true,
                desuh: {
                  select: {
                    user: {
                      select: {
                        fullName: true,
                        nim: true,
                        imageURL: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: {
        nim: params.nim,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.UserKasuh) {
      return NextResponse.json({ message: "Kasuh not found" }, { status: 400 });
    }

    const adikAsuh = user.UserKasuh.PendaftaranKasuh;

    return NextResponse.json({ adikAsuh }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}
