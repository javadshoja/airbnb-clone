import { trytm } from '@bdsqqq/try'
import prisma from '../libs/db'

export type getListingsParams = {
	userId?: string
	category?: string
	startDate?: string
	endDate?: string
	guestCount?: number
	roomCount?: number
	bathroomCount?: number
	locationValue?: string
}

export async function getListings({
	userId,
	category,
	startDate,
	endDate,
	guestCount,
	roomCount,
	bathroomCount,
	locationValue
}: getListingsParams) {
	try {
		const query: Record<string, {}> = {}

		if (userId) query.userId = userId

		if (category) query.category = category

		if (guestCount)
			query.guestCount = {
				gte: +guestCount
			}
		if (roomCount)
			query.roomCount = {
				gte: +roomCount
			}
		if (bathroomCount)
			query.bathroomCount = {
				gte: +bathroomCount
			}

		if (locationValue) query.locationValue = locationValue

		if (startDate && endDate) {
			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: { gte: startDate },
								startDate: { lte: startDate }
							},
							{
								startDate: { lte: endDate },
								endDate: { gte: endDate }
							}
						]
					}
				}
			}
		}

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: { createdAt: 'desc' }
		})

		// Safe Listings
		return listings.map(listing => ({
			...listing,
			createdAt: listing.createdAt.toISOString()
		}))
	} catch (error: any) {
		throw new Error(error)
	}
}

type getListingByIdParams = { listingId?: string }

export async function getListingById({ listingId }: getListingByIdParams) {
	const [listing, error] = await trytm(
		prisma.listing.findUnique({
			where: {
				id: listingId
			},
			include: {
				user: true
			}
		})
	)

	if (error) console.error(error)
	if (!listing) return null

	// Safe listing and listing user
	return {
		...listing,
		createdAt: listing?.createdAt.toISOString(),
		user: {
			...listing?.user,
			createdAt: listing?.user.createdAt.toDateString(),
			updatedAt: listing?.user.updatedAt.toDateString(),
			emailVerified: listing?.user.emailVerified?.toISOString() || null
		}
	}
}
