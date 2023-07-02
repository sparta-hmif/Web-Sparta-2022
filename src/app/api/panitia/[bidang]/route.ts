import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Bidang } from "@prisma/client";

const bidangList: Bidang[] = [
  "KETUA",
  "KESEKJENAN",
  "MAMET",
  "KONSEPTOR",
  "LAPANGAN",
  "PENSUASANAAN",
  "OPERASIONAL",
];

export async function GET(
  req: NextRequest,
  { params }: { params: { bidang: string } }
) {
  const { bidang } = params;

  if (!bidangList.includes(bidang.toUpperCase() as Bidang)) {
    return NextResponse.json({ message: "Invalid query" }, { status: 404 });
  }

  if (bidang === "ketua") {
    const ketua = await prisma.panitia.findFirst({
      select: {
        namaPendek: true,
        nim: true,
        jabatan: true,
      },
      where: {
        bidang: bidang.toUpperCase() as Bidang,
      },
    });
    return NextResponse.json({ ketua });
  } else if (bidang === "kesekjenan") {
    const kabid = await prisma.panitia.findFirst({
      select: {
        namaPendek: true,
        nim: true,
        jabatan: true,
      },
      where: {
        bidang: bidang.toUpperCase() as Bidang,
        jabatan: "SEKJEN",
      },
    });

    const sekreList = await prisma.panitia.findMany({
      select: {
        namaPendek: true,
        nim: true,
        jabatan: true,
      },
      where: {
        bidang: bidang.toUpperCase() as Bidang,
        jabatan: "SEKRETARIS",
      },
    });

    const bendList = await prisma.panitia.findMany({
      select: {
        namaPendek: true,
        nim: true,
        jabatan: true,
      },
      where: {
        bidang: bidang.toUpperCase() as Bidang,
        jabatan: "BENDAHARA",
      },
    });

    const dbDivisiList = await prisma.panitia.groupBy({
      by: ["divisi"],
      where: {
        bidang: bidang.toUpperCase() as Bidang,
      },
    });

    const divisiList = await Promise.all(
      dbDivisiList
        .filter(({ divisi }) => divisi && (divisi as string) !== "KESEKJENAN")
        .map(({ divisi }) =>
          prisma.panitia.findMany({
            select: {
              namaPendek: true,
              nim: true,
              jabatan: true,
              divisi: true,
            },
            where: {
              bidang: bidang.toUpperCase() as Bidang,
              divisi,
            },
          })
        )
    );

    const mappedDivisiList = divisiList.map((divisi) => {
      const ketua = divisi.find(
        ({ jabatan }) => (jabatan as string) === "KADIV"
      );
      const wakilList = divisi.filter(
        ({ jabatan }) => (jabatan as string) === "WAKADIV"
      );
      const staffList = divisi.filter(
        ({ jabatan }) => (jabatan as string) === "STAFF"
      );

      return {
        ketua,
        wakil1: wakilList[0],
        wakil2: wakilList.length > 1 ? wakilList[1] : null,
        staff: staffList,
      };
    });

    return NextResponse.json({
      kabid,
      sekretaris: sekreList,
      bendahara: bendList,
      divisiList: mappedDivisiList,
    });
  } else if (bidang === "mamet") {
    const kabid = await prisma.panitia.findFirst({
      select: {
        namaPendek: true,
        nim: true,
        jabatan: true,
      },
      where: {
        bidang: bidang.toUpperCase() as Bidang,
        jabatan: "KABID",
      },
    });

    const divisiList = await prisma.panitia.findMany({
      where: {
        bidang: bidang.toUpperCase() as Bidang,
      },
    });

    const ketua = kabid;
    const wakil1 = divisiList.filter(
      ({ jabatan }) => (jabatan as string) === "WAKADIV"
    )[0];
    const staff = divisiList.filter(
      ({ jabatan }) => (jabatan as string) === "STAFF"
    );

    return NextResponse.json({
      kabid,
      divisiList: [{ ketua, wakil1, staff }],
    });
  } else {
    const kabid = await prisma.panitia.findFirst({
      select: {
        namaPendek: true,
        nim: true,
        jabatan: true,
      },
      where: {
        bidang: bidang.toUpperCase() as Bidang,
        jabatan: "KABID",
      },
    });

    const dbDivisiList = await prisma.panitia.groupBy({
      by: ["divisi"],
      where: {
        bidang: bidang.toUpperCase() as Bidang,
      },
    });

    const divisiList = await Promise.all(
      dbDivisiList
        .filter(({ divisi }) => divisi)
        .map(({ divisi }) =>
          prisma.panitia.findMany({
            select: {
              namaPendek: true,
              nim: true,
              jabatan: true,
              divisi: true,
            },
            where: {
              bidang: bidang.toUpperCase() as Bidang,
              divisi,
            },
          })
        )
    );

    const mappedDivisiList = divisiList.map((divisi) => {
      const ketua = divisi.find(
        ({ jabatan }) => (jabatan as string) === "KADIV"
      );
      const wakilList = divisi.filter(
        ({ jabatan }) => (jabatan as string) === "WAKADIV"
      );
      const staffList = divisi.filter(
        ({ jabatan }) => (jabatan as string) === "STAFF"
      );

      return {
        ketua,
        wakil1: wakilList[0],
        wakil2: wakilList.length > 1 ? wakilList[1] : null,
        staff: staffList,
      };
    });

    return NextResponse.json({ kabid, divisiList: mappedDivisiList });
  }
}
