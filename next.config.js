/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FAVICON_URL: process.env.NODE_ENV === `development` ? `dev_favicon.svg` : `prod_favicon.svg`,
  },
  images: {
    domains: [
      'share-touring-spot-api.herokuapp.com',
      'share-touring-spot-api-assets.s3.amazonaws.com',
      'storage.googleapis.com',
      'lh1.googleusercontent.com',
      'lh2.googleusercontent.com',
      'lh3.googleusercontent.com',
      'lh4.googleusercontent.com',
      'lh5.googleusercontent.com',
      'lh6.googleusercontent.com',
    ],
  },
};

module.exports = nextConfig;
