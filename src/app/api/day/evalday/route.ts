import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * Endpoint Penambahan Evaluasi Day
 * Endpoint dipake di page day buat peserta bisa ngasih evaluasi personal tentang keberlangsungan day
 * Rating diantara 1-5
 */ // aman
async function POST(req: NextRequest) {
  try {
    const { rating, evaluation, userId, dayId } = await req.json();
    console.log(rating, evaluation, userId, dayId);

    if (!(userId && dayId && rating && evaluation)) {
      return NextResponse.json(
        {
          message:
            "Request body must at least contain 'userId', 'dayId', 'rating', and 'evaluation'",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ message: "Invalid rating" }, { status: 400 });
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
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
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

    if (!(id && (rating || evaluation))) {
      return NextResponse.json(
        {
          message:
            "Request body must at least contain 'id', and one of these: 'rating' or 'evaluation'",
        },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ message: "Invalid rating" }, { status: 400 });
    }

    await prisma.evalDay.update({
      where: {
        id: id,
      },

      data: {
        rating: rating ? rating : undefined,
        evaluation: evaluation ? evaluation : undefined,
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

export { POST, PATCH };
