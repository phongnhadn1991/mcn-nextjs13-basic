/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    WP_API_JSON: "https://api-nhadatgiahung.ngoan.online/wp-json",
    WP_API_GRAPHQL: "https://api-nhadatgiahung.ngoan.online/graphql",
  },
  images: {
    domains: ["api-nhadatgiahung.ngoan.online", "picsum.photos"],
  },
};

module.exports = nextConfig;
