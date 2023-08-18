import { trytm } from '@bdsqqq/try'

import prisma from '@/libs/db'
import { getSession } from './session'

export default async function getCurrentUser() {
	const [session] = await trytm(getSession())

	if (!session?.user?.email) return null

	const [currentUser, error] = await trytm(
		prisma.user.findUnique({
			where: {
				email: session.user.email as string
			}
		})
	)

	if (error) console.error(error)

	if (!currentUser) return null

	// Safe User
	return {
		...currentUser,
		createdAt: currentUser.createdAt.toISOString(),
		updatedAt: currentUser.updatedAt.toISOString(),
		emailVerified: currentUser.emailVerified?.toISOString() || null
	}
}
