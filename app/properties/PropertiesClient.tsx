'use client'

import type { FC } from 'react'
import { useState } from 'react'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

import Container from '@/components/Container'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import type { SafeListing, SafeUser } from '@/types'
import { trytm } from '@bdsqqq/try'

import { deleteListing } from '../actions/listing'

type PropertiesClientProps = {
	listings: SafeListing[]
	currentUser: SafeUser | null
}

const PropertiesClient: FC<PropertiesClientProps> = ({
	listings,
	currentUser
}) => {
	const [deletingId, setDeletingId] = useState('')

	const onCancel = async (id: string) => {
		setDeletingId(id)

		const [, error] = await trytm(deleteListing(id))

		if (error) toast.error('Something went wrong')
		else {
			toast.success('Listing deleted')
			router.refresh()
		}

		setDeletingId('')
	}

	const router = useRouter()

	return (
		<Container>
			<Heading title='Properties' subtitle='List of your properties' />
			<div className='mt-10'>
				{listings.map(listing => (
					<ListingCard
						key={listing.id}
						listing={listing}
						actionId={listing.id}
						onAction={onCancel}
						disabled={deletingId === listing.id}
						actionLabel='Delete property'
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	)
}
export default PropertiesClient
