import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* GitHub avatar in the profile section */
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
};

export default nextConfig;
