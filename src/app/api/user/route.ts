import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  try {
    const user = await prisma.user.findUnique({
      select: {
        id: true,
        nim: true,
        email: true,
        fullName: true,
        shortName: true,
        score: true,
        role: true,
        kelompokId: true,
      },
      where: { id: String(userId) },
    });

    if (!user) {
      console.log("User Not Found");
      return NextResponse.json({ message: "User not found" }, { status: 400 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log("Error");
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const { nim, email, password, fullName, shortName } = await req.json();

  const hashedPassword = await hash(password, 10);

  try {
    // Mengupdate data user berdasarkan ID
    await prisma.user.update({
      where: { id: String(userId) },
      data: {
        nim: nim,
        email: email,
        password: hashedPassword,
        fullName: fullName,
        shortName: shortName,
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
