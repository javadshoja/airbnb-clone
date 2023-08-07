import './env.mjs'

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	experimental: {
		typedRoutes: true,
		serverActions: true
	},
	images: {
		domains: [
			'avatars.githubusercontent.com',
			'lh3.googleusercontent.com',
			'res.cloudinary.com'
		]
	}
}

export default config
