import { trytm } from '@bdsqqq/try'
import prisma from '../../libs/prismadb'

export async function getListings() {
	const [listings, error] = await trytm(
		prisma.listing.findMany({
			orderBy: { createdAt: 'desc' }
		})
	)

	if (error) console.error(error)

	return listings
}
