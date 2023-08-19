'use server'

import { zact } from 'zact/server'
import prisma from '@/libs/db'
import getCurrentUser from '@/services/user'
import { ReservationSchema } from '@/libs/schemas'

export const createReservation = zact(ReservationSchema)(async ({
	totalPrice,
	startDate,
	endDate,
	listingId,
}) => {
	const currentUser = await getCurrentUser()
	return await prisma.reservation.create({
		data: {
			totalPrice,
			startDate,
			endDate,
			listingId,
			userId: currentUser?.id!,
		}
	})
})
