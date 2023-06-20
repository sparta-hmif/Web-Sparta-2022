// NGE-TEST PRISMA

import { prisma } from "../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST() {
  await prisma.user.create({
    data: {
      nim: "18222001",
      password: "$2a$12$kpY.rFI1L43qtFVr3OFW/uLNdnnRtK388JbAVaSF4.rE0xE/kXtZq", //1234567890
      fullName: "Test User",
      email: "18222001@gmail.com",
      role: "PESERTA",
    },
  });
  return NextResponse.json({ message: "success" });
}
