import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

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
