// NGE-TEST PRISMA

import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });

    if (!user) {
      console.log('User Not Found');
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log('Error');
    return res.status(500).json({ message: 'Failed to fetch user', error });
  }
}

export async function PUT(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const { nim, email, password, fullName, shortName } = req.body;

  try {
    // Mengupdate data user berdasarkan ID
    const updatedUser = await prisma.user.update({
      where: { id: String(id) },
      data: {
        nim,
        email,
        password,
        fullName,
        shortName
      },
    });

    return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update user', error });
  }
}
