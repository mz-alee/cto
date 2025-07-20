/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "b98744752438.ngrok-free.app",
        pathname: "/media/**", // <-- double asterisk to match nested folders
      },
    ],
  },
};

export default nextConfig;
