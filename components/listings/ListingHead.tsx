'use client'

import type { FC } from 'react'

import Image from 'next/image'

import useCountries from '@/hooks/useCountries'
import type { SafeUser } from '@/types'

import Heading from '../Heading'
import HeartButton from '../HeartButton'

type ListingHeadProps = {
	title: string
	imageSrc: string
	locationValue: string
	id: string
	currentUser?: SafeUser | null
}

const ListingHead: FC<ListingHeadProps> = ({
	title,
	imageSrc,
	locationValue,
	id,
	currentUser
}) => {
	const { getByValue } = useCountries()

	const location = getByValue(locationValue)

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.region}, ${location?.label}`}
			/>
			<div
				className='
          relative
          h-[60vh]
          w-full
          overflow-hidden
          rounded-xl
        '
			>
				<Image
					alt='Image'
					src={imageSrc}
					fill
					className='w-full object-cover'
				/>
				<div className='absolute right-5 top-5'>
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	)
}
export default ListingHead
