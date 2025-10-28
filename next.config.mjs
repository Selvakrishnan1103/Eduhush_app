
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    allowedDevOrigins: ['http://192.168.0.120:3000'],
  },
};

export default nextConfig
