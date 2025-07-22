/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cto-project-production.up.railway.app/",
        pathname: "/media/**", // <-- double asterisk to match nested folders
      },
    ],
  },
};

export default nextConfig;
