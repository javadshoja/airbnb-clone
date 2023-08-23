import getCurrentUser from './user'
import prisma from '@/libs/db'

export async function getFavoriteListings() {
	try {
		const currentUser = await getCurrentUser()

		if (!currentUser) return []

		const favorites = await prisma.listing.findMany({
			where: {
				id: {
					in: [...(currentUser.favoriteIds || [])]
				}
			}
		})

		// Safe favorites
		return favorites.map(favorite => ({
			...favorite,
			createdAt: favorite.createdAt.toISOString()
		}))
	} catch (error: any) {
		throw new Error(error)
	}
}
