import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  revalidatePath(req.url);
  return NextResponse.json({ time: new Date().toISOString() });
}
