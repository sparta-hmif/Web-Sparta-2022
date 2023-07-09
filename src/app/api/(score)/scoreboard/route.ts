import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

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

    const session = await getServerSession(authOptions);

    // Route protection
    if (!session?.user) {
      return NextResponse.json(
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }

    const spartans = await prisma.user.findMany({
      select: {
        nim: true,
        fullName: true,
        score: true,
        imageURL: true,
        kelompok: true,
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
