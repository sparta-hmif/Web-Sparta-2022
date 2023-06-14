// NGE-TEST PRISMA

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST() {
  await prisma.user.create({
    data: {
      nim: "111111111",
      email: "test@gmail.com",
      password: "hehe",
      fullName: "test",
    },
  });
  return NextResponse.json({ message: "success" });
}
