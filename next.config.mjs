/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "4034fc71fea4.ngrok-free.app",
        pathname: "/media/**", // <-- double asterisk to match nested folders
      },
    ],
  },
};

export default nextConfig;
