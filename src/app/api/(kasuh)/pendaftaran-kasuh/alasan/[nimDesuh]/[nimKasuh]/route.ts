import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";

import { ACCEPT_START } from "@/app/api/(kasuh)/constants/date";

/*
  Endpoint Penggantian alasan berdasarkan parameter desuhId, kasuhId serta alasan
*/
export async function PATCH(
  req: NextRequest,
  { params }: { params: { nimDesuh: string; nimKasuh: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    // Route protection
    if (
      !session?.user ||
      ((session.user as User).nim !== params.nimDesuh &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        {
          message:
            "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!",
        },
        { status: 401 }
      );
    }

    const currDate: Date = new Date();
    if (currDate >= ACCEPT_START) {
      return NextResponse.json(
        { message: "Waktu memilih kasuh sudah habis" },
        { status: 400 }
      );
    }

    const { alasan } = await req.json();

    if (!alasan) {
      return NextResponse.json(
        { message: "Alasan tidak boleh kosong" },
        { status: 400 }
      );
    }

    const desuh = await prisma.user.findUnique({
      where: {
        nim: params.nimDesuh,
      },
      include: {
        UserDesuh: true,
      },
    });

    if (!desuh?.UserDesuh) {
      return NextResponse.json({ message: "Desuh not found" }, { status: 404 });
    }

    const kasuh = await prisma.user.findUnique({
      where: {
        nim: params.nimKasuh,
      },
      include: {
        UserKasuh: true,
      },
    });

    if (!kasuh?.UserKasuh) {
      return NextResponse.json({ message: "Kasuh not found" }, { status: 404 });
    }

    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findFirst({
      where: {
        kasuhId: kasuh.UserKasuh.id,
        desuhId: desuh.UserDesuh.id,
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
