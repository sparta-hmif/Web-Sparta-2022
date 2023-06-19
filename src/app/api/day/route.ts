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
// aman
async function POST(req: NextRequest) {
  try {
    const { number, date, description } = await req.json();

    // number hrs bs 0
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
            userId: String(userId),
          },
        },
      },
    });

    if (!days) {
      NextResponse.json(
        { message: "gaada days" },
        { status: 400 }
      );
    }

    return NextResponse.json(days);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { GET, POST }
