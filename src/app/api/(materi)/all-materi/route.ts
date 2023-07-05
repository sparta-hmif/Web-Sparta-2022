import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const materi = await prisma.materi.findMany({
    select: {
      id: true,
      title: true,
      expiredDate: true,
    },
    orderBy: {
      expiredDate: "asc",
    },
  });

  return NextResponse.json(materi);
}