'use client'

import type { FC } from 'react'
import { Suspense, useCallback, useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import type { SafeReservation, SafeUser } from '@/types'
import { trytm } from '@bdsqqq/try'

import { deleteReservation } from '../actions/reservation'
import Grid from '@/components/Grid'

type ReservationsClientProps = {
	reservations: SafeReservation[]
	currentUser: SafeUser
}

const ReservationsClient: FC<ReservationsClientProps> = ({
	reservations,
	currentUser
}) => {
	const [deletingId, setDeletingId] = useState('')
	const router = useRouter()

	const onCancel = useCallback(
		async (id: string) => {
			setDeletingId(id)

			const [, error] = await trytm(deleteReservation(id))

			if (error) toast.error('Something went wrong')
			else {
				toast.success('Reservation cancelled')
				router.refresh()
			}

			setDeletingId('')
		},
		[router]
	)

	return (
		<Container>
			<Heading title='Reservations' subtitle='Bookings on your properties' />
			<Grid>
				<Suspense>
					{reservations.map(reservation => (
						<ListingCard
							key={reservation.id}
							listing={reservation.listing}
							reservation={reservation}
							actionId={reservation.id}
							onAction={onCancel}
							disabled={deletingId === reservation.id}
							actionLabel='Cancel guest reservation'
							currentUser={currentUser}
						/>
					))}
				</Suspense>
			</Grid>
		</Container>
	)
}
export default ReservationsClient
