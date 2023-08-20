'use client'

import type { FC } from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import type { SafeReservation, SafeUser } from '@/types'
import { trytm } from '@bdsqqq/try'

import { deleteReservation } from '../actions/reservation'

type TripsClientProps = {
	reservations: SafeReservation[]
	currentUser?: SafeUser | null
}

const TripsClient: FC<TripsClientProps> = ({ reservations, currentUser }) => {
	const [deletingId, setDeletingId] = useState('')

	const onCancel = async (id: string) => {
		setDeletingId(id)

		const [, error] = await trytm(deleteReservation(id))

		if (error) toast.error('Something went wrong')
		else {
			toast.success('Reservation cancelled')
			router.refresh()
		}

		setDeletingId('')
	}

	const router = useRouter()

	return (
		<Container>
			<Heading
				title='Trips'
				subtitle="Where you've been and where you're going"
			/>
			<div
				className='
          xl:grid-col-5
          2xl:grid-col-6
          mt-10
          grid
          grid-cols-1
          gap-8
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
        '
			>
				{reservations?.map(reservation => (
					<ListingCard
						key={reservation.id}
						listing={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						disabled={deletingId === reservation.id}
						actionLabel='Cancel reservation'
						currentUser={currentUser!}
					/>
				))}
			</div>
		</Container>
	)
}
export default TripsClient
