import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { title, expiredDate, sections, attachments } = await req.json();

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).role !== "MAMET" &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
