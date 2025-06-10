import bundleAnalyzer from "@next/bundle-analyzer";

/** @type {import('next').NextConfig} */
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  // other config options here
};

export default withBundleAnalyzer(nextConfig);
