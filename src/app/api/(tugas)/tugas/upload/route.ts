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
import { Logger } from "aws-amplify";
import { log } from "console";

const parent_id: string = process.env.PARENTID as string;
const logger = new Logger("test");

export async function POST(req: NextRequest) {
  const logArr = [];
  try {
    let upload: any;
    logArr.push("masuk");
    // parse query param
    const _nim: string = req.nextUrl.searchParams.get("nim") as string;
    const _tugas: string = req.nextUrl.searchParams.get("tugas") as string;
    logArr.push("dapet query");

    const session = await getServerSession(authOptions);
    logger.log("dapet session");
    logArr.push("dapet session");

    // Route protection
    if (
      !session?.user ||
      ((session.user as User).nim !== _nim &&
        (session.user as User).role !== "ADMIN")
    ) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    logger.log("tembus protection");
    logArr.push("tembus protection");

    // validasi telat
    let valid: boolean = await lateUploadCheck(_tugas);
    logger.log("lewat validasi telat");
    logArr.push("lewat validasi telat");

    // parse file from formdata
    const x = req.formData();
    let file: File = (await x).get("media") as File;
    logger.log("dapet file");
    logArr.push("dapet file");

    // search folder by nim
    let folder = await searchFolderIdByName(parent_id, _nim);
    logger.log("kelar search folder");
    logArr.push("kelar search folder");

    // folder not found
    if (folder.status === 204) {
      // create new folder
      logger.log("gaketemu,,,");
      logArr.push("gaketemu,,,");
      let newfolder = await newDriveFolder(parent_id, _nim);
      logger.log("bikin folder baru");
      logArr.push("bikin folder baru");

      // failed create folder
      if (newfolder.status == 500) {
        logger.log("gagal bikin folder");
        logArr.push("gagal bikin folder");
        throw new Error("Google API Error While Creating Folder");
      }

      // success create folder
      else if (newfolder.data) {
        // upload file to drive
        logger.log("berhasil bikin folder");
        logArr.push("berhasil bikin folder");
        upload = await postFile2Drive(newfolder.data, file, valid);
        // failed upload
        if (upload.status === 500) {
          logger.log("gagal upload");
          logArr.push("gagal upload");
          throw new Error("Google API Error While Uploading");
        }
        logger.log("berhasil upload");
        logArr.push("berhasil upload");
      }
    }

    // folder found
    else if (folder.status == 200) {
      // file to drive
      logger.log("folder dah ada");
      logArr.push("folder dah ada");
      upload = await postFile2Drive(folder.data.id, file, valid);

      // failed upload
      if (upload.status === 500) {
        logger.log("gagal upload :(((");
        logArr.push("gagal upload :(((");
        throw new Error("Google API Error While Uploading");
      }
      logger.log("berhasil upload :)))");
      logArr.push("berhasil upload :)))");
    }
    // query folder error
    else {
      logger.log("ada yg salah di folder2an");
      logArr.push("ada yg salah di folder2an");
      throw new Error("Google API Error While Searching");
    }

    if (upload.status === 200) {
      logger.log("diterusin ke prisma...");
      logArr.push("diterusin ke prisma...");
      const lastSubmission = await prisma.submisiTugas.findFirst({
        where: {
          user: {
            nim: _nim,
          },
          tugasId: _tugas,
        },
      });
      logger.log("query last submission");
      logArr.push("query last submission");
      if (!lastSubmission) {
        const user = await prisma.user.findUnique({
          select: {
            id: true,
          },
          where: {
            nim: _nim,
          },
        });
        logger.log("query user");
        logArr.push("query user");
        if (!user) {
          return NextResponse.json(
            { message: "User not found" },
            { status: 404 }
          );
        }
        logger.log("bikin submisi baru");
        logArr.push("bikin submisi baru");
        await prisma.submisiTugas.create({
          data: {
            userId: user.id,
            tugasId: _tugas,
            link: upload.link,
          },
        });
        logger.log("DONE");
        logArr.push("DONE");
        return NextResponse.json({ status: upload.status, logArr: logArr });
      }
      logger.log("ngubah submmisi");
      logArr.push("ngubah submmisi");
      await prisma.submisiTugas.update({
        where: {
          id: lastSubmission.id,
        },
        data: {
          link: upload.link,
        },
      });
      logger.log("DONEEEE");
      logArr.push("DONEEEE");
      return NextResponse.json({ status: upload.status, logArr: logArr });
    }
    logger.log("DONE????");
    logArr.push("DONE????");
    return NextResponse.json({ status: upload.status, logArr: logArr });
  } catch (err) {
    console.error(err);
    logger.error(err);

    return NextResponse.json({ message: err, logArr: logArr }, { status: 500 });
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
    throw new Error("late upload error");
  }
}
