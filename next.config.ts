import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/": ["./content/**/*"],
    "/kit": ["./content/**/*"],
    "/sample": ["./content/**/*"],
    "/api/kit/[slug]": ["./content/**/*"],
    "/api/sample": ["./content/**/*"],
  },
};

export default nextConfig;
