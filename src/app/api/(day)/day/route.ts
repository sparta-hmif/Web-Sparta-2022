import { Prisma, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";

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

    const session = await getServerSession(authOptions);

    // Route protection
    if (!session?.user || (session.user as User).role !== "ADMIN") {
      return NextResponse.json(
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }

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
        date: new Date(date),
      },
    });

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

export { POST };
