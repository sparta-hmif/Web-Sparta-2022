// pages/api/s3-upload.js
import { APIRoute, sanitizeKey } from "next-s3-upload";

export default APIRoute.configure({
  key(req, filename) {
    return `spartans/${Date.now()}${sanitizeKey(filename)}`;
  },
  accessKeyId: process.env.SPARTA_AWS_ACCESS_KEY,
  secretAccessKey: process.env.SPARTA_AWS_SECRET_KEY,
  bucket: process.env.S3_BUCKET_NAME,
  region: process.env.S3_REGION,
});
