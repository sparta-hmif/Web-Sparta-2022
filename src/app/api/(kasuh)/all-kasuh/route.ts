import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
/*
  Endpoint Mendapatkan daftar seluruh kasuh
*/
export async function GET() {
  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user) {
    return NextResponse.json(
      { message: "mau ngapain mas/mba ??" },
      { status: 401 }
    );
  }

  const kasuh = await prisma.userKasuh.findMany({
    select: {
        pendaftarSekarang: true,
        kuota: true,
        user: {
          select: {
            fullName: true,
            nim: true,
          },
        },
      },

  });

  return NextResponse.json(kasuh);
}
