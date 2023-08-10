import { trytm } from '@bdsqqq/try'

import db from '@/libs/db'
import { getSession } from './session'

export default async function getCurrentUser() {
	const [session] = await trytm(getSession())

	if (!session?.user?.email) return null

	const [currentUser] = await trytm(
		db.user.findUnique({
			where: {
				email: session.user.email as string
			}
		})
	)

	if (!currentUser) return null

	return {
		...currentUser,
		createdAt: currentUser.createdAt.toISOString(),
		updatedAt: currentUser.updatedAt.toISOString(),
		emailVerified: currentUser.emailVerified?.toISOString() || null
	}
}
