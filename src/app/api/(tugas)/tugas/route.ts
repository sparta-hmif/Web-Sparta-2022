import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { title, description, startTime, endTime, dayNum, attachments } =
      await req.json();

    const session = await getServerSession(authOptions);
    // Route protection
    if (
      !session?.user ||
      ((session.user as User).role !== "MAMET" &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        { message: "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!" },
        { status: 401 }
      );
    }

    if (!title || !startTime || !endTime || !dayNum) {
      return NextResponse.json(
        {
          message:
            "Request body at least contain 'title', 'startTime' and 'endTime'",
        },
        { status: 400 }
      );
    }

    const day = await prisma.day.findFirst({
      where: {
        number: parseInt(dayNum),
      },
    });

    if (!day) {
      return NextResponse.json(
        { message: "Invalid Day Number" },
        { status: 404 }
      );
    }

    await prisma.tugas.create({
      data: {
        title: title,
        dayId: day.id,
        description: description,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        attachments: attachments,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
