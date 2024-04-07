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
module.exports = withRoutes(config);
