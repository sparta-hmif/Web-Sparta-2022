import { google, drive_v3 } from "googleapis";
import { File } from "formidable";
import fs from "fs";

const auth = new google.auth.GoogleAuth({
  keyFile: "",
  scopes: ["https://www.googleapis.com/auth/drive"],
});

export async function searchFolderByName(_parentId: string, _filename: string) {
  const drive = google.drive({ version: "v3", auth });

  // buffer untuk nyimpen list folder/file
  const folders: any[] = [];

  try {
    // Melakukan pencarian menggunakan query berdasarkan nama folder
    const res = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.folder' and '${_parentId}' in parents`,
      fields: "files(id, name)",
    });

    // mencari file dengan nama sesuai
    if (res.data.files) {
      Array.prototype.push.apply(folders, res.data.files);
      console.info(folders);
      if (folders.find(({ name }) => name === _filename)) {
        return folders.find(({ name }) => name === _filename);
        // return File datatype from googleapi : { id, name }
      }
    }
  } catch (error) {
    console.error("Error searching folder:", error);
  }
}

export async function postFile2Drive(parentID: string, file: File) {
  // Menginisialisasi Google Drive API    // Membuat klien Google Drive
  const drive = google.drive({ version: "v3", auth });
  // const folders: drive_v3.Schema$File[] = [];
  // Melakukan pencarian menggunakan query berdasarkan nama folder
  let metadata = {
    name: file.originalFilename as string,
    parents: [parentID as string],
  };
  let media = {
    mimeType: file.mimetype as string,
    body: fs.createReadStream(file.filepath),
  };

  try {
    const res = await drive.files.create({
      requestBody: metadata,
      media: media,
      fields: "name",
    });
  } catch (error) {
    console.error("Error searching folder:", error);
  }
}
