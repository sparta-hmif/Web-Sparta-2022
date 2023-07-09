import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { title, sections, attachments } = await req.json();

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).role !== "MAMET" &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }

    await prisma.materi.create({
      data: {
        title: title,
        releaseDate: new Date(),
        sections: sections,
        attachments: attachments,
      },
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
