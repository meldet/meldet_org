/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['meldet-api']);

/* --- Build Next Config ----------------------------------------------------------------------- */

const projectRoot = __dirname;
const workspaceRoot = `${projectRoot}/..`;

const nextConfig = withTM({
  projectRoot: workspaceRoot, // Monorepo support
  reactStrictMode: true,
});

/* --- Exports --------------------------------------------------------------------------------- */

module.exports = nextConfig;
