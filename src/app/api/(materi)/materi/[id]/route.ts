import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

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
