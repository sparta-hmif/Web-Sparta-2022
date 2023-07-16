import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

/*
  Endpoint Mendapatkan kasuh berdasarkan parameter id
*/
export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
) {
  const { nim } = params;

  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user) {
    return NextResponse.json(
      { message: "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!" },
      { status: 401 }
    );
  }

  const kasuh = await prisma.user.findUnique({
    where: {
      nim,
    },
    select: {
      fullName: true,
      shortName: true,
      nim: true,
      instagram: true,
      imageURL: true,
      UserKasuh: {
        select: {
          birthDate: true,
          deskripsi: true,
        },
      },
    },
  });

  if (!kasuh || !kasuh.UserKasuh) {
    return NextResponse.json({ message: "Kasuh not found" }, { status: 400 });
  }

  return NextResponse.json(kasuh);
}
