import { prisma } from "@/app/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  const {
    nim,
    email,
    password,
    fullName,
    shortName,
    instagram,
    imageURL,
    kelompok,
    role,
  } = await req.json();

  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user || (session.user as User).role !== "ADMIN") {
    return NextResponse.json(
      { message: "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!" },
      { status: 401 }
    );
  }

  const hashedPassword = await hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        nim,
        password: hashedPassword,
        fullName,
        shortName,
        instagram,
        imageURL,
        kelompok,
        role,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
