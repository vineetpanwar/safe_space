// @ts-nocheck
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
const nextRoutes = require('nextjs-routes/config');
const withRoutes = nextRoutes();

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
};

const nextConfig = {
  async headers() {
      return [
          {
              // matching all API routes
              source: "/*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ]
  }
}
module.exports = withRoutes(config,nextConfig);
