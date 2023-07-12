import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient, Prisma, User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * Endpoint Penambahan Evaluasi Day
 * Endpoint dipake di page day buat peserta bisa ngasih evaluasi personal tentang keberlangsungan day
 * Rating diantara 1-5
 */
async function PUT(
  req: NextRequest,
  { params }: { params: { nim: string; number: string } }
) {
  try {
    const { rating, story, reflection } = await req.json();

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).nim !== params.nim &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }

    if (!((rating || rating === 0) && story && reflection))
      return NextResponse.json(
        {
          message:
            "Request body must at least contain 'rating', 'story', and 'reflection'",
        },
        { status: 400 }
      );

    if (!(rating >= 1 && rating <= 5 && Number.isInteger(rating))) {
      return NextResponse.json(
        { message: "Invalid 'rating'" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      select: {
        id: true,
      },
      where: {
        nim: params.nim,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const day = await prisma.day.findUnique({
      select: {
        id: true,
      },
      where: {
        number: Number(params.number),
      },
    });

    if (!day) {
      return NextResponse.json({ message: "Day not found" }, { status: 404 });
    }

    const evalDay = await prisma.evalDay.findFirst({
      where: {
        userId: user.id,
        dayId: day.id,
      },
    });

    if (evalDay) {
      await prisma.evalDay.update({
        where: {
          id: evalDay.id,
        },
        data: {
          rating: rating || undefined,
          story: story || undefined,
          reflection: reflection || undefined,
        },
      });
    } else {
      await prisma.evalDay.create({
        data: {
          rating: rating,
          story: story,
          reflection: reflection,
          userId: user.id,
          dayId: day.id,
        },
      });
    }

    return NextResponse.json({ message: "success" });
  } catch (err) {
    let msg = "Internal Server Error";
    let status = 500;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      msg = err.message.replace(/\s{2,}/g, " ").slice(1);
      status = 400;
    }

    return NextResponse.json({ message: msg }, { status: status });
  }
}

export { PUT };
