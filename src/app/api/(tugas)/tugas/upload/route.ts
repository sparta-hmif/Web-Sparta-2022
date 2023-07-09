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
        { message: "mau ngapain mas/mba ??" },
        { status: 401 }
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
    console.error(err);
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

async function lateUploadCheck(id: string) {
  try {
    // query tugas from mongodb
    const task = await prisma.tugas.findUnique({
      where: {
        id: id,
      },
    });

    const currentDateTime = moment().tz("Asia/Jakarta");
    const deadlineDateTime = moment(task?.endTime).tz("Asia/Jakarta");

    if (currentDateTime.isAfter(deadlineDateTime)) {
      // Waktu saat ini (server) sudah melewati deadline
      return false;
    } else {
      // Waktu saat ini masih sebelum deadline
      return true;
    }
  } catch {
    throw new Error("late upload error");
  }
}
