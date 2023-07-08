import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { User } from "@prisma/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { nim } = params;
  const { imageURL } = await req.json();

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

  if (!imageURL) {
    return NextResponse.json(
      { message: "Request body must at least contain 'imageURL'" },
      { status: 400 }
    );
  }

  try {
    // Mengupdate data user berdasarkan ID
    await prisma.user.update({
      where: { nim },
      data: {
        imageURL: imageURL,
      },
    });

    return NextResponse.json({ message: "User's imageURL updated successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update user's imageURL", error },
      { status: 500 }
    );
  }
}
