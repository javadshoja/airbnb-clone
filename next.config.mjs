import './env.mjs'

/** @type {import("next").NextConfig} */
const config = {
	reactStrictMode: true,
	experimental: {
		typedRoutes: true
	},
	images: {
		domains: ['avatars.githubusercontent.com', 'lh3.googleusercontent.com']
	}
}

export default config
