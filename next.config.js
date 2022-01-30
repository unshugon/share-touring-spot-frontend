/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FAVICON_URL: process.env.NODE_ENV === `development` ? `dev_favicon.svg` : `prod_favicon.svg`,
  },
};

module.exports = nextConfig;
