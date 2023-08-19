import prisma from '@/libs/db'
import { trytm } from '@bdsqqq/try'

type GetReservationParams = {
	listingId?: string
	userId?: string
	authorId?: string
}

export async function getReservations({
	listingId,
	userId,
	authorId
}: GetReservationParams) {
	const query: Record<string, string | Record<string, string>> = {}

	if (listingId) query.listingId = listingId

	if (userId) query.userId = userId

	if (authorId) query.listingId = { userId: authorId }

	const [reservations, error] = await trytm(
		prisma.reservation.findMany({
			where: query,
			include: {
				listing: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})
	)

	if (error) console.error(error)

	if (!reservations) return null

	// Safe Reservations
	return reservations.map(reservation => ({
		...reservation,
		createdAt: reservation.createdAt.toISOString(),
		startDate: reservation.startDate.toISOString(),
		endDate: reservation.endDate.toISOString(),
		listing: {
			...reservation.listing,
			createdAt: reservation.listing.createdAt.toDateString()
		}
	}))
}
