'use server'

import { zact } from 'zact/server'
import prisma from '@/libs/db'
import { z } from 'zod'
import getCurrentUser from '@/services/user'

const ListingIdSchema = z.string()

export const addFavorite = zact(ListingIdSchema)(async listingId => {
	const currentUser = await getCurrentUser()

	const favoriteIds = [...(currentUser?.favoriteIds || [])]

	favoriteIds.push(listingId)

	return await prisma.user.update({
		where: {
			id: currentUser?.id
		},
		data: {
			favoriteIds
		}
	})
})

export const deleteFavorite = zact(ListingIdSchema)(async listingId => {
	const currentUser = await getCurrentUser()

	let favoriteIds = [...(currentUser?.favoriteIds || [])]

	favoriteIds = favoriteIds.filter(id => id !== listingId)

	return await prisma.user.update({
		where: {
			id: currentUser?.id
		},
		data: {
			favoriteIds
		}
	})
})
