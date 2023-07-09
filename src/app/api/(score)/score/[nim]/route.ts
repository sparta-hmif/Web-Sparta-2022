import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

/**
 * Endpoint: api/score/:nim
 * Method: POST
 *
 * Updates the score of a spartan
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  try {
    const { score } = await req.json();
    const { nim } = params;

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).role !== "MENTOR" &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }

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
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
