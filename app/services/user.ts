import { trytm } from '@bdsqqq/try'

import db from '@/app/libs/prismadb'
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

	return currentUser
}
