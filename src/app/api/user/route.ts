// NGE-TEST PRISMA

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");

  try {
    const user = await prisma.user.findUnique({
      where: { id: String(userId) },
    });

    if (!user) {
      console.log('User Not Found');
      return NextResponse.json({ message: 'User not found' });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.log('Error');
    return NextResponse.json({ message: 'Failed to fetch user', error });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const { nim, email, password, fullName, shortName } = await req.json();

  try {
    // Mengupdate data user berdasarkan ID
    const updatedUser = await prisma.user.update({
      where: { id: String(userId) },
      data: {
        nim: nim,
        email: email,
        password: password,
        fullName: fullName,
        shortName: shortName
      },
    });

    return NextResponse.json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to update user', error });
  }
}
