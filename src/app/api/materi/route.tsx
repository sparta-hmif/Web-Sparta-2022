import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { title,description,expiredDate,link,type } = await req.json();

        const date=new Date()
        
        if(date.getTime() > new Date(expiredDate).getTime()){
            return NextResponse.json(
                { message: "Expired Date invalid" },
                { status: 400 }
            );
        }

        await prisma.materi.create({
            data: {
            title: title,
            description: description,
            expiredDate: expiredDate,
            link: link,
            type: type,
            },
        });

        return NextResponse.json({ message: "success" });
    } catch (err) {
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}