import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint: api/scoreboard
 * Method: GET
 *
 * Returns list of spartans sorted by score in descending order
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const kelompok = searchParams.get("kelompok");

    const spartans = await prisma.user.findMany({
      select: {
        nim: true,
        fullName: true,
        score: true,
      },
      where: {
        role: "PESERTA",
        kelompok: kelompok ?? undefined,
      },
      orderBy: {
        score: "desc",
      },
    });

    return NextResponse.json({ spartans });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
