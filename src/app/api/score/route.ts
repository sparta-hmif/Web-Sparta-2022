import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type postBody = {
  nim: string;
};

export async function GET() {
  const spartans = await prisma.user.findMany({
    select: {
      nim: true,
      fullName: true,
      score: true,
    },
    where: {
      role: "PESERTA",
    },
    orderBy: {
      score: "desc",
    },
  });

  return NextResponse.json({ spartans });
}

export async function POST(req: NextRequest) {
  try {
    const { nim, score } = await req.json();

    if (!nim || !score) {
      return NextResponse.json(
        { message: "Request body must contain 'nim' and 'score'" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: {
        nim,
      },
      data: {
        score,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
