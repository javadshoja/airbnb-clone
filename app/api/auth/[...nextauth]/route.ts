import prisma from '@/libs/prismadb'
import { env } from '@/env.mjs'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import NextAuth, { type AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET
		}),
		GithubProvider({
			clientId: env.GITHUB_ID,
			clientSecret: env.GITHUB_SECRET
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials, req) {
				if (!credentials?.email || !credentials?.password)
					throw new Error('Invalid credentials')

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				if (!user || !user?.hashedPassword)
					throw new Error('Invalid credentials')

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.hashedPassword
				)

				if (!isCorrectPassword) throw new Error('Invalid credentials')

				return user
			}
		})
	],
	pages: {
		signIn: '/'
	},
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt'
	},
	secret: env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
