/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: 'dist',
    env: {
        DEPT_URL: process.env.DEPT_URL,
        SERVICE_URL: process.env.SERVICE_URL,

    },
    images: { unoptimized: true },
};


export default nextConfig;
