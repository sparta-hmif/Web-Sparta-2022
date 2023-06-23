import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * Endpoint Penambahan Evaluasi Day
 * Endpoint dipake di page day buat peserta bisa ngasih evaluasi personal tentang keberlangsungan day
 * Rating diantara 1-5
 */
async function POST(req: NextRequest) {
  try {
    const { rating, evaluation, userId, dayId } = await req.json();

    if (!(userId && dayId && (rating || rating === 0) && evaluation))
      return NextResponse.json(
        {
          message:
            "Request body must at least contain 'userId', 'dayId', 'rating', and 'evaluation'",
        },
        { status: 400 }
      );

    if (!(rating >= 1 && rating <= 5 && Number.isInteger(rating))) {
      return NextResponse.json(
        { message: "Invalid 'rating'" },
        { status: 400 }
      );
    }

    await prisma.evalDay.create({
      data: {
        rating: rating,
        evaluation: evaluation,
        userId: userId,
        dayId: dayId,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    let msg = "Internal Server Error";
    let status = 500;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      msg = err.message.replace(/\s{2,}/g, ' ').slice(1);
      status = 400;
    }

    return NextResponse.json(
      { message: msg },
      { status: status }
    );
  }
}


/**
 * Endpoint Edit Evaluasi Day
 * Endpoint dipake di page day buat peserta bisa ngasih evaluasi personal tentang keberlangsungan day
 * Rating diantara 1-5
 */
async function PATCH(req: NextRequest) {
  try {
    const { id, rating, evaluation } = await req.json();

    if (!(id && (rating || rating === 0 || evaluation)))
      return NextResponse.json(
        {
          message:
            "Request body must at least contain 'id', and one of these: 'rating' or 'evaluation'",
        },
        { status: 400 }
      );

    if (rating && !(rating >= 1 && rating <= 5 && Number.isInteger(rating)) || rating === 0)
      return NextResponse.json(
        { message: "Invalid 'rating'" },
        { status: 400 }
      );

    await prisma.evalDay.update({
      where: {
        id: id,
      },

      data: {
        rating: rating || undefined,
        evaluation: evaluation || undefined,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    let msg = "Internal Server Error";
    let status = 500;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      msg = err.message.replace(/\s{2,}/g, ' ').slice(1);
      status = 400;
    }

    return NextResponse.json(
      { message: msg },
      { status: status }
    );
  }
}

export { POST, PATCH };
