import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

/**
 * Endpoint: api/score
 * Method: GET
 *
 * Returns list of spartans sorted by score in descending order
 */
export async function GET() {
  try {
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
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Endpoint: api/score
 * Method: POST
 *
 * Updates the score of a spartan
 */
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
