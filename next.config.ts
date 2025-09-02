import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Handle dashboard subdomain rewrites
      {
        source: "/:path*",
        destination: "/dashboard/:path*",
        has: [
          {
            type: "host",
            value: "dash.ggmedia.app",
          },
        ],
      },
      {
        source: "/",
        destination: "/dashboard",
        has: [
          {
            type: "host",
            value: "dash.ggmedia.app",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect dashboard routes on main domain to subdomain
      {
        source: "/dashboard/:path*",
        destination: "https://dash.ggmedia.app/:path*",
        permanent: true,
        has: [
          {
            type: "host",
            value: "ggmedia.app",
          },
        ],
      },
      {
        source: "/dashboard",
        destination: "https://dash.ggmedia.app",
        permanent: true,
        has: [
          {
            type: "host",
            value: "ggmedia.app",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
