import { NextRequest, NextResponse } from "next/server";
import {
  searchFolderIdByName,
  postFile2Drive,
  newDriveFolder,
} from "@/app/lib/drive";
import moment from "moment-timezone";
import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";

const parent_id: string = process.env.PARENTID as string;

export async function POST(req: NextRequest) {
  try {
    let upload: any;

    // parse query param
    const _nim: string = req.nextUrl.searchParams.get("nim") as string;
    const _tugas: string = req.nextUrl.searchParams.get("tugas") as string;

    const session = await getServerSession(authOptions);

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).nim !== _nim &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // validasi telat
    let valid: boolean = await lateUploadCheck(_tugas);

    // parse file from formdata
    const x = req.formData();
    let file: File = (await x).get("media") as File;

    // search folder by nim
    let folder = await searchFolderIdByName(parent_id, _nim);

    // folder not found
    if (folder.status === 204) {
      // create new folder
      let newfolder = await newDriveFolder(parent_id, _nim);

      // failed create folder
      if (newfolder.status == 500) {
        throw new Error();
      }

      // success create folder
      else if (newfolder.data) {
        // upload file to drive
        upload = await postFile2Drive(newfolder.data, file, valid);
        // failed upload
        if (upload.status === 500)
          throw new Error("Google API Error While Uploading");
      }
    }

    // folder found
    else if (folder.status == 200) {
      // file to drive
      upload = await postFile2Drive(folder.data.id, file, valid);

      // failed upload
      if (upload.status === 500)
        throw new Error("Google API Error While Uploading");
    }
    // query folder error
    else {
      throw new Error("Google API Error While Searching");
    }

    if (upload.status === 200) {
      const lastSubmission = await prisma.submisiTugas.findFirst({
        where: {
          user: {
            nim: _nim,
          },
          tugasId: _tugas,
        },
      });

      if (!lastSubmission) {
        const user = await prisma.user.findUnique({
          select: {
            id: true,
          },
          where: {
            nim: _nim,
          },
        });

        if (!user) {
          return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
          );
        }

        await prisma.submisiTugas.create({
          data: {
            userId: user.id,
            tugasId: _tugas,
            link: upload.link,
          },
        });

        return NextResponse.json({ status: upload.status });
      }

      await prisma.submisiTugas.update({
        where: {
          id: lastSubmission.id,
        },
        data: {
          link: upload.link,
        },
      });

      return NextResponse.json({ status: upload.status });
    }

    return NextResponse.json({ status: upload.status });
  } catch (err) {
    console.error(err);

    return NextResponse.json({ message: err }, { status: 500 });
  }
}

async function lateUploadCheck(id: string) {
  try {
    // query tugas from mongodb
    const task = await prisma.tugas.findUnique({
      where: {
        id: id,
      },
    });

    const currentDateTime = moment().tz("Asia/Jakarta");
    const deadlineDateTime = moment(task?.endTime).tz("Asia/Jakarta");

    if (currentDateTime.isAfter(deadlineDateTime)) {
      // Waktu saat ini (server) sudah melewati deadline
      return false;
    } else {
      // Waktu saat ini masih sebelum deadline
      return true;
    }
  } catch {
    throw new Error();
  }
}
