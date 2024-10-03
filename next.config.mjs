/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '1mb', // Set desired size limit for API routes
    },
  },
  images: {
    domains: ['res.cloudinary.com'], // Allow images from res.cloudinary.com
  },
};

export default nextConfig;
