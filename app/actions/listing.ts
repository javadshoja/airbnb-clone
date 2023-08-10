'use server'

import { zact } from 'zact/server'

import prisma from '@/libs/db'
import getCurrentUser from '@/services/user'
import { ListingSchema } from '@/libs/schemas'

export const createListing = zact(ListingSchema)(async ({
	title,
	category,
	description,
	imageSrc,
	bathroomCount,
	guestCount,
	location,
	price,
	roomCount
}) => {
	const currentUser = await getCurrentUser()
	return await prisma.listing.create({
		data: {
			title,
			category,
			description,
			imageSrc,
			bathroomCount,
			guestCount,
			locationValue: location?.value!,
			price,
			roomCount,
			userId: currentUser?.id!
		}
	})
})
