import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const id = request.url.slice(request.url.lastIndexOf('/') + 1);

  const date = new Date();

  const materi = await prisma.materi.findFirst({
    where: {
      id: id,
    },
    select: {
      title: true,
      description: true,
      expiredDate: true,
      link: true,
      type: true
    }
  });

  if (materi && materi.expiredDate && date.getTime() > materi.expiredDate.getTime()) {
    return NextResponse.json(
      { message: "Expired Date invalid" },
      { status: 400 }
    );
  }
  return NextResponse.json(materi);
}