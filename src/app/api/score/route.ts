import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const spartans = await prisma.user.findMany({
    select: {
      nim: true,
      fullName: true,
      score: true,
    },
    where: {
      role: "PESERTA",
    },
    orderBy: {
      score: "desc",
    },
  });

  return NextResponse.json({ spartans });
}
