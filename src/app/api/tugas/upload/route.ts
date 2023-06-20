import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import {
  searchFolderIdByName,
  postFile2Drive,
  newDriveFolder,
} from "../../../../../lib/drive";
import moment from "moment-timezone";

const prisma = new PrismaClient();
const parent_id: string = process.env.PARENTID as string;

export async function POST(req: NextRequest) {
  try {
    let upload: any;

    // parse query param
    const _nim: string = req.nextUrl.searchParams.get("nim") as string;
    const _tugas: string = req.nextUrl.searchParams.get("tugas") as string;

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
      upload = await postFile2Drive(folder.data, file, valid);

      // failed upload
      if (upload.status === 500)
        throw new Error("Google API Error While Uploading");
    }
    // query folder error
    else {
      throw new Error("Google API Error While Searching");
    }

    return NextResponse.json({ status: upload.status });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
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
