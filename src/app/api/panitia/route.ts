import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { namaLengkap, namaPendek, nim, jabatan, bidang, divisi, imageURL } =
      await req.json();

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
