'use server'

import { zact } from 'zact/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/services/user'
import { ListingSchema } from '@/app/libs/schemas'

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
