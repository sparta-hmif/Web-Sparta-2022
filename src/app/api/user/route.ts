import { prisma } from "@/app/lib/prisma";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

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
