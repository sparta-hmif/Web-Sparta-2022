import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { nim } = params;

  try {
    const user = await prisma.user.findUnique({
      select: {
        nim: true,
        email: true,
        fullName: true,
        shortName: true,
        score: true,
        imageURL: true,
        instagram: true,
        kelompok: true,
      },
      where: { nim },
    });

    if (!user) {
      console.log("User Not Found");
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    const mentors = await prisma.user.findMany({
      select: {
        nim: true,
        fullName: true,
        shortName: true,
        imageURL: true,
      },
      where: {
        kelompok: user.kelompok,
        role: "MENTOR",
      },
    });

    return NextResponse.json({ user, mentors });
  } catch (error) {
    console.log("Error");
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { nim } = params;
  const { email, password, fullName, shortName, instagram } = await req.json();

  const hashedPassword = await hash(password, 10);

  try {
    // Mengupdate data user berdasarkan ID
    await prisma.user.update({
      where: { nim },
      data: {
        email: email,
        password: hashedPassword,
        fullName: fullName,
        shortName: shortName,
        instagram,
      },
    });

    return NextResponse.json({ message: "User updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user", error },
      { status: 500 }
    );
  }
}
