import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";

// GET
// Ambil semua pilihan CareerPath
// api/career-path
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user || (session.user as User).role !== "ADMIN") {
    return NextResponse.json(
      {
        message:
          "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!",
      },
      { status: 401 }
    );
  }

  const career = await prisma.careerPath.findMany({
    select: {
      id: true,
      title: true,
      kuota: true,
      pendaftar: true,
    },
  });

  return NextResponse.json(career);
}
