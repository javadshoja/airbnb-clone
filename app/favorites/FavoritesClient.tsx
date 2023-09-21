'use client'

import { Suspense, type FC } from 'react'

import Container from '@/components/Container'
import Grid from '@/components/Grid'
import Heading from '@/components/Heading'
import ListingCard from '@/components/listings/ListingCard'
import type { SafeListing, SafeUser } from '@/types'

type FavoritesClientProps = {
	listings: SafeListing[]
	currentUser: SafeUser | null
}

const FavoritesClient: FC<FavoritesClientProps> = ({
	listings,
	currentUser
}) => {
	return (
		<Container>
			<Heading
				title='Favorites'
				subtitle='List of places you have favorited!'
			/>
			<Grid
				className='
          mt-10
        '
			>
				<Suspense>
					{listings.map(listing => (
						<ListingCard
							key={listing.id}
							currentUser={currentUser}
							listing={listing}
						/>
					))}
				</Suspense>
			</Grid>
		</Container>
	)
}

export default FavoritesClient
