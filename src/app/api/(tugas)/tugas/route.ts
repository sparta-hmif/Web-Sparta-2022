import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { title, description, startTime, endTime, dayNum, attachments } =
      await req.json();

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
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        attachments: attachments,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
