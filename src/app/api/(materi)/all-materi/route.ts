import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user) {
    return NextResponse.json(
      { message: "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!" },
      { status: 401 }
    );
  }

  const materi = await prisma.materi.findMany({
    select: {
      id: true,
      title: true,
      releaseDate: true,
    },
    orderBy: {
      releaseDate: "desc",
    },
  });

  return NextResponse.json(materi);
}
