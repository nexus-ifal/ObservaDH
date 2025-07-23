/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		unoptimized: true,
	},
	experimental: {
		nodeMiddleware: true,
	},
};

export default nextConfig;
