import { google } from "googleapis";
import { Readable } from "stream";

const auth = new google.auth.GoogleAuth({
  keyFile: "website-sparta-2022-c233419ce4b5.json",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export async function searchFolderIdByName(
  _parentId: string,
  _foldername: string // folder
) {
  const logArr = [];
  logArr.push("masuk search folder");
  // Menginisialisasi Google Drive API
  const drive = google.drive({ version: "v3", auth });

  // buffer untuk nyimpen list folder/file
  const folders: any[] = [];

  try {
    // Melakukan pencarian menggunakan query berdasarkan nama folder
    const res = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and '${_parentId}' in parents`,
      fields: "files(id, name)",
    });
    logArr.push("kelar query");
    logArr.push(res);

    if (res.data.files) {
      Array.prototype.push.apply(folders, res.data.files);

      // folder found
      if (folders.find(({ name }) => name === _foldername)) {
        return {
          status: 200,
          data: folders.find(({ name }) => name === _foldername),
        };
      }
      // folder not found
      else {
        return { status: 204 };
      }
    }
    // query failed
    else {
      throw new Error();
    }
  } catch (error) {
    logArr.push(error);
    return { status: 500, arr: logArr };
  }
}

export async function postFile2Drive(
  parentID: string,
  file: File,
  onTimeSign: boolean
) {
  // Menginisialisasi Google Drive API
  const drive = google.drive({ version: "v3", auth });

  // convert file buff to file stream
  let filestream = await arrBuff2Stream(file);

  let metadata = {
    name: file.name as string,
    parents: [parentID as string],
  };

  // add sign to late upload
  if (!onTimeSign) metadata.name = "(Telat)_" + metadata.name;

  let media = {
    mimeType: file.type as string,
    body: filestream,
  };

  try {
    // query
    const res = await drive.files.create({
      requestBody: metadata,
      media: media,
      fields: "name, webViewLink",
    });

    return { status: res.status, link: res.data.webViewLink };
  } catch (error) {
    return { status: 500 };
  }
}

export async function newDriveFolder(parentID: string, _foldername: string) {
  // Menginisialisasi Google Drive API
  const drive = google.drive({ version: "v3", auth });

  let metadata = {
    name: _foldername,
    parents: [parentID as string],
    mimeType: "application/vnd.google-apps.folder", // mimetype for gdrive folder
  };

  try {
    // query
    const res = await drive.files.create({
      requestBody: metadata,
      fields: "id",
    });

    return { status: 200, data: res.data.id };
  } catch (error) {
    return { status: 500 };
  }
}

async function arrBuff2Stream(file: File) {
  let buf8 = new Uint8Array(await file.arrayBuffer());

  const fst = new Readable();

  fst._read = function () {
    this.push(buf8);
    this.push(null);
  };

  return fst;
}
