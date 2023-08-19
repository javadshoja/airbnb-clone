'use client'

import type { FC } from 'react'

import dynamic from 'next/dynamic'
import type { IconType } from 'react-icons'

import useCountries from '@/hooks/useCountries'
import type { SafeUser } from '@/types'

import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'

const Map = dynamic(() => import('../Map'), {
	ssr: false
})

type ListingInfoProps = {
	user: SafeUser
	category:
		| {
				icon: IconType
				label: string
				description: string
		  }
		| undefined
	description: string
	roomCount: number
	guestCount: number
	bathroomCount: number
	locationValue: string
}

const ListingInfo: FC<ListingInfoProps> = ({
	user,
	category,
	description,
	roomCount,
	guestCount,
	bathroomCount,
	locationValue
}) => {
	const { getByValue } = useCountries()

	const coordinates = getByValue(locationValue)?.latlng
	return (
		<div className='col-span-4 flex flex-col gap-8'>
			<div className='flex flex-col gap-2'>
				<div
					className='
					flex
					items-center
					gap-2
					text-xl
					font-semibold
				'
				>
					<div>Hosted by {user.name}</div>
					<Avatar src={user.image} />
				</div>
				<div
					className='
						flex
						items-center
						gap-4
						font-light
						text-neutral-500
					'
				>
					<div>{guestCount} guests</div>
					<div>{roomCount} rooms</div>
					<div>{bathroomCount} bathrooms</div>
				</div>
			</div>
			<hr />
			{category && (
				<ListingCategory
					icon={category.icon}
					label={category?.label}
					description={category.description}
				/>
			)}
			<hr />
			<div className='text-lg font-light text-neutral-500'>{description}</div>
			<hr />
			<Map center={coordinates} />
		</div>
	)
}
export default ListingInfo
