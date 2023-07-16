import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const nim = params.id;

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).nim !== nim &&
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

    const newData = await req.json();

    newData.forEach(async (val: any) => {
      await prisma.pendaftaranKasuh.update({
        where: {
          id: val.id,
        },
        data: {
          rank: val.rank,
        },
      });
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
