/** @type {import('next').NextConfig} */
const nextConfig = {
    api: {
      bodyParser: {
        sizeLimit: '1mb', // Set desired size limit for API routes
      },
    },
  };
  
  export default nextConfig;
  