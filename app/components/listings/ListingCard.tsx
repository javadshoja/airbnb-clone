'use client'

import type { FC, MouseEventHandler } from 'react'
import { useCallback, useMemo } from 'react'
import type { Listing, Reservation } from '@prisma/client'
import type { SafeUser } from '@/types'
import { useRouter } from 'next/navigation'
import useCountries from '@/app/hooks/useCountries'
import { format } from 'date-fns'
import Image from 'next/image'
import HeartButton from '../HeartButton'
import Button from '../Button'

type ListingCardProps = {
	listing: Listing
	reservation?: Reservation
	currentUser: SafeUser | null
	disabled?: boolean
	onAction?: (id: string) => void
	actionLabel?: string
	actionId?: string
}

const ListingCard: FC<ListingCardProps> = ({
	listing,
	reservation,
	currentUser,
	disabled,
	onAction,
	actionLabel,
	actionId
}) => {
	const router = useRouter()
	const { getByValue } = useCountries()

	const location = getByValue(listing.locationValue)

	const handleCancel: MouseEventHandler<HTMLButtonElement> = useCallback(
		e => {
			e.stopPropagation()

			if (disabled) return

			onAction?.(actionId!)
		},
		[actionId, disabled, onAction]
	)

	const price = useMemo(() => {
		if (reservation) return reservation.totalPrice

		return listing.price
	}, [listing, reservation])

	const reservationDate = useMemo(() => {
		if (!reservation) return null

		const start = new Date(reservation.startDate)
		const end = new Date(reservation.endDate)

		return `${format(start, 'PP')} - ${format(end, 'PP')}`
	}, [reservation])
	return (
		<div
			onClick={() => router.push(`/listings/${listing.id}`)}
			className='group col-span-1 cursor-pointer'
		>
			<div className='flex w-full flex-col gap-2'>
				<div
					className='
						relative
						aspect-square
						w-full
						overflow-hidden
						rounded-xl
					'
				>
					<Image
						alt='Listing'
						src={listing.imageSrc}
						fill
						className='
							h-full
							w-full
							object-cover
							transition
							group-hover:scale-110
						'
					/>
					<div className='absolute right-3 top-3'>
						<HeartButton listingId={listing.id} currentUser={currentUser} />
					</div>
				</div>
				<div className='text-lg font-semibold'>
					{location?.region}, {location?.label}
				</div>
				<div className='font-light text-neutral-500'>
					{reservationDate || listing.category}
				</div>
				<div className='flex items-center gap-1'>
					<div className='font-semibold'>$ {price}</div>
					{!reservation && <div className='font-light'>night</div>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	)
}
export default ListingCard
