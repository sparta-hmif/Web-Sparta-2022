import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findUnique({
      select: {
        desuh: {
          select: {
            userId: true,
          },
        },
      },
      where: {
        id: params.id,
      },
    });

    if (!pendaftaranKasuh) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).id !== pendaftaranKasuh.desuh?.userId &&
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

    await prisma.pendaftaranKasuh.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}

/*
  Endpoint Pendaftaran kasuh berdasarkan parameter desuhId, kasuhId serta alasan
*/
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const nimDesuh = params.id;

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).nim !== nimDesuh &&
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

    const { alasan, nimKasuh } = await req.json();

    if (!alasan || !nimKasuh) {
      return NextResponse.json(
        { message: "Alasan dan nimKasuh tidak boleh kosong" },
        { status: 400 }
      );
    }

    const kasuh = await prisma.user.findUnique({
      where: {
        nim: nimKasuh,
      },
      include: {
        UserKasuh: true,
      },
    });

    if (!kasuh?.UserKasuh) {
      return NextResponse.json({ message: "Kasuh not found" }, { status: 404 });
    }

    const desuh = await prisma.user.findUnique({
      where: {
        nim: nimDesuh,
      },
      include: {
        UserDesuh: true,
      },
    });

    if (!desuh) {
      return NextResponse.json({ message: "Desuh not found" }, { status: 404 });
    }

    let desuhId = desuh.UserDesuh?.id ?? "";
    if (!desuh.UserDesuh) {
      const userDesuh = await prisma.userDesuh.create({
        data: {
          userId: desuh.id,
        },
      });
      desuhId = userDesuh.id;
    }

    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findFirst({
      where: {
        kasuhId: kasuh.UserKasuh?.id,
        desuhId: desuhId,
      },
    });

    // update pendaftaran kasuh apabila sudah mendaftar
    if (pendaftaranKasuh) {
      return NextResponse.json(
        { message: "Anda sudah mendaftar kasuh ini" },
        { status: 400 }
      );
    }

    // create pendaftaran kasuh
    await prisma.pendaftaranKasuh.create({
      data: {
        kasuhId: kasuh.UserKasuh.id,
        desuhId: desuhId,
        alasan: alasan,
      },
    });

    // update user kasuh
    await prisma.userKasuh.update({
      where: {
        id: kasuh.UserKasuh.id,
      },
      data: {
        pendaftarSekarang: kasuh.UserKasuh.pendaftarSekarang
          ? kasuh.UserKasuh.pendaftarSekarang + 1
          : 1,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const nimDesuh = params.id;

  const session = await getServerSession(authOptions);

  // Route protection
  if (
    !session?.user ||
    ((session.user as User).nim !== nimDesuh &&
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

  const pendaftaran = await prisma.user.findUnique({
    select: {
      UserDesuh: {
        select: {
          PendaftaranKasuh: {
            select: {
              id: true,
              alasan: true,
              kasuh: {
                select: {
                  kuota: true,
                  user: {
                    select: {
                      nim: true,
                      fullName: true,
                      imageURL: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    where: {
      nim: nimDesuh,
    },
  });

  if (!pendaftaran) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(pendaftaran);
}
