/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qk7jyk9hxvqv5tsr.public.blob.vercel-storage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "drive.internxt.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
