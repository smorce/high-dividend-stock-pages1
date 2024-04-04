const envConfig = require("./env.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  runtime: "edge",
  env: envConfig,
};

module.exports = nextConfig;