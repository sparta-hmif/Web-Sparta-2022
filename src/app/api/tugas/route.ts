import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const tasks = await prisma.tugas.findMany();
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, startTime, endTime } = await req.json();

    if (!title || !startTime || !endTime) {
      return NextResponse.json(
        {
          message:
            "Request body at least contain 'title', 'startTime' and 'endTime'",
        },
        { status: 400 }
      );
    }

    await prisma.tugas.create({
      data: {
        title: title,
        description: description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
    });

    return NextResponse.json({
      data: {
        title: title,
        description: description,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
      },
      error: null,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
