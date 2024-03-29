import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";

// POST
// Memilih CareerPath satu2
// POST /api/career-path/[nim]/[idCareerPath]

export async function POST(
  req: NextRequest,
  { params }: { params: { nim: string; idCareerPath: string } }
) {
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

  // Deadline
  //   if (new Date() > ) {
  //     return NextResponse.json({ message: "Waktu pemilihan sudah berakhir" }, { status: 404 });
  //   }

  const career = await prisma.careerPath.findUnique({
    where: {
      id: params.idCareerPath,
    },
  });

  if (!career) {
    return NextResponse.json({ message: "Career not found" }, { status: 404 });
  }

  if (career?.pendaftar >= career?.kuota) {
    return NextResponse.json({ message: "Kuota sudah penuh" }, { status: 400 });
  }

  try {
    await prisma.user.update({
      where: { nim: params.nim },
      data: {
        careerPathId: {
          push: params.idCareerPath,
        },
      },
      include: {
        CareerPath: true,
      },
    });

    await prisma.careerPath.update({
      where: { id: params.idCareerPath },
      data: {
        pendaftar: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update career " + error },
      { status: 500 }
    );
  }
}

// DELETE
// Menghapus CareerPath spesifik sesuai idCareerPath
// DELETE /api/career-path/[nim]/[idCareerPath]

export async function DELETE(
  req: NextRequest,
  { params }: { params: { nim: string; idCareerPath: string } }
) {
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

  // Deadline
  //   if (new Date() > ) {
  //     return NextResponse.json({ message: "Waktu pemilihan sudah berakhir" }, { status: 404 });
  //   }

  const user = await prisma.user.findUnique({ where: { nim: params.nim } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    await prisma.user.update({
      where: { nim: params.nim },
      data: {
        careerPathId: {
          set: user.careerPathId.filter((id) => id !== params.idCareerPath),
        },
      },
    });

    await prisma.careerPath.update({
      where: { id: params.idCareerPath },
      data: {
        pendaftar: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({ message: "deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update career " + error },
      { status: 500 }
    );
  }
}
