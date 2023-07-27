import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {
  ACCEPT_START,
  FIRST_PRIO_END,
  SECOND_PRIO_END,
  THIRD_PRIO_END,
} from "@/app/api/(kasuh)/constants/date";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findUnique({
      where: {
        id: params.id,
      },
      include: {
        kasuh: true,
      },
    });

    if (!pendaftaranKasuh) {
      return NextResponse.json(
        { message: "Pendaftaran not found" },
        { status: 404 }
      );
    }

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).id !== pendaftaranKasuh.kasuh?.userId &&
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

    if (currDate < ACCEPT_START) {
      return NextResponse.json(
        { message: "Waktu penerimaan desuh belum dimulai" },
        { status: 400 }
      );
    }

    if (pendaftaranKasuh.rank === 1 && currDate > FIRST_PRIO_END) {
      return NextResponse.json(
        { message: "Waktu terima/tolak sudah habis" },
        { status: 400 }
      );
    } else if (pendaftaranKasuh.rank === 2 && currDate > SECOND_PRIO_END) {
      return NextResponse.json(
        { message: "Waktu terima/tolak sudah habis" },
        { status: 400 }
      );
    } else if (pendaftaranKasuh.rank === 3 && currDate > THIRD_PRIO_END) {
      return NextResponse.json(
        { message: "Waktu terima/tolak sudah habis" },
        { status: 400 }
      );
    }

    const otherPriority = await prisma.pendaftaranKasuh.findMany({
      where: {
        desuhId: pendaftaranKasuh.desuhId,
      },
    });

    let isEligible: boolean = false;
    if (currDate < ACCEPT_START || currDate > THIRD_PRIO_END) {
      isEligible = false;
    } else if (pendaftaranKasuh.rank === 1) {
      isEligible = currDate >= ACCEPT_START && currDate < FIRST_PRIO_END;
    } else if (pendaftaranKasuh.rank === 2) {
      isEligible =
        otherPriority.filter((val) => val.rank < 2 && val.approved === -1)
          .length === 1 ||
        (currDate >= FIRST_PRIO_END && currDate < SECOND_PRIO_END);
    } else if (pendaftaranKasuh.rank === 3) {
      isEligible =
        otherPriority.filter((val) => val.rank < 3 && val.approved === -1)
          .length === 2 ||
        (currDate >= SECOND_PRIO_END && currDate < THIRD_PRIO_END);
    }

    if (!isEligible) {
      return NextResponse.json(
        { message: "Kamu belum bisa menerima/menolak desuh" },
        { status: 400 }
      );
    }

    const { approved } = await req.json();

    if (approved === 1) {
      const approvedDesuh = await prisma.pendaftaranKasuh.findMany({
        where: {
          kasuhId: pendaftaranKasuh.kasuhId,
          approved: 1,
        },
      });

      if (approvedDesuh.length >= pendaftaranKasuh.kasuh?.kuota) {
        return NextResponse.json(
          { message: "Kuota kasuh sudah penuh" },
          { status: 400 }
        );
      }

      if (otherPriority.filter((val) => val.approved === 1).length >= 1) {
        return NextResponse.json(
          { message: "Desuh sudah diterima di pilihan lain" },
          { status: 400 }
        );
      }
    }

    await prisma.pendaftaranKasuh.update({
      where: {
        id: params.id,
      },
      data: {
        approved,
      },
    });

    return NextResponse.json({ message: "Success" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
