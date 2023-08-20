import prisma from '@/libs/db'

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

	if (authorId) query.listing = { userId: authorId }

	try {
		const reservations = await prisma.reservation.findMany({
			where: query,
			include: {
				listing: true
			},
			orderBy: {
				createdAt: 'desc'
			}
		})

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
	} catch (error: any) {
		throw new Error(error)
	}
}
