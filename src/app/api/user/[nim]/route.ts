import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { User } from "@prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { nim } = params;

  const session = await getServerSession(authOptions);

  // Route protection
  if (
    !session?.user ||
    ((session.user as User).nim !== nim &&
      (session.user as User).role !== "ADMIN")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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

  const session = await getServerSession(authOptions);

  // Route protection
  if (
    !session ||
    (session.user &&
      (session.user as User).nim !== nim &&
      (session.user as User).role !== "ADMIN")
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
