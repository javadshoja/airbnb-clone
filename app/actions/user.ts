'use server'

import prisma from '@/libs/db'

import bcrypt from 'bcrypt'
import { zact } from 'zact/server'
import { z } from 'zod'

export const registerUser = zact(
	z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string()
	})
)(async ({ name, email, password }) => {
	const hashedPassword = await bcrypt.hash(password, 12)

	return await prisma.user.create({
		data: {
			name,
			email,
			hashedPassword
		}
	})
})
