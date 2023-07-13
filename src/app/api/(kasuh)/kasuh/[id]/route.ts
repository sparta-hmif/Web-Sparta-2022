import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
/*
  Endpoint Mendapatkan kasuh berdasarkan parameter id
*/
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const session = await getServerSession(authOptions);

  // Route protection
  if (!session?.user) {
    return NextResponse.json(
      { message: "mau ngapain mas/mba ??" },
      { status: 401 }
    );
  }

  const kasuh = await prisma.userKasuh.findUnique({
    where: {
      id
    },
    select:{
        birthDate: true,
        deskripsi:true,
        user:{
            select:{
                fullName:true,
                shortName:true,
                nim:true,
                instagram:true,
            }
        }
    }
  });

  if (!kasuh) {
    return NextResponse.json({ message: "Kasuh not found" }, { status: 400 });
  }

  return NextResponse.json(kasuh);
}
