import { NextRequest, NextResponse } from "next/server";
import moment from "moment-timezone";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { fileURL } = await req.json();

    // parse query param
    const _nim: string = req.nextUrl.searchParams.get("nim") as string;
    const _tugas: string = req.nextUrl.searchParams.get("tugas") as string;

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).nim !== _nim &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
        { message: "Ayolah mas/mba fokus sparta, daripada iseng-iseng gini, entar servernya malah numpuk, mohon kerja samanya ya :D semangat mas/mba <3!" },
        { status: 401 }
      );
    }

    const task = await prisma.tugas.findUnique({
      where: {
        id: _tugas,
      },
    });

    if (!task) {
      return NextResponse.json({ message: "Tugas not found" }, { status: 404 });
    }

    if (new Date() > task?.endTime) {
      return NextResponse.json(
        { message: "Tugas sudah berakhir" },
        { status: 400 }
      );
    }

    const lastSubmission = await prisma.submisiTugas.findFirst({
      where: {
        user: {
          nim: _nim,
        },
        tugasId: _tugas,
      },
    });

    if (!lastSubmission) {
      const user = await prisma.user.findUnique({
        select: {
          id: true,
        },
        where: {
          nim: _nim,
        },
      });

      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }

      await prisma.submisiTugas.create({
        data: {
          userId: user.id,
          tugasId: _tugas,
          link: fileURL,
        },
      });

      return NextResponse.json({ message: "success" });
    }

    await prisma.submisiTugas.update({
      where: {
        id: lastSubmission.id,
      },
      data: {
        link: fileURL,
      },
    });
    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
