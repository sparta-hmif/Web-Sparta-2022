import { prisma } from "@/app/lib/prisma";

export async function GET() {
  await prisma.pendaftaranKasuh.updateMany({
    data: {
      approved: 0,
    },
  });
}
