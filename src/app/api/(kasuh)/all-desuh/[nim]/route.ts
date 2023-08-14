import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

import {
  ACCEPT_START,
  FIRST_PRIO_END,
  SECOND_PRIO_END,
  THIRD_PRIO_END,
} from "@/app/api/(kasuh)/constants/date";

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
        {
          message:
            "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!",
        },
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
                rank: true,
                desuh: {
                  select: {
                    id: true,
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
    const mappedDesuh: any = [];

    for (let desuh of adikAsuh) {
      const otherPriority = await prisma.pendaftaranKasuh.findMany({
        where: {
          desuhId: desuh.desuh.id,
        },
      });

      const currDate: Date = new Date();
      let isEligible: boolean = false;

      if (currDate < ACCEPT_START || currDate > THIRD_PRIO_END) {
        isEligible = false;
      } else if (desuh.rank === 1) {
        isEligible = currDate >= ACCEPT_START && currDate < FIRST_PRIO_END;
      } else if (desuh.rank === 2) {
        isEligible =
          (otherPriority.filter((val) => val.rank < 2 && val.approved === -1)
            .length === 1 ||
            currDate >= FIRST_PRIO_END) &&
          currDate < SECOND_PRIO_END;
      } else if (desuh.rank === 3) {
        isEligible =
          (otherPriority.filter((val) => val.rank < 3 && val.approved === -1)
            .length === 2 ||
            currDate >= SECOND_PRIO_END) &&
          currDate < THIRD_PRIO_END;
      }

      mappedDesuh.push({ ...desuh, isEligible });
    }

    return NextResponse.json({ adikAsuh: mappedDesuh }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}
