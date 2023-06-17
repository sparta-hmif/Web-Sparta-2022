// NGE-TEST PRISMA

import { prisma } from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST() {
  //   id         String    @id @default(auto()) @map("_id") @db.ObjectId
  //   nim        String    @unique
  //   email      String
  //   password   String
  //   fullName   String
  //   shortName  String?
  //   score      Int       @default(0)
  //   role       Role      @default(PESERTA)
  //   evalUser   EvalDay[]
  //   kelompok   Kelompok? @relation(fields: [kelompokId], references: [id])
  //   kelompokId String?   @db.ObjectId
  // }
  await prisma.user.create({
    data: {
      nim: "18222001",
      password: "$2a$12$kpY.rFI1L43qtFVr3OFW/uLNdnnRtK388JbAVaSF4.rE0xE/kXtZq", //1234567890
      fullName: "Test User",
      email: "18222001@gmail.com",
      role: "PESERTA",
      // ... 
    },
  });
  return NextResponse.json({ message: "success" });
}
