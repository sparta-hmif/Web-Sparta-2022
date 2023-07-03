import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { namaLengkap, namaPendek, nim, jabatan, bidang, divisi, imageURL } =
      await req.json();

    const session = await getServerSession(authOptions);

    // Route protection
    if (!session?.user || (session.user as User).role !== "ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!namaLengkap || !namaPendek || !nim || !jabatan || !bidang) {
      return NextResponse.json({ message: "Missing Fields" }, { status: 400 });
    }

    await prisma.panitia.create({
      data: {
        namaLengkap,
        namaPendek,
        nim,
        jabatan,
        bidang,
        divisi,
        imageURL,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
