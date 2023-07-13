import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";


/*
  Endpoint Pendaftaran kasuh berdasarkan parameter desuhId, kasuhId serta alasan
*/
export async function POST(req: NextRequest) {
  try {
      const { alasan } = await req.json();
      
    // parse query param
    const _desuhId: string = req.nextUrl.searchParams.get("desuh") as string;
    const _kasuhId: string = req.nextUrl.searchParams.get("kasuh") as string;

    const session = await getServerSession(authOptions);
    const userId= await prisma.userDesuh.findFirst({
        where:{
            id: _desuhId
        },
        select:{
            userId: true
        }
    });
    // Route protection
    if (
      !session?.user ||
      ((session.user as User).id !== userId?.userId &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json(
            { message: "mau ngapain mas/mba ??" },
        { status: 401 }
      );
    }
    
    if(!alasan){
        return NextResponse.json({ message: "Alasan tidak boleh kosong" }, { status: 400 });
    }

    const kasuh = await prisma.userKasuh.findFirst({
        where: {
            id: _kasuhId
        },
    });
    
    if (!kasuh) {
        return NextResponse.json({ message: "Kasuh not found" }, { status: 404 });
    }

    if (kasuh?.kuota !== undefined && kasuh?.pendaftarSekarang !== undefined && kasuh?.kuota !== null && kasuh?.pendaftarSekarang !== null && kasuh?.kuota >= kasuh?.pendaftarSekarang) {
        return NextResponse.json({ message: "Kuota sudah penuh" }, { status: 400 });
    }
    
    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findFirst({
        where:{
            kasuhId: _kasuhId,
            desuhId: _desuhId
        }
    });

    // update pendaftaran kasuh apabila sudah mendaftar
    if(pendaftaranKasuh){
        await prisma.pendaftaranKasuh.update({
            where:{
                id: pendaftaranKasuh.id
            },
            data:{
                alasan: alasan
            }
        });
        return NextResponse.json({ message: "Anda sudah mendaftar kasuh ini" }, { status: 400 });
    }

    // create pendaftaran kasuh
    await prisma.pendaftaranKasuh.create({
        data:{
            kasuhId: _kasuhId,
            desuhId: _desuhId,
            alasan: alasan
        }
    });
    
    // update user kasuh
    await prisma.userKasuh.update({
        where: {
            id: _kasuhId
        },
        data: {
            pendaftarSekarang: kasuh?.pendaftarSekarang ? kasuh?.pendaftarSekarang + 1 : 1
        }
    });    
    return NextResponse.json({ message: "success" });

    } catch (err) {
        return NextResponse.json({ message: err }, { status: 500 });
    }
}

/*
  Endpoint Penggantian alasan berdasarkan parameter desuhId, kasuhId serta alasan
*/
export async function PATCH(req: NextRequest) {
  try {
    const { alasan } = await req.json();

    // parse query param
    const _desuhId: string = req.nextUrl.searchParams.get("desuh") as string;
    const _kasuhId: string = req.nextUrl.searchParams.get("kasuh") as string;


    if(!alasan){
        return NextResponse.json({ message: "Alasan tidak boleh kosong" }, { status: 400 });
    }

    // const session = await getServerSession(authOptions);
    // const userId= await prisma.userDesuh.findFirst({
    //     where:{
    //         id: _desuhId
    //     },
    //     select:{
    //         userId: true
    //     }
    // });
    // // Route protection
    // if (
    //   !session?.user ||
    //   ((session.user as User).id !== userId?.userId &&
    //     (session.user as User).role !== "ADMIN")
    // ) {
    //   return NextResponse.json(
    //         { message: "mau ngapain mas/mba ??" },
    //     { status: 401 }
    //   );
    // }

    const pendaftaranKasuh = await prisma.pendaftaranKasuh.findFirst({
        where:{
            kasuhId: _kasuhId,
            desuhId: _desuhId
        }
    });
    
    if(!pendaftaranKasuh){
        return NextResponse.json({ message: "Anda belum mendaftar kasuh ini" }, { status: 400 });
    }

    // update user kasuh
    await prisma.pendaftaranKasuh.update({
        where: {
            id: pendaftaranKasuh.id
        },
        data: {
            alasan: alasan
        }
    });

    return NextResponse.json({ message: "success" });
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}
