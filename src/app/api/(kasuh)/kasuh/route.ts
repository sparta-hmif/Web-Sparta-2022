import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
import { hash } from "bcryptjs";

export async function POST(req: NextResponse) {
  try {
    const session = await getServerSession(authOptions);

    // Route protection
    if (!session?.user || (session.user as User).role !== "ADMIN") {
      return NextResponse.json(
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }

    const {
      nim,
      fullName,
      shortName,
      email,
      password,
      birthDate,
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
        role: "KASUH",
        UserKasuh: {
          create: {
            birthDate: new Date(birthDate).toISOString(),
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
