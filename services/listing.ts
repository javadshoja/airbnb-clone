import { trytm } from '@bdsqqq/try'
import prisma from '../libs/db'

export async function getListings() {
	try {
		const listings = await prisma.listing.findMany({
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
