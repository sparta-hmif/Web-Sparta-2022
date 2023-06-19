import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * Endpoint Penambahan Day
 *
 * Endpoint dipake sama mamet buat nambahin day baru ke website
 * Data day yang baru ditambahin disimpen ke database
 * [Sementara] Buat endpoint ini gaperlu validasi role, tapi nanti perlu ditambahin validasi
 */

async function POSTDay(req: NextRequest) {
  try {
    const { number, date, description } = await req.json();

    if (!(number && date)) {
      return NextResponse.json(
        { message: "Request body must at least contain 'number' and 'date'" },
        { status: 400 }
      );
    }

    await prisma.day.create({
      data: {
        number: number,
        description: description ? description : null,
        date: new Date(date),
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
 * Endpoint Lihat Semua Day
 *
 * Endpoint dipake di page day buat nampilin semua day ke peserta + nampilin evaluasi day yang udah pernah dibuat sama peserta
 */
async function GETDays(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const days = await prisma.day.findMany({
      orderBy: {
        number: "asc",
      },

      include: {
        EvalDay: {
          where: {
            userId: userId,
          },
        },
      },
    });

    return NextResponse.json({ days });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * Endpoint Penambahan Evaluasi Day
 * Endpoint dipake di page day buat peserta bisa ngasih evaluasi personal tentang keberlangsungan day
 * Rating diantara 1-5
 */
async function POSTEval(req: NextRequest) {
  try {
    const { rating, evaluation, userId, dayId } = await req.json();

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
async function PATCHEval(req: NextRequest) {
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

export { POSTDay, GETDays, POSTEval, PATCHEval };
