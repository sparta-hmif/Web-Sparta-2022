import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/app/lib/prisma";
import { User } from "@prisma/client";

// GET
// Ambil semua pilihan CareerPath yg dipilih user
// GET /api/career-path/[nim]
export async function GET(
  req: NextRequest,
  { params }: { params: { nim: string } }
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

  const spartansCareer = await prisma.user.findMany({
    where: {
      nim: params.nim,
    },
    select: {
      CareerPath: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  return NextResponse.json(spartansCareer);
}

// POST
// Memilih CareerPath 2 sekaligus
// POST /api/career-path/[nim]
// {
//    idCareerPath1 : "",
//    idCareerPath2 : ""
// }

export async function POST(
  req: NextRequest,
  { params }: { params: { nim: string } }
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

  const { idCareerPath1, idCareerPath2 } = await req.json();
  const idCareers = [idCareerPath1, idCareerPath2];

  if (idCareerPath1 == idCareerPath2) {
    return NextResponse.json({ message: "Id Invalid" }, { status: 404 });
  }

  const user = await prisma.user.findUnique({ where: { nim: params.nim } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (user.careerPathId.length == 2) {
    return NextResponse.json({ message: "Sudah memilih" }, { status: 400 });
  }

  for (const id of idCareers) {
    try {
      const career = await prisma.careerPath.findUnique({ where: { id: id } });

      if (!career) {
        throw new Error("Career not found !");
      }

      if (career?.pendaftar >= career?.kuota) {
        throw new Error(`Kuota ${career.title} sudah penuh !`);
      }
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 400 });
    }
  }

  await prisma.user.update({
    where: { nim: params.nim },
    data: {
      careerPathId: idCareers,
    },
    include: {
      CareerPath: true,
    },
  });

  for (const id of idCareers) {
    try {
      await prisma.careerPath.update({
        where: { id: id },
        data: {
          pendaftar: {
            increment: 1,
          },
        },
      });
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 404 });
    }
  }

  return NextResponse.json({ message: "success" }, { status: 201 });
}

// DELETE
// Hapus CareerPath 2 sekaligus
// DELETE /api/career-path/[nim]

export async function DELETE(
  req: NextRequest,
  { params }: { params: { nim: string } }
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

  for (const id of user.careerPathId) {
    try {
      await prisma.careerPath.update({
        where: { id: id },
        data: {
          pendaftar: {
            decrement: 1,
          },
        },
      });
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to update career " + error },
        { status: 500 }
      );
    }
  }

  try {
    await prisma.user.update({
      where: { nim: params.nim },
      data: {
        careerPathId: [],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update career " + error },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "deleted" }, { status: 200 });
}
