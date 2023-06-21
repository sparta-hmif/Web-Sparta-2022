import { PrismaClient, Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import moment from 'moment';

const prisma = new PrismaClient();

/**
 * Endpoint Penambahan Day
 *
 * Endpoint dipake sama mamet buat nambahin day baru ke website
 * Data day yang baru ditambahin disimpen ke database
 * [Sementara] Buat endpoint ini gaperlu validasi role, tapi nanti perlu ditambahin validasi
 */
async function POST(req: NextRequest) {
  try {
    const { number, date, description } = await req.json();

    if (!((number || number === 0) && date))
      return NextResponse.json(
        { message: "Request body must at least contain 'number' and 'date'" },
        { status: 400 }
      );

    if (!(number >= 0 && Number.isInteger(number) && moment(date).isValid()))
      return NextResponse.json(
        { message: "Invalid 'number' or 'date'" },
        { status: 400 }
      );

    await prisma.day.create({
      data: {
        number: number,
        description: description,
        date: new Date(date), // TODO: time zone
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    let msg = "Internal Server Error";

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      msg = err.message.split("\n").join(" ").trim();
    }

    return NextResponse.json(
      { message: msg },
      { status: 500 }
    );
  }
}

/**
 * Endpoint Lihat Semua Day
 *
 * Endpoint dipake di page day buat nampilin semua day ke peserta + nampilin evaluasi day yang udah pernah dibuat sama peserta
 */
async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const days = await prisma.day.findMany({
      orderBy: {
        number: "asc",
      },

      include: {
        EvalDay: {
          where: {
            userId: String(userId), // TODO: time zone
          },
        },
      },
    });

    return NextResponse.json(days);
  } catch (err) {
    let msg = "Internal Server Error";

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      msg = err.message.split("\n").join(" ").trim();
    }

    return NextResponse.json(
      { message: msg },
      { status: 500 }
    );
  }
}

export { POST, GET };
