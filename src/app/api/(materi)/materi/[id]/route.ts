import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const materi = await prisma.materi.findUnique({
    where: {
      id,
    },
  });

  if (!materi) {
    return NextResponse.json({ message: "Materi not found" }, { status: 400 });
  }

  if (new Date().getTime() > materi.expiredDate.getTime()) {
    return NextResponse.json({ message: "Materi expired" }, { status: 400 });
  }

  return NextResponse.json(materi);
}
