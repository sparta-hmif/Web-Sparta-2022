import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { title, expiredDate, sections, attachments } = await req.json();

    const date = new Date();

    if (date.getTime() > new Date(expiredDate).getTime()) {
      return NextResponse.json(
        { message: "Expired Date invalid" },
        { status: 400 }
      );
    }

    await prisma.materi.create({
      data: {
        title: title,
        expiredDate: expiredDate,
        sections: sections,
        attachments: attachments,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
