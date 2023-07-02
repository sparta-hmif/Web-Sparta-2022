import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
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
