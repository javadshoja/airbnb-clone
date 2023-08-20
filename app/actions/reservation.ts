'use server'

import { zact } from 'zact/server'
import prisma from '@/libs/db'
import getCurrentUser from '@/services/user'
import { ReservationSchema } from '@/libs/schemas'
import { z } from 'zod'

export const createReservation = zact(ReservationSchema)(async ({
	totalPrice,
	startDate,
	endDate,
	listingId
}) => {
	const currentUser = await getCurrentUser()
	return await prisma.reservation.create({
		data: {
			totalPrice,
			startDate,
			endDate,
			listingId,
			userId: currentUser?.id!
		}
	})
})

export const deleteReservation = zact(z.string())(async id => {
	const currentUser = await getCurrentUser()

	return await prisma.reservation.deleteMany({
		where: {
			id,
			OR: [
				{ userId: currentUser?.id },
				{ listing: { userId: currentUser?.id } }
			]
		}
	})
})
