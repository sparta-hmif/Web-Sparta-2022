import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Route protection
    if (!session?.user || (session.user as User).role !== "ADMIN") {
      return NextResponse.json(
        {
          message:
            "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!",
        },
        { status: 401 }
      );
    }

    const {
      nim,
      fullName,
      shortName,
      email,
      password,
      instagram,
      line,
      deskripsi,
      kuota,
    } = await req.json();

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        nim,
        email,
        password: hashedPassword,
        fullName,
        shortName,
        instagram,
        role: "KASUH",
        UserKasuh: {
          create: {
            line,
            deskripsi,
            kuota,
          },
        },
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
