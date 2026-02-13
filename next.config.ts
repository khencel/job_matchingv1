import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      {
        // Proxy API requests to the backend server
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}/:path*`, // HTTP is okay here
      },
      {
        // Proxy media requests to the backend server
        source: "/media/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL}:path*`, // HTTP is okay here
      },
    ];
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      // Keep localhost if you use that interchangeably
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
