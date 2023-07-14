import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";

/*
  Endpoint Penggantian alasan berdasarkan parameter desuhId, kasuhId serta alasan
*/
export async function PATCH(req: NextRequest) {
  try {
    const { alasan } = await req.json();

    // parse query param
    const _desuhId: string = req.nextUrl.searchParams.get("desuh") as string;
    const _kasuhId: string = req.nextUrl.searchParams.get("kasuh") as string;

    if (!alasan) {
      return NextResponse.json(
        { message: "Alasan tidak boleh kosong" },
        { status: 400 }
      );
    }

    // const session = await getServerSession(authOptions);
    // const userId= await prisma.userDesuh.findFirst({
    //     where:{
    //         id: _desuhId
    //     },
    //     select:{
    //         userId: true
    //     }
    // });
    // // Route protection
    // if (
    //   !session?.user ||
    //   ((session.user as User).id !== userId?.userId &&
    //     (session.user as User).role !== "ADMIN")
    // ) {
    //   return NextResponse.json(
    //         { message: "mau ngapain mas/mba ??" },
    //     { status: 401 }
    //   );
    // }

    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findFirst({
      where: {
        kasuhId: _kasuhId,
        desuhId: _desuhId,
      },
    });

    if (!pendaftaranKasuh) {
      return NextResponse.json(
        { message: "Anda belum mendaftar kasuh ini" },
        { status: 400 }
      );
    }

    // update user kasuh
    await prisma.pendaftaranKasuh.update({
      where: {
        id: pendaftaranKasuh.id,
      },
      data: {
        alasan: alasan,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
