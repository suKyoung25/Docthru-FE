/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://six-docthru-3team-be-hdiq.onrender.com/:path*"
      }
    ];
  }
};

export default nextConfig;
