import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		GITHUB_ID: z.string(),
		GITHUB_SECRET: z.string(),
		NEXTAUTH_SECRET: z.string(),
		HIGHLIGHT_PROJECT_ID: z.string()
		// NEXTAUTH_URL: z.string().url()
	},
	client: {
		NEXT_PUBLIC_PUBLISHABLE_KEY: z.string().min(1)
	},
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		GITHUB_ID: process.env.GITHUB_ID,
		GITHUB_SECRET: process.env.GITHUB_SECRET,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		HIGHLIGHT_PROJECT_ID: process.env.HIGHLIGHT_PROJECT_ID,
		// NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY
	}
})
