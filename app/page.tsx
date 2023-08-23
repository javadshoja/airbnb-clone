import type { FC } from 'react'

import Container from '@/components/Container'
import EmptyState from '@/components/EmptyState'
import Grid from '@/components/Grid'
import ListingCard from '@/components/listings/ListingCard'
import { getListings, getListingsParams } from '@/services/listing'
import getCurrentUser from '@/services/user'

type HomeProps = {
	searchParams: getListingsParams
}

const HomePage: FC<HomeProps> = async ({ searchParams }) => {
	const listings = await getListings(searchParams)
	const currentUser = await getCurrentUser()

	if (listings.length === 0) {
		return <EmptyState showReset />
	}

	return (
		<Container>
			<Grid className='pt-24'>
				{listings.map(listing => (
					<ListingCard
						key={listing.id}
						listing={listing}
						currentUser={currentUser}
					/>
				))}
			</Grid>
		</Container>
	)
}

export default HomePage
