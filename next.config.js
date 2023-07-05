/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          `${process.env.S3_BUCKET_NAME}.s3.amazonaws.com`,
          `${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com`,
        ],
      },
}

module.exports = nextConfig
