/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dish photos live in /public/images/dishes and are served directly,
  // so no remote image configuration is needed. If you later host photos
  // on Cloudinary/Supabase and switch to next/image, add remotePatterns here.
  
  // Optimize for Vercel production deployment
  output: 'standalone',
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Production optimizations
  poweredByHeader: false,
  
  // Image optimization settings (if you switch to next/image later)
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
